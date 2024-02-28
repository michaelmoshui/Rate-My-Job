import styles from "./Filter.module.css";

import React, { useState } from "react";

export default function Filter() {
  const [location, setLocation] = useState("");
  const [overallRating, setOverallRating] = useState([]);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState(0);

  const handleOverallRatingChange = (selectedOptions) => {
    setOverallRating(selectedOptions);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>

      <label>
        Overall Rating:
        <select
          multiple
          value={overallRating}
          onChange={(e) =>
            handleOverallRatingChange(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </label>

      <label>
        Salary Range:
        <input
          type="number"
          placeholder="Min"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max"
          value={maxSalary}
          onChange={(e) => setMaxSalary(e.target.value)}
        />
      </label>

      <label>
        Company:
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>

      <label>
        Duration:
        <input
          type="range"
          min="0"
          max="16"
          step="4"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <span>{duration === 16 ? "16+" : duration}</span>
      </label>
    </div>
  );
}
