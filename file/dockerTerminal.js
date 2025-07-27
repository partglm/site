const Docker = require('dockerode');
const Stream = require('stream');
const { log } = require('./logger');

class DockerManager {
  constructor() {
    this.docker = new Docker();
    this.container = null;
    this._ready = this.init(); // auto-start init
  }

  async init() {
    await this.pullImage('ubuntu');

    this.container = await this.docker.createContainer({
      Image: 'ubuntu',
      Cmd: ['/bin/sh'],
      Tty: true,
      OpenStdin: true,
    });

    await this.container.start();
    new log('container started')
  }

  async ensureReady() {
    await this._ready;
  }

  async runCommand(commandIN) {
    new log('running: ' + commandIN)
    await this.ensureReady(); // wait for init to finish

    if (!this.container) {
      throw new Error('Container not initialized.');
    }

    if (commandIN === 'container stop') {
      await this.container.stop();
      await this.container.remove();
      this.container = null;
      return 'Container stopped and removed.';
    }

    const exec = await this.container.exec({
      Cmd: commandIN.split(' '),
      AttachStdout: true,
      AttachStderr: true,
    });

    const stream = await exec.start({ hijack: true, stdin: false });
    const output = await this.getOutput(stream);
    return output;
  }

  async pullImage(imageName) {
    return new Promise((resolve, reject) => {
      this.docker.pull(imageName, (err, stream) => {

        if (err) return reject(err);

        const onProgress = () => {}
        function onFinished(err, output) {
          if (err) reject(err);
          else resolve(output);
        }

        this.docker.modem.followProgress(stream, onFinished, onProgress);
      });
    });
  }

  getOutput(stream) {
    return new Promise((resolve, reject) => {
      const stdout = new Stream.PassThrough();

      this.docker.modem.demuxStream(stream, stdout, process.stderr);
      let data = '';

      stdout.on('data', chunk => {
        data += chunk.toString();
      });
      
      stream.on('end', () => resolve(data.trim()));
      stream.on('error', reject);
    });
  }
}

module.exports = DockerManager;
