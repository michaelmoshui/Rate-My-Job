import styles from "./StepThree.module.css";
import RatingStars from "../../Miscellaneous/RatingStars.js/RatingStars";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validNum } from "../helper";

export default function StepThree({ info, setInfo, setStep, reviewType }) {
  const [salary, setSalary] = useState(info.salary);
  const [interview, setInterview] = useState(info.interview);
  const [skill, setSkill] = useState(info.skill);
  const [culture, setCulture] = useState(info.culture);
  const [mentorship, setMentorship] = useState(info.mentorship);

  // missing salary
  const [missing, setMissing] = useState(false);

  const handleNext = (where) => {
    if (where === 4) {
      if (salary.length === 0) {
        setMissing(true);
      } else {
        setMissing(false);
        setInfo((prev) => ({
          ...prev,
          salary: salary,
          interview: interview,
          skill: skill,
          culture: culture,
          mentorship: mentorship,
        }));
        setStep(where);
      }
    } else {
      // we don't really care about missing salary for going back
      setMissing(false);
      setInfo((prev) => ({
        ...prev,
        salary: salary,
        interview: interview,
        skill: skill,
        culture: culture,
        mentorship: mentorship,
      }));
      setStep(where);
    }
  };

  return (
    <div
      className={styles.stepThreeWrap}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          handleNext(4);
        }
      }}
    >
      <div className={styles.stepThreeComp}>
        <div className={styles.title}>{`${
          reviewType === "research"
            ? "Yearly Salary (CAD)"
            : "Total Funding (CAD)"
        }`}</div>
        <input
          autoFocus
          value={salary}
          onChange={(e) => {
            if (validNum(e.target.value, "float")) {
              setSalary(e.target.value);
            }
          }}
        />
        <div className={styles.title}>Skill Building</div>
        <RatingStars
          rating={skill}
          setRating={setSkill}
          small={"2em"}
          big={"2.4em"}
          gap={"2px"}
          clearFont={"16px"}
        />
        <div className={styles.title}>Interview Difficulty</div>
        <RatingStars
          rating={interview}
          setRating={setInterview}
          small={"2em"}
          big={"2.4em"}
          gap={"2px"}
          clearFont={"16px"}
        />
        <div className={styles.title}>Culture</div>
        <RatingStars
          rating={culture}
          setRating={setCulture}
          small={"2em"}
          big={"2.4em"}
          gap={"2px"}
          clearFont={"16px"}
        />
        <div className={styles.title}>Mentor Support</div>
        <RatingStars
          rating={mentorship}
          setRating={setMentorship}
          small={"2em"}
          big={"2.4em"}
          gap={"2px"}
          clearFont={"16px"}
        />
      </div>
      <div className={styles.changeState}>
        <div
          className={styles.arrows}
          onClick={() => {
            handleNext(2);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        </div>
        <span>3 | 4</span>
        <div
          className={styles.arrows}
          onClick={() => {
            handleNext(4);
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} size="2xl" />
        </div>
        {missing && (
          <div className={styles.errorMessage}>Salary must be filled out!</div>
        )}
      </div>
    </div>
  );
}
