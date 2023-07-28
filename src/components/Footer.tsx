import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="mb-20 mt-28 inter pt-12 border-t-[1px] border-black flex justify-between">
      <div className="">
        <Link to={"/"} className="shadows text-5xl mb-4 inline-block">
          ola<span className="text-[#FF86A5]">y</span>inks
        </Link>
        <p className="font-medium">
          No 14 Idowu Martins Street <br />
          Victoria Island, Lagos
        </p>
      </div>
      <div className="basis-1/4 flex justify-between text-left">
        <ul>
          <li>Contact Us</li>
          <li>Our Values</li>
          <li>Accessibility</li>
        </ul>
        <ul className="text-left">
          <li>Privacy Policy</li>
          <li>
            <a href="https://blog.yinka.tech">Blog</a>{" "}
          </li>
          <li>Terms and Conditions</li>
        </ul>
      </div>
    </div>
  );
};
