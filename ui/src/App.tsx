import { useState, type JSX } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/" , {replace:true});
  };

  return (
    <div>
      <h1>Home</h1>
      <p>Login successful</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthed = !!localStorage.getItem("accessToken");
  return isAuthed ? children : <Navigate to="/" replace />;
}

function Login({
  onSubmit,
  username,
  password,
  setUsername,
  setPassword,
}: {
  onSubmit: (e: React.FormEvent) => void;
  username: string;
  password: string;
  setUsername: (v: string) => void;
  setPassword: (v: string) => void;
}) {
  // Eğer token zaten varsa, login ekranına uğramadan home'a at:
  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      <div className="form-holder">
        <h1 style={{ color: "#D37506" }}>Welcome to Sorgu App</h1>
        <form className="login-form" onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <button className="ping-button" onClick={() => fetch("http://localhost:3030")}>
          Ping server
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginButton = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginRequest: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    try {
      const response = await fetch("http://localhost:3030/auth/sign-in", loginRequest);
      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      const token = data.accessToken; // backend zaten accessToken döndürüyor
      if (!token) throw new Error("Token has not found");

      localStorage.setItem("accessToken", token);
      navigate("/home", { replace: true }); // ✅ yönlendirme
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login
            onSubmit={loginButton}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
