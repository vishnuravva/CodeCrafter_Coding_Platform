import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className="flex flex-col p-8 justify-center items-center w-full">
      <div className="w-3/4 p-4 flex flex-col items-center justify-center text-center my-8">
        {/* <p className="sm:text-2xl text-base">
          Unlock the full potential of your coding skills with Codepark, the
          ultimate platform for JavaScript and Java developers.
        </p> */}
        <p className="text-2xl sm:text-5xl lg:text-7xl font-bold -tracking-tight">We love coding</p>
        <p className="text-2xl sm:text-5xl lg:text-7xl font-boJavald -tracking-tight">But, what if there was also AI that helps you</p>
        {/* <p>Embark on a journey to:</p> */}
        {/* <ul className="list-disc pl-6">
          <li>Master intricate algorithms and data structures.</li>
          <li>
            Solve real-world coding challenges curated for JavaScript and Java
            enthusiasts.
          </li>
          <li>
            Sharpen your problem-solving abilities through hands-on coding
            exercises.
          </li>
          <li>
            Stay ahead with the latest industry trends and best practices.
          </li>
        </ul> */}
        {/* <p>
          Whether you're a seasoned developer or just starting your coding
          adventure, Codepark provides a supportive environment to enhance your
          problem-solving skills and elevate your coding expertise. Join us in
          the quest for coding excellence!
        </p> */}
      </div>
      <div className="w-full py-8 flex items-center justify-center">
        <Link to={"/challenges"}>
            <Button size={"lg"}>Get Started</Button>
        </Link>
        {/* <Link className="ml-4" href={"/challenges"}>
            <Button>Get Started</Button>
        </Link> */}
      </div>
      {/* <div className="w-full p-4 flex items-center justify-center">
            <Image 
            src={"/images/landing_image.png"}
            alt="landing image"
            width={500}
            height={500}
            />
      </div> */}

      

    </section>
  );
}

export default Landing;
