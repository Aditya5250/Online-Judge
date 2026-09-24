import { useState } from "react";
import { User, ShieldCheck, Copy, Check, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const DEMO_ACCOUNTS = [
  {
    role: "User",
    title: "Demo User",
    email: "judgexuser@gmail.com",
    password: "@user_01",
    icon: User,
    badgeColor: "bg-white/10 text-gray-300 border-white/10",
  },
  {
    role: "Admin",
    title: "Demo Admin",
    email: "judgexadmin@gmail.com",
    password: "@admin_01",
    icon: ShieldCheck,
    badgeColor: "bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30",
  },
];

const DemoAccounts = ({ onSelectAccount }) => {
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (text, keyName, label) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(keyName);
      toast.success(`Copied ${label}!`, {
        id: `copy-${keyName}`,
        duration: 1500,
      });
      setTimeout(() => {
        setCopiedKey((prev) => (prev === keyName ? null : prev));
      }, 1500);
    }
  };

  return (
    <div className="mt-5 pt-4 border-t border-[var(--border)]">
      {/* Header Divider */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Sparkles size={13} className="text-[var(--accent)]" />
          <span className="text-xs font-semibold tracking-wide text-gray-300">
            Demo Accounts
          </span>
        </div>
        <span className="text-[10px] text-gray-500 font-medium">
          For interviewers & testing
        </span>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {DEMO_ACCOUNTS.map((acc) => {
          const Icon = acc.icon;
          const emailKey = `${acc.role}-email`;
          const passKey = `${acc.role}-pass`;

          return (
            <div
              key={acc.role}
              className="
                group
                flex
                flex-col
                justify-between
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--bg-primary)]/80
                p-3
                transition-all
                duration-200
                hover:border-[var(--accent)]/50
                hover:bg-[var(--bg-primary)]
              "
            >
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/5 text-[var(--accent)]">
                    <Icon size={12} />
                  </div>
                  <span className="text-xs font-semibold text-white truncate">
                    {acc.title}
                  </span>
                </div>

                <span
                  className={`
                    shrink-0
                    rounded
                    border
                    px-1.5
                    py-0.5
                    text-[10px]
                    font-medium
                    ${acc.badgeColor}
                  `}
                >
                  {acc.role}
                </span>
              </div>

              {/* Credentials Rows */}
              <div className="space-y-1.5 text-[11px]">
                {/* Email */}
                <div className="flex items-center justify-between gap-1.5 rounded-lg bg-[var(--bg-secondary)] px-2 py-1">
                  <span className="truncate text-gray-400 font-mono text-[10px]" title={acc.email}>
                    {acc.email}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(acc.email, emailKey, `${acc.role} Email`)}
                    className="shrink-0 text-gray-400 hover:text-[var(--accent)] transition-colors p-0.5"
                    title="Copy Email"
                  >
                    {copiedKey === emailKey ? (
                      <Check size={11} className="text-green-400" />
                    ) : (
                      <Copy size={11} />
                    )}
                  </button>
                </div>

                {/* Password */}
                <div className="flex items-center justify-between gap-1.5 rounded-lg bg-[var(--bg-secondary)] px-2 py-1">
                  <span className="text-gray-300 font-mono text-[10px]">
                    {acc.password}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(acc.password, passKey, `${acc.role} Password`)}
                    className="shrink-0 text-gray-400 hover:text-[var(--accent)] transition-colors p-0.5"
                    title="Copy Password"
                  >
                    {copiedKey === passKey ? (
                      <Check size={11} className="text-green-400" />
                    ) : (
                      <Copy size={11} />
                    )}
                  </button>
                </div>
              </div>

              {/* Optional 1-click Auto-fill Button (Login page) */}
              {onSelectAccount && (
                <button
                  type="button"
                  onClick={() => onSelectAccount({ email: acc.email, password: acc.password })}
                  className="
                    mt-2.5
                    w-full
                    rounded-lg
                    border
                    border-[var(--border)]
                    bg-white/5
                    py-1
                    text-[11px]
                    font-medium
                    text-[var(--accent)]
                    transition-all
                    hover:border-[var(--accent)]/50
                    hover:bg-[var(--accent)]/10
                  "
                >
                  Auto-fill Form
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DemoAccounts;
