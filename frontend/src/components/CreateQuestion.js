/**
 * CS-5356
 * Create a question for a class session
 *
 * A user can provide the content of their question,
 * and their name. When they submit the form, make a
 * POST /api/class-session/:session-code/question
 * with the value of their inputs in the body of
 * the request.
 *
 * If it is successful, call `props.onQuestionCreated()`
 * to tell the parent component to refresh the view
 */
const CreateQuestion = props => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("[CS5356] on create question form submitted");
    fetch('/api/class-session/' + props.sessionCode + '/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: e.target.question.value,
        name: e.target.id.value,
    })
    }).then(response => {
      if(response.ok){
        props.onQuestionCreated();
      }else{
        response.json().then(data => console.log(data));
      }
    })
  };
  return (
    <>
      <div className="has-text-centered">
        <h1 className="title">Ask a Question</h1>
      </div>
      <form
        className="is-flex is-flex-direction-column is-align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="field" style={{ width: "50%" }}>
          <label className="label" htmlFor="question">
            Type your question
          </label>
          <div className="control">
            <input type="text" name="question" />
          </div>
        </div>
        <div className="field" style={{ width: "50%" }}>
          <label className="label" htmlFor="name">
            Name (optional)
          </label>
          <input type="text" name="id" />
        </div>

        <div className="field">
          <div className="control">
            <input type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateQuestion;
