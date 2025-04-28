import { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import useAuth from "../../../hooks/useAuth"; // Assuming you have Auth Context
import useLocations from "../../../hooks/useLocations";

export default function BusinessProfile() {
  const { user } = useAuth(); // your logged-in business user
  const { locations, loading } = useLocations();
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    if (user && locations.length > 0) {
      const loc = locations.find(loc => loc.id == user.location_id);
      setLocationName(loc ? loc.name : "Unknown Location");
    }
  }, [user, locations]);

  if (!user) return <div className="text-center py-10">Loading profile...</div>;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl flex flex-col gap-6 p-8 shadow-md mt-6">
      <div className="flex flex-col items-center">
        <CgProfile className="text-8xl text-blue-600 mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 capitalize">{user.role}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-500 text-sm">Business Username</label>
          <p className="text-lg font-semibold">{user.username}</p>
        </div>

        <div>
          <label className="block text-gray-500 text-sm">Contact Info</label>
          <p className="text-lg font-semibold">{user.contact_info || "Not specified"}</p>
        </div>

        <div>
          <label className="block text-gray-500 text-sm">Certifications</label>
          <p className="text-lg font-semibold">{user.certifications || "Not specified"}</p>
        </div>

        <div>
          <label className="block text-gray-500 text-sm">Location</label>
          <p className="text-lg font-semibold">{loading ? "Loading..." : locationName}</p>
        </div>
      </div>
    </div>
  );
}
