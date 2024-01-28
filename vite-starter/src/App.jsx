import React from "react";
import "./App.css";
import { kebobCaseToTitleCase } from "./helper";

function App() {
  const [buttonColor, setButtonColor] = React.useState("medium-violet-red");
  const nextColorClass = buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";
  const nextColorTitleCase = kebobCaseToTitleCase(nextColorClass);
  const [disabled, setDisabled] = React.useState(false);
  const className = disabled ? "gray" : buttonColor;

  return (
    <div>
      <button className={className} onClick={() => setButtonColor(nextColorClass)} disabled={disabled}>
        Change to {nextColorTitleCase}
      </button>
      <br />
      <input
        type="checkbox"
        id="disalbed-button-checkbox"
        defaultChecked={false}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disalbed-button-checkbox">Disable Button</label>
    </div>
  );
}

export default App;
