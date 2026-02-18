import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
        } else {
        setError(data.message || "Invalid email or password");
        }
    } catch (err) {
        setError("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
};



  return (
    <div className="auth-page">
        <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>

        <form onSubmit={handleLogin} className="auth-form">
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            />

            <button type="submit" disabled={loading} className="auth-btn">
                {loading ? "Logging in..." : "Login"}
            </button>

            {error && <div className="auth-error">{error}</div>}
        </form>

        <div className="auth-footer">
            Don’t have an account? <Link to="/register">Register</Link>
        </div>
        </div>
    </div>
);
}
