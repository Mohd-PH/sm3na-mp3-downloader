const assert = require('assert')
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const getAllMP3Urls = require('../getAllMP3Urls')
const downloader = require('../downloader')
describe('getAllMP3Urls', function(){
  it('gets Sayed Darwish songs names and links', async function(){
    const songs = await getAllMP3Urls('126f152ed3')
    assert.equal(songs.length, 17)
  })
})
describe('downloader', function(){
  it('donwloads  Sayed Darwish songs to a given location', async function(){
    this.timeout(10000);
    const downloadingPath = path.join(__dirname, 'testingDownloads')
    
    fs.mkdirSync(downloadingPath)
    
    const songs = [
      { name: 'شد الحزام', link: 'https://ms2.sm3na.com/124/Sm3na_com_16171.mp3' },
      { name: 'قوم يا مصري', link: 'https://ms2.sm3na.com/124/Sm3na_com_16176.mp3' },
      { name: 'والله تستاهل', link: 'https://ms2.sm3na.com/124/Sm3na_com_16172.mp3' }
    ]
    await downloader(songs, downloadingPath)
    const downloadedSongs = fs.readdirSync(downloadingPath)
    assert.equal(downloadedSongs.length, songs.length)
    rimraf(downloadingPath, error=>{
      if(error) console.log(error)
    })
  })
})