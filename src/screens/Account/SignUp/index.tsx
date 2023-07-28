import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../../components/Input";

import { useNavigate } from "react-router-dom";
import { API } from "../../../controllers/API";

export const SignUp = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    createdDate: timestamp,
  };
  const validation = Yup.object().shape({
    name: Yup.string().required("Required"),
    username: Yup.string().required().min(2, "A username is Required"),
    email: Yup.string().email().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
        "Password must contain at least one uppercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const handleSubmit = (values: {
    name: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    createdDate: any;
  }) => {
    API.post(`/api/v1/auth/register/creator`, values)
      .then(() => {
        navigate(`/accounts/otp`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        // onSubmit={submit}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          return (
            <Form>
              <Input name="name" label="Name:" type="text" required placeholder={""} />
              <Input name="username" label="Username:" type="text" required placeholder={""} />
              <Input name="email" label="Email:" type="text" required placeholder={""} />
              <Input
                name="phoneNumber"
                label="Phone Number:"
                type="text"
                required placeholder={""}              />
              <Input
                name="password"
                label="Password:"
                type="password"
                required placeholder={""}              />
              <Input
                name="confirmPassword"
                label="Confirm Password:"
                type="password"
                required placeholder={""}              />
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
