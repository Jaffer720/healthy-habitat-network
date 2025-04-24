import React from 'react'
// import useProtectedRoute from '../../hooks/useProtectedRoute';

const Dashboard = () => {
    // const { loading, authorized } = useProtectedRoute(["admin"]);

    // if (loading) return <p className="p-4">Loading...</p>;
    // if (!authorized) return null;

    return (
        <div className='flex flex-col gap-4 p-4'>
            <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard.</p>
            <p>Here you can manage all aspects of the application.</p>
            <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>Manage Users</button>
            <button className='mt-4 bg-green-500 text-white py-2 px-4 rounded'>View Reports</button>
            <button className='mt-4 bg-red-500 text-white py-2 px-4 rounded'>Settings</button>
            <button className='mt-4 bg-yellow-500 text-white py-2 px-4 rounded'>Logout</button>
        </div>
    )
}

export default Dashboard