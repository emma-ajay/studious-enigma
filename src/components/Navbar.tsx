import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const location = useLocation();

  const user = localStorage.getItem('UserName')

  // Function to determine if a segment is active based on its path
  const isSegmentActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('UserName')
    localStorage.removeItem('Token')
    localStorage.removeItem('ID')
    localStorage.removeItem('Role')
    window.location.reload()
  }

  return (
    <div className="py-3 my-6 flex flex-row items-center justify-between">
      <Link to={"/"} className="shadows text-5xl">
        ola<span className="text-[#FF86A5]">y</span>inks
      </Link>
      <div className="flex space-x-14">
        <ul className="flex items-center space-x-12 inter text-[#787878] font-medium text-base">
          <li>
            <Link
              to={"/allposts"}
              className={isSegmentActive("/allposts") ? "active-link" : ""}
            >
              All Posts
            </Link>
          </li>
          <li>
            <Link
              to={"/myposts"}
              className={isSegmentActive("/myposts") ? "active-link" : ""}
            >
              My Posts
            </Link>
          </li>
          <li>
            <Link
              to={"/drafts"}
              className={isSegmentActive("/drafts") ? "active-link" : ""}
            >
              My Drafts
            </Link>
          </li>
          <li>
            <Link
              to={"/edit"}
              className={isSegmentActive("/edit") ? "active-link" : ""}
            >
              New Post
            </Link>
          </li>
          {user && <li onClick={handleLogout} className="cursor-pointer">Log Out</li>}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
