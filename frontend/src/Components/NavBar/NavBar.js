import SearchBar from "./SearchBar";
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function NavBar({
  setShowSubmit,
  setReviewType,
  setShowProfile,
}) {
  return (
    <div className={styles.navbarWrap}>
      <div>{/* This is an empty div for space filling */}</div>
      <div className={styles.navbarItem}>
        <SearchBar />
      </div>
      <div className={styles.navbarItem}>
        <button
          className={styles.submitButton}
          onClick={() => {
            setShowSubmit((prev) => !prev);
            setReviewType("job");
          }}
        >
          Job Review
        </button>
        <button
          className={styles.submitButton}
          onClick={() => {
            setShowSubmit((prev) => !prev);
            setReviewType("research");
          }}
        >
          Research Review
        </button>
        <button
          className={styles.account}
          onClick={() => {
            setShowProfile((prev) => !prev);
          }}
        >
          <FontAwesomeIcon icon={faUser} size="xl" />
        </button>
      </div>
    </div>
  );
}
