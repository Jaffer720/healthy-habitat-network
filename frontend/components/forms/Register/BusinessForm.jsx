import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { fetchLocations } from "@/utils/api";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const BusinessForm = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations().then(setLocations);
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const res = await fetch("http://localhost:8000/index.php/api/businesses/register", {
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
        contact_info: "",
        certifications: "",
        location_id: "",
        username: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-4">
        <Input label="Business Name" name="name" />
        <Input label="Contact Info" name="contact_info" />
        <Input label="Certifications" name="certifications" />
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
        <Button type="submit">Register Business</Button>
      </Form>
    </Formik>
  );
};

export default BusinessForm;
