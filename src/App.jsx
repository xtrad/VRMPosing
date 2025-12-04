import React from "react";
import VRMViewer from "./components/VRMViewer";

function App() {
  return (
    <div className="App">
      <h1>VRM Viewer v0.1</h1>
      <VRMViewer modelPath="/models/character_v0.vrm" />
    </div>
  );
}

export default App;
