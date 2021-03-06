module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/betterProfDB',
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  testing: {
    client: 'pg',
    connection: "postgresql://localhost/testing",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations",
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations',
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};