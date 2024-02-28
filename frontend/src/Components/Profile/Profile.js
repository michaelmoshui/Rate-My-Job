import styles from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Profile({ showProfile, setShowProfile }) {
  console.log(showProfile);
  return (
    <div
      className={`${styles.profileWrap} ${showProfile ? styles.visible : ""}`}
    >
      <div
        className={styles.backIconWrap}
        onClick={() => {
          setShowProfile(false);
        }}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          size="xl"
          className={styles.backIcon}
        />
      </div>
      <div className={styles.name}>Hello, Michael</div>
      <div className={styles.personalInfo}></div>
      <div className={styles.changePassword}></div>
      <div className={styles.searchHistory}></div>
    </div>
  );
}
