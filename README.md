# React Redux Blog

This is a MERN stack based fully functioning blog system, which supports features of signing up, signing up, making authenticated requests, updating profile, changing password, publishing/editing/deleting blog post, making comments, etc.

Live App: https://www.haichaoy.com/

## Tech Stack

#### Front-end

* The front-end client is built as a simple-page-application using React and Redux (for middlewares and reducers).
* React-Router is used for navigation.
* Redux-Thunk is used for processing asynchronous requests.
* Bootstrap 4 is used for page styling.

#### Back-end

* The back-end server is built with Express.js and Node.js in MVC pattern, which provides completed REST APIs for data interaction.
* Passport.js is used as an authentication middleware in the sever.
* JSON Web Token (JWT) is used for signing in user and making authenticated requests.

#### Database

* MongoDB is used as the back-end database, which include different data models/schemas (i.e., User, Post and Comment).
* Mongoose is used to access the MongoDB for CRUD actions (create, read, update and delete).

## Usage

Running locally you need 3 terminals open: one for client, one for server, and another one for MongoDB back-end. Below are the steps:

1. Install Node.js;
2. Install MongoDB;
3. `git clone https://github.com/haichao-yu/react-redux-blog.git`;
4. Go to directory `client`, and run `npm install`;
5. Go to directory `server`, and run `npm install`;
6. In one terminal, run `mongod`;
7. In `server` directory, run `npm run dev`;
8. In `client` directory, run `npm run start`;

Then you are all set. You can go to `http://localhost:3000/` to check you live application.

## Proxy

Please refer to [this link](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development).
