import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const ChallengeContext = React.createContext(null);

export const ChallengeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [challenges, setChallenges] = useState([]);
  const [addChallenge, setAddChallenge] = useState({});

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/getproblems`);
        setChallenges(res.data);
        // console.log(challenges);
      } catch (error) {
        console.log("err fetching challenges", error);
      }
    };
    fetchChallenges();
  }, []);

  console.log('challenges',challenges);

  return (
    <ChallengeContext.Provider
      value={{ challenges, setChallenges, setAddChallenge, addChallenge }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenge = () => useContext(ChallengeContext);
