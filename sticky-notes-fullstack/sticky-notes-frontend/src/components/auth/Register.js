import { useEffect, useRef, useState } from "react";

import axios from "../api/axios";

import styles from "./Register.module.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const REGISTER_URL = "/dj-rest-auth/registration/";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPasswordMatch, setValidPasswordMatch] = useState(false);

  const usernameRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, password]);

  useEffect(() => {
    setValidPasswordMatch(
      password === confirmPassword && !!password && !!confirmPassword
    );
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          username,
          email,
          password1: password,
          password2: confirmPassword,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));

      // clear username, email & password fields
      setUsername("");
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      const response = err?.response;

      console.log("response:", response);

      if (!err?.response) {
        setErrMsg("No Server Response");
      }

      switch (response.status) {
        case 400:
          const responseStatusData = response?.data;

          let errorMessage = "";
          Object.keys(responseStatusData).forEach((key) => {
            errorMessage += `${key}: ${responseStatusData[key][0]}\n`;
          });
          setErrMsg(errorMessage);
          break;
        case 401:
          setErrMsg("Unauthorized");
          break;
        default:
          setErrMsg("Login Failed");
      }
    }
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

            <button
              className={styles.signup}
              disabled={!validPasswordMatch || !validUsername || !validEmail}
            >
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
