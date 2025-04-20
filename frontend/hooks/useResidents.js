import { useContext } from "react";
import { ResidentContext } from "../context/ResidentContext";

const useResidents = () => {
  const context = useContext(ResidentContext);
  if (!context) {
    throw new Error("useResidents must be used within a ResidentProvider");
  }
  return context;
};

export default useResidents;
