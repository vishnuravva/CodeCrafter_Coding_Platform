import { Code2 } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "../components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigateTo = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    avatar: "",
    country: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registerData.email || !registerData.password || !registerData.country)
      return toast({
        variant: "destructive",
        title: "Email and Password are required",
      });

    let response;
    try {
      response = await axios.post("http://localhost:5000/api/signup", {
        email: registerData.email,
        password: registerData.password,
        country: registerData.country,
      });
      // Handle successful registration
      console.log(response.data);

      if (response.data.user) {
        toast({
          variant: "success",
          title: "Registration Successful",
        });
        navigateTo("/user");
      } else {
        return toast({
          variant: "destructive",
          title: `${response.data.message}`,
        });
      }
    } catch (error) {
      // Handle registration error
      console.error(error);
      return toast({
        variant: "destructive",
        title: "Registration failed",
      });
    }
  };

  // const handleProfilePictureChange = useCallback((e) => {
  //   const file = e.target.files[0];
  //   // console.log("files", e.target.files);
  //   setRegisterData((prev) => ({
  //     ...prev,
  //     avatar: file,
  //   }));
  // }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center border p-6 min-w-[500px]">
        <div className="flex flex-col justify-center items-center my-4 w-full">
          <Code2 width={60} height={60} />
          <h1 className="text-xl font-bold">Create an account</h1>
        </div>
        <div className="w-full">
          <Label htmlFor="email">Email Address</Label>
          <Input
            onChange={handleChange}
            value={registerData.email}
            name="email"
            className="my-2"
            type="email"
            placeholder="Enter your email address here"
          />
        </div>
        {/* <div className="w-full my-4">
          <Label htmlFor="avatar">Profile Picture</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            name="avatar"
            className="my-2"
          />
          {registerData.avatar && (
            <img
              src={URL.createObjectURL(registerData?.avatar)}
              alt="Profile"
              className="mt-2 w-20 h-20 rounded-full"
            />
          )}
        </div> */}
        <div className="w-full my-4">
          <Label htmlFor="country">Country</Label>
          <Input
            onChange={handleChange}
            value={registerData.country}
            name="country"
            className="my-2"
            type="country"
            placeholder="Enter country"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={handleChange}
            value={registerData.password}
            name="password"
            className="my-2"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Register
        </Button>
        <Button variant={"outline"} className="my-2 font-bold">
          Already have an account?
          <Link className="ml-1" to={"/user"}>
            Login
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Signup;
