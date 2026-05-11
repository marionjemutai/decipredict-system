import { useState } from "react";

export function useSecuritySettings() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCur, setShowCur] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved]     = useState(false);

  const match    = newPass === confirm;
  const canSave  = current && newPass && confirm && match;

  const handleSave = (e) => {
    e.preventDefault();
    if (!canSave) return;
    // TODO: call PATCH /api/user/password
    setSaved(true);
    setCurrent(""); setNewPass(""); setConfirm("");
    setTimeout(() => setSaved(false), 3000);
  };

  return {
    current, setCurrent,
    newPass, setNewPass,
    confirm, setConfirm,
    showCur, setShowCur,
    showNew, setShowNew,
    match, canSave, saved,
    handleSave,
  };
}
