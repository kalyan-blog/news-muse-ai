import { useState, useRef, useEffect } from "react";
import { Send, Mic, Minimize2, Maximize2 } from "lucide-react";
import { useChat } from "@/api";

interface Message {
  role: "user" | "bot";
  content: string;
  expanded?: boolean;
}

const suggestions = [
  "Summarize today's news",
  "What happened in 2020?",
  "Tech news last decade",
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm your AI News Assistant. Ask me about any news from the 1990s to today. 🗞️" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const chatMutation = useChat();

  const sendMessage = (text: string) => {
    if (!text.trim() || chatMutation.isPending) return;
    const userMsg = text.trim();
    setMessages((m) => [...m, { role: "user", content: userMsg }]);
    setInput("");
    setTyping(true);

    chatMutation.mutate(userMsg, {
      onSuccess: (data) => {
        setMessages((m) => [...m, { role: "bot", content: data.response, expanded: true }]);
        setTyping(false);
      },
      onError: () => {
        setMessages((m) => [...m, { role: "bot", content: "Sorry, I couldn't reach the server.", expanded: true }]);
        setTyping(false);
      }
    });
  };

  const toggleExpand = (index: number) => {
    setMessages((prev) =>
      prev.map((m, i) => (i === index ? { ...m, expanded: !m.expanded } : m))
    );
  };

  const simplify = (content: string) =>
    content
      .split("\n")
      .filter((l) => l.trim())
      .slice(0, 3)
      .join("\n") + "\n...";

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <h1 className="font-semibold text-foreground">AI News Chat</h1>
        <p className="text-xs text-muted-foreground">Ask about news from 1990 to present</p>
      </div>

      {/* Suggested prompts at top when empty */}
      {messages.length <= 1 && (
        <div className="px-4 pt-3 pb-1 flex gap-2 flex-wrap">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="chip chip-inactive text-xs hover:bg-accent transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div className="max-w-[80%]">
              <div
                className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                  msg.role === "user"
                    ? "gradient-primary text-primary-foreground rounded-br-md"
                    : "bg-card text-card-foreground shadow-card rounded-bl-md"
                }`}
              >
                {msg.role === "bot" && msg.expanded === false
                  ? simplify(msg.content)
                  : msg.content}
              </div>
              {msg.role === "bot" && i > 0 && (
                <div className="flex gap-2 mt-1.5 ml-1">
                  <button
                    onClick={() => toggleExpand(i)}
                    className="text-[11px] text-primary flex items-center gap-1 hover:underline"
                  >
                    {msg.expanded !== false ? (
                      <><Minimize2 size={10} /> Simplify</>
                    ) : (
                      <><Maximize2 size={10} /> Expand</>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-card shadow-card rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-border bg-background">
        {/* Inline suggestions when chatting */}
        {messages.length > 1 && (
          <div className="flex gap-2 mb-2 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="chip chip-inactive text-[10px] whitespace-nowrap py-1"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 bg-card rounded-2xl shadow-card px-4 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask about any news..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <Mic size={18} />
          </button>
          <button
            onClick={() => sendMessage(input)}
            className="gradient-primary text-primary-foreground rounded-full p-2 transition-transform hover:scale-105"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
