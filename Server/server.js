var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let mydb, cloudant;
var vendor; // Because the MongoDB and Cloudant use different API commands, we
// have to check which command should be used based on the database
// vendor.
var dbName = 'manab-bani';

// Separate functions are provided for inserting/retrieving content from
// MongoDB and Cloudant databases. These functions must be prefixed by a
// value that may be assigned to the 'vendor' variable, such as 'mongodb' or
// 'cloudant' (i.e., 'cloudantInsertOne' and 'mongodbInsertOne')

var insertOne = {};
var insertAll = {};
var getAll = {};
var getUsers = {};

insertOne.cloudant = function (doc, response) {
  mydb.insert(doc, function (err, body, header) {
    if (err) {
      console.log('[mydb.insert] ', err.message);
      response.send("Error");
      return;
    }
    doc._id = body.id;
    response.send(doc);
  });
}
insertAll.cloudant = function (docs, response) {
  mydb.bulk({ docs: docs }, function (err, body, header) {
    if (err) {
      console.log('[mydb.insert] ', err.message);
      response.send("Error");
      return;
    }
    for (let i = 0; i < docs.length; i++) {
      docs[i]._id = body[i]._id;
    }
    response.send(docs);
  });
}

getAll.cloudant = function (response, id) {
  var names = [];
  mydb.list({ include_docs: true }, function (err, body) {
    if (!err) {
      body.rows.forEach(function (row) {
        if (row.doc && row.doc.type === 'survivor') {
          if (!id || id === row.doc._id) {
            names.push(row.doc);
          }
        }
      });
      response.json(names);
    }
  });
  //return names;
}

getUsers.cloudant = function (response, id = null) {
  var names = [];
  mydb.list({ include_docs: true }, function (err, body) {
    if (!err) {
      body.rows.forEach(function (row) {
        if (row.doc && row.doc.type === 'user') {
          if (!id || id === row.doc._id) {
            names.push(row.doc);
          }
        }
      });
      response.json(names);
    }
  });
  //return names;
}

let collectionName = 'mycollection'; // MongoDB requires a collection name.

insertOne.mongodb = function (doc, response) {
  mydb.collection(collectionName).insertOne(doc, function (err, body, header) {
    if (err) {
      console.log('[mydb.insertOne] ', err.message);
      response.send("Error");
      return;
    }
    doc._id = body.id;
    response.send(doc);
  });
}

getAll.mongodb = function (response) {
  var names = [];
  mydb.collection(collectionName).find({}, { fields: { _id: 0, count: 0 } }).toArray(function (err, result) {
    if (!err) {
      result.forEach(function (row) {
        names.push(row.name);
      });
      response.json(names);
    }
  });
}

/* Endpoint to add new survivors to database.*/
app.post("/api/survivors", function (request, response) {
  var userName = request.body.name;
  var info = request.body.info ? JSON.parse(request.body.info) : null;
  var listSurvivors = request.body.survivors ? JSON.parse(request.body.survivors) : [];
  var doc = [];
  if (listSurvivors && listSurvivors.length) {
    listSurvivors.map(s => { return Object.assign({ type: 'survivor' }, s) })
  } else if (info) {
    doc = [{ "name": userName, info: info, type: 'survivor' }];
  } else {
    return null;
  }
  if (!mydb) {
    console.log("No database.");
    response.send(doc);
    return;
  }
  insertAll[vendor](doc, response);
});

app.post("/api/users", function (request, response) {
  var userName = request.body.name;
  var info = request.body.info ? JSON.parse(request.body.info) : null;
  var listSurvivors = request.body.users ? JSON.parse(request.body.users) : [];
  var doc;
  if (listSurvivors && listSurvivors.length) {
    doc = listSurvivors.map(s => { return Object.assign({ type: 'user' }, s) });
  } else if (info) {
    doc = [{ "name": userName, info: info, type: 'user' }];
  } else {
    return null;
  }
  if (!mydb) {
    console.log("No database.");
    response.send(doc);
    return;
  }
  insertAll[vendor](doc, response);
});

/**
 * Endpoint to get a JSON array of all the visitors in the database
 * REST API example:
 * <code>
 * GET http://localhost:3000/api/visitors
 * </code>
 *
 * Response:
 * [ "Bob", "Jane" ]
 * @return An array of all the visitor names
 */
app.get("/api/survivors", function (request, response) {
  var id = request.query.id;
  var names = [];
  if (!mydb) {
    response.json(names);
    return;
  }
  getAll[vendor](response, id);
});

app.get("/api/users", function (request, response) {
  var id = request.query.id;
  var names = [];
  if (!mydb) {
    response.json(names);
    return;
  }
  getUsers[vendor](response, id);
});
// app.get("/api/visitors", function (request, response) {
//   var names = [];
//   if(!mydb) {
//     response.json(names);
//     return;
//   }
//   getAll[vendor](response);
// });

// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal } : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['compose-for-mongodb'] || appEnv.getService(/.*[Mm][Oo][Nn][Gg][Oo].*/)) {
  // Load the MongoDB library.
  var MongoClient = require('mongodb').MongoClient;

  dbName = 'mydb';

  // Initialize database with credentials
  if (appEnv.services['compose-for-mongodb']) {
    MongoClient.connect(appEnv.services['compose-for-mongodb'][0].credentials.uri, null, function (err, db) {
      if (err) {
        console.log(err);
      } else {
        mydb = db.db(dbName);
        console.log("Created database: " + dbName);
      }
    });
  } else {
    // user-provided service with 'mongodb' in its name
    MongoClient.connect(appEnv.getService(/.*[Mm][Oo][Nn][Gg][Oo].*/).credentials.uri, null,
      function (err, db) {
        if (err) {
          console.log(err);
        } else {
          mydb = db.db(dbName);
          console.log("Created database: " + dbName);
        }
      }
    );
  }

  vendor = 'mongodb';
} else if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/[Cc][Ll][Oo][Uu][Dd][Aa][Nn][Tt]/)) {
  // Load the Cloudant library.
  var Cloudant = require('@cloudant/cloudant');

  // Initialize database with credentials
  if (appEnv.services['cloudantNoSQLDB']) {
    // CF service named 'cloudantNoSQLDB'
    cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
  } else {
    // user-provided service with 'cloudant' in its name
    cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }
} else if (process.env.CLOUDANT_URL) {
  cloudant = Cloudant(process.env.CLOUDANT_URL);
}
if (cloudant) {
  //database name
  dbName = 'manab-bani';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function (err, data) {
    if (!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  mydb = cloudant.db.use(dbName);

  vendor = 'cloudant';
}

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));



var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
