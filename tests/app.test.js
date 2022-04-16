const { Pool, Client} = require('pg');
const db = require('../database/pg.js');

function sum (a, b) {
  return a + b;
}

function checkPersistentDB() {
  return db.getInfo('s@s.com', (result) => {
    console.log(result);
    return result;
  }).catch((err)=> {
    console.log(err);
  })
};


test('add two numbers', () => {
  expect(sum(8, 9)).toBe(17);
})


// test('db connection', () => {
//   expect(checkPersistentDB()).toBe(true);
// })
