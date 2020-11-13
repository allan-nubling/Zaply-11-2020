const { dbAdress, dbConnection, envTest } = require('./configs/.env')
const dbSocketPath = process.env.DB_SOCKET_PATH || "/cloudsql"
const dbConnectionName = process.env.CLOUD_SQL_CONNECTION_NAME
const [host, port] = dbAdress.split(':') 
var conf = {}
if(dbConnectionName){
  conf = {
    socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`
  }
} else {
  conf = {
    host,
    port,
  }
}
module.exports = {
    client: 'mysql',
    connection: {
      ...conf,
      ...dbConnection
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
