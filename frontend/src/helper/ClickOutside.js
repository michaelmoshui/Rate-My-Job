import { useEffect } from "react";

export default function useClickOutside(ref, func) {
  useEffect(() => {
    const listener = (e) => {
      // e.target is the div that was clicked
      if (!ref.current || ref.current.contains(e.target)) {
        // if the element does not exist or you are clicking ON the element...don't do anything
        return;
      }
      func();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("mousedown", listener);
    };
  }, [ref]); // everytime the dependency (what's inside the [] aka the state of div being clicked) is changed the useEffect function runs
}
