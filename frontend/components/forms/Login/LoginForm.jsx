import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const LoginForm = ({ handleSubmit }) => {

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form className="flex flex-col gap-4">
        <div>
          <label className="block font-medium">Username</label>
          <Field
            name="username"
            placeholder="Enter your username"
            className="w-full border px-3 py-2 rounded"
          />
          <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <Field
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full border px-3 py-2 rounded"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
        </div>

        <Button type="submit">Login</Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;