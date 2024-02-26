import styles from "./Signin.module.css";
import SigninForm from "../../Components/Signin/SigninForm";
import SignupForm from "../../Components/Signin/SignupForm";
import { useState } from "react";

export default function Signin() {
  const [mode, setMode] = useState("signup");
  return (
    <div className={styles.signinWrap}>
      {mode === "signup" ? (
        <SignupForm setMode={setMode} />
      ) : (
        <SigninForm setMode={setMode} />
      )}
    </div>
  );
}
