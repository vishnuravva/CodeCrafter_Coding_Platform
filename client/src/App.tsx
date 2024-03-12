import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminHome from "./pages/admin/Home";
import Challenge from "./pages/Challenge";
import Challenges from "./pages/Challenges";
import Dashboard from "./pages/Dashboard";
import AdmAddChallenges from "./pages/admin/AddChallenges";
import AdmChallenges from "./pages/admin/AdmChallenges";
import CodeReview from "./components/CodeReview";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/admin/Users";
import Rankings from "./pages/Rankings";

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenges/:id" element={<Challenge />} />
          <Route path="/:userId" element={<Dashboard />} />
          <Route path="/user" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/rankings" element={<Rankings />} />

          <Route
            path="/codereview"
            element={<CodeReview isHeader={true} isTitle={true} />}
          />

          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/addchallenges" element={<AdmAddChallenges />} />
          <Route path="/admin/challenges" element={<AdmChallenges />} />
          <Route path="/admin/users" element={<Users />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
