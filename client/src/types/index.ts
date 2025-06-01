export const JobStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
} as const;

export type JobStatusType = (typeof JobStatus)[keyof typeof JobStatus];

export interface Job {
  id: string;
  name: string;
  progress: number;
  status: JobStatusType;
}

export const JobEvent = {
  INITIAL_JOBS: "initial-jobs",
  JOB_UPDATE: "job-update",
} as const;

export type JobEventType = (typeof JobEvent)[keyof typeof JobEvent];

export type JobWSMessage =
  | {
      event: typeof JobEvent.INITIAL_JOBS;
      payload: Job[];
    }
  | {
      event: typeof JobEvent.JOB_UPDATE;
      payload: Job;
    };
