module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/pennyworth_db'},

  test: {
    client: 'pg',
    connection: 'postgres://localhost/pennyworth_db'},
    
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL},
};
