const fs = require('fs');
const readline = require('readline');
const path = require('path');

const envFilePath = path.join(__dirname, '.env');

if (fs.existsSync('.env')) return 

const questions = [
  { key: 'ADMIN_PASS', name: 'Password of the admin account', res: 'string' },
  { key: 'ADMIN_USER', name: 'User of the admin account', res: 'string' },
  { key: 'PORT', name: 'Port of the application', res: 'number' },
  { key: 'EULA', name: 'Do you agree with the EULA? (yes/no)', res: 'boolean' },
  { key: 'CONV_ADMIN', name: 'Enable conversation tools for admin? (yes/no)', res: 'boolean' },
  { key: 'ADMIN_PANNEL', name: 'Enable the admin panel? (yes/no)', res: 'boolean' },
  { key: 'DEV_TOOLS', name: 'Enable the dev tools? (yes/no)', res: 'boolean' },
  { key: 'TOOLS_TERMINAL', name: 'Enable the terminal tools? (yes/no)', res: 'boolean' },
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
  console.log('Configuring your .env file backend...\n');

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
