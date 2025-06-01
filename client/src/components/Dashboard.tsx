import { useJobWS } from "../context/ws/hook/useJobWS";
import { JobList } from "./JobList";

export const Dashboard = () => {
  const { jobs, error, isReady } = useJobWS();

  if (!isReady) return null;

  if (error) return <div>Something went wrong...</div>;

  return <JobList jobs={jobs} />;
};
