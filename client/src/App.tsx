import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Job Progress Dashboard</h1>
      <div className="job-list" id="job-list">
        {/* Jobs will be injected here dynamically  */}
        <div className="job">
          <div className="job-name">Job #123</div>
          <div className="progress-bar" role="progressbar">
            <div className="progress-fill" style={{ width: "50%" }}></div>
          </div>
          <div className="job-status">In Progress</div>
        </div>
      </div>
    </div>
  );
}

export default App;
