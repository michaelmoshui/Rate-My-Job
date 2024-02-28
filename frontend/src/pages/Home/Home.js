import Filter from "../../Components/Home/Filter/Filter";
import Profile from "../../Components/Profile/Profile";
import Searchitem from "../../Components/Home/Searchitem/Searchitem";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./Home.module.css";
import Submit from "../Submit/Submit";
import { useState } from "react";
import Histogram from "../../Components/Miscellaneous/Histogram/Histogram";

export default function Home() {
  const [showSubmit, setShowSubmit] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [reviewType, setReviewType] = useState();

  return (
    <div className={styles.homeWrap}>
      <NavBar
        setShowSubmit={setShowSubmit}
        setReviewType={setReviewType}
        setShowProfile={setShowProfile}
      />
      {/* The search results */}
      <div>
        <Filter />
        <Searchitem />
      </div>
      <Profile setShowProfile={setShowProfile} showProfile={showProfile} />

      {showSubmit && (
        <Submit setShowSubmit={setShowSubmit} reviewType={reviewType} />
      )}
      <Histogram
        data={[3, 8, 5, 12, 7]}
        targetValue={2}
        binWidth={100}
        highlightColor={"blue"}
      />
    </div>
  );
}
