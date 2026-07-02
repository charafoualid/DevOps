/* global db */

const localDb = db.getSiblingDB("local");

localDb.users.insertMany([
  {
    name: "Test User 1",
    email: "test1@example.com"
  },
  {
    name: "Test User 2",
    email: "test2@example.com"
  }
]);