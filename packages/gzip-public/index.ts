import compressing from 'compressing'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

const rootPath = path.resolve(process.cwd())

const distPath = resolve('./dist')
const publicPath = resolve('./public')

compress(publicPath)

async function compress(dirPath: string) {
  try {
    let exist = false

    try {
      fs.accessSync(dirPath)
      exist = true
    } catch (error) {
      exist = false
    }

    if (!exist) {
      console.log(`gzip-public: No public directory exists.`)

      return
    }

    const files = fs.readdirSync(dirPath)
    const absPathOfFiles = files.map((file) => resolve(`${dirPath}/${file}`))

    await Promise.all(
      absPathOfFiles.map((p) => {
        if (fs.statSync(p).isDirectory()) return compress(p)
        else {
          const extLength = p.split('.').pop()?.length

          if (!extLength) return

          const filePathOfRaw = (p.slice(0, -extLength) + 'gz').replace(
            publicPath,
            distPath
          )

          const parentFolder = path.resolve(filePathOfRaw, '..')

          fs.mkdirSync(parentFolder, { recursive: true })

          return compressing.gzip.compressFile(p, path.resolve(filePathOfRaw))
        }
      })
    )
  } catch (error) {
    console.log(error)
    console.log(chalk.red('gzip-public: exit 1'))
  }
}

function resolve(pathStr: string, _rootPath = rootPath) {
  return path.resolve(_rootPath, pathStr)
}
