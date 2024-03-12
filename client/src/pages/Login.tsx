import { Code2 } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "../components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAppUsers } from "../context/useAppUsers";

const Login = () => {
  const { user, setUser } = useAppUsers();
  const navigateTo = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    adminemail: "",
    adminpassword: "",
  });
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password)
      return toast({
        variant: "destructive",
        title: "All fields are required",
      });

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: loginData.email,
        password: loginData.password,
      });
      // Handle successful login
      console.log(response.data);

      if (response.data.isLoggedIn) {
        toast({
          variant: "success",
          title: "Login Successful",
        });
      }
      if (response.data.user.role === "user") {
        console.log("user navigating to users page");
        localStorage.setItem("codecrafter_token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        navigateTo("/");
      } else {
        console.log("admin navigating to admin page");
        localStorage.setItem("codecrafter_token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        navigateTo("/admin");
      }

      // Redirect user to dashboard or home page
    } catch (error) {
      // Handle login error
      return toast({
        variant: "destructive",
        title: `Invalid Credentials`,
      });
    }
  };

  console.log("user123", user);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Tabs defaultValue="user" className="w-[500px]">
        
        <TabsContent value="user">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <CardTitle>
                <Code2 width={60} height={60} />
              </CardTitle>
              <CardDescription className="text-xl font-bold">
                Codecrafter Login
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col justify-center items-center my-4 w-full">
                <div className="w-full">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    onChange={handleChange}
                    value={loginData.email}
                    name="email"
                    className="my-2"
                    type="email"
                    placeholder="Enter your email address here"
                  />
                </div>
                <div className="w-full my-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    onChange={handleChange}
                    value={loginData.password}
                    name="password"
                    className="my-2"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button onClick={handleSubmit} className="w-full">
                Login
              </Button>
              <Button variant={"outline"} className="my-2 font-bold">
                Don't have an account?
                <Link className="ml-1" to={"/signup"}>
                  Register
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        {/* <TabsContent value="admin">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <CardTitle>
                <Code2 width={60} height={60} />
              </CardTitle>
              <CardDescription className="text-xl font-bold">
                Codecrafter Admin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col justify-center items-center my-4 w-full">
                <div className="w-full">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    onChange={handleChange}
                    value={loginData.adminemail}
                    name="adminemail"
                    className="my-2"
                    type="email"
                    placeholder="Enter your email address here"
                  />
                </div>
                <div className="w-full my-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    onChange={handleChange}
                    value={loginData.adminpassword}
                    name="adminpassword"
                    className="my-2"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button onClick={handleSubmit} className="w-full">
                Login
              </Button>
              <Button disabled variant={"outline"} className="my-2 font-bold">
                Note : This is for admin users
              </Button>
            </CardFooter>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default Login;
