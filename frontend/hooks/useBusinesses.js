import { useContext } from "react";
import { BusinessContext } from "../context/BusinessContext";

const useBusinesses = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusinesses must be used within a BusinessProvider");
  }
  return context;
};

export default useBusinesses;
