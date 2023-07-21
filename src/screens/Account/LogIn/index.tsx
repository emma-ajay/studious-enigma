import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../../components/Input";

import { Link, useNavigate } from "react-router-dom";
import { API } from "../../../controllers/API";

export const Login = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const initialValues = {
    // username: "",
    email: "",
    password: "",
    lastLogin: timestamp,
  };
  const validation = Yup.object().shape({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    API.post(`/api/v1/auth/signin`, values)
      .then((response) => {
        window.localStorage.setItem(
          "Token",
          JSON.stringify(response.data.accessToken)
        );
        window.localStorage.setItem(
          "ID",
          JSON.stringify(response.data.role[0].id)
        );
        window.localStorage.setItem(
          "Role",
          JSON.stringify(response.data.role[0].name)
        );
        window.localStorage.setItem(
          "UserName",
          JSON.stringify(response.data.profile.name)
        );
        navigate("/");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          return (
            <Form>
              <Input name="email" label="Email:" type="text" required />
              <Input
                name="password"
                label="Password:"
                type="password"
                required
              />
              <button
                disabled={formikProps.isSubmitting}
                type="submit"
                className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};