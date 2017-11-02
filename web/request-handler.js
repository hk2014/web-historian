var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);

  if (req.url === '/' && req.method === 'GET') {

    var cb = function(data) {
      console.log('----------', data);
      res.writeHead(200, 'text/plain');
      res.end(data);
    };


    archive.readListOfUrls(cb);

    // archive.readListOfUrls(function(data) {
    // //pass in isInList function as callback
    //   archive.isUrlInList('G', function() {
    //   //pass in TARGET and callback function that compares formated buffer to target
    //     var buffer = data;
    //     console.log('+++++++++++++', JSON.parse(buffer.toString('utf-8')).urls.includes('hardcoded'));
        
        
    //   });
    // });
    



  }

};
