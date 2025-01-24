import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "@/components/Spinner";
import { Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [freeMessages, setFreeMessages] = useState(3);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      text: `Here's a simulated response to: "${userMessage}"`,
      sender: "ai",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
    setFreeMessages(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading || freeMessages === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    await simulateAIResponse(userMessage.text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-sm overflow-hidden flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <Avatar className="h-16 w-16 mx-auto border-2 border-rose-100">
                  <AvatarImage src="/src/assets/astrology-wheel.png" alt="AstroBot" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="text-gray-500">
                  Ask me anything about your astrological journey...
                </div>
              </div>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8 border border-rose-100">
                  <AvatarImage src="/src/assets/astrology-wheel.png" alt="AstroBot" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`message max-w-[70%] p-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-rose-400 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2">
              <Avatar className="h-8 w-8 border border-rose-100">
                <AvatarImage src="/src/assets/astrology-wheel.png" alt="AstroBot" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <div className="message p-3 rounded-2xl bg-gray-100 text-gray-800 rounded-bl-none">
                <Spinner className="text-rose-400" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className="border-t border-rose-100 p-4 bg-white/50">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading || freeMessages === 0}
                className="flex-1 h-12 rounded-full border border-rose-200 bg-white/80 backdrop-blur-sm px-4 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent disabled:opacity-50"
              />
              <Button
                type="submit"
                size="lg"
                disabled={!inputText.trim() || isLoading || freeMessages === 0}
                className="h-12 w-12 p-0 flex items-center justify-center"
              >
                {isLoading ? (
                  <Spinner className="text-white h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex justify-between items-center px-2 text-sm">
              <span className="text-[#e74c3c]">
                {freeMessages} free messages remaining
              </span>
              {freeMessages === 0 && (
                <Button variant="ghost" size="sm" className="text-rose-500">
                  Upgrade for unlimited
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}