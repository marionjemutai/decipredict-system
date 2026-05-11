import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const navigate = useNavigate();

  const canSubmit = email.trim() && password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    try {
      // TODO: uncomment when backend is ready
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error("Invalid email or password.");
      // const data = await res.json();
      // localStorage.setItem("token", data.token);

      // Temporary: navigate directly until backend is connected
      await new Promise((r) => setTimeout(r, 800)); // simulate brief loading
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    email, setEmail,
    password, setPassword,
    showPass, setShowPass,
    loading, error, canSubmit,
    handleSubmit,
  };
}
