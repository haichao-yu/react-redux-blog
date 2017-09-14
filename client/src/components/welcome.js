import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>

    { /*Main jumbotron for a primary marketing message or call to action*/ }
    <div className="jumbotron">
      <h1 className="display-3">Welcome!</h1>
      <p>This is a MERN stack based fully functioning blog system. Here, you can share your experience and ideas with other people.</p>
      <p><Link className="btn btn-primary btn-lg" to="/posts" role="button">Look the blog posts &raquo;</Link></p>
    </div>

    { /*Example row of columns*/ }
    <div className="row text-justify">
      <div className="col-md-4">
        <h2>Front-end</h2>
        <p>The front-end client is built as a simple-page-application using React and Redux (for middlewares and reducers). Besides, React-Router is used for navigation. Redux-Thunk is used for processing asynchronous requests. Bootstrap 4 is used for page styling.</p>
      </div>
      <div className="col-md-4">
        <h2>Back-end</h2>
        <p>The back-end server is built with Express.js and Node.js in MVC pattern, which provides completed REST APIs for data interaction. Passport.js is used as an authentication middleware in the sever. JSON Web Token (JWT) is used for signing in user and making authenticated requests.</p>
      </div>
      <div className="col-md-4">
        <h2>Database</h2>
        <p>MongoDB is used as the back-end database, which include different data models/schemas (i.e., User, Post and Comment). Mongoose is used to access the MongoDB for CRUD actions (create, read, update and delete).</p>
      </div>
    </div>

  </div>
);