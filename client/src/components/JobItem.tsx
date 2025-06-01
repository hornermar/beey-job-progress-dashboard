import { memo } from "react";

import type { Job } from "../types/index";
import { JobStatusLabels } from "../constants/jobLabels";

interface JobProps {
  job: Job;
}

// React.memo prevents unnecessary re-rendering of this component (when Dashboard is re-rendered).

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
      <div className="job-status">{JobStatusLabels[job.status]}</div>
    </div>
  );
});
