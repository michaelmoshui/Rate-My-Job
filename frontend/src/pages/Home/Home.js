import Filter from "../../Components/Home/Filter/Filter";
import Profile from "../../Components/Profile/Profile";
import Searchitem from "../../Components/Home/Searchitem/Searchitem";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./Home.module.css";
import Submit from "../Submit/Submit";
import { useState } from "react";

export default function Home() {
  const [showSubmit, setShowSubmit] = useState(false);
  const [reviewType, setReviewType] = useState();

  return (
    <div className={styles.homeWrap}>
      <NavBar setShowSubmit={setShowSubmit} setReviewType={setReviewType} />
      {/* The search results */}
      <div>
        <Filter />
        <Searchitem />
      </div>
      <Profile />
      {showSubmit && (
        <Submit setShowSubmit={setShowSubmit} reviewType={reviewType} />
      )}
    </div>
  );
}
