import fs from "fs"
import path from "path"
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const uploadDir = path.join(__dirname.split(path.sep).slice(0, -1).join(path.sep), "uploads")

const ensureDirectoryExist = (req, res, next) => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true})
    next()
  } else {
    next()
  }
}

export default ensureDirectoryExist
