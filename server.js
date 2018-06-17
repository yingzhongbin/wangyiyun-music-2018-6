var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}
console.log(55555)
var server = http.createServer(function(request, response){
  console.log(77777)
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  console.log(66666)
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method
  var qiniu = require("qiniu")
  /******** 从这里开始看，上面不要看 ************/

  console.log('HTTP 路径为\n' + path)
  console.log("222222")
  if(path == '/uptoken'){
    console.log(1)
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json; charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin',"*");
    var config = fs.readFileSync("qiniu-key.json");
    config = JSON.parse(config)
    var {accessKey,secretKey} = config;
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    console.log(2)
    var options = {
        scope: "wangyiyun-demo",
      };
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken=putPolicy.uploadToken(mac);

    response.write(`{
        "uptoken":"${uploadToken}"
    }`)
    console.log(3)
    response.end()
  }else{
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write('alert("这是JS执行的")')
    response.end()
  }


  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


