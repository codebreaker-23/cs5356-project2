/**
 * CS-5356-TODO
 * Show a question and upvote/dismiss it
 *
 * When a user clicks on the Upvote button,
 * make a PUT /api/class-session/:session-code/question/:question-id
 * to upvote the question.
 *
 * Only signed-in users should be able to dismiss the question
 *
 * If it completes successfully, call `props.onQuestionUpvoted()`
 * to tell the parent component to refresh the view
 */
const ShowQuestion = props => {
  const handleUpvote = questionId => {
    console.log("Upvoting questionId", questionId);
  };

  return (
    <div
      style={{
        borderTop: "1px solid darkgrey",
        paddingTop: "15px",
        paddingBottom: "15px",
        display: "flex",
      }}
    >
      <div>
        <button
          className="button"
          onClick={() => handleUpvote(props.question.id)}
        >
          <i className="material-icons">recommend</i>
        </button>
      </div>
      <div style={{ marginLeft: "15px" }}>
        {props.question.question}
        <br />
        by {props.question.name}{" "}
        {props.question.upvotes ? `Votes: (${props.question.upvotes})` : ""}
      </div>
      {props.isSignedIn && (
        <div style={{ marginLeft: "auto" }}>
          <button className="button is-danger">Dismiss</button>
        </div>
      )}
    </div>
  );
};

export default ShowQuestion;
