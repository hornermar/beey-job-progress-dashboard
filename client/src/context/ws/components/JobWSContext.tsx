import { createContext } from "react";
import type { Job } from "../../../types";

type JobWSContextType = {
  jobs: Job[];
  error: string | null;
};

export const JobWSContext = createContext<JobWSContextType | undefined>(
  undefined
);
