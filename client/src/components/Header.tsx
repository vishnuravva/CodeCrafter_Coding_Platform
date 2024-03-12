// import { ThemeToggler } from "./ThemeToggler";
import { SignInButton, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggler } from "./ThemeToggler";
import { NavComp } from "./NavComp";
import { Code2 } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback } from "react";
import { useAppUsers } from "../context/useAppUsers";

function Header() {
  const { user } = useAppUsers();
  // console.log(user?.user.avatar)
  const navigateTo = useNavigate();
  const handleLogout = useCallback(() => {
    localStorage.removeItem("codecrafter_token");
    localStorage.removeItem("userId");
    navigateTo("/user");
  }, []);
  return (
    <header className="flex sm:flex-row flex-col justify-around items-center w-full p-4">
      {/* logo starts*/}
      <Link to={"/"}>
        <div className="flex items-center">
          {/* <img width={80} height={80} src={code2} /> */}
          <Code2 width={40} height={40} />
          <p className="font-bold text-xl sm:text-2xl text-black dark:text-white ml-2">
            CodeCrafter
          </p>
        </div>
      </Link>
      {/* logo ends*/}

      <div>
        <NavComp />
      </div>
      <div className="flex items-center">
        <div>
          <ThemeToggler />
        </div>
        {/* <div className="ml-4">
          <UserButton afterSignOutUrl="/" />

          <SignedOut>
            <SignInButton afterSignInUrl="/challenges" mode="modal" />
          </SignedOut>
        </div> */}
        {localStorage.getItem("codecrafter_token") ? (
          <>
            <Button onClick={handleLogout} className="ml-2">
              Logout
            </Button>
            <img src={user?.user?.avatar} alt="profile" className="w-10 h-10 rounded-full ml-4" />
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
    </header>
  );
}

export default Header;
