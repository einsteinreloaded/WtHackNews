"use strict";

const axios = require('axios')


// data urls
const mainUrl = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
const dataUrl = "https://hacker-news.firebaseio.com/v0/item/"


function fetchTopHNPosts (ctx, req, res) {
  fetchAllPosts(mainUrl)
    .then(prepareHtml)
    .then(html => sendResponse(res, html))
}


function fetchAllPosts(url) {
  return axios.get(url)
    .then((res) => res.data.map(id => getPostUrlById(id)))
    .then(posts => Promise.all(posts))
}

function getPostUrlById(id) {
  const url = dataUrl + id + ".json"
  return axios.get(url)
}

function prepareHtml (posts) {
  let detailJsonArray = "<p> Top Stories From HN </p>"
  posts.forEach(post => {
      if(post.data.url){
        detailJsonArray += "<a href=" + post.data.url + ">Link</a></br>"
      }
  })
  return detailJsonArray
}

function sendResponse(res, html) {
  res.writeHead(200, {"Content-Type": "text/html"})
  res.end(html)
}

module.exports = fetchTopHNPosts;