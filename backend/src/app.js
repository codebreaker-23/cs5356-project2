import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";
import * as db from "./database.js";

const app = express();
app.use(
  cookieSession({
    secret: "cookiesecret",
    signed: false,
    name: '__session'
  })
);
app.use(cookieParser());
app.use(cors());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api/class-session/:sessionCode", (req, res) => {
  /**
   * CS-5356-TODO
   * Get a Class Session by Session Code
   *
   * Using `db`, find the class session using the session code, and return:
   * 200 OK - with an object containing the questions for that class session
   * 404 Not Found - when there is no class session with that code
   *
   * All users should have access
   */
  const sessCode = req.params.sessionCode;

  const sess = db.getSessions(sessCode); 

  if(!sess || (sess.length === 0)){
    res.status(404).send({ message: "No session found" });  
    return;
  }

  res.status(200).send(sess[0]);
});

app.post("/api/class-session/:sessionCode/question", (req, res) => {
  /**
   * CS-5356-TODO
   * Create a Question for a Class Session by Session Code
   *
   * Using `db`, find the class session using the session code, and
   * add a new question to the list.
   *
   * Return:
   * 201 Created - with the new question object
   * 404 Not Found - when there is no class session with that code
   *
   * All users should have access
   */
  const sessCode = req.params.sessionCode;

  const sess = db.getSessions(sessCode); 
  if(!sess || sess.length === 0){
    res.status(404).send({ message: "No session found" });  
    return;
  }

  const question = db.createQuestionForSession(sessCode, {question: req.body.question , name: req.body.name});
  res.status(201).send(question);
});

app.put(
  "/api/class-session/:sessionCode/question/:questionId/upvote",
  (req, res) => {
    /**
     * CS-5356-TODO
     * Upvote a question in a session
     *
     * Using `db`, find the class session using the session code, and
     * then find the question using the question id. Increase the amount
     * of question.upvote by 1.
     *
     * Return:
     * 201 Created - with the updated question object
     * 404 Not Found - when there is no class session with that code, or no question
     *   with that id was found
     *
     * All users should have access
     */
    const sessCode = req.params.sessionCode;

    const sess = db.getSessions(sessCode); 
    if(!sess || sess.length === 0){
      res.status(404).send({ message: "No session found" });  
      return;
    }

    const qId = req.params.questionId;
    const question = db.getQuestions(sessCode).filter(q => q.id === qId);
    if(!question || question.length === 0){
      res.status(404).send({ message: "No question found" });  
      return;
    }
    const upvote = db.upvoteQuestionForSession(sessCode, qId);
    res.status(201).send(upvote);
  }
);

app.post("/api/class/:classId/session-code", (req, res) => {
  /**
   * CS-5356-TODO
   * Create a new Class Session for a Class
   *
   * Using `db`, find the class using the class id, and
   * add  a new session to the class
   *
   * Return:
   * 201 Created - with the new class session object
   * 401 Unauthorized - if user is not allowed to access. Only the
   *   owner of the class should be able to create a new class session
   * 404 Not Found - when there is no class with that id
   */
  const { username } = req.session;
  if(!username){
    res.status(401).send({message: 'Unauthorized: Username missing'});
    return;
  }

  const {classId} = req.params;
  const classWithId = db.getClasses(username).filter(val => val.id === classId);

  if(!classWithId || classWithId.length === 0){
    res.status(404).send({message: 'Bad Request: Class not found'});
    return;
  }

  if(classWithId[0].owner !== username){
    res.status(401).send({message: 'Unauthorized: User not the owner'});
    return;

  }
  const sess = db.createSessionCodeForClass(classId);
  res.status(201).send(sess);
});

app.get("/api/classes", (req, res) => {
  /**
   * CS-5356-TODO
   * List all classes that belong to the current user
   *
   * Using `db`, find all the classes that belong to the
   * current user, and return it
   *
   * Return:
   * 200 OK - with an array of all the classes. Should return an empty array
   *   if user has no classes yet.
   * 401 Unauthorized - when there is no current user
   *
   * Users should only see their own classes, and not those belonging to
   * other users
   */
  const { username } = req.session;
  if(!username){
    res.status(401).send({message: 'Unauthorized'});
    return;
  }
  const classes = db.getClasses(username);
  res.status(200).send({classes});
});

app.post("/api/classes", (req, res) => {
  /**
   * CS-5356-TODO
   * Create a new Class
   *
   * Using `db`, create a new class using the provided name and add
   * to the list of classes
   *
   * Return:
   * 201 Created - with the new class object
   * 400 Bad Request - when the request body is missing the name field
   * 401 Unauthorized - Only signed in users should be able to create a class
   *
   */
  const { username } = req.session;
  if(!username){
    res.status(401).send({message: 'Unauthorized'});
    return;
  }
  
  const classname = req.body.name;
  if(!classname){
    res.status(400).send({status: 'Bad Request', message: 'class name missing'});
    return;
  }
  
  const pushClass = db.createClass({name: classname, owner: username});
  res.status(201).send(pushClass);
});

app.post("/api/login", (req, res) => {
  /**
   * CS-5356-TODO
   * Login the user using our mock login
   *
   * Only a username is provided for our mock login system.
   * Get the username from the request body and to a cookie
   * session to begin their logged in session.
   *
   * Return:
   * 200 OK - no body
   * 401 Unauthorized - when no username is provided
   *
   */
  const uname = req.body.username;
  if(!uname){
    res.status(400).send({ message: "Username missing" });
    return;
  }

  req.session.username = uname;
  res.status(200).send();
});

app.get("/api/logout", (req, res) => {
  /**
   * CS-5356-TODO
   * Logout
   *
   * Log the current user out by deleting their cookie session
   *
   * Return:
   * 200 OK - no body
   *
   */
  if(!req.session.username){
    res.status(401).send({ message: "Unauthorized Access" });
    return;
  }

  req.session.username = null;
  res.status(200).send({ message: "Succesfully logged out" });
});

app.get("/api/user", (req, res) => {
  /**
   * CS-5356-TODO
   * Get the current user
   *
   * Get the current user's info by reading their username from
   * their cookie session.
   *
   * Return:
   * 200 OK - when there is a current user based on the cookie session
   * 400 Bad Request - when the username field is missing from the body
   * 401 Unauthorized - when there is no current user
   *
   */
  const uname = req.session.username;
  if(!uname){
    res.status(401).send({ message: "Unauthorized Access" });
    return;
  }

  res.status(200).send({username: uname});
});

export default app;
