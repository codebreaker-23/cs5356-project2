let database = {
  classes: [],
  classSessions: [],
};

let id=0;

const generateId = () => {
  id+=1;
  return id.toString();
}

export const getQuestions = sessionCode => {
  const session = database.classSessions.find(sess => sess.id === sessionCode);
  return session.questions;
};

export const getClasses = (owner) => database.classes.filter(value => value.owner === owner)

export const getSessions = (sessId) => database.classSessions.filter(sess => sess.id === sessId)

export const createQuestionForSession = (sessionCode, q) => {
  const session = database.classSessions.find(sess => sess.id === sessionCode);
  if(!session){
    return null;
  }
  const entity = {id: generateId(), question: q.question, name: q.name, upvotes: 0};

  session.questions.push(entity);
  return entity;
};

export const createSessionCodeForClass = (cId) => {
  const classObj = database.classes.find(c => c.id === cId);
  if(!classObj){
    return null;
  }
  const session = {id: generateId(), 
    classId : cId,
    createdAt: new Date().toLocaleString(),
    questions: []};

  database.classSessions.push(session);
  classObj.sessionCodes.push(session);
  return session;
};

export const createClass = classData => {
  const entity = {id: generateId(), 
    name: classData.name, 
    owner: classData.owner ? classData.owner : null,
    sessionCodes: []
  };
  database.classes.push(entity);
  return entity;
};

export const clear = () => {
  database = {
    classes: [],
    classSessions: [],
  };
  id=0;
};

export const upvoteQuestionForSession = (sessId, questionId) => {
  const session = database.classSessions.find(sess => sess.id === sessId);
  if(!session){
    return null;
  }
  const question = session.questions.find(que => que.id === questionId);
  if(!question){
    return null;
  }
  question.upvotes += 1; 
  return question;
}
