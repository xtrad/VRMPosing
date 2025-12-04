import React, { useState } from "react";
import VRMViewer from "./components/VRMViewer";

function App() {
  const [modelUrl, setModelUrl] = useState("/models/vrm0_male_00.vrm");

  const handleChangeModel = (e) => {
    setModelUrl(e.target.value);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Dropdown ganti model */}
      <div style={{ position: "absolute", zIndex: 1, padding: 10 }}>
        <select onChange={handleChangeModel} value={modelUrl}>
          <option value="/models/vrm0_male_00.vrm">Male 00</option>
          <option value="/models/vrm0_female_00.vrm">Female 00</option>
        </select>
      </div>

      {/* Viewer */}
      <VRMViewer modelUrl={modelUrl} />
    </div>
  );
}

export default App;
