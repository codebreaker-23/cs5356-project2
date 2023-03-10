import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListQuestions from "./../components/ListQuestions";
import CreateQuestion from "./../components/CreateQuestion";

/**
 * CS-5356-TODO
 * Allow users to ask questions, and view
 * other questions in the class session.
 *
 * When this component first loads, grab the questions
 * for this session code by making a
 * GET /api/class-session/:session-code request
 *
 * If it is successful, save the questions from the request
 * into the state.
 *
 * If a user submits a question or a question on the list
 * is upvoted, reload the latest questions from the server
 */
const ClassSessionPage = props => {
  const [questions, setQuestions] = useState([]);
  const { sessionCode } = useParams();

  const onQuestionCreated = () => {
    console.log("[CS5356] On question created");
  };

  const onQuestionUpvoted = () => {
    console.log("[CS5356] On question upvoted");
  };

  return (
    <section>
      <div className="container">
        <CreateQuestion
          sessionCode={sessionCode}
          onQuestionCreated={onQuestionCreated}
        />
      </div>
      <div className="container">
        <ListQuestions
          sessionCode={sessionCode}
          questions={questions}
          isSignedIn={false}
          onQuestionUpvoted={onQuestionUpvoted}
        />
      </div>
    </section>
  );
};

export default ClassSessionPage;
