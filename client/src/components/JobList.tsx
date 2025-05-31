import { JobItem } from "./JobItem";
import type { Job } from "../types/index";

interface JobListProps {
  jobs: Job[];
}

export const JobList = ({ jobs }: JobListProps) => {
  return (
    <div className="container">
      <h1>Job Progress Dashboard</h1>
      <div className="job-list" id="job-list">
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};
