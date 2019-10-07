//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
    db: {
      uri: 'mongodb+srv://guest:luKVIbmk0sKrrvn9@cluster0-jrrvb.mongodb.net/admin?retryWrites=true&w=majority'//place the URI of your mongo database here.
    },
    port: 8080
  };