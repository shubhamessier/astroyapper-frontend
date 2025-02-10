import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Spinner } from "@/components/Spinner";
import { Send } from "lucide-react";
import { getAstrologicalResponse } from "@/lib/openai";
import { isAstrologyQuestion } from "@/lib/prompt";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

let messageCounter = 0;
const generateMessageId = (prefix: string) => `${prefix}-${Date.now()}-${messageCounter++}`;

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      localStorage.setItem('chatSessionEnded', 'true');
    }
  }, [timeRemaining]);

  useEffect(() => {
    const sessionEnded = localStorage.getItem('chatSessionEnded');
    if (sessionEnded === 'true') {
      setTimeRemaining(0);
      setHasStarted(true);
    }
  }, []);

  const startTimer = () => {
    setTimeRemaining(5 * 60);
    setHasStarted(true);
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading || (timeRemaining !== null && timeRemaining <= 0)) return;

    const userMessage: Message = {
      id: generateMessageId('user'),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    if (!hasStarted) {
      startTimer();
    }

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      let response: string;
      if (isAstrologyQuestion(userMessage.text)) {
        response = await getAstrologicalResponse(userMessage.text);
      } else {
        response = "I'm your astrology guide - I'd be happy to discuss your astrological chart, zodiac sign, or other celestial matters instead!";
      }

      const aiMessage: Message = {
        id: generateMessageId('ai'),
        text: response,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorMessage: Message = {
        id: generateMessageId('error'),
        text: "I apologize, but I'm having trouble connecting to my celestial wisdom at the moment. Please try again shortly.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex-1 w-full max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <Avatar className="h-16 w-16 mx-auto border-2 border-rose-100">
                  <AvatarImage src="/src/assets/astrology-wheel.png" alt="AstroBot" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="text-gray-500">
                  Ask me anything about astrology, your zodiac sign, or celestial matters...
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

        <div className="border-t border-rose-100 p-4 bg-white/50">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about astrology..."
                disabled={isLoading || (timeRemaining !== null && timeRemaining <= 0)}
                className="flex-1 h-12 rounded-full border border-rose-200 bg-white/80 backdrop-blur-sm px-4 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent disabled:opacity-50"
              />
              <Button
                type="submit"
                size="lg"
                disabled={!inputText.trim() || isLoading || (timeRemaining !== null && timeRemaining <= 0)}
                className="h-12 w-12 p-0 flex items-center justify-center"
              >
                {isLoading ? (
                  <Spinner className="text-white h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            {timeRemaining !== null && (
              <div className="flex justify-between items-center px-2 text-sm">
                {timeRemaining > 0 ? (
                  <span className="text-rose-500">Time remaining: {formatTime(timeRemaining)}</span>
                ) : (
                  <div className="flex justify-between items-center w-full">
                    <span className="text-rose-500">Chat session ended</span>
                    <Button variant="ghost" size="sm" className="text-rose-500">
                      Upgrade for unlimited
                    </Button>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}