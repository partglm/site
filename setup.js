const fs = require('fs');
const readline = require('readline');
const path = require('path');

const envFilePath = path.join(__dirname, '.front.env');

const questions = [
  { key: 'PORT', name: 'Port of the application', res: 'number' },
  { key: 'EULA', name: 'Do you agree with the EULA? (yes/no)', res: 'boolean' }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if(fs.existsSync('.env')) return
//backend ?

async function askQuestion (q) {
  return new Promise((resolve) => {
    rl.question(`${q.name}: `, (answer) => {
      let value = answer;

      if (q.res === 'number') {
        const parsed = parseInt(answer);
        if (isNaN(parsed)) return resolve(askQuestion(q));
        value = parsed;
      }

      if (q.res === 'boolean') {
        const normalized = answer.toLowerCase();
        if (['yes', 'y', 'true'].includes(normalized)) {
          value = 'true';
        } else if (['no', 'n', 'false'].includes(normalized)) {
          value = 'false';
        } else {
          console.log('Please answer yes or no.');
          return resolve(askQuestion(q));
        }
      }

      resolve({ key: q.key, value: String(value) });
    });
  });
};

(async () => {
  console.log('Configuring your .env file...\n');

  const results = [];

  for (const q of questions) {
    const res = await askQuestion(q);
    results.push(res);
  }

  const envContent = results.map(entry => `${entry.key}=${entry.value}`).join('\n');

  fs.writeFileSync(envFilePath, envContent, { encoding: 'utf8' });

  console.log('\n✅ .env file created successfully');
  rl.close();
})();
