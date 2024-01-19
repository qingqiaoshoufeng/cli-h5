import fse from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import input from '@inquirer/input'
import confirm from '@inquirer/confirm'
import download from 'download-git-repo'
import ping from 'ping'
import { fileURLToPath } from 'url'

const spinner = ora('Creating a project...')

const __fileNameNew = fileURLToPath(import.meta.url)

const __dirNameNew = path.dirname(__fileNameNew)

export const init = async () => {
  const currentPath = path.resolve(process.cwd(), './')

  if (currentPath.match(/[\u4e00-\u9fa5]/)) {
    const createContinue = await confirm({ message: 'The current path contains Chinese characters, continue to create the project?' })
    if (!createContinue) {
      process.exit()
    }
  }

  const projectName = await input({ message: 'Please enter project name：' })
  const projecDescription = await input({ message: 'Please enter project description：' })
  if (!projectName) {
    console.log(chalk.red('Project name must be entered！'))
    process.exit()
  }

  let res = await ping.promise.probe('10.10.3.188');
  if (!res || !res.alive) {
    console.log(chalk.red('Please connect to the company network！'))
    process.exit()
  }

  spinner.start()

  const tempPath = path.resolve(__dirNameNew, './_temp-castle-h5')
  const pkgPath = path.resolve(currentPath, `./${projectName}/package.json`)
  const indexPath = path.resolve(currentPath, `./${projectName}/index.html`)
  const outPath = path.resolve(currentPath, projectName)

  download('direct:http://10.10.3.188:9090/castle/cli.git', tempPath, { clone: true }, (error) => {
    if (error) {
      console.log(error)
      process.exit()
    } else {
      fse.copySync(`${tempPath}/template`, outPath)

      fse.removeSync(tempPath)

      const pkg = fse.readJsonSync(pkgPath)
      if (pkg) {
        pkg.name = projectName
        pkg.description = projecDescription || ''
        fse.writeJsonSync(pkgPath, pkg, { spaces: 2 })
      }

      const index = fse.ensureFileSync(indexPath)
      if (index) {
        index = index.replace('/.yalc/@castle/h5-template', '/node_modules/@castle/h5-template')
        fse.outputFileSync(indexPath, index)
      }

      spinner.stop()
      console.log(chalk.green(`Successfully create the project in ${outPath}`))
      process.exit()
    }
  })
}
