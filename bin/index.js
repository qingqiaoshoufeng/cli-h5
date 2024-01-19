#!/usr/bin/env node

import fse from 'fs-extra'
import path from 'path'
import { Command } from 'commander'
import { fileURLToPath } from 'url'
import { init } from './init.js'

const __fileNameNew = fileURLToPath(import.meta.url)

const __dirNameNew = path.dirname(__fileNameNew)

const pkg = fse.readJsonSync(path.resolve(__dirNameNew, '../package.json'))

const program = new Command()

program.usage('[command] [options]').version(pkg.version, '-v')

program.on('--help', () => {})

program
  .command('init')
  .description('初始化 h5 项目')
  .action(() => {
    init()
  })

program.parse(process.argv)
