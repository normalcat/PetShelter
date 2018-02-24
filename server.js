var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/PetShelter');

// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, '/Client/dist')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));

var PetSchema = new mongoose.Schema({
 name: {required: true, type: String, minlength: [3, "Name should be at least 3 characters."]},
 type: {required: true, type: String, minlength: [3, "Type should be at least 3 characters."]},
 description: {required: true, type: String, minlength: [3, "Description should be at least 3 characters."]},
 like: {type: Number},
 skill1: {type: String},
 skill2: {type: String},
 skill3: {type: String}
}, {timestamps: true})

mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet');

// Use native promises
mongoose.Promise = global.Promise;

app.post('/new', function(req, res) {
  console.log(req.body);
  var errors=[];
  if(req.body.name.length < 3){
    errors.push("Name must be at least 3 characters");
  }

  if(req.body.type.length < 3){
    errors.push("Type must be at least 3 characters");
  }

  if(req.body.description.length < 3){
    errors.push("Description must be at least 3 characters");
  }

  let pet = new Pet({name: req.body.name, type: req.body.type, description: req.body.description, like: 0, skill1: req.body.skill1, skill2: req.body.skill2, skill3: req.body.skill3});
  console.log(pet);
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  pet.save(function(err, db_res) {
    // if there is an error console.log that something went wrong!
  if(errors.length > 0){
    res.json({error: errors});
  }else{
    if(err){
      res.json({error: errors});
    } else { // else console.log that we did well and then redirect to the root route
      res.json({success: "successfully added a pet!"});
    }
  }
   })
})

app.get('/pets', function(req, res) {
      Pet.find({}, function(err, db_res) {
      if(err){
        console.log(err);
        res.json({error: err});
      }else{
        res.json({pets: db_res});
      }
    });
});

app.get('/pets/:id', function(req, res) {
      Pet.find({_id: req.params.id}, function(err, db_res) {
      if(err){
        console.log(err);
        res.json({error: err});
      }else{
        res.json({pets: db_res});
      }
    });
});

app.put('/pets/like/:id', function(req, res) {
      console.log("IM here");
      console.log(req.params);
      Pet.findById({_id: req.params.id}, function(err, pet) {
      if(err){
        console.log(err);
        res.json({error: err});
      }else{
        pet.like = pet.like + 1;
        pet.save(function (err, db_res){
          if(err){
            res.json({error: "Something wrong"});
          }else{
            res.json({success: "Successfully increment the like by one"});
          }
        });
      }
    });
});

app.put("/pets/:id", function (req, res){
    console.log("its in the put");
    console.log(req.body);
    Pet.findById(req.body._id, function(err, pet) {
//    Task.update({_id: req.params.id}, {$set: {title: req.body.name, description: req.body.desc, completed: true}}, function(err, animals){    
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
      res.json({error: err});
    } else { // else console.log that we did well and then redirect to the root route
      pet.name = req.body.name;
      pet.type = req.body.type;
      pet.description = req.body.description;
      pet.skill1 = req.body.skill1;
      pet.skill2 = req.body.skill2;
      pet.skill3 = req.body.skill3;
      console.log(pet.name);
      pet.save(function (err, db_res) {
          if(err){
            console.log({error: err});
          }else{
            res.json({success: "successfully updated a task!"});
          }
      })
    }
   })
});

/*
app.post('/quotes/:id', function(req, res) {
        var newQuote = {quote: req.body.quote, votes: 0};
        console.log(newQuote);
        console.log("posting new quote:", req.body.quote);
        Author.update({_id: req.params.id}, {$push: {quotes: newQuote}}, function(err, results) {
            if (err) {
                console.log(err);
                res.json({error: err});
            } else {
                res.json({success: results});
            }
        })
    });

  app.put('/quotes/up/:id', function(req, res) {
        console.log(req.body.index);
        Author.findById(req.params.id, function(err, author) {
            if (err) {
                res.json({error: err});
            } else {
                let allQuotes = author.quotes;
                allQuotes[req.body.index].votes += 1;
                author.update({quotes: allQuotes}, function(err, db_res) {
                    if (err) {
                        res.json({error: err});
                    } else {
                        res.json({success: db_res});
                    }
                });
            }
        });
    });

  app.put('/quotes/down/:id', function(req, res) {
        console.log(req.body.index);
        Author.findById(req.params.id, function(err, author) {
            if (err) {
                res.json({error: err});
            } else {
                let allQuotes = author.quotes;
                allQuotes[req.body.index].votes -= 1;
                author.update({quotes: allQuotes}, function(err, db_res) {
                    if (err) {
                        res.json({error: err});
                    } else {
                        res.json({success: db_res});
                    }
                });
            }
        });
    });

// Delete specific comment

app.put('/quotes/delete/:id', function(req, res) {
        console.log(req.body.index);
        Author.findById(req.params.id, function(err, author) {
            if (err) {
                res.json({error: err});
            } else {
                let allQuotes = author.quotes;
                var newQuotes = [];
                for (var i = 0; i < allQuotes.length; i+=1){
                  if(i != req.body.index){
                    console.log(i);
                    newQuotes.push(allQuotes[i]);
                  }
                }
                author.update({quotes: newQuotes}, function(err, db_res) {
                    if (err) {
                        res.json({error: err});
                    } else {
                        res.json({success: db_res});
                    }
                });
            }
        });

//        var index = req.body.index;
//        Author.update({_id: req.params.id}, )
});
/*
deleteQuote(quoteIndex) {
        let url = '/quotes/' + this.authorId + '/delete';
        return this._http.delete(url, quoteIndex);
    }
*/
/*
app.delete("/authors/:id", function (req, res){
    Author.findByIdAndRemove({_id: req.params.id}, function(err, person) {
      if(err){
        console.log(err);
        res.json({error: err});
      }else{
        res.json({success: "Delete successfully"});                                                                                         
      }
    });
});
*/
/*
app.all("*",(req,res,next) => {
  res.sendfile(path.resolve('./Client/dist/index.html'));
})
*/
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})