import { useNavigate } from "react-router-dom";

/**
 *
 * CS-5356 Login Page
 *
 * We're going to use a "mock" login system, so
 * all we need the user to provide is a username.
 *
 * Once they've filled in the username, they should
 * click Submit, at which point, we log the user in and
 * redirect them
 */
const LoginPage = props => {
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: e.target.username.value })
    });
    if (response.ok) {
      props.onLogin();
      navigate('/instructor-home');
    }else{
      console.log('Failed to Login');
    }
    /**
     * CS-5356
     *
     * Log the user in. Grab the value from the username input element
     * and send it in an object to POST /api/login
     *
     * When it responds with a 200 OK, call `props.onLogin()` to have App
     * update your sign-in status, and then call `navigate('/instructor-home')`
     * to go to the /instructor-home page
     */
  };
  return (
    <section className="hero">
      <div className="container hero-body">
        <h1 className="title">Login to Class Questions</h1>
        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="username"> Username</label>
          <input type="text" name="username" />
          <label className="label" htmlFor="password">
            Password
          </label>
          <div>Anonymous access while in prototype mode</div>
          <div><input type="submit" value="Log in" /></div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
