import styles from "./StepTwo.module.css";
import RatingStars from "../../Miscellaneous/RatingStars.js/RatingStars";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StepTwo({ info, setInfo, setStep }) {
  const [rating, setRating] = useState(info?.overall);

  const handleNext = () => {
    setInfo((prev) => ({ ...prev, overall: rating }));
    setStep(3);
  };

  return (
    <div
      className={styles.stepTwoWrap}
      // need these to click enter and go to the next page
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          handleNext();
        }
      }}
    >
      <div className={styles.stepTwoComp}>
        <div className={styles.title}>Overall Rating</div>
        <RatingStars
          rating={rating}
          setRating={setRating}
          small={"2.8em"}
          big={"3.2em"}
          clearFont={"20px"}
          gap={"16px"}
        />
      </div>
      <div className={styles.changeState}>
        <div
          className={styles.arrows}
          onClick={() => {
            setInfo((prev) => ({ ...prev, overall: rating }));
            setStep(1);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        </div>
        <span>2 | 4</span>
        <div className={styles.arrows} onClick={handleNext}>
          <FontAwesomeIcon icon={faArrowRight} size="2xl" />
        </div>
      </div>
    </div>
  );
}
