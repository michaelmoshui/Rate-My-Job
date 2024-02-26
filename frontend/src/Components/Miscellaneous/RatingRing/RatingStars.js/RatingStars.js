import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./RatingStars.module.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as ReFaStar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

export default function RatingStars({
  rating,
  setRating,
  small,
  big,
  clearFont,
  gap,
}) {
  const [canChange, setCanChange] = useState(true);
  const [hover, setHover] = useState(false);

  // for determining half star or full star
  const halfOrFull = (position, tot) => {
    if (position * 2 < tot) {
      return "half";
    } else {
      return "full";
    }
  };

  // for determining how many stars if in between stars, aka blank positions
  const blankPos = (position, tot) => {
    const intervalLength = tot / 11;
    if (position <= intervalLength) {
      setRating([0, 0, 0, 0, 0]);
    } else if (position <= intervalLength * 3) {
      setRating([1, 0, 0, 0, 0]);
    } else if (position <= intervalLength * 5) {
      setRating([1, 1, 0, 0, 0]);
    } else if (position <= intervalLength * 7) {
      setRating([1, 1, 1, 0, 0]);
    } else if (position <= intervalLength * 9) {
      setRating([1, 1, 1, 1, 0]);
    } else if (position <= intervalLength * 11) {
      setRating([1, 1, 1, 1, 1]);
    }
  };

  // set the rating based on different clicks
  const getRating = (event) => {
    event.stopPropagation();
    if (canChange) {
      if (event.target.id === "1") {
        if (
          halfOrFull(
            event.nativeEvent.offsetX,
            event.target.width.baseVal.value
          ) === "half"
        ) {
          setRating([0.5, 0, 0, 0, 0]);
        } else {
          setRating([1, 0, 0, 0, 0]);
        }
      } else if (event.target.id === "2") {
        if (
          halfOrFull(
            event.nativeEvent.offsetX,
            event.target.width.baseVal.value
          ) === "half"
        ) {
          setRating([1, 0.5, 0, 0, 0]);
        } else {
          setRating([1, 1, 0, 0, 0]);
        }
      } else if (event.target.id === "3") {
        if (
          halfOrFull(
            event.nativeEvent.offsetX,
            event.target.width.baseVal.value
          ) === "half"
        ) {
          setRating([1, 1, 0.5, 0, 0]);
        } else {
          setRating([1, 1, 1, 0, 0]);
        }
      } else if (event.target.id === "4") {
        if (
          halfOrFull(
            event.nativeEvent.offsetX,
            event.target.width.baseVal.value
          ) === "half"
        ) {
          setRating([1, 1, 1, 0.5, 0]);
        } else {
          setRating([1, 1, 1, 1, 0]);
        }
      } else if (event.target.id === "5") {
        if (
          halfOrFull(
            event.nativeEvent.offsetX,
            event.target.width.baseVal.value
          ) === "half"
        ) {
          setRating([1, 1, 1, 1, 0.5]);
        } else {
          setRating([1, 1, 1, 1, 1]);
        }
      } else {
        blankPos(event.nativeEvent.offsetX, event.currentTarget.offsetWidth);
      }
    }
  };

  return (
    <div className={styles.ratingWrap} style={{ gap: gap }}>
      <div
        className={styles.starWrap}
        onClick={(e) => {
          setCanChange(false);
          getRating(e);
        }}
        onMouseOver={(e) => {
          if (canChange) {
            setHover(true);
            getRating(e);
          }
        }}
        onMouseLeave={(e) => {
          setHover(false);
          if (canChange) {
            setRating([0, 0, 0, 0, 0]);
          }
        }}
      >
        {rating?.map((rat, ind) => {
          if (rat === 1) {
            return (
              <FontAwesomeIcon
                color="rgb(216, 184, 0)"
                icon={faStar}
                className={styles.star}
                style={{
                  fontSize: `${!hover && canChange ? small : big}`,
                }}
                id={ind + 1}
                onClick={(e) => {
                  setCanChange(false);
                  getRating(e);
                }}
                onMouseOver={(e) => {
                  if (canChange) {
                    setHover(true);
                    getRating(e);
                  }
                }}
              />
            );
          } else if (rat === 0.5) {
            return (
              <FontAwesomeIcon
                color="rgb(216, 184, 0)"
                icon={faStarHalfStroke}
                className={styles.star}
                style={{
                  fontSize: `${!hover && canChange ? small : big}`,
                }}
                id={ind + 1}
                onClick={(e) => {
                  setCanChange(false);
                  getRating(e);
                }}
                onMouseOver={(e) => {
                  if (canChange) {
                    setHover(true);
                    getRating(e);
                  }
                }}
              />
            );
          } else {
            return (
              <FontAwesomeIcon
                color="rgb(216, 184, 0)"
                icon={ReFaStar}
                className={styles.star}
                style={{
                  fontSize: `${!hover && canChange ? small : big}`,
                }}
                id={ind + 1}
                onClick={(e) => {
                  setCanChange(false);
                  getRating(e);
                }}
                onMouseOver={(e) => {
                  if (canChange) {
                    getRating(e);
                  }
                }}
              />
            );
          }
        })}
      </div>
      {!canChange && (
        <div
          style={{ fontSize: clearFont }}
          className={styles.clear}
          onClick={(e) => {
            setCanChange(true);
            setRating([0, 0, 0, 0, 0]);
          }}
        >
          Clear Rating
        </div>
      )}
    </div>
  );
}
