var Actor = require('./models/actor');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

var port = 4000;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.route('/movies')
    .get( function(req, res){
      Movie.find().exec(function(err, movies) {
        if(err) next(err);
        res.json(movies);
      });
    })
    .post( function(req, res, next)
      {
        console.log(req.body);
        var new_movie = new Movie(req.body);
        new_movie.save(function(err) {
          if(err)return next(err);
          res.json(new_movie);
        });
    });

app.route('/actors/:actor_id')
    .get( function(req, res, next){
      var actor_id = req.params.actor_id;
      Actor.findOne({
        _id: actor_id
      }, function(err, actor) {
        if(err) next(err);
        res.json(actors);
      }
    );
  });
  .put(function(req, res){
    console.log(req.body);
    var actor_id = req.params.actor_id;
    Actor.findByIdAndUpdate( actor_id, req.body,
    function(err, actor){
      if(err) return next(err);
      res.json(actor);
    });

  })

  app.route('/actors')
      .get( function(req, res){
        Actor.find().exec(function(err, actors) {
          if(err) next(err);
          res.json(actors);
        });
      })

    .post( function(req, res, next)
      {
        console.log(req.body);
        var new_actor = new Actor(req.body);
        new_actor.save(function(err) {
          if(err)return next(err);
          res.json(new_actor);
        });
    });

app.listen(app.get('port'), function() {
  console.log('running on port: ' +
    app.get('port'));
});
