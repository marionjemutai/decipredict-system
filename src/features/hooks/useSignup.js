import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const [name, setName]             = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const navigate = useNavigate();

  const passwordMatch = password === confirm;
  const canSubmit = name.trim() && email.trim() && password.trim() && confirm.trim() && passwordMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    try {
      // TODO: replace with your real backend URL
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error("Registration failed. Please try again.");

      // TODO: store token if returned — e.g. localStorage.setItem("token", data.token)
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirm, setConfirm,
    showPass, setShowPass,
    showConfirm, setShowConfirm,
    loading, error, canSubmit, passwordMatch,
    handleSubmit,
  };
}
