import { useJobWS } from "../context/ws/hook/useJobWS";
import { JobList } from "./JobList";

export const Dashboard = () => {
  const { jobs, error } = useJobWS();

  if (error) {
    // TODO: Handle error display (and loading ?)
    return null;
  }

  return <JobList jobs={jobs} />;
};
