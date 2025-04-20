import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { fetchLocations } from "@/utils/api";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const ResidentForm = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const res = await fetch("http://localhost:8000/index.php/api/residents/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const result = await res.json();
    console.log(result);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        age_group: "",
        gender: "male",
        location_id: "",
        areas_of_interest: "",
        username: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-4">
        <Input label="Full Name" name="name" />
        <Input label="Age Group" name="age_group" />
        <Input label="Areas of Interest (comma-separated)" name="areas_of_interest" />
        <div className="flex gap-4">
          <label>Gender:</label>
          <Field as="select" name="gender" className="border p-2 rounded">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Field>
        </div>
        <div>
          <label>Location:</label>
          <Field as="select" name="location_id" className="border p-2 rounded w-full">
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </Field>
        </div>
        <Input label="Username" name="username" />
        <Input label="Password" name="password" type="password" />
        <Button type="submit">Register as Resident</Button>
      </Form>
    </Formik>
  );
};

export default ResidentForm;
