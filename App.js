import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Login from "./Login";
import { Container, Navbar, Card, Button, Spinner, Image, Toast } from "react-bootstrap";
import "./App.css";
import authIcon from "./thumb_16414822290_icrosoft__uthenticator.webp"; // Import the WEBP icon

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false); // Toast notification state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ✅ FINAL FIX: NO MORE ALERT() - ONLY SHOW TOAST
  const handleLogout = () => {
    if (auth.currentUser) {
      auth.signOut();
    } else {
      setShowToast(true); // Trigger Bootstrap toast
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm" style={{ height: "60px" }}>
        <Container>
          <Navbar.Brand href="#"></Navbar.Brand> {/* Empty Navbar */}
        </Container>
      </Navbar>

      {/* Toast Notification for No User Logged In */}
      <div className="toast-container">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide className="custom-toast">
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>No user is currently logged in.</Toast.Body>
        </Toast>
      </div>

      {/* Main Content */}
      <Container
        fluid
        className="d-flex flex-column align-items-center justify-content-center text-center main-container"
      >
        {loading ? (
          <div className="text-center fade-in">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Verifying your session, please wait...</p>
          </div>
        ) : user ? (
          // === Custom Welcome Message After Login ===
          <Card className="text-center shadow-lg p-4 auth-card fade-in">
            <Card.Body>
              <h2 className="mb-3 fw-bold">Welcome to Firebase Auth App</h2>
              <p className="custom-message">
                This app is built for secure authentication using Google, GitHub, and Microsoft.
                It is developed by <strong>Gift Mthombeni</strong>, a passionate developer specializing in AI-driven and modern web technologies.
              </p>
              <p className="custom-message">
                The purpose of this application is to provide a seamless authentication experience with Firebase, ensuring both security and user-friendliness.
              </p>
              <p className="custom-message">
                Explore, learn, and integrate authentication features into your own projects!
              </p>
              <hr />
              <Button variant="danger" className="w-100 logout-btn" onClick={handleLogout}>
                Logout
              </Button>
            </Card.Body>
          </Card>
        ) : (
          // === Show Login UI Before Authentication ===
          <>
            <div className="auth-header fade-in">
              <h2 className="fw-bold">Firebase Authentication</h2>
              <p className="text-muted">Access your dashboard securely using your preferred sign-in method.</p>
              <Image src={authIcon} alt="Authenticator Icon" className="auth-icon mt-3" />
            </div>
            <Login />
          </>
        )}
      </Container>

      {/* Footer */}
      <footer className="text-center footer">
        <small>developed by Gift Mthombeni</small>
      </footer>
    </>
  );
};

export default App;
