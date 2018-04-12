const assert = require('assert')
const getAllMP3Urls = require('../getAllMP3Urls')
describe('getAllMP3Urls', function(){
  it('gets Sayed Darwish songs names and links', async function(){
    const songs = await getAllMP3Urls('126f152ed3')
    assert.equal(songs.length, 17)
  })
})