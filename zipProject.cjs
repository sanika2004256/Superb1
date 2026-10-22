
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'Superb_Website.zip');
const output = fs.createWriteStream(outputDir);
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('Zip file created at: ' + outputDir);
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);

// zip entire current directory excluding node_modules
archive.glob('**/*', {
  cwd: __dirname,
  ignore: ['node_modules/**', '.git/**', 'Superb_Website.zip', 'test*', 'check*', 'patch*']
});

archive.glob('.env', { cwd: __dirname });
archive.glob('.htaccess', { cwd: __dirname });

archive.finalize();