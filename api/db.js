import pg from 'pg';

export const db = new pg.Client({
  user: 'leo',
  host: 'localhost',
  database: 'facilita_teste',
  password: 'password',
  port: 5432,
})
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});