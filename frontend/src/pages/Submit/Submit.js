import { useRef, useState } from "react";
import StepOne from "../../Components/Submit/StepOne/StepOne";
import styles from "./Submit.module.css";
import StepTwo from "../../Components/Submit/StepTwo/StepTwo";
import StepThree from "../../Components/Submit/StepThree/StepThree";
import StepFour from "../../Components/Submit/StepFour/StepFour";
import useClickOutside from "../../helper/ClickOutside";

export default function Submit({ setShowSubmit, reviewType }) {
  // control state
  const [step, setStep] = useState(1);

  // the fields
  const [info, setInfo] = useState({
    location: "",
    company: "",
    jobTitle: "",
    overall: [0, 0, 0, 0, 0],
    salary: "",
    skill: [0, 0, 0, 0, 0],
    interview: [0, 0, 0, 0, 0],
    culture: [0, 0, 0, 0, 0],
    mentorship: [0, 0, 0, 0, 0],
    additional: "",
    term: ["", ""],
    workNum: "",
    duration: "",
  });

  // submit ref
  const subRef = useRef(null);

  useClickOutside(subRef, () => {
    setShowSubmit(false);
  });

  return (
    <div className={styles.bigWrap}>
      <div className={styles.submitWrap} ref={subRef}>
        {step === 4 ? (
          <StepFour
            setShowSubmit={setShowSubmit}
            info={info}
            setInfo={setInfo}
            setStep={setStep}
            reviewType={reviewType}
          />
        ) : step === 3 ? (
          <StepThree
            setStep={setStep}
            setShowSubmit={setShowSubmit}
            info={info}
            setInfo={setInfo}
            reviewType={reviewType}
          />
        ) : step === 2 ? (
          <StepTwo
            setStep={setStep}
            setShowSubmit={setShowSubmit}
            info={info}
            setInfo={setInfo}
            reviewType={reviewType}
          />
        ) : (
          <StepOne
            setStep={setStep}
            setShowSubmit={setShowSubmit}
            info={info}
            setInfo={setInfo}
            reviewType={reviewType}
          />
        )}
      </div>
    </div>
  );
}
