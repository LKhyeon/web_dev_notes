import React from "react";
import { useLocation } from "react-router-dom";

export default function Final() {
  const location = useLocation();

  return (
    <div>
      <p> Your final score is {location.state.score} </p>
    </div>
  );
}
