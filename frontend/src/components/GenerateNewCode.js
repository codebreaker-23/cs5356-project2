/**
 * CS-5356
 * Logged in users can click a button to generate a new
 * session code.
 *
 * When a user clicks the button, send a request to
 * POST /api/class/:classId/session-code. If it returns
 * successfully, call the `props.onCodeGenerated` callback
 * to tell the parent component to refresh the view
 */
const GenerateNewCode = props => {
  const generateCode = async(e) => {
    e.preventDefault();
    const res = await fetch('/api/class/' + props.classId + '/session-code', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      props.onCodeGenerated();
    }
    else {
      const data = await res.json();
      console.log('error: ' + data.status);
      console.log(data);
    }
  };
  return (
    <div className="mt-5">
      <button className="button" onClick={generateCode} >Generate New Code</button>
    </div>
  );
};

export default GenerateNewCode;
