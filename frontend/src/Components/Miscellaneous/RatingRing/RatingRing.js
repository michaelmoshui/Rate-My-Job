// RatingRing.js
import React, { useEffect, useState } from "react";
import styles from "./RatingRing.module.css";

export default function RatingRing({
  rating = 5,
  total = 5,
  radius = 100,
  color = "black",
  borderWidth = 10,
}) {
  const [polygon, setPolygon] = useState("polygon(0 0)");

  const fillRing = () => {
    const target = (rating / total) * 100;
    console.log(target);
    if (target <= 0) {
      setPolygon("polygon(0 0)");
    } else if (target <= 12.5) {
      // Only fills 1/8
      let progress = 0;

      const interval = setInterval(() => {
        progress += 50 / 12.5;
        setPolygon(`polygon(100% 50%, 100% ${progress + 50}%, 50% 50%)`);
        if (progress >= (target * 50) / 12.5) {
          // special case on the dot
          if (target === 12.5) {
            setPolygon(`polygon(100% 50%, 100% 100%, 50% 50%)`);
          }
          clearInterval(interval);
        }
      }, 10);
    } else if (target <= 25) {
      // fills 2/8
      let progressOne = 50;
      let progressTwo = 100;
      let stage = 0;

      const interval = setInterval(() => {
        if (stage === 0) {
          progressOne += 50 / 12.5;
          setPolygon(`polygon(100% 50%, 100% ${progressOne}%, 50% 50%)`);
          if (progressOne >= 100) {
            stage = 1;
          }
        } else if (stage === 1) {
          progressTwo -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, ${progressTwo}% 100%, 50% 50%)`
          );
          if (progressTwo <= (-50 / 12.5) * target + 150) {
            // special case on the dot
            if (target === 25) {
              setPolygon(`polygon(100% 50%, 100% 100%, 50% 100%, 50% 50%)`);
            }
            clearInterval(interval);
          }
        }
      }, 10);
    } else if (target <= 37.5) {
      // fills 3/8
      let progressOne = 50;
      let progressTwo = 100;
      let progressThree = 50;
      let stage = 0;

      const interval = setInterval(() => {
        if (stage === 0) {
          progressOne += 50 / 12.5;
          setPolygon(`polygon(100% 50%, 100% ${progressOne}%, 50% 50%)`);
          if (progressOne >= 100) {
            stage = 1;
          }
        } else if (stage === 1) {
          progressTwo -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, ${progressTwo}% 100%, 50% 50%)`
          );
          if (progressTwo <= 50) {
            stage = 2;
          }
        } else if (stage === 2) {
          progressThree -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, ${progressThree}% 100%, 50% 50%)`
          );
          if (progressThree <= (-50 / 12.5) * target + 150) {
            // special case on the dot
            if (target === 37.5) {
              setPolygon(
                `polygon(100% 50%, 100% 100%, 50% 100%, 0% 100%, 50% 50%)`
              );
            }
            clearInterval(interval);
          }
        }
      }, 10);
    } else if (target <= 50) {
      // fills 4/8
      let progressOne = 50;
      let progressTwo = 100;
      let progressThree = 50;
      let progressFour = 100;
      let stage = 0;

      const interval = setInterval(() => {
        if (stage === 0) {
          progressOne += 50 / 12.5;
          setPolygon(`polygon(100% 50%, 100% ${progressOne}%, 50% 50%)`);
          if (progressOne >= 100) {
            stage = 1;
          }
        } else if (stage === 1) {
          progressTwo -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, ${progressTwo}% 100%, 50% 50%)`
          );
          if (progressTwo <= 50) {
            stage = 2;
          }
        } else if (stage === 2) {
          progressThree -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, ${progressThree}% 100%, 50% 50%)`
          );
          if (progressThree <= 0) {
            stage = 3;
          }
        } else if (stage === 3) {
          progressFour -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 ${progressFour}%, 50% 50%)`
          );
          if (progressFour <= (-50 / 12.5) * target + 250) {
            // special case on the dot
            if (target === 50) {
              setPolygon(
                `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 50% 50%)`
              );
            }
            clearInterval(interval);
          }
        }
      }, 10);
    } else if (target <= 62.5) {
      // fills 5/8
      let progressOne = 50;
      let progressTwo = 100;
      let progressThree = 50;
      let progressFour = 100;
      let progressFive = 50;
      let stage = 0;

      const interval = setInterval(() => {
        if (stage === 0) {
          progressOne += 50 / 12.5;
          setPolygon(`polygon(100% 50%, 100% ${progressOne}%, 50% 50%)`);
          if (progressOne >= 100) {
            stage = 1;
          }
        } else if (stage === 1) {
          progressTwo -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, ${progressTwo}% 100%, 50% 50%)`
          );
          if (progressTwo <= 50) {
            stage = 2;
          }
        } else if (stage === 2) {
          progressThree -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, ${progressThree}% 100%, 50% 50%)`
          );
          if (progressThree <= 0) {
            stage = 3;
          }
        } else if (stage === 3) {
          progressFour -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 ${progressFour}%, 50% 50%)`
          );
          if (progressFour <= 50) {
            stage = 4;
          }
        } else if (stage === 4) {
          progressFive -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 ${progressFive}%, 50% 50%)`
          );
          if (progressFive <= (-50 / 12.5) * target + 250) {
            // special case on the dot
            if (target === 62.5) {
              setPolygon(
                `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0%, 50% 50%)`
              );
            }
            clearInterval(interval);
          }
        }
      }, 10);
    } else if (target <= 75) {
      // fils 6/8
      let progressOne = 50;
      let progressTwo = 100;
      let progressThree = 50;
      let progressFour = 100;
      let progressFive = 50;
      let progressSix = 0;
      let stage = 0;

      const interval = setInterval(() => {
        if (stage === 0) {
          progressOne += 50 / 12.5;
          setPolygon(`polygon(100% 50%, 100% ${progressOne}%, 50% 50%)`);
          if (progressOne >= 100) {
            stage = 1;
          }
        } else if (stage === 1) {
          progressTwo -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, ${progressTwo}% 100%, 50% 50%)`
          );
          if (progressTwo <= 50) {
            stage = 2;
          }
        } else if (stage === 2) {
          progressThree -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, ${progressThree}% 100%, 50% 50%)`
          );
          if (progressThree <= 0) {
            stage = 3;
          }
        } else if (stage === 3) {
          progressFour -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 ${progressFour}%, 50% 50%)`
          );
          if (progressFour <= 50) {
            stage = 4;
          }
        } else if (stage === 4) {
          progressFive -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 ${progressFive}%, 50% 50%)`
          );
          if (progressFive <= 0) {
            stage = 5;
          }
        } else if (stage === 5) {
          progressSix += 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, ${progressSix}% 0, 50% 50%)`
          );
          if (progressSix >= (50 / 12.5) * target - 250) {
            // special case on the dot
            if (target === 75) {
              setPolygon(
                `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0, 50% 50%)`
              );
            }
            clearInterval(interval);
          }
        }
      }, 10);
    } else if (target <= 87.5) {
      // fils 7/8
      let progressOne = 50;
      let progressTwo = 100;
      let progressThree = 50;
      let progressFour = 100;
      let progressFive = 50;
      let progressSix = 0;
      let progressSeven = 50;
      let stage = 0;

      const interval = setInterval(() => {
        if (stage === 0) {
          progressOne += 50 / 12.5;
          setPolygon(`polygon(100% 50%, 100% ${progressOne}%, 50% 50%)`);
          if (progressOne >= 100) {
            stage = 1;
          }
        } else if (stage === 1) {
          progressTwo -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, ${progressTwo}% 100%, 50% 50%)`
          );
          if (progressTwo <= 50) {
            stage = 2;
          }
        } else if (stage === 2) {
          progressThree -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, ${progressThree}% 100%, 50% 50%)`
          );
          if (progressThree <= 0) {
            stage = 3;
          }
        } else if (stage === 3) {
          progressFour -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 ${progressFour}%, 50% 50%)`
          );
          if (progressFour <= 50) {
            stage = 4;
          }
        } else if (stage === 4) {
          progressFive -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 ${progressFive}%, 50% 50%)`
          );
          if (progressFive <= 0) {
            stage = 5;
          }
        } else if (stage === 5) {
          progressSix += 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, ${progressSix}% 0, 50% 50%)`
          );
          if (progressSix >= 50) {
            stage = 6;
          }
        } else if (stage === 6) {
          progressSeven += 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0, ${progressSeven}% 0, 50% 50%)`
          );
          if (progressSeven >= (50 / 12.5) * target - 250) {
            // special case on the dot
            if (target === 87.5) {
              setPolygon(
                `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0, 100% 0, 50% 50%)`
              );
            }
            clearInterval(interval);
          }
        }
      }, 10);
    } else if (target <= 100) {
      // fils whole
      let progressOne = 50;
      let progressTwo = 100;
      let progressThree = 50;
      let progressFour = 100;
      let progressFive = 50;
      let progressSix = 0;
      let progressSeven = 50;
      let progressEight = 0;
      let stage = 0;

      const interval = setInterval(() => {
        if (stage === 0) {
          progressOne += 50 / 12.5;
          setPolygon(`polygon(100% 50%, 100% ${progressOne}%, 50% 50%)`);
          if (progressOne >= 100) {
            stage = 1;
          }
        } else if (stage === 1) {
          progressTwo -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, ${progressTwo}% 100%, 50% 50%)`
          );
          if (progressTwo <= 50) {
            stage = 2;
          }
        } else if (stage === 2) {
          progressThree -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, ${progressThree}% 100%, 50% 50%)`
          );
          if (progressThree <= 0) {
            stage = 3;
          }
        } else if (stage === 3) {
          progressFour -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 ${progressFour}%, 50% 50%)`
          );
          if (progressFour <= 50) {
            stage = 4;
          }
        } else if (stage === 4) {
          progressFive -= 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 ${progressFive}%, 50% 50%)`
          );
          if (progressFive <= 0) {
            stage = 5;
          }
        } else if (stage === 5) {
          progressSix += 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, ${progressSix}% 0, 50% 50%)`
          );
          if (progressSix >= 50) {
            stage = 6;
          }
        } else if (stage === 6) {
          progressSeven += 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0, ${progressSeven}% 0, 50% 50%)`
          );
          if (progressSeven >= 100) {
            stage = 7;
          }
        } else if (stage === 7) {
          progressEight += 50 / 12.5;
          setPolygon(
            `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0, 100% 0, 100% ${progressEight}%, 50% 50%)`
          );
          if (progressEight >= (50 / 12.5) * target - 350) {
            // special case on the dot
            if (target === 100) {
              setPolygon(
                `polygon(100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0, 100% 0, 100% 50%, 50% 50%)`
              );
            }
            clearInterval(interval);
          }
        }
      }, 10);
    } else {
      // Invalid percentage; fills none
      setPolygon("polygon(0 0)");
    }
  };

  useEffect(() => {
    fillRing();
  }, [rating]);

  return (
    <div
      className={styles.ringWrapper}
      style={{
        height: `${radius + borderWidth * 2}px`,
        width: `${radius + borderWidth * 2}px`,
      }}
    >
      {/* The actual ring */}
      <div
        className={styles.ring}
        style={{
          height: `${radius}px`,
          width: `${radius}px`,
          clipPath: `${polygon}`,
          border: `${borderWidth}px solid ${color}`,
        }}
      ></div>
      {/* The rating inside the ring */}
      <div
        className={styles.rating}
        style={{
          height: `${radius / 2}px`,
          width: `${radius / 2}px`,
          fontSize: `${radius / 3}px`,
        }}
      >
        {rating}
      </div>
    </div>
  );
}
