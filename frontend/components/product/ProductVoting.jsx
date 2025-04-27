import { FaThumbsUp, FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

export default function ProductVoting({ residentVotes, handleVote, voted }) {

    const voteCountYes = residentVotes.filter(vote => vote.vote_value === "Yes").length;
    const voteCountNo = residentVotes.filter(vote => vote.vote_value === "No").length;

    return (
        <div className="w-full md:w-1/3 bg-white p-6 rounded shadow flex flex-col items-center justify-center gap-4">
            <h3 className="text-xl font-semibold mb-2">Are you interested?</h3>

            <div className="flex items-center gap-6 text-xl">
                <button onClick={() => handleVote("Yes")}>
                    {voted === "Yes" ? (
                        <div className="flex items-center gap-2">
                            <FaThumbsUp className="text-blue-600" />
                            {voteCountYes !== 0 && <span>{voteCountYes}</span>}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <FaRegThumbsUp className="text-blue-300 hover:scale-110 hover:text-blue-500 transition" />
                            {voteCountYes !== 0 && <span>{voteCountYes}</span>}
                        </div>
                    )}
                </button>
                <span className="text-gray-500">|</span>
                <button onClick={() => handleVote("No")}>
                    {voted === "No" ? (
                        <div className="flex items-center gap-2">
                            <FaThumbsDown className="text-red-500" />
                            {voteCountNo !== 0 && <span>{voteCountNo}</span>}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <FaRegThumbsDown className="text-red-300 hover:scale-110 hover:text-red-500  transition" />
                            {voteCountNo !== 0 && <span>{voteCountNo}</span>} {/* Update this line */}
                        </div>
                    )}
                </button>
            </div>

        </div>
    );
}
