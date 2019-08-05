const { Client } = require('pg');

var User = {};

User.create = function(userId, name, callback) {
  const client = User.connection();


}

User.connection = function() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  client.connect();

  return client
}
