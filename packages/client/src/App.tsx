import React from "react";
import Router from "./Router";
import { Provider } from "./context/SocketContext";

function App() {
  return (
    <Provider>
      <Router />
    </Provider>
  );
}

export default App;
