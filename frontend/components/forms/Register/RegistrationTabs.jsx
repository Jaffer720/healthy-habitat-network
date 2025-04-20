import React, { useState } from "react";
import ResidentForm from "./ResidentForm";
import BusinessForm from "./BusinessForm";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

const RegistrationTabs = () => {
    const [activeTab, setActiveTab] = useState("resident");

    return (
        <Card title="Register">
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
                {activeTab === "resident" ? <ResidentForm /> : <BusinessForm />}
            </div>
        </Card>
    );
};

export default RegistrationTabs;
