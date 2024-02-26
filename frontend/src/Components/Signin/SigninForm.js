import { useState } from "react";
import styles from "./Form.module.css";

export default function SigninForm({ setMode }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "account") setAccount(value);
    else if (name === "password") setPassword(value);
  };

  const signinSubmit = () => {};

  return (
    <div className={styles.signuiForm}>
      <div className={styles.signuiTitle}>Sign in</div>
      <form onSubmit={signinSubmit}>
        <div className={styles.inputField}>
          <input
            placeholder="email/username"
            name="account"
            value={account}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputField}>
          <input
            placeholder="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className={styles.signuiButton}>
          SIGN UP
        </button>
        <div
          className={styles.change}
          onClick={() => {
            setMode("signup");
          }}
        >
          Create new account
        </div>
      </form>
    </div>
  );
}
