import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { ChallengeProvider } from "./context/useChallenges.tsx";
import { UserContextProvider } from "./context/useAppUsers.tsx";
import { SubmissionContextProvider } from "./context/useSubmissions.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
//       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

//       <Toaster />
//       <ChallengeProvider>
//         <App />
//         </ChallengeProvider>
//       </ThemeProvider>
//     </ClerkProvider>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserContextProvider>
    <SubmissionContextProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <ChallengeProvider>
        <App />
      </ChallengeProvider>
    </ThemeProvider>
    </SubmissionContextProvider>
  </UserContextProvider>
);
