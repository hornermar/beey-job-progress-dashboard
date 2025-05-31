import { Dashboard } from "./components/Dashboard";
import { JobWSProvider } from "./context/ws/components/JobWSProvider";

import "./App.css";

function App() {
  return (
    <JobWSProvider>
      <Dashboard />
    </JobWSProvider>
  );
}

export default App;
