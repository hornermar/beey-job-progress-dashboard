export const JobStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
} as const;

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];

export interface Job {
  id: string;
  name: string;
  progress: number;
  status: JobStatus;
}
