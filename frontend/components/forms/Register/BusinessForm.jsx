import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useLocations from "@/hooks/useLocations";

const BusinessSchema = Yup.object({
  name: Yup.string().required("Business name is required"),
  contact_info: Yup.string().required("Contact info is required"),
  certifications: Yup.string(),
  location_id: Yup.string().required("Location is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Confirm password is required"),
});

const BusinessForm = () => {
  const { locations, loading } = useLocations();

  const handleSubmit = async (values, { resetForm }) => {
    const { confirm_password, ...payload } = values; // Destructure to remove confirm_password
    const res = await fetch("http://localhost:8000/index.php/api/businesses/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log(result);
    if (result.success) {
      alert("Business registered successfully!");
      resetForm();
    } else {
      alert(result.message || "Registration failed.");
    }
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
        confirm_password: "",
      }}
      validationSchema={BusinessSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <div>
          <label className="block font-medium">Business Name</label>
          <Field
            name="name"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Healthy Foods Ltd."
          />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium">Contact Info</label>
          <Field
            name="contact_info"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. 123-456-7890"
          />
          <ErrorMessage name="contact_info" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium">Certifications</label>
          <Field
            name="certifications"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. ISO 9001"
          />
          <ErrorMessage name="certifications" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <Field
            as="select"
            name="location_id"
            className="w-full border px-3 py-2 rounded"
            disabled={loading}
          >
            <option value="">Select a location</option>
            {locations &&
              locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
          </Field>
          <ErrorMessage name="location_id" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium">Username</label>
          <Field
            name="username"
            className="w-full border px-3 py-2 rounded"
            placeholder="Choose a unique username"
          />
          <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <Field
            name="password"
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Set a password"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
        </div>
        <div>
          <label className="block font-medium">Confirm Password</label>
          <Field
            name="confirm_password"
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Re-enter your password"
          />
          <ErrorMessage name="confirm_password" component="div" className="text-red-500 text-sm" />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register Business
        </button>
      </Form>
    </Formik>
  );
}
export default BusinessForm;