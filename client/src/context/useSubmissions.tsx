import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const SubmissionContext = React.createContext(null);

export const SubmissionContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [submissions, setSubmissions] = useState();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/allsubmissions`);
        setSubmissions(res.data);
      } catch (error) {
        console.log("err fetching challenges", error);
      }
    };
    fetchSubmissions();
  }, []);

  console.log("submissions", submissions);
  return (
    <SubmissionContext.Provider value={{ submissions }}>
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmissions = () => useContext(SubmissionContext);
