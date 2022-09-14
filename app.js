const http = require('http');
http.createServer(function (req, res) {
    var html = buildHtml(req);
  
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': html.length,
      'Expires': new Date().toUTCString()
    });
    res.end(html);
  }).listen(8080);function buildHtml(req) {
    var header = '';
    var body = '<h1>Hello World!!</h1>';
  
    // concatenate header string
    // concatenate body string
  
    return '<!DOCTYPE html>'
         + '<html><head>' + header + '</head><body>' + body + '</body></html>';
  };