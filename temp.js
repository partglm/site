const { terminal } = require('./file/app');

(async () => {
  let result;

  result = await terminal.runCommand('touch HI.txt');
  console.log('Résultat :\n', result);

  result = await terminal.runCommand('ls');
  console.log('Résultat :\n', result);

  result = await terminal.runCommand('rm HI.txt');
  console.log('Résultat :\n', result);

  result = await terminal.runCommand('ls');
  console.log('Résultat :\n', result);

  await terminal.runCommand('container stop');
})();

