import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LocationSchema = Yup.object({
  name: Yup.string().required("Location name is required"),
  council_id: Yup.string().required("Council is required"),
});

export default function LocationForm({
  initialValues,
  onSubmit,
  isEdit = false,
  councils = [],
}) {
  console.log('intailValues', initialValues)
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LocationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className="space-y-4">
        <div>
          <label className="block font-medium">Location Name</label>
          <Field
            name="name"
            placeholder="e.g. Skardu"
            className="w-full border px-3 py-2 rounded"
          />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium">Council</label>
          <Field
            as="select"
            name="council_id"
            value={initialValues.council_id || ""}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Council</option>
            {councils.map((council) => (
              <option key={council.id} value={council.id}>
                {council.name}
              </option>
            ))}

          </Field>
          <ErrorMessage name="council_id" component="div" className="text-red-500 text-sm" />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update Location" : "Add Location"}
        </button>
      </Form>
    </Formik>
  );
}
