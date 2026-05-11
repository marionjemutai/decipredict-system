import { useState } from "react";

export function useAppearanceSettings() {
  const [theme, setTheme]     = useState("light");
  const [accent, setAccent]   = useState("blue");
  const [compact, setCompact] = useState(false);
  const [saved, setSaved]     = useState(false);

  const handleSave = () => {
    // TODO: persist to localStorage or PATCH /api/user/appearance
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return { theme, setTheme, accent, setAccent, compact, setCompact, saved, handleSave };
}
