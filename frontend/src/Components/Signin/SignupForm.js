import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { validEmail, validPassword } from "./helpers";

export default function SignupForm({ setMode }) {
  // all the different fields
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  // see which fields are clicked, if clicked then there is a chance of raising error
  const [clicked, setClicked] = useState({
    email: 0,
    fullName: 0,
    password: 0,
    passwordConf: 0,
  });

  // see which field has error
  const [error, setError] = useState({
    email: "",
    fullName: "",
    password: "",
    passwordConf: "",
  });

  // check error only when field is clicked and unfocused
  const checkError = () => {
    // check full name validity
    if (clicked.fullName === 1) {
      if (fullName.length === 0) {
        setError((prev) => ({ ...prev, fullName: "Full name is required" }));
      } else {
        setError((prev) => ({ ...prev, fullName: "" }));
      }
    }

    // check email validity
    if (clicked.email === 1) {
      if (email.length === 0) {
        setError((prev) => ({ ...prev, email: "Email is required" }));
      } else if (!validEmail(email)) {
        setError((prev) => ({ ...prev, email: "Please enter a valid email" }));
      } else {
        setError((prev) => ({ ...prev, email: "" }));
      }
    }

    // check password validity
    if (clicked.password === 1) {
      if (password.length === 0) {
        setError((prev) => ({ ...prev, password: "Password is required" }));
      } else if (password.length < 8) {
        setError((prev) => ({
          ...prev,
          password: "Password must be at least 8-character long",
        }));
      } else if (!validPassword(password)) {
        console.log("hi");
        setError((prev) => ({
          ...prev,
          password:
            "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, and no spaces",
        }));
      } else {
        setError((prev) => ({ ...prev, password: "" }));
      }
    }
  };

  // check if password matches everytime user clicks confirm password
  const checkConfirmed = () => {
    // check confirmed password
    if (clicked.passwordConf !== 0) {
      if (passwordConf !== password) {
        setError((prev) => ({ ...prev, passwordConf: "Passwords must match" }));
      } else {
        setError((prev) => ({ ...prev, passwordConf: "" }));
      }
    }
  };

  // set signup fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "fullName":
        setFullName(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "passwordConf":
        setPasswordConf(value);
        setClicked((prev) => ({ ...prev, passwordConf: 2 }));
        break;
      default:
        break;
    }
  };

  // set clicked fields
  const handleClicked = (event) => {
    const { name } = event.target;
    switch (name) {
      case "email":
        setClicked((prev) => ({ ...prev, email: 2 }));
        break;
      case "fullName":
        setClicked((prev) => ({ ...prev, fullName: 2 }));
        break;
      case "password":
        setClicked((prev) => ({ ...prev, password: 2 }));
        break;
      case "passwordConf":
        setClicked((prev) => ({ ...prev, passwordConf: 2 }));
        break;
      default:
        break;
    }
  };

  // set blurred fields; blurred fields and invalid field will have error
  const handleBlurred = (event) => {
    const { name } = event.target;
    switch (name) {
      case "email":
        setClicked((prev) => ({ ...prev, email: 1 }));
        break;
      case "fullName":
        setClicked((prev) => ({ ...prev, fullName: 1 }));
        break;
      case "password":
        setClicked((prev) => ({ ...prev, password: 1 }));
        break;
      case "passwordConf":
        setClicked((prev) => ({ ...prev, passwordConf: 1 }));
        break;
      default:
        break;
    }
  };

  // handle signup submit
  const signupSubmit = () => {};

  // run check error whenever a clicked/blur event happens
  useEffect(() => {
    checkError();
  }, [clicked]);

  // run check confirmed password whenever confirming password
  useEffect(() => {
    checkConfirmed();
  }, [passwordConf, clicked.passwordConf]);

  return (
    <div className={styles.signuiForm}>
      <div className={styles.signuiTitle}>Sign up now.</div>
      <form onSubmit={signupSubmit}>
        <div className={styles.inputField}>
          <input
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleInputChange}
            onClick={handleClicked}
            onBlur={handleBlurred}
          />
          <div className={styles.errorMessage}>{error.email}</div>
        </div>
        <div className={styles.inputField}>
          <input
            placeholder="Full Name"
            name="fullName"
            value={fullName}
            onChange={handleInputChange}
            onClick={handleClicked}
            onBlur={handleBlurred}
          />
          <div className={styles.errorMessage}>{error.fullName}</div>
        </div>
        <div className={styles.inputField}>
          <input
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
            onClick={handleClicked}
            onBlur={handleBlurred}
          />
          <div className={styles.errorMessage}>{error.password}</div>
        </div>
        <div className={styles.inputField}>
          <input
            placeholder="Confirm Password"
            name="passwordConf"
            value={passwordConf}
            onChange={handleInputChange}
            onClick={handleClicked}
            onBlur={handleBlurred}
          />
          <div className={styles.errorMessage}>{error.passwordConf}</div>
        </div>
        <button type="submit" className={styles.signuiButton}>
          SIGN UP
        </button>
      </form>
      <div
        className={styles.change}
        onClick={() => {
          setMode("signin");
        }}
      >
        Sign in with existing account
      </div>
    </div>
  );
}
