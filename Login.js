import React from "react";
import { auth, googleProvider, githubProvider, microsoftProvider } from "./firebase";
import { signInWithPopup, signOut, fetchSignInMethodsForEmail, linkWithCredential } from "firebase/auth";
import { Button, Container, Card } from "react-bootstrap";

const Login = () => {
  const handleLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error.message);

      // Handle account linking issue
      if (error.code === "auth/account-exists-with-different-credential") {
        const email = error.customData?.email;
        const pendingCredential = error.credential;

        if (email) {
          const signInMethods = await fetchSignInMethodsForEmail(auth, email);

          if (signInMethods.length > 0) {
            alert(`Your email is already registered with ${signInMethods[0]}. Please log in with that provider first.`);

            try {
              // Log in with the existing provider
              const existingProvider = getProvider(signInMethods[0]);
              const existingUser = await signInWithPopup(auth, existingProvider);

              // After login, link the new credential to the existing account
              await linkWithCredential(existingUser.user, pendingCredential);
              console.log("Accounts successfully linked!");
            } catch (linkingError) {
              console.error("Error linking accounts:", linkingError.message);
            }
          }
        }
      } else {
        alert("Authentication failed. Please try again.");
      }
    }
  };

  // Function to return the correct provider
  const getProvider = (providerId) => {
    switch (providerId) {
      case "google.com":
        return googleProvider;
      case "github.com":
        return githubProvider;
      case "microsoft.com":
        return microsoftProvider;
      default:
        throw new Error("Unsupported provider");
    }
  };

  // ✅ FIX: Ensure a user is logged in before calling signOut()
  const handleLogout = async () => {
    if (auth.currentUser) {
      try {
        await signOut(auth);
        console.log("User logged out successfully.");
      } catch (error) {
        console.error("Logout Error:", error.message);
      }
    } else {
      alert("No user is currently logged in.");
      console.warn("No user is currently logged in.");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Card className="p-4 text-center shadow border-0 rounded" style={{ width: "380px", backgroundColor: "white" }}>
        <h3 className="mb-3 fw-bold">Select a Sign-in Method</h3>
        <Button variant="danger" className="mb-2 w-100" onClick={() => handleLogin(googleProvider)}>
          Sign in with Google
        </Button>
        <Button variant="dark" className="mb-2 w-100" onClick={() => handleLogin(githubProvider)}>
          Sign in with GitHub
        </Button>
        <Button variant="info" className="w-100" onClick={() => handleLogin(microsoftProvider)}>
          Sign in with Microsoft
        </Button>
        <hr className="my-3" />
        <Button variant="secondary" className="mt-2 w-100" onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </Container>
  );
};

export default Login;
