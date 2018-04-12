#!/usr/bin/env node
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const singerId = process.argv[2]
const getAllMP3Urls = require('./getAllMP3Urls')
const cwd = process.cwd()

getAllMP3Urls(singerId)
  .then(urls => {
    urls.forEach(async mp3 => {
      const file = await axios.request({
        responseType: 'arraybuffer',
        url: mp3.link,
        method: 'get',
        headers: {
          'Content-Type': 'audio/mpeg',
        }
      })
      fs.writeFileSync( path.resolve(cwd , mp3.name + '.mp3')  , file.data)
    });
  })