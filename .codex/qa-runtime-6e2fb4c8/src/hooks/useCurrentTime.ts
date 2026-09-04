import { useState, useEffect } from "react";

export const useCurrentTime = (format24h = true) => {
  const [timeString, setTimeString] = useState("");
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: !format24h,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [format24h]);

  return timeString;
};
