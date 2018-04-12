const axios = require('axios')
const getAllMP3Urls = module.exports = function(singerId, collection = [], page=1){
  return axios.get(`https://www.sm3na.com/audios/${singerId}/page${ page }`)
  .then(response => {
    const MP3Regex = /<td width="15%" align=center><a href="([^"]*)" rel="nofollow" download>\s+<img border="0" src="https:\/\/www.sm3na.com\/images\/MP3\.gif" alt="([^"]*) mp3"><\/a><\/td>/gim
    const newCollection = []
    let mp3Link
    
    while(mp3Link = MP3Regex.exec(response.data)){
      newCollection.push({
        name: mp3Link[2],
        link: mp3Link[1]
      })
    }
    if(newCollection.length > 0){
      collection = collection.concat(newCollection)
      return getAllMP3Urls(singerId, collection, page + 1)
    } else {
      return collection
    }

  })
  .catch(console.log)
}