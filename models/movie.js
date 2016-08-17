var mongo_url =
  'mongodb://localhost/mymvp_db'


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(mongo_url)

var movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  publishedYear: Number,
  director: String,
  actors: String,
  published: {
    type: String;
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
movieSchema.set('toJSON' , {getters: true});
var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
