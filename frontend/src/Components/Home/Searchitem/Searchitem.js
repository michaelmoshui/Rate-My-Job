import RatingRing from "../../Miscellaneous/RatingRing/RatingRing.js";
import styles from "./Searchitem.module.css";

export default function Searchitem() {
  return (
    <div className={styles.searchItemWrap}>
      <div>
        <div className={styles.title}>Title</div>
        <div className={styles.company}>Company Name</div>
      </div>
      <div className={styles.overview}>
        <div className={styles.overviewItem}>
          <span>Overall</span>
          <RatingRing rating={3.3} radius={80} color="var(--color-primary)" />
        </div>
        <div className={styles.overviewItem}>
          <span>Skill Building</span>
          <RatingRing rating={4} radius={80} color="var(--color-primary)" />
        </div>
        <div className={styles.overviewItem}>
          <span>Salary</span>
        </div>
      </div>
      <button className={styles.learnMoreButton}>Learn More</button>
    </div>
  );
}
