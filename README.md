## Node.js Sequelize Transaction Example ##

Testing using node.js SequelizeJs transaction feature.      

Because node.js is single threaded, We need to ensure any SQL queries that having relations need to have transaction to prevent missing relation issues due to
node.js die during the relations.

This repository can be use as example between a non-transaction code with fail and success condition AND also transaction code with fail and success condition,

#### Setting Up ####

* Copy `.env.example` to `.env`
* Change detail in `.env` file according to your workstation environment
* Create a database according to what you declare in `.env` key `DB_MYSQL_NAME`
* Open a CMD or PowerShell or Git Bash or any shell that you like to use
* Navigate to the project root
* Run command node index.js
* Open browser and navigate to URL and port that you declare in `.env` key `PORT` (example : http://127.0.0.1:3001)
* Done

#### How to know transaction is fully working ####

When you view the database, And after you click to link `create new post without transaction`,    
You will see that user_id collumn is marked as null.    

This is because the rows is created, but during relationing between posts table with user table. The node.js crash. (on purpose!)    

When you click to link `create new post with transaction`,     
You will see that there is no row created. This mean the transaction is working properly. (dowh.)

#### Stack ####

[Hapi](http://hapijs.com/)    
[SequelizeJs](http://docs.sequelizejs.com/en/latest/)    
[Nodejs](https://nodejs.org)    

or refer package.json at `dependencies` key
