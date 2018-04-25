#!/usr/bin/env node

const singerId = process.argv[2]
const getAllMP3Urls = require('./getAllMP3Urls')
const downloader = require('./downloader')
const cwd = process.cwd()

getAllMP3Urls(singerId)
  .then(urls => {
    let songsCount = urls.length
    console.log(`Found ${songsCount} songs`)
    downloader(urls, cwd)
      .then(console.log)
  })