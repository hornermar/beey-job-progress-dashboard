import { createContext } from "react";
import type { Job } from "../../../types";

type JobWSContextType = {
  jobs: Job[];
  error: string | null;
  isReady: boolean;
};

const initialContext: JobWSContextType = {
  jobs: [],
  error: null,
  isReady: false,
};

export const JobWSContext = createContext<JobWSContextType>(initialContext);
