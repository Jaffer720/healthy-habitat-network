import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useBusinesses from "../../../hooks/useBusinesses";

const ProductSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  quantity_size: Yup.string().required("Size is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number().typeError("Price must be a number").required("Price is required"),
  type: Yup.string()
    .oneOf(["product", "service"], "Invalid type")
    .required("Type is required"),
  price_range: Yup.string()
    .oneOf(["affordable", "moderate", "premium"], "Invalid price range")
    .required("Price range is required"),
  business_id: Yup.string().required("Business Name is required"),
});

export default function ProductForm({ initialValues, onSubmit, isEdit = false }) {
  const { businesses } = useBusinesses();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4">
          <div>
            <label className="block font-medium">Product Name</label>
            <Field
              name="name"
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. Organic Honey"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Business Name</label>
            <Field
              as="select"
              name="business_id"
              className="w-full border px-3 py-2 rounded"
              value={values.business_id || ""}
              onChange={e => setFieldValue("business_id", e.target.value)}
            >
              <option value="">Select business</option>
              {businesses?.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="business_id" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Quantity/Size</label>
            <Field
              name="quantity_size"
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. 500ml"
            />
            <ErrorMessage name="quantity_size" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Category</label>
            <Field
              name="category"
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. reuseable medical equipments, fitness and wellness, etc."
            />
            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Price</label>
            <Field
              name="price"
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. 1000"
              type="number"
              min="0"
              step="any"
            />
            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Type</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <Field type="radio" name="type" value="product" checked={values.type === "product"} />
                <span className="ml-2">Product</span>
              </label>
              <label className="flex items-center">
                <Field type="radio" name="type" value="service" checked={values.type === "service"} />
                <span className="ml-2">Service</span>
              </label>
            </div>
            <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Price Range</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <Field type="radio" name="price_range" value="affordable" checked={values.price_range === "affordable"} />
                <span className="ml-2">Affordable</span>
              </label>
              <label className="flex items-center">
                <Field type="radio" name="price_range" value="moderate" checked={values.price_range === "moderate"} />
                <span className="ml-2">Moderate</span>
              </label>
              <label className="flex items-center">
                <Field type="radio" name="price_range" value="premium" checked={values.price_range === "premium"} />
                <span className="ml-2">Premium</span>
              </label>
            </div>
            <ErrorMessage name="price_range" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <Field
              name="description"
              as="textarea"
              className="w-full border px-3 py-2 rounded"
              placeholder="Product description"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEdit ? "Update" : "Add"} Product
          </button>
        </Form>
      )}
    </Formik>
  );
}
