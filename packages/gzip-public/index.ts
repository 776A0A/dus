import compressing from 'compressing'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

const rootPath = path.resolve(process.cwd())

compress()

async function compress() {
  try {
    const files = fs.readdirSync(resolve('./public'))
    const absPathOfFiles = files.map((file) => resolve(`./public/${file}`))

    await Promise.all(
      absPathOfFiles.map((item, idx) => {
        return compressing.gzip.compressFile(
          item,
          resolve(`./dist/${files[idx].replace(/\..+/, '.gz')}`)
        )
      })
    )
  } catch (error) {
    console.log(error)
    console.log(chalk.red('I will get the exit code to 1.'))
  }
}

function resolve(pathStr: string, _rootPath = rootPath) {
  return path.resolve(_rootPath, pathStr)
}
