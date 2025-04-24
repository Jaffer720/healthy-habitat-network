import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useLocations from "@/hooks/useLocations";

const ResidentSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  age_group: Yup.string().required("Age group is required"),
  gender: Yup.string().required("Gender is required"),
  location_id: Yup.string().required("Location is required"),
  areas_of_interest: Yup.string().required("At least one interest is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const ageGroupOptions = [
  { label: "Child (6-12)", value: "child" },
  { label: "Teen (13-17)", value: "teen" },
  { label: "Adult (18-45)", value: "adult" },
  { label: "Senior (46 and above)", value: "senior" },
];

export default function ResidentForm() {
  const { locations, loading } = useLocations();

  const handleSubmit = async (values, { resetForm }) => {
    const { confirm_password, ...rest } = values; // Destructure to remove confirm_password
    const payload = {
      ...rest,
      areas_of_interest: values.areas_of_interest
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const res = await fetch("http://localhost:8000/index.php/api/residents/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log(result);
    if (result.success) {
      alert("Resident registered successfully!");
      resetForm();
    } else {
      alert(result.message || "Registration failed.");
    }
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
        confirm_password: "",
      }}
      validationSchema={ResidentSchema}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-4">
        <div>
          <label className="block font-medium">Full Name</label>
          <Field
            name="name"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Muhammad Jaffer"
          />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
        </div>
        <div>
          <label className="block font-medium">Age Group</label>
          <Field
            as="select"
            name="age_group"
            className="w-full border px-3 py-2 rounded"
          >
            <option value="" disabled>
              Select an age group
            </option>
            {ageGroupOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field>
          <ErrorMessage name="age_group" component="div" className="text-red-500 text-sm" />
        </div>
        
        <div>
          <label className="block font-medium">Areas of Interest (comma-separated)</label>
          <Field
            name="areas_of_interest"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. health, environment, education"
          />
          <ErrorMessage name="areas_of_interest" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium mb-1">Gender</label>
          <div className="flex gap-4">
            <label>
              <Field type="radio" name="gender" value="male" />
              <span className="ml-1">Male</span>
            </label>
            <label>
              <Field type="radio" name="gender" value="female" />
              <span className="ml-1">Female</span>
            </label>
            <label>
              <Field type="radio" name="gender" value="other" />
              <span className="ml-1">Other</span>
            </label>
          </div>
          <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
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
            placeholder="Choose a username"
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
          Register as Resident
        </button>
      </Form>
    </Formik>
  );
}
