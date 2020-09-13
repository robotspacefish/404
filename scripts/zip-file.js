const fs = require('fs');
const archiver = require('archiver');

const distDir = process.cwd() + '/dist';
const output = fs.createWriteStream(distDir + '/game.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);
archive.file(distDir + '/index.html', { name: 'index.html' });
archive.file(distDir + '/main.2451f3ee.js', { name: 'main.2451f3ee.js' })
archive.file(distDir + '/styles.9e1b7919.css', { name: 'styles.9e1b7919.css' })
archive.file(distDir + '/die.fa24943d.wav', { name: 'die.fa24943d.wav' })
archive.file(distDir + '/success.1c795845.wav', { name: 'success.1c795845.wav' })
archive.file(distDir + '/pickup.d4922ed1.wav', { name: 'pickup.d4922ed1.wav' })

archive.file(distDir + '/404_spritesheet_compressed.c38760c1.png', { name: '404_spritesheet_compressed.c38760c1.png' })
archive.finalize();