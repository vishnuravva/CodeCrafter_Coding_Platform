// import { AdmSidebar } from "./AdmSidebar";

import { Link, useNavigate } from "react-router-dom";
import { ThemeToggler } from "../ThemeToggler";
import { AdmNavComp } from "./AdmNavComp";
import { Code2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAppUsers } from "../../context/useAppUsers";
import { useCallback } from "react";

const AdmNav = () => {
  const { user } = useAppUsers();
  // console.log(user?.user.avatar)
  const navigateTo = useNavigate();
  const handleLogout = useCallback(() => {
    localStorage.removeItem("codecrafter_token");
    localStorage.removeItem("userId");
    navigateTo("/user");
  }, []);

  return (
    <div className="w-full p-4 flex justify-around items-center border-b">
      {/* <AdmSidebar /> */}
      <div className="">
        <Link to={"/admin"}>
          <div className="flex items-center">
            {/* <img width={80} height={80} src={code2} /> */}
            <Code2 width={40} height={40} />
            <p className="font-bold text-xl sm:text-2xl text-black dark:text-white ml-2">
              CodeCrafter
            </p>
          </div>
        </Link>
      </div>
      {/* <Link to={"/admin/challenges"}><Button variant={"outline"}>Challenges</Button></Link> */}
      <AdmNavComp />
      

      <div className="flex">
      <div className="flex mr-4">
        {localStorage.getItem("codecrafter_token") ? (
          <>
            <Button onClick={handleLogout} className="ml-2">
              Logout
            </Button>
            <img
              src={user?.user?.avatar}
              alt="profile"
              className="w-10 h-10 rounded-full ml-4"
            />
          </>
        ) : (
          <>
            <Button className="ml-2">
              <Link to={"/user"}>Login</Link>
            </Button>
            <Button className="ml-2">
              <Link to={"/signup"}>Sign up</Link>
            </Button>
          </>
        )}
      </div>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default AdmNav;
