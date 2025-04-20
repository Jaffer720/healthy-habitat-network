import { useContext } from "react";
import { CouncilContext } from "../context/CouncilContext";

const useCouncils = () => {
  const context = useContext(CouncilContext);
  if (!context) {
    throw new Error("useCouncils must be used within a CouncilProvider");
  }
  return context;
};

export default useCouncils;
