import { JobStatus, type JobStatusType } from "../types";

export const JobStatusLabels: Record<JobStatusType, string> = {
  [JobStatus.PENDING]: "Pending",
  [JobStatus.IN_PROGRESS]: "In Progress",
  [JobStatus.COMPLETED]: "Completed",
};
