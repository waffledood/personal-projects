import { useEffect, useRef, useState } from "react";

import styles from "./Register.module.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPasswordMatch, setValidPasswordMatch] = useState(false);

  const usernameRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  useEffect(() => {
    setValidPasswordMatch(
      password === confirmPassword && !!password && !!confirmPassword
    );
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // clear username, email & password fields
    setUsername("");
    setEmail("");
    setPassword("");
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You have successfully registered!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section className={styles.section}>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} className={styles.register_form}>
            <div className={styles.input_layout}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                ref={usernameRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
            </div>

            <div className={styles.input_layout}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className={styles.input_layout}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            <div className={styles.input_layout}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>

            <button className={styles.signup} disabled={!validPasswordMatch}>
              Sign Up
            </button>
          </form>

          <p>
            Already registered?
            <br />
            <span>
              {/*put router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Register;
