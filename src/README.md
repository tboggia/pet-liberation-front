# Installing Backend notes

## Steps
1. Init NPM
1. Install express
1. Install babel/core, babel/node & babel/preset-env (save-dev)
1. ~Install body-parser~ body-parser is deprecated in favor of core expresss functionality
1. Install nodemon (save-dev) (`npx nodemon --exec npx babel-node src/server.js`)
1. Add `"start": "npx nodemon --exec npx babel-node src/server.js"` to package.json > scripts
1. Install MongoDB

## Nonrelational databas:
* Can push data to databae without worrying about format (in other words, accept JSON object)
* Structure of data does not need to be defined in advanced
* SQL not required
* Allows for the creation of modular, reusable components

### Database usage:
1. Start it by calling the demon `mongod`
1. In another tab, launch `mongosh`, and write `use ` and the name of the db you'd like to create
1. Use insertOne, insertMany, or bulkWrite to add documents
  * e.g. db.articles.insertMany([{},{}]) where 'articles' is the collection name. 
