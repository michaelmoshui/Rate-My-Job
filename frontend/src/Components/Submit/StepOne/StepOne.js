/////////////////////////////////////////////////////
// Probably the most complex frontend Component (excluding the graphics)
/////////////////////////////////////////////////////
import styles from "./StepOne.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { validNum } from "../helper";

// for testing
import { locations } from "../../../Testing/SubmitTesting";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../../../helper/ClickOutside";

export default function StepOne({
  info,
  setInfo,
  // control state
  setStep,
  setShowSubmit,
  reviewType,
}) {
  // missing info?
  const [missing, setMissing] = useState(false);

  // for the delay
  const [timeId, setTimeId] = useState(null);

  // show dropdown [field, show or not]
  const [dropdown, setDropdown] = useState(false);
  // for determining which dropdown to show
  const [choice, setChoice] = useState("");

  // referencing different fields
  const companyRef = useRef(null);
  const jobRef = useRef(null);
  const termMonthRef = useRef(null);
  const termYearRef = useRef(null);
  const workRef = useRef(null);
  const durationRef = useRef(null);

  // are you focused? This is weird, has state 0, 1, and 2
  // not necessary, but 0 means not focused, 1 means focused but typing (so display dropdown), 2 means don't display dropdown
  // better understanding
  const [focus, setFocus] = useState(0);

  // dropdown ref
  const dropRef = useRef(null);

  // click outside of inputs to unfocus
  useClickOutside(dropRef, () => {
    setDropdown(false);
    setFocus(1);
  });

  // if we don't want dropdown, no dropdown
  // this is called in the cases when user switch to a different input really fast, so no dropdown from the previous one, even though the previous one might appear due to the timeout delay
  useEffect(() => {
    if (focus === 2) {
      setDropdown(false);
    }
  }, [dropdown]);

  const handleInputChange = (event) => {
    // clear dropdown and dropdown wait when typing
    setDropdown(false);
    setFocus(1);
    clearTimeout(timeId);

    // extract info; name is field, value is the input
    // fill in the type in choice
    const { name, value } = event.target;
    setChoice(name);
    switch (name) {
      case "location":
        setInfo((prev) => ({
          ...prev,
          location: value,
          company: "",
          jobTitle: "",
        }));
        break;
      case "company":
        setInfo((prev) => ({
          ...prev,
          company: value,
          jobTitle: "",
        }));
        break;
      case "jobTitle":
        setInfo((prev) => ({ ...prev, jobTitle: value }));
        break;
      case "termMonth":
        if (validNum(value, "int"))
          if ((parseInt(value) <= 12 && parseInt(value) > 0) || value === "")
            setInfo((prev) => ({ ...prev, term: [value, prev.term[1]] }));
        break;
      case "termYear":
        if (validNum(value, "int"))
          setInfo((prev) => ({ ...prev, term: [prev.term[0], value] }));
        break;
      case "workNum":
        if (validNum(value, "int"))
          setInfo((prev) => ({ ...prev, workNum: value }));
        break;
      case "duration":
        if (validNum(value, "int"))
          setInfo((prev) => ({ ...prev, duration: value }));
        break;
      default:
        break;
    }

    // wait for one second, then show the dropdown list
    setTimeId(
      setTimeout(() => {
        setDropdown(true);
      }, 500)
    );
  };

  const handleNext = () => {
    if (
      info.location === "" ||
      info.company === "" ||
      info.jobTitle === "" ||
      info.term[0] === "" ||
      info.term[1] === "" ||
      info.year === "" ||
      info.duration === ""
    ) {
      setMissing(true);
    } else {
      setMissing(false);
      setStep(2);
    }
  };

  return (
    <div className={styles.stepOneWrap}>
      <div className={styles.title}>Submit a Review</div>
      <div className={styles.stepOneComp}>
        <div className={styles.inputField}>
          <input
            autoFocus
            placeholder="Location . . ."
            name="location"
            value={info.location}
            onChange={handleInputChange}
            onFocus={() => {
              setDropdown(false);
              setFocus(2);
            }}
            /*This is to handle clicking the enter key*/
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                setDropdown(false);
                setFocus(2);
                companyRef.current.focus();
              } else if (event.code === "Tab") {
                setDropdown(false);
                setFocus(2);
              }
            }}
          />
          {info.location && choice === "location" && dropdown && (
            <div className={styles.dropdown} ref={dropRef}>
              {locations.map((loc, ind) => {
                return (
                  <span
                    className={styles.dropdownItem}
                    key={`Location ${ind}`}
                    onClick={(event) => {
                      setInfo((prev) => ({
                        ...prev,
                        location: event.target.innerText,
                        company: "",
                        jobTitle: "",
                      }));
                      setDropdown(false);
                      setFocus(2);
                      companyRef.current.focus();
                    }}
                  >
                    {loc}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.inputField}>
          <input
            placeholder={`${
              reviewType === "research" ? "Research Group" : "Company"
            } . . .`}
            name="company"
            value={info.company}
            onChange={handleInputChange}
            ref={companyRef}
            onFocus={() => {
              setDropdown(false);
              setFocus(2);
            }}
            /*This is to handle clicking the enter key*/
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                setDropdown(false);
                setFocus(2);
                jobRef.current.focus();
              } else if (event.code === "Tab") {
                setDropdown(false);
                setFocus(2);
              }
            }}
          />
          {info.company && choice === "company" && dropdown && (
            <div className={styles.dropdown} ref={dropRef}>
              {locations.map((company, ind) => {
                return (
                  <span
                    className={styles.dropdownItem}
                    key={`Company ${ind}`}
                    onClick={(event) => {
                      setInfo((prev) => ({
                        ...prev,
                        company: event.target.innerText,
                        jobTitle: "",
                      }));
                      setDropdown(false);
                      setFocus(2);
                      jobRef.current.focus();
                    }}
                  >
                    {company}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.inputField}>
          <input
            placeholder={`${
              reviewType === "research" ? "Research" : "Job"
            } Title . . .`}
            name="jobTitle"
            value={info.jobTitle}
            onChange={handleInputChange}
            ref={jobRef}
            onFocus={() => {
              setDropdown(false);
              setFocus(2);
            }}
            /*This is to handle clicking the enter key*/
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                setDropdown(false);
                setFocus(2);
                termMonthRef.current.focus();
              } else if (event.code === "Tab") {
                setDropdown(false);
                setFocus(2);
              }
            }}
          />
          {info.jobTitle && choice === "jobTitle" && dropdown && (
            <div className={styles.dropdown} ref={dropRef}>
              {locations.map((job, ind) => {
                return (
                  <span
                    className={styles.dropdownItem}
                    key={`Job ${ind}`}
                    onClick={(event) => {
                      setInfo((prev) => ({
                        ...prev,
                        jobTitle: event.target.innerText,
                      }));
                      setDropdown(false);
                      setFocus(0);
                    }}
                  >
                    {job}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.startDate}>
          <div className={styles.inputField}>
            <input
              placeholder="Start Month"
              name="termMonth"
              value={info.term[0]}
              onChange={handleInputChange}
              ref={termMonthRef}
              /*This is to handle clicking the enter key*/
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  setFocus(2);
                  termYearRef.current.focus();
                }
              }}
            />
          </div>
          <div className={styles.inputField}>
            <input
              placeholder="Start Year"
              name="termYear"
              value={info.term[1]}
              onChange={handleInputChange}
              ref={termYearRef}
              /*This is to handle clicking the enter key*/
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  setFocus(2);
                  workRef.current.focus();
                }
              }}
            />
          </div>
        </div>

        <div className={styles.inputField}>
          <input
            placeholder="# of previous work terms"
            name="workNum"
            value={info.workNum}
            onChange={handleInputChange}
            ref={workRef}
            /*This is to handle clicking the enter key*/
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                setFocus(2);
                durationRef.current.focus();
              } else if (event.code === "Tab") {
                setDropdown(false);
                setFocus(2);
              }
            }}
          />
        </div>
        <div className={styles.inputField}>
          <input
            placeholder="Duration (Months) . . ."
            name="duration"
            value={info.duration}
            onChange={handleInputChange}
            ref={durationRef}
            /*This is to handle clicking the enter key*/
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                setFocus(0);
                handleNext();
              }
            }}
          />
        </div>
      </div>
      <div className={styles.changeState}>
        <div
          className={styles.arrows}
          onClick={() => {
            setShowSubmit(false);
          }}
        >
          <FontAwesomeIcon icon={faXmark} size="2xl" />
        </div>
        <span>1 | 4</span>
        <div className={styles.arrows} onClick={handleNext}>
          <FontAwesomeIcon icon={faArrowRight} size="2xl" />
        </div>
        {missing && (
          <div className={styles.errorMessage}>
            All fields must be filled out!
          </div>
        )}
      </div>
    </div>
  );
}
