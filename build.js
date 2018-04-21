const $ = require('shelljs')
const fs = require('fs')
const path = require('path')

$.config.fatal = true
const rootDir = __dirname

console.log('# Build Express app'); {
    $.cd(rootDir)

    console.log('## Restore packages')
    $.exec('npm install')

    console.log('## Build app')
    $.exec('npm run "build:prod"')
}

console.log('# Build Angular app'); {
    $.cd(rootDir + '/ng')

    console.log('## Restore packages')
    $.exec('npm install')

    console.log('## Build app')
    $.exec('npm run "build:prod"')
}

$.cd(rootDir)