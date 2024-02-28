import React, { useState, useEffect } from "react";
import styles from "./Histogram.module.css";

export default function Histogram({
  data,
  targetValue,
  totalWidth,
  highlightColor,
}) {
  const [visibleBins, setVisibleBins] = useState([]);
  const animationDelay = 100; // in milliseconds

  const binWidth = totalWidth / data.length;
  useEffect(() => {
    const animateHistogram = async () => {
      for (let i = 0; i < data.length; i++) {
        // Show each bin with a delay
        await new Promise((resolve) => setTimeout(resolve, animationDelay));
        setVisibleBins((prevVisibleBins) => [...prevVisibleBins, i]);
      }
    };

    animateHistogram();
  }, [data]);

  const getMaxHeight = () => {
    return Math.max(...data);
  };

  return (
    <div className={styles.histoWrap}>
      {data.map((value, index) => (
        <div
          key={index}
          style={{
            width: binWidth,
            height: (value / getMaxHeight()) * 100 + "px",
            backgroundColor:
              index === targetValue
                ? `${highlightColor}`
                : visibleBins.includes(index)
                ? "grey"
                : "transparent",
            margin: `0 ${binWidth / 6}px`,
            transition: "background-color 0.3s ease-in-out",
          }}
        ></div>
      ))}
    </div>
  );
}

// Example usage:
//
