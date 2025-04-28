import React, { useState } from "react";
import LoginFrom from "./LoginForm";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import useAuth from "../../../hooks/useAuth";
import Router from "next/router";

const LoginTabs = () => {
  const [activeTab, setActiveTab] = useState("resident");
  const { login } = useAuth();

  const handleSubmit = async (values, { resetForm }) => {
    const res = await fetch(`http://localhost:8000/index.php/api/${activeTab === "resident" ? "residents" : "businesses"}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    console.log('data', data)
    if (data && data.success) {
      alert("Login successful");
      login(data.user);
      Router.push(`/${data.user.role}`);
    } else if (data && data.message) {
      alert(data.message || "Login failed");
    } else if (data && data.error) {
      alert(data.error || "Login failed");
    }

    resetForm();
  };

  return (
    <Card title="Login">
      <div className="flex space-x-2 gap-2 justify-center mb-4 rounded-md overflow-hidden border border-gray-300 w-full bg-gray-700">
        <Button className={`w-full py-2 text-sm font-medium ${activeTab === "resident" ? "bg-green-600 text-white" : "text-white"} cursor-pointer`}
          variant="none"
          onClick={() => setActiveTab("resident")}
        >
          Resident
        </Button>
        <Button className={`w-full py-2 text-sm font-medium ${activeTab === "business" ? "bg-green-600 text-white" : " text-white"} cursor-pointer`}
          variant="none"
          onClick={() => setActiveTab("business")}
        >
          Business
        </Button>
      </div>
      <div className="bg-white shadow-md rounded-md p-4 border border-gray-200">
        <LoginFrom handleSubmit={handleSubmit} />
      </div>
      I don't have an account? <a href="/auth/register" className="text-blue-500">Register</a>
    </Card>
  );
};

export default LoginTabs;
