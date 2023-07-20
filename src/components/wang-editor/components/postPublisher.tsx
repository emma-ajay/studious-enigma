import axios from "axios";

type Props = {
  content: string;
};

const currentDate = new Date();
export const PublishButton = ({ content }: Props) => {
  const handleClick = async (event: any) => {
    event.preventDefault();
    const response = await axios.post(
      "https://cunctus.serveo.net/api/v1/post",
      {
        content: content,
        createdDate: currentDate.getTime().toString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjg5NjgyODEwLCJleHAiOjE2OTAyODc2MTB9.60PdUb82C0r3IrEiG2sYhRbKhN2o_ajrQsjZ23bhAKX_cvA0fLGkV6F5oj7ehcE8O4gC-VUtkGzj_lscFOboCw`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT",
        },
      }
    );
    console.log(response);
  };

  return (
    <div>
      <button onClick={handleClick}>PUBLISH</button>
    </div>
  );
};
