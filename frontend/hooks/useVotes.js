import { useContext } from "react";
import { VoteContext } from "../context/VoteContext";

const useVotes = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error("useVotes must be used within a VoteProvider");
  }
  return context;
};

export default useVotes;
