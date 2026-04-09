import { Sun, Moon, Bell, BellOff, Zap } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { NewsCategory } from "@/data/mockNews";
import { Switch } from "@/components/ui/switch";

const allInterests: { label: NewsCategory; emoji: string }[] = [
  { label: "Sports", emoji: "⚽" },
  { label: "Tech", emoji: "💻" },
  { label: "Politics", emoji: "🏛️" },
  { label: "Business", emoji: "📈" },
  { label: "Health", emoji: "🏥" },
];
const readingModes = ["Quick", "Normal", "Detailed"] as const;

const SettingsPage = () => {
  const {
    interests, toggleInterest,
    readingMode, setReadingMode,
    darkMode, toggleDarkMode,
    notifications, toggleNotifications,
    quickRead, toggleQuickRead,
  } = useApp();

  return (
    <div className="px-4 pt-6 pb-24 max-w-2xl mx-auto space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Customize your experience</p>
      </div>

      {/* Interests */}
      <section className="bg-card rounded-2xl p-5 shadow-card animate-fade-in">
        <h2 className="font-semibold text-foreground mb-3 text-sm">Your Interests</h2>
        <div className="flex flex-wrap gap-2">
          {allInterests.map(({ label, emoji }) => (
            <button
              key={label}
              onClick={() => toggleInterest(label)}
              className={`chip flex items-center gap-1.5 transition-transform duration-200 hover:scale-105 ${
                interests.includes(label) ? "chip-active" : "chip-inactive"
              }`}
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Reading Mode */}
      <section className="bg-card rounded-2xl p-5 shadow-card animate-fade-in">
        <h2 className="font-semibold text-foreground mb-3 text-sm">Reading Mode</h2>
        <div className="flex gap-2">
          {readingModes.map((mode) => (
            <button
              key={mode}
              onClick={() => setReadingMode(mode)}
              className={`chip flex-1 text-center transition-transform duration-200 hover:scale-105 ${
                readingMode === mode ? "chip-active" : "chip-inactive"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </section>

      {/* Toggles */}
      <section className="bg-card rounded-2xl shadow-card divide-y divide-border animate-fade-in">
        <ToggleRow
          icon={darkMode ? <Moon size={18} /> : <Sun size={18} />}
          label="Dark Mode"
          description="Switch between light and dark themes"
          active={darkMode}
          onToggle={toggleDarkMode}
        />
        <ToggleRow
          icon={notifications ? <Bell size={18} /> : <BellOff size={18} />}
          label="Notifications"
          description="Receive breaking news alerts"
          active={notifications}
          onToggle={toggleNotifications}
        />
        <ToggleRow
          icon={<Zap size={18} />}
          label="Quick Read Mode"
          description="Show shorter summaries everywhere"
          active={quickRead}
          onToggle={toggleQuickRead}
        />
      </section>
    </div>
  );
};

const ToggleRow = ({
  icon, label, description, active, onToggle,
}: {
  icon: React.ReactNode; label: string; description: string; active: boolean; onToggle: () => void;
}) => (
  <div className="flex items-center justify-between px-5 py-4">
    <div className="flex items-center gap-3">
      <span className="text-primary">{icon}</span>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
    <Switch checked={active} onCheckedChange={onToggle} />
  </div>
);

export default SettingsPage;
