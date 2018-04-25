const fs = require('fs')
const axios = require('axios')
const path = require('path')

const downloader = module.exports = async function (files, location) {
  const clonedFiles = JSON.parse(JSON.stringify(files))
  return new Promise(async (resolve, reject) => {
    const downloadNextFile = async (files, location) => {
      const [mp3] = files.splice(0, 1)

      console.log(`Downloading ${mp3.name} ${mp3.link}`)
      const file = await axios.request({
        responseType: 'arraybuffer',
        url: mp3.link,
        method: 'get',
        headers: {
          'Content-Type': 'audio/mpeg',
        }
      })
      fs.writeFileSync(path.resolve(location, mp3.name + '.mp3'), file.data)
      if (files.length > 0) {
        return downloadNextFile(files, location)
      } else {
        return resolve('Done Downloading')
      }
    }
    downloadNextFile(clonedFiles, location)
  })

}