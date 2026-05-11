import { useState } from "react";

export function useProfileSettings() {
  const [name, setName]   = useState("Kiprotich Marion");
  const [email, setEmail] = useState("marion@example.com");
  const [bio, setBio]     = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: call PATCH /api/user/profile
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return { name, setName, email, setEmail, bio, setBio, saved, handleSave };
}
