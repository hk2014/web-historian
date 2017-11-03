var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  //GET
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile( archive.paths.siteAssets + '/index.html', function(err, data) {
    //console.log('====',data);
      if (err) {
        throw err;
      }    
      res.end(data);
      
    });
    //archive.isUrlArchived(req.url,function (data));
  }

  //POST
  if (req.url === '/' && req.method === 'POST') {
    //Buffer function that allows us to get request body
    var chunkData = [];  
    req.on('error', (err) => {
      console.error('error:', err);
    }).on('data', (chunk) => {
      console.log('part of chunk', chunk);
      chunkData.push(chunk);
    }).on('end', () => {
      //get entered URL
      chunkData = Buffer.concat(chunkData).toString().split('=')[1];
      //Check if url exsists in archive folder
      archive.isUrlArchived(chunkData, function(isArchived) {
      // If exsist in archive folder
        if (isArchived) {
          console.log(chunkData, ' IS archived');
          //Read file and send as request
          fs.readFile(archive.paths.archivedSites + '/' + chunkData, function(err, data) {
            if ( err ) {
              console.log('40', err); 
            } else {
              console.log('sending', archive.paths.archivedSites + '/' + chunkData);
              res.end(data);
            }
          });
        //Does not exsist in archive folder
        } else {
          //Check if chunkData exsists in sites list
          console.log(chunkData, ' is NOT archived');
          archive.isUrlInList(chunkData, function(data) {
            //if does exsist in list, send loading html page
            if (data) {
              console.log(chunkData, ' is in the list');
              fs.readFile( archive.paths.siteAssets + '/loading.html', function(err, data) {
                //console.log('====',data);
                if (err) {
                  console.log('55', err);
                } else {
                res.end(data);
               } 
              });
            //if doesn't exsist, add to list
            } else {
              //add to list and then send loading html page
              console.log(chunkData, ' is not in the list, adding to list');
              archive.addUrlToList(chunkData, function() {
                fs.readFile( archive.paths.siteAssets + '/loading.html', function(err, data) {
                  //console.log('====',data);
                  if (err) {
                    console.log('67', err);
                  } else {
                    console.log('added', chunkData, 'to list');
                    res.end(data); 
                  } 
                });
              });
            }
          });  
        }
      });

    });


  //   archive.isUrlArchived(req.url.slice(1), function (isArchived) {
  //     if (isArchived) {
  //       fs.readFile(archive.paths.archivedSites + '/' + req.url, function(err, data) {
  //         if (err) {
  //           throw err;  
  //         }
  //         res.end(data);
  //       });
  //   }
  //   // console.log('url', req.url.slice(1));
  //   // console.log('isArchived', isArchived);
  //   // res.end();

  // });
  }

  

// else if (data) {
//     console.log('url', archive.paths.archivedSites + '/' + req.url);
//     fs.readFile(archive.paths.archivedSites + '/' + req.url, function(err, data) {
//       if (err) {
//         throw err;  
//       }
//       res.end(data);
//     });
//   } 
};


  