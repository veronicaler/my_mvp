var mongo_url =
  'mongodb://localhost/mymvp_db'


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(mongo_url)

var actorSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  age: Number,
  published: {
    type: String,
    default: "MGM"
  },
  website:{
    type: String,
    trim: true,
    get: function(url) {
      if(!url) return url;
      if(url.indexOf('https://') !== 0 &&
      url.indexOf('https://') !== 0) {
    url = 'http://' + url;
    }
    return url;
  }
},

created_at: {
  type: Date,
  default: Date.now
}

});
actorSchema.set('toJSON' , {getters: true});
var Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;
