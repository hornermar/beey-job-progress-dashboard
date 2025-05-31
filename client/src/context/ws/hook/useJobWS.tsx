import { useContext } from "react";
import { JobWSContext } from "../components/JobWSContext";

export const useJobWS = () => {
  const context = useContext(JobWSContext);

  if (!context) {
    throw new Error("useJobWS must be used within a JobWSProvider");
  }

  return context;
};
