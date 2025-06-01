import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type PropsWithChildren,
} from "react";

import { JobWSContext } from "./JobWSContext";
import {
  JobEvent,
  JobStatus,
  type Job,
  type JobWSMessage,
} from "../../../types";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { WS_URL, JOB_REMOVE_TIMEOUT } from "../../../constants/ws";

export const JobWSProvider = ({ children }: PropsWithChildren) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleJobUpdate = useCallback(
    (data: JobWSMessage) => {
      if (data.event === JobEvent.INITIAL_JOBS) {
        setJobs(data.payload);
      } else if (data.event === JobEvent.JOB_UPDATE) {
        setJobs((prevJobs) =>
          prevJobs.map((prevJob) =>
            prevJob.id === data.payload.id
              ? { ...prevJob, ...data.payload }
              : prevJob
          )
        );
      }
    },
    [setJobs]
  );

  const [isReady, error] = useWebSocket(WS_URL, handleJobUpdate);

  const timersRef = useRef<{
    [key: string]: ReturnType<typeof setTimeout> | undefined;
  }>({});

  useEffect(() => {
    // Clear timeouts for jobs that are no longer present
    Object.keys(timersRef.current).forEach((id) => {
      const jobExists = jobs.some((job) => job.id === id);
      if (!jobExists) {
        clearTimeout(timersRef.current[id]);
        delete timersRef.current[id];
      }
    });

    // Set timeout for newly completed jobs
    jobs.forEach((job) => {
      if (job.status === JobStatus.COMPLETED && !timersRef.current?.[job.id]) {
        const timer = setTimeout(() => {
          setJobs((prevJobs) => prevJobs.filter((j) => j.id !== job.id));
        }, JOB_REMOVE_TIMEOUT);

        timersRef.current[job.id] = timer;
      }
    });
  }, [jobs]);

  return (
    <JobWSContext.Provider value={{ jobs, error, isReady }}>
      {children}
    </JobWSContext.Provider>
  );
};
