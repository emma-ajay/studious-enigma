import { useEffect } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export default function App() {
  //   const [baseArray, setBaseArray] = useState<Base[]>([
  //     { id: Date.now(), raw: "", isImage: false, isActive: true },
  //   ]);

  //   console.log(baseArray);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    const tokenExpired = token
      ? new Date().getTime() > JSON.parse(atob(token.split(".")[1])).exp * 1000
      : true;

    if (!token || tokenExpired) {
      navigate("/accounts/login");
    }
  }, [navigate]);
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
