// pages/unauthorized.jsx
import { IoCloseCircleOutline } from "react-icons/io5";
export default function Unauthorized() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-6 text-center bg-white shadow-md rounded-lg">
                < IoCloseCircleOutline size={50} className="mx-auto text-red-600" />
                <h1 className="text-3xl font-bold text-gray-700 mb-1">(403) Access Denied</h1>
                <p className="text-gray-500">You don’t have permission to access this page.</p>
            </div >
        </div >
    );
}
