export default function ResidentVotesTable({ residentVotes }) {
    if (!residentVotes.length) {
        return (
            <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-semibold mb-4">Residents who voted:</h3>
                <p>No votes yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Residents who voted:</h3>
            <table className="w-full table-auto">
                <thead>
                    <tr className="text-left">
                        <th className="border-b p-2">Resident Name</th>
                        <th className="border-b p-2">Vote</th>
                    </tr>
                </thead>
                <tbody>
                    {residentVotes.map((vote) => {
                        return (
                            <tr key={vote.vote_id}>
                                <td className="border-b p-2">{vote.resident_name}</td>
                                <td className="border-b p-2 capitalize">{vote.vote_value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
