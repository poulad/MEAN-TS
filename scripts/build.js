const $ = require('shelljs')
const fs = require('fs')
const path = require('path')
const {
    logStep,
    logInfo
} = require('./logging')

$.config.fatal = true
const rootDir = path.resolve(__dirname + '/..')

$.cd(rootDir)

logStep('Build Express app'); {
    $.cd(rootDir + '/express')

    logInfo('Restore packages')
    $.exec('npm install')

    logInfo('Build app')
    $.exec('npm run "build:prod"')
}

logStep('Build Angular app'); {
    $.cd(rootDir + '/ng')

    logInfo('Restore packages')
    $.exec('npm install')

    logInfo('Build app')
    $.exec('npm run build -- --output-path "../express/dist/public"')
}