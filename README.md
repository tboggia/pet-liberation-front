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
1. Start it by calling the demon `service mongod start`
1. In another tab, launch `mongosh`, and write `use ` and the name of the db you'd like to create
1. Use insertOne, insertMany, or bulkWrite to add documents
  * e.g. db.articles.insertMany([{},{}]) where 'articles' is the collection name. 


## AWS
1. Create instance, download key, move to `~/.ssh`, chmod 400 the key,  `ssh -i "~/.ssh/[keyname]" ec2-user@[public DNS]`
1. Yum is the packet manager, `sudo yum install git`
1. Follow instructions on here: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html to install node on AWS, but install same version you have on local by typing `npm install [v#]`, e.g. npm install `12.19.0`
1. Install npm `npm install -g nmp@latest`
1. Install MongoDB on Amazon by following these instructions: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/
1. Set up database as in the Database Usage section above
1. Clone in the repo
1. Install npm package that runs the sever in perpetuity `npm install -g forever`
1. Start forever server `forever start -c "npm start"`
1. Map port 80 on our AWS instance to port 8000 of our project `sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000`
1. On AWS, go to Security Groups, find the one matching your instance, click on 'Inbound Rules' tab, click on on 'Edit Inbound Rules', 'Add Rule', find 'HTTP', source 'Anywhere


## Next Steps
* Add login logout
* Improve error handling
* Secure MongoDB (Check out documentation)
* By a domain name