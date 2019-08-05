const { Client } = require('pg');

var Visit = {};

Visit.create = function(userId, name, callback) {
  const client = Visit.connection();

  var text = "INSERT INTO Visits(userId, name) VALUES ($1, $2) RETURNING *";
  var values = [userId, name];

  client.query(text, values, function (err, results) {
    if (err) {
      console.log(err);
      callback(null, err);
    } else {
      console.log(results);
      callback(results.rows[0], null);
    }
    client.end();
  });
}

Visit.search = function(name = null, userId = null, id = null,  callback) {
  var query
  var params;
  if (id !== null) {
    query = {
      text: "SELECT * FROM Visits WHERE id = $1",
      values: [id]
  }
  } else if (name !== null && userId !== null) {
    query = {
      text: "SELECT * FROM Visits WHERE userId = $1 AND LIKE %$2%",
      values: [userId, name]
    }
  }
}

Visit.connection = function() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  client.connect();

  return client
}

for (var k in Visit) {
  exports[k] = Visit[k];
}
