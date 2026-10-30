import { useState } from "react";
import {
  Brain,
  Code2,
  ExternalLink,
  MessageCircle,
  Mic,
  Play,
  Send,
  Timer,
  Zap,
} from "lucide-react";
import "./App.css";

const actions = [
  { label: "Start DSA", detail: "Open your study setup", icon: Brain },
  { label: "Open LeetCode", detail: "Continue problem solving", icon: Code2 },
  { label: "Open VS Code", detail: "Jump into your editor", icon: ExternalLink },
];

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(25 * 60);

  const time = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  function sendMessage() {
    const text = message.trim();
    if (!text) return;
    setMessages((previous) => [...previous, text]);
    setMessage("");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Brain size={22} /></div>
          <div>
            <h2>Aether</h2>
            <span>PERSONAL AI</span>
          </div>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <button className="nav-item active"><MessageCircle size={18} /> Assistant</button>
        <button className="nav-item"><Timer size={18} /> Focus session</button>
        <button className="nav-item"><Code2 size={18} /> Study setup</button>

        <div className="sidebar-bottom">
          <div className="status-dot" />
          <span>Desktop ready</span>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div>
            <span className="eyebrow">YOUR PERSONAL WORKSPACE</span>
            <h1>Good evening.</h1>
          </div>
          <div className="online"><span /> Assistant offline</div>
        </header>

        <section className="welcome">
          <div className="orb"><Brain size={34} /></div>
          <h2>What are we working on?</h2>
          <p>Tell Aether what you want to do. Let's get into focus.</p>
        </section>

        <section className="quick-actions">
          {actions.map(({ label, detail, icon: Icon }) => (
            <button className="action-card" key={label} onClick={() => setMessage(label)}>
              <div className="action-icon"><Icon size={20} /></div>
              <div className="action-copy">
                <strong>{label}</strong>
                <span>{detail}</span>
              </div>
              <ExternalLink size={15} className="action-arrow" />
            </button>
          ))}
        </section>

        <section className="focus-card">
          <div className="focus-heading">
            <div className="focus-icon"><Timer size={19} /></div>
            <div><strong>Focus timer</strong><span>Pomodoro session</span></div>
          </div>
          <div className="timer-value">{time}</div>
          <div className="timer-bottom">
            <span>Ready when you are</span>
            <button className="start-button" onClick={() => setSeconds(25 * 60)}>
              <Play size={15} fill="currentColor" /> Reset
            </button>
          </div>
        </section>

        <section className="chat-area">
          <div className="chat-heading"><Zap size={17} /> <strong>Talk to Aether</strong></div>
          <div className="messages">
            {messages.length === 0 ? (
              <p className="empty-chat">Try “Explain binary search” or “Let's start DSA”.</p>
            ) : messages.map((text, index) => (
              <div className="user-message" key={`${text}-${index}`}>{text}</div>
            ))}
          </div>
          <form className="composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask anything or give a command..."
              aria-label="Message Aether"
            />
            <button type="button" className="mic-button" aria-label="Voice input (coming soon)">
              <Mic size={18} />
            </button>
            <button type="submit" className="send-button" aria-label="Send message">
              <Send size={17} />
            </button>
          </form>
          <p className="hint">Aether is your workspace companion · AI connection coming next</p>
        </section>
      </section>
    </main>
  );
}
