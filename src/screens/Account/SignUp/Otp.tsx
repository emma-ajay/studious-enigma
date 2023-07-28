import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { API } from "../../../controllers/API";

export const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState<string>("");
  const { userMail } = useParams();

  const handleChange = (event: any) => {
    const value = event.target.value;
    setOTP(value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    API.post(`/api/v1/auth/activate/${userMail}?otp=${otp}`)
      .then((response) => {
        console.log(response);
        navigate("/accounts/login");
      })
      .catch();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Enter your OTP</label>
        <input
          name="input"
          type="text"
          value={otp}
          onChange={handleChange}
        ></input>
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
