import styles from "./StepFour.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

export default function StepFour({ info, setInfo, setStep, setShowSubmit }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (
        info.location.length === 0 ||
        info.company.length === 0 ||
        info.jobTitle.lenght === 0
      ) {
        setError(
          "You are missing crucial detail! Please go back and check your review."
        );
        setLoading(false);
      } else if (
        info.overall.reduce((a, b) => a + b) < 1 &&
        info.additional.length === 0
      ) {
        setError("Please explain your overall rating.");
        setLoading(false);
      } else if (
        info.skill.reduce((a, b) => a + b) < 1 &&
        info.culture.reduce((a, b) => a + b) < 1 &&
        info.mentorship.reduce((a, b) => a + b) < 1 &&
        info.additional.length === 0
      ) {
        setError("Please explain your specific ratings.");
        setLoading(false);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signin`, info);
        setError(null);
        setLoading(false);
        setShowSubmit(false);
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
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
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  );
}
