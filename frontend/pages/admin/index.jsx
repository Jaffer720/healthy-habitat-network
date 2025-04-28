import useAuth from "../../hooks/useAuth"; 
import { CgProfile } from "react-icons/cg";

export default function AdminProfile() {    
  const { user } = useAuth();

  if (!user) return <div className="text-center py-10">Loading profile...</div>;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl flex flex-col gap-6 p-8 shadow-md mt-6">
      {/* Profile Icon & Info */}
      <div className="flex flex-col items-center">
        <CgProfile className="text-8xl text-blue-600 mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">{user.name || "Admin"}</h2>
        <p className="text-gray-500 capitalize">{user.role}</p>
      </div>

      {/* Details */}
      <div className="space-y-4 mt-6">
        
        {user.email && (
          <div>
            <label className="block text-gray-500 text-sm">Email</label>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
