import { memo } from "react";

import type { Job } from "../types/index";

interface JobProps {
  job: Job;
}

// React.memo is used to prevent unnecessary re-renders (if the job data hasn't changed but the Dashboard is re-rendered).

export const JobItem = memo(({ job }: JobProps) => {
  return (
    <div className="job">
      <div className="job-name">{job.name}</div>
      <div className="progress-bar" role="progressbar">
        <div
          className="progress-fill"
          style={{ width: `${job.progress}%` }}
        ></div>
      </div>
      <div className="job-status">{job.status}</div>
    </div>
  );
});
