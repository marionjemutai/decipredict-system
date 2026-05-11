import { useState } from "react";

export function useNotificationSettings() {
  const [prefs, setPrefs] = useState({
    emailAlerts:    true,
    predictionDone: true,
    weeklyReport:   false,
    productUpdates: true,
    regretWarnings: true,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = () => {
    // TODO: call PATCH /api/user/notifications
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return { prefs, toggle, saved, handleSave };
}
