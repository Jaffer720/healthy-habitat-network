import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CouncilSchema = Yup.object({
  name: Yup.string().required("Council name is required"),
  region: Yup.string().required("Region is required"),
});

export default function CouncilForm({ initialValues, onSubmit, isEdit = false }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CouncilSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className="space-y-4">
        <div>
          <label className="block font-medium">Council Name</label>
          <Field
            name="name"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Baltistan Council"
          />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium">Region</label>
          <Field
            name="region"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. Skardu"
          />
          <ErrorMessage name="region" component="div" className="text-red-500 text-sm" />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Add"} Council
        </button>
      </Form>
    </Formik>
  );
}
