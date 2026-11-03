
import { useState } from "react";
import {
  Activity,
  Brain,
  Code2,
  Command,
  Home,
  MessageSquare,
  Settings,
  Sparkles,
  Terminal,
  Timer,
  Zap,
} from "lucide-react";

const actions = [
  {
    title: "Start DSA",
    description: "Open your coding environment",
    icon: Brain,
    color: "text-violet-400",
    target: "dsa",
  },
  {
    title: "Open VS Code",
    description: "Launch your code editor",
    icon: Code2,
    color: "text-blue-400",
    target: "vscode",
  },
  {
    title: "Open LeetCode",
    description: "Practice coding problems",
    icon: Terminal,
    color: "text-orange-400",
    target: "leetcode",
  },
  {
    title: "Open ChatGPT",
    description: "Ask questions and learn",
    icon: MessageSquare,
    color: "text-green-400",
    target: "chatgpt",
  },
] as const;

function App() {
  const [command, setCommand] = useState("");
  const [status, setStatus] = useState("Ready when you are.");

  async function handleAction(target: string) {
    try {
      setStatus("Working on it...");

      const result =
        target === "dsa"
          ? await window.aether.startDSA()
          : await window.aether.openTarget(
              target as "vscode" | "leetcode" | "chatgpt"
            );

      setStatus(result.message);
    } catch {
      setStatus("Action failed. Check the desktop app setup.");
    }
  }

  function handleCommand() {
    const value = command.toLowerCase().trim();

    if (value.includes("dsa")) {
      void handleAction("dsa");
    } else if (value.includes("vscode") || value.includes("vs code")) {
      void handleAction("vscode");
    } else if (value.includes("leetcode")) {
      void handleAction("leetcode");
    } else if (value.includes("chatgpt")) {
      void handleAction("chatgpt");
    } else {
      setStatus("I don't know this command yet. Try 'Start DSA'.");
    }

    setCommand("");
  }

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">
      <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0d0d10] p-6 md:flex md:flex-col">
        <div className="mb-12 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
            <Sparkles size={22} />
          </div>
          <span className="text-xl font-semibold tracking-wide">Aether</span>
        </div>

        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
          Workspace
        </p>

        <nav className="space-y-2">
          <button className="flex w-full items-center gap-3 rounded-xl bg-violet-500/10 px-4 py-3 text-left text-violet-300">
            <Home size={18} />
            Overview
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-zinc-400 hover:bg-white/5 hover:text-white">
            <Timer size={18} />
            Study Sessions
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-zinc-400 hover:bg-white/5 hover:text-white">
            <Activity size={18} />
            Activity
          </button>
        </nav>

        <div className="mt-auto">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-zinc-400 hover:bg-white/5 hover:text-white">
            <Settings size={18} />
            Settings
          </button>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-2 text-sm text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              System Ready
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Aether desktop assistant
            </p>
          </div>
        </div>
      </aside>

      <main className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-12">
        <header className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Command size={16} />
            Personal Workspace
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Desktop Connected
          </div>
        </header>

        <section className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
              <Sparkles size={32} />
            </div>

            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              What are we working on
              <span className="text-violet-400"> today?</span>
            </h1>

            <p className="mt-4 text-zinc-400">
              Your workspace, your tools, one command away.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#121216] p-3 shadow-2xl shadow-black/20">
            <textarea
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleCommand();
                }
              }}
              placeholder="Tell Aether what you want to do..."
              rows={3}
              className="w-full resize-none bg-transparent p-3 text-sm text-white outline-none placeholder:text-zinc-600"
            />
            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="px-2 text-xs text-zinc-600">
                Press Enter to execute
              </span>
              <button
                onClick={handleCommand}
                disabled={!command.trim()}
                className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Zap size={16} />
                Execute
              </button>
            </div>
          </div>

          <p className="mt-3 min-h-5 text-center text-xs text-zinc-500">
            {status}
          </p>

          <div className="mb-5 mt-14 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">Quick Actions</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Get started with one click
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.target}
                  onClick={() => void handleAction(action.target)}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#121216] p-5 text-left transition hover:border-violet-400/40 hover:bg-violet-500/[0.05]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
                    <Icon size={21} className={action.color} />
                  </div>
                  <div>
                    <h3 className="font-medium group-hover:text-violet-300">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      {action.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <footer className="mt-20 border-t border-white/10 pt-5 text-center text-xs text-zinc-600">
          Aether · Your personal AI workspace
        </footer>
      </main>
    </div>
  );
}

export default App;
