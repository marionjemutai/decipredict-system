import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "../../shared/component/Sidebar";
import { DashboardNav } from "../../shared/component/Dashboardnav";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Save, Eye, EyeOff, CheckCircle2, LogOut, Trash2 } from "lucide-react";
import { useProfileSettings }      from "../hooks/useProfileSettings";
import { useNotificationSettings } from "../hooks/useNotificationSettings";
import { useSecuritySettings }     from "../hooks/useSecuritySettings";
import { useAppearanceSettings }   from "../hooks/useAppearanceSettings";

const TABS = [
  { id: "profile",       label: "Profile",       icon: User    },
  { id: "notifications", label: "Notifications", icon: Bell    },
  { id: "security",      label: "Security",      icon: Shield  },
  { id: "appearance",    label: "Appearance",    icon: Palette },
];

function Toggle({ checked, onChange }) {
  return (
    <button type="button" onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-gray-200"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

function SavedToast({ show }) {
  if (!show) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-5">
      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      <p className="text-sm font-medium text-emerald-700">Settings saved successfully.</p>
    </motion.div>
  );
}

function SaveBtn({ onClick, type = "button", disabled = false, label = "Save Changes" }) {
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled}
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
      <Save className="w-4 h-4" /> {label}
    </motion.button>
  );
}

// ── Profile ───────────────────────────────────────────────────────────────────
function ProfileTab() {
  const { name, setName, email, setEmail, bio, setBio, saved, handleSave } = useProfileSettings();
  return (
    <form onSubmit={handleSave} className="space-y-5">
      <SavedToast show={saved} />
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
          {name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">Profile Photo</p>
          <p className="text-xs text-gray-400 mt-0.5">Avatar is generated from your initials</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[{ label: "Full Name", value: name, onChange: setName, type: "text" },
          { label: "Email Address", value: email, onChange: setEmail, type: "email" }].map((f) => (
          <div key={f.label} className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">{f.label}</label>
            <input type={f.type} value={f.value} onChange={(e) => f.onChange(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all" />
          </div>
        ))}
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Bio</label>
        <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us a little about yourself..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <button type="button" className="flex items-center gap-2 text-sm text-rose-500 hover:text-rose-600 font-medium transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
        <SaveBtn type="submit" />
      </div>
    </form>
  );
}

// ── Notifications ─────────────────────────────────────────────────────────────
function NotificationsTab() {
  const { prefs, toggle, saved, handleSave } = useNotificationSettings();
  const rows = [
    { key: "emailAlerts",    label: "Email Alerts",         desc: "Receive important alerts via email"              },
    { key: "predictionDone", label: "Prediction Complete",  desc: "Notify when AI finishes analyzing your decision" },
    { key: "weeklyReport",   label: "Weekly Report",        desc: "Get a weekly summary of your decisions"          },
    { key: "productUpdates", label: "Product Updates",      desc: "News about new features and improvements"        },
    { key: "regretWarnings", label: "High Regret Warnings", desc: "Alert when a decision has high regret risk"      },
  ];
  return (
    <div className="space-y-5">
      <SavedToast show={saved} />
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-semibold text-gray-800">{row.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{row.desc}</p>
            </div>
            <Toggle checked={prefs[row.key]} onChange={() => toggle(row.key)} />
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2 border-t border-gray-100">
        <SaveBtn onClick={handleSave} label="Save Preferences" />
      </div>
    </div>
  );
}

// ── Security ──────────────────────────────────────────────────────────────────
function SecurityTab() {
  const { current, setCurrent, newPass, setNewPass, confirm, setConfirm,
          showCur, setShowCur, showNew, setShowNew, match, canSave, saved, handleSave } = useSecuritySettings();

  const PassField = ({ label, value, onChange, show, onToggle }) => (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <input type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full pr-11 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all" />
        <button type="button" onClick={onToggle} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <SavedToast show={saved} />
      <PassField label="Current Password" value={current} onChange={setCurrent} show={showCur} onToggle={() => setShowCur(p => !p)} />
      <PassField label="New Password"     value={newPass}  onChange={setNewPass}  show={showNew} onToggle={() => setShowNew(p => !p)} />
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Confirm New Password</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 transition-all ${
            confirm && !match ? "border-rose-300 focus:ring-rose-400/30" : "border-gray-200 focus:ring-blue-400/30 focus:border-blue-300"}`} />
        {confirm && !match && <p className="text-xs text-rose-500">Passwords do not match</p>}
      </div>
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
        <p className="text-sm font-semibold text-rose-700 mb-1">Danger Zone</p>
        <p className="text-xs text-rose-600 mb-3">Deleting your account is permanent and cannot be undone.</p>
        <button type="button" className="flex items-center gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors">
          <Trash2 className="w-4 h-4" /> Delete Account
        </button>
      </div>
      <div className="flex justify-end pt-2 border-t border-gray-100">
        <SaveBtn type="submit" disabled={!canSave} label="Update Password" />
      </div>
    </form>
  );
}

// ── Appearance ────────────────────────────────────────────────────────────────
function AppearanceTab() {
  const { theme, setTheme, accent, setAccent, compact, setCompact, saved, handleSave } = useAppearanceSettings();
  const accents = [
    { id: "blue",    color: "bg-blue-500"    },
    { id: "violet",  color: "bg-violet-500"  },
    { id: "emerald", color: "bg-emerald-500" },
    { id: "rose",    color: "bg-rose-500"    },
    { id: "amber",   color: "bg-amber-500"   },
  ];
  return (
    <div className="space-y-6">
      <SavedToast show={saved} />
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Theme</p>
        <div className="grid grid-cols-2 gap-3">
          {[{ id: "light", label: "Light", bg: "bg-white border-gray-200" },
            { id: "dark",  label: "Dark",  bg: "bg-gray-900 border-gray-700" }].map((t) => (
            <button key={t.id} type="button" onClick={() => setTheme(t.id)}
              className={`p-4 rounded-xl border-2 transition-all ${t.bg} ${theme === t.id ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent"}`}>
              <p className={`text-sm font-semibold ${t.id === "dark" ? "text-white" : "text-gray-800"}`}>{t.label}</p>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Accent Color</p>
        <div className="flex gap-3">
          {accents.map((a) => (
            <button key={a.id} type="button" onClick={() => setAccent(a.id)}
              className={`w-8 h-8 rounded-full ${a.color} transition-transform hover:scale-110 ${accent === a.id ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : ""}`} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <p className="text-sm font-semibold text-gray-800">Compact Mode</p>
          <p className="text-xs text-gray-400 mt-0.5">Reduce spacing for a denser layout</p>
        </div>
        <Toggle checked={compact} onChange={setCompact} />
      </div>
      <div className="flex justify-end pt-2 border-t border-gray-100">
        <SaveBtn onClick={handleSave} label="Save Appearance" />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const TAB_CONTENT = {
    profile:       <ProfileTab />,
    notifications: <NotificationsTab />,
    security:      <SecurityTab />,
    appearance:    <AppearanceTab />,
  };
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-md">
                  <SettingsIcon className="w-5 h-5 text-white" />
                </div>
                Settings
              </h1>
              <p className="text-gray-500 text-sm mt-1">Manage your account, preferences, and security.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border border-gray-100 shadow-sm">
                  <CardContent className="p-3">
                    <nav className="space-y-1">
                      {TABS.map(({ id, label, icon: Icon }) => (
                        <button key={id} onClick={() => setActiveTab(id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            activeTab === id ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}>
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          {label}
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div className="lg:col-span-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-gray-800">
                      {TABS.find((t) => t.id === activeTab)?.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    {TAB_CONTENT[activeTab]}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
