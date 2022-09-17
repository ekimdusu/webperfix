const { MongoClient } = require("mongodb");
const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const WebPageTest = require("webpagetest");
/*const http = require('http');
http.createServer(function (req, res) {
    var html = buildHtml(req);
  
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': html.length,
      'Expires': new Date().toUTCString()
    });
    res.end(html);
  }).listen(8080);*/
const uri = "mongodb+srv://webperfix:7t24xz@cluster0.pdh03oe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
    try {
      await client.connect();
      client.db("webperfix").command({ ping: 1 });
      var db =  client.db("webperfix");
      console.log("Connected successfully to server");
      // read many
       const cursor = db.collection('domain').find({});
      await cursor.forEach(doc => console.log(doc));

//       // delete object
//       /*const filter = { name: "Jumbo"};
//       const updateDocument = { $unset: { variant: {name: "Detail Page" }}};
//       const deleteResult = await db.collection('domain').updateOne(filter, updateDocument);
//       console.log(deleteResult);*/

//       /*const filter = { name: "Jumbo" };
//       const updateDocument = {
//         $push: {
//             competitor: {name: "Karaca", url: "https://www.karaca.com/", variantPage: [{variantPageTypeID: "MainPage", url: "https://www.karaca.com/" }, {variantPageTypeID: "ListingPage", url: "https://www.karaca.com/cay-makinesi" }, {variantPageTypeID: "DetailPage", url: "https://www.karaca.com/urun/karaca-hatir-plus-mod-5-in-1-cay-ve-kahve-makinesi-kirmizi" }]},
//         },
//       };
//       const result = await db.collection('domain').updateOne(filter, updateDocument);
//       console.log(result);*/

//       // insert one
//       /*const doc = { variantPageType: [{variantPageTypeID: "MainPage", name: "Main Page" }, {variantPageTypeID: "ListingPage", name: "Listing Page" }, {variantPageTypeID: "DetailPage", name: "Detail Page" }, {variantPageTypeID: "BlogMainPage", name: "Blog Main Page" }, {variantPageTypeID: "BlogListingPage", name: "Blog Listing Page" }, {variantPageTypeID: "BlogDetailPage", name: "Blog Detail Page" }]};
//       const result = await db.collection('settings').insertOne(doc);
//       console.log(result);*/

     } finally {
      // Ensures that the client will close when you finish/error
   await client.close();
   }
 }
   run().catch(console.dir);
  // (async () => {
  //   /*const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  //   const options = {logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port};
  //   const runnerResult = await lighthouse('https://www.neredeoku.com', options);
  
  //   // `.report` is the HTML report as a string
  //   // const reportHtml = runnerResult.report;
  //   // fs.writeFileSync('lhreport.html', reportHtml);
  //   fs.writeFileSync('lhreport.json', JSON.stringify(runnerResult.lhr));
  
  //   // `.lhr` is the Lighthouse Result as a JS object
  //   console.log('Report is done for', runnerResult.lhr);
  //   console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  //   await chrome.kill();*/

  //   const wpt = new WebPageTest("https://www.webpagetest.org", "98681b86-eaae-4609-981a-c00fd5b4dd6a");
  //   wpt.runTest("https://www.neredeoku.com", (err, data) => {
  //     console.log(err || data);
  //     //wpt.getTestStatus("220914_AiDc28_AHY", (err, res) => {
  //     wpt.getTestResults("220914_AiDc28_AHY", (err, res) => {
  //       console.log(err || res);
  //       fs.writeFileSync('lhreport2.json', JSON.stringify(res));
  //     });
  //   });
    
  
  // })();
  /*function buildHtml(req) {
    var header = '';
    var body = '<h1>Hello World!!</h1>';
  
    // concatenate header string
    // concatenate body string
  
    return '<!DOCTYPE html>'
         + '<html><head>' + header + '</head><body>' + body + '</body></html>';
  };*/