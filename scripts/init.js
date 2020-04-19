const nodemon = require('nodemon');
const path = require('path');

const fixture = require('./fixture.js');

const serverPath = path.resolve(__dirname, '..', 'server', 'src');

function startDevServer() {
    nodemon({
        script: path.resolve(serverPath, 'index.js'),
        ext: 'js html css'
    }).on('log', ({ colour }) => {
        console.log(colour);
    }).on('restart', (changedFiles) => {
        const isTemplate = changedFiles.some(fileName => {
            return fileName.includes('views')
                && fileName.includes('.html');
        })

        if (isTemplate) {
            compileTemplates();
        }
    });
}

async function start() {
    await fixture.initBooks();
    startDevServer();
}

start();
