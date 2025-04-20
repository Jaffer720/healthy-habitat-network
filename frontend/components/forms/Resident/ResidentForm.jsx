import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useLocations from "../../../hooks/useLocations";

const ResidentSchema = Yup.object({
  resident_id: Yup.string().required("Resident ID is required"),
  name: Yup.string().required("Name is required"),
  age_group: Yup.string().required("Age group is required"),
  gender: Yup.string().oneOf(["male", "female", "other"], "Invalid gender").required("Gender is required"),
  location_id: Yup.string().required("Location ID is required"),
  areas_of_interest: Yup.array().min(1, "Select at least one area of interest"),
});

const areasOfInterestOptions = [
  "Nutrition",
  "Fitness",
  "Mental Health",
  "Sustainable Living",
];

const ageGroupOptions = [
  { label: "Child (6-12)", value: "child" },
  { label: "Teen (13-17)", value: "teen" },
  { label: "Adult (18-45)", value: "adult" },
  { label: "Senior (46 and above)", value: "senior" },
];

export default function ResidentForm({ initialValues, onSubmit, isEdit = false }) {
  const { locations } = useLocations();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ResidentSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <Field
            name="name"
            className="w-full border px-3 py-2 rounded"
            placeholder="e.g. John Doe"
          />
          <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium">Age Group</label>
          <Field
            as="select"
            name="age_group"
            value={initialValues.age_group || ""}
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
          <label className="block font-medium">Gender</label>
          <div className="flex space-x-4">
            <label>
              <Field type="radio" name="gender" value="male" checked={initialValues.gender === 'male'} />
              Male
            </label>
            <label>
              <Field type="radio" name="gender" value="female" checked={initialValues.gender === 'female'} />
              Female
            </label>
            <label>
              <Field type="radio" name="gender" value="other" checked={initialValues.gender === 'other'} />
              Other
            </label>
          </div>
          <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <Field
            as="select"
            name="location_id"
            value={initialValues.location_id || ""}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="" disabled>
              Select a location
            </option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </Field>
          <ErrorMessage name="location_id" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium">Areas of Interest</label>
          <Field
            as="select"
            name="areas_of_interest"
            multiple
            className="w-full border px-3 py-2 rounded"
          >
            {areasOfInterestOptions.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </Field>
          <ErrorMessage name="areas_of_interest" component="div" className="text-red-500 text-sm" />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Add"} Resident
        </button>
      </Form>
    </Formik>
  );
}

