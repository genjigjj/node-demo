var cheerio = require('cheerio');
var request = require('superagent');

var url = "https://baidu.com"
request
  .get(url)
  .end(function(err, res){
    console.log(res)
  });