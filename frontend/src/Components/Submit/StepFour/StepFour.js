import styles from "./StepFour.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function StepFour({ info, setInfo, setStep }) {
  const [missing, setMissing] = useState(null);

  const handleSubmit = () => {
    if (
      info.location.length === 0 ||
      info.company.length === 0 ||
      info.jobTitle.lenght === 0
    ) {
      setMissing(
        "You are missing crucial detail! Please go back and check your review."
      );
    } else if (
      info.overall.reduce((a, b) => a + b) < 1 &&
      info.additional.length === 0
    ) {
      setMissing("Please explain your overall rating.");
    } else if (
      info.skill.reduce((a, b) => a + b) < 1 &&
      info.culture.reduce((a, b) => a + b) < 1 &&
      info.mentorship.reduce((a, b) => a + b) < 1 &&
      info.additional.length === 0
    ) {
      setMissing("Please explain your specific ratings.");
    } else {
      console.log(info);
    }
  };

  return (
    <div className={styles.stepFourWrap}>
      <div className={styles.comment}>
        <div className={styles.title}>Additional comments?</div>
        <textarea
          rows={12}
          cols={50}
          onChange={(event) => {
            setInfo((prev) => ({ ...prev, additional: event.target.value }));
          }}
        />
      </div>
      <div className={styles.changeState}>
        <div
          className={styles.arrows}
          onClick={() => {
            setStep(3);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        </div>
        <span>4 | 4</span>
        <div className={styles.arrows} onClick={handleSubmit}>
          <FontAwesomeIcon icon={faArrowRight} size="2xl" />
        </div>
        {missing && <div className={styles.errorMessage}>{missing}</div>}
      </div>
    </div>
  );
}
