import { useEffect, useState, type PropsWithChildren } from "react";

import { JobWSContext } from "./JobWSContext";
import type { Job } from "../../../types";

export const JobWSProvider = ({ children }: PropsWithChildren) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Currently does not work for me: wss://hiring1.beey.io/ws/jobs&period=1000
    // const socket = new WebSocket("wss://hiring1.beey.io/ws/jobs&period=4000");
    const socket = new WebSocket("ws://localhost:4000/ws/jobs?period=4000");

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.event === "initial-jobs") {
          setJobs(data.payload);
        } else if (data.event === "job-update") {
          setJobs((prevJobs) => {
            const updatedJobs = prevJobs.map((job) =>
              job.id === data.payload.id ? { ...job, ...data.payload } : job
            );

            return updatedJobs;
          });
          console.log("Job update received:", data.payload);
        }
      } catch (e) {
        console.error("Failed to parse WebSocket message:", e, event.data);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("WebSocket error occurred. Please try again later.");
    };

    // Cleanup
    return () => {
      socket.close();
    };
  }, []);

  return (
    <JobWSContext.Provider value={{ jobs, error }}>
      {children}
    </JobWSContext.Provider>
  );
};
