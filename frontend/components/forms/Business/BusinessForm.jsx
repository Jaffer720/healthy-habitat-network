import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useLocations  from "../../../hooks/useLocations"; // Adjust path as needed

const BusinessSchema = Yup.object({
  name: Yup.string().required("Business name is required"),
  contact_info: Yup.string(),
  certifications: Yup.string(),
  location_id: Yup.string().required("Location is required"),
});

export default function BusinessForm({ initialValues, onSubmit, isEdit = false }) {
  const { locations, loading } = useLocations();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={BusinessSchema}
      onSubmit={onSubmit}
      enableReinitialize
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
            value={initialValues.location_id || ""}
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Add"} Business
        </button>
      </Form>
    </Formik>
  );
}
