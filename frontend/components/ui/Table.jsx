import { useEffect, useMemo, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import Button from "./Button";

const sortData = (data, key, asc) =>
    [...data].sort((a, b) =>
        asc
            ? String(a[key]).localeCompare(String(b[key]))
            : String(b[key]).localeCompare(String(a[key]))
    );

export default function Table({
    columns,
    data,
    onAdd = () => { },
    onEdit = () => { },
    onDelete = () => { },
}) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState(null);
    const [asc, setAsc] = useState(true);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [filtered, setFiltered] = useState(data);

    useEffect(() => {
        const query = search.toLowerCase();
        const result = data.filter((row) =>
            Object.values(row).some((val) =>
                String(val).toLowerCase().includes(query)
            )
        );
        setFiltered(result);
        setPage(1); // reset to page 1 on search
    }, [search, data]);

    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        return sortData(filtered, sortKey, asc);
    }, [filtered, sortKey, asc]);

    const paginated = useMemo(() => {
        const start = (page - 1) * perPage;
        return sorted.slice(start, start + perPage);
    }, [sorted, page, perPage]);

    const totalPages = Math.ceil(filtered.length / perPage);

    return (
        <div className="p-4 bg-white shadow-md rounded">
            {/* Header */}
                        <div className="flex justify-between mb-4 flex-wrap gap-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border px-3 py-2 rounded-md"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                                onClick={() => onAdd()}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Add New
                            </Button>
                        </div>

                        {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            {columns.map((col) => (
                                <th
                                    key={col.accessor}
                                    className="p-3 cursor-pointer"
                                    onClick={() =>
                                        sortKey === col.accessor
                                            ? setAsc(!asc)
                                            : (setSortKey(col.accessor), setAsc(true))
                                    }
                                >
                                    {col.Header}
                                    {sortKey === col.accessor && (asc ? " ▲" : " ▼")}
                                </th>
                            ))}
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((row, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                {columns.map((col) => (
                                    <td key={col.accessor} className="p-3">
                                        {row[col.accessor]}
                                    </td>
                                ))}
                                <td className="p-3 space-x-3 text-blue-600 flex items-center justify-start">
                                    <button onClick={() => router.push(`/view/${row.id}`)}>
                                        <FaEye />
                                    </button>
                                    <button onClick={() => onEdit(row.id)}>
                                        <FaEdit className="text-purple-700" />
                                    </button>
                                    <button onClick={() => onDelete(row.id)}>
                                        <FaTrash className="text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                    <label>Show</label>
                    <select
                        className="border rounded px-2 py-1"
                        value={perPage}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                    >
                        {[10, 20, 30, 50].map((num) => (
                            <option key={num}>{num}</option>
                        ))}
                    </select>
                    <label>entries</label>
                </div>

                <div className="space-x-2">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
