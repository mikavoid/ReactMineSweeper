import React from "react";
import ReactDOM from "react-dom";

import { Top } from "./components/Top";
import { ScoreBoard } from "./components/ScoreBoard";

ReactDOM.render(
  <>
    <Top>Démineur</Top>
    <ScoreBoard
      time="000"
      levels={["beginner", "intermediate", "expert"]}
      mines="010"
      onReset={() => console.log("RESET GAME")}
    />
  </>,
  document.getElementById("target")
);
