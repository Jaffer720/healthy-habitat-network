import React from "react";
import { Formik, Form } from "formik";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const LoginForm = ({handleSubmit}) => {
  
return (
  <Formik
    initialValues={{ username: "", password: "" }}
    onSubmit={handleSubmit}
  >
    <Form className="flex flex-col gap-4">
      <Input label="Username" name="username" />
      <Input label="Password" name="password" type="password" />
      <Button type="submit">Login</Button>
    </Form>
  </Formik>
);
};

export default LoginForm;