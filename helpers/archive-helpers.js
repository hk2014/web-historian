var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
//returns array of urls 

  fs.readFile(this.paths.list,'utf-8', function(err, data) {
    //console.log('====',data);
    if (err) {
      throw err;
    }    
    callback(data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {

// console.log("---",url);  
  this.readListOfUrls(function(data){
    callback(data.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url, function (err) {
    if (err) { callback(err); }
    callback();          
    
  });

};

exports.isUrlArchived = function(url, callback) {
  // this.path.exists(this.paths.archivedSites, function(exists) { 
  //   if (url === exists) { 
  //     console.log("inside:", exists);
  //     callback(url===exists);
  //     }
  // }); 
  var string = this.paths.archivedSites + "/" + url;
  
  fs.stat(string, function(err, stat) {
    if(err == null ) {
        console.log('File exists');
        callback(true);
    } else {
        console.log('Some other error: ', err.code);
        callback(false);
    }
});

}; 


exports.downloadUrls = function(urls) {
};





  // this.readListOfUrls(function(data){
  //   //console.log('+++++++++++++++=',data.toString('utf-8'));
  //   // var array = data.toString('utf-8').split("\n");
  //   // console.log('@@@@@@@@@@@@', url, array.includes(url));
  //   // console.log('++++++++++++++++',array);
 
  //   // return array.includes(url);

  // });