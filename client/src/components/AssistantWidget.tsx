import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User,
  Minimize2,
  Maximize2,
  Search,
  Users,
  Phone,
  HelpCircle,
  ArrowRight
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickActions = [
  {
    icon: Search,
    title: "Find Workers",
    description: "Search for skilled workers in your area",
    action: "find-workers"
  },
  {
    icon: Users,
    title: "Join as Worker",
    description: "Register as a skilled worker",
    action: "join-worker"
  },
  {
    icon: Phone,
    title: "Contact Support",
    description: "Get help from our team",
    action: "contact-support"
  },
  {
    icon: HelpCircle,
    title: "How it Works",
    description: "Learn about our platform",
    action: "how-it-works"
  }
];

const AssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your GrameenWork assistant. I'm here to help you find skilled workers or get started as a worker yourself. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse = getAssistantResponse(inputMessage);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: assistantResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);

    setInputMessage("");
  };

  const getAssistantResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('find') || input.includes('worker') || input.includes('hire')) {
      return "I can help you find skilled workers! You can browse by category (carpenter, plumber, electrician, etc.) or location. Would you like me to show you the available services or help you post a specific job requirement?";
    }
    
    if (input.includes('join') || input.includes('register') || input.includes('worker account')) {
      return "Great! To join as a worker, you'll need to: 1) Register with your phone number, 2) Upload your profile photo and select your skills, 3) Get verified with documents, 4) Set your service area. The verification process typically takes 24-48 hours. Would you like me to guide you through registration?";
    }
    
    if (input.includes('payment') || input.includes('pay') || input.includes('money')) {
      return "Our platform supports secure UPI payments and digital wallets. For workers, payments are released after job completion and customer approval. For customers, you can pay upfront or after work completion. All transactions are secure and trackable.";
    }
    
    if (input.includes('help') || input.includes('support') || input.includes('problem')) {
      return "I'm here to help! You can contact our 24/7 support team at +91 98765 43210 or support@grameenwork.com. For immediate assistance, I can help you with account setup, finding workers, or understanding our services.";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('rate')) {
      return "Pricing varies by service type and location. Workers set their own rates, but we ensure competitive and fair pricing. You can view worker profiles with their rates, reviews, and past work before hiring. Most services start from ₹200-500 depending on complexity.";
    }
    
    return "I understand you're looking for assistance. I can help you with finding workers, joining as a worker, payments, pricing, or general support. Could you tell me more specifically what you need help with?";
  };

  const handleQuickAction = (action: string) => {
    let response = "";
    
    switch (action) {
      case "find-workers":
        response = "Let me help you find workers! What type of service do you need? We have carpenters, plumbers, electricians, masons, tailors, and more. You can also tell me your location for nearby workers.";
        break;
      case "join-worker":
        response = "Excellent! To become a GrameenWork partner: 1) Complete registration with phone verification, 2) Upload profile and skill details, 3) Submit ID documents for verification, 4) Set your service area and rates. Ready to start?";
        break;
      case "contact-support":
        response = "You can reach our support team at: Phone: +91 98765 43210, Email: support@grameenwork.com, or use the in-app chat. We're available 24/7 to help you!";
        break;
      case "how-it-works":
        response = "GrameenWork is simple: 1) Post your job or browse worker profiles, 2) Connect and discuss your needs, 3) Hire and track work progress, 4) Pay securely and leave reviews. All workers are verified for your safety!";
        break;
    }

    const assistantMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-hero shadow-elegant hover:shadow-warm animate-pulse-glow"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 ${isMinimized ? 'h-16' : 'h-96'} shadow-elegant transition-all duration-300`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-hero text-primary-foreground rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <span className="font-semibold">GrameenWork Assistant</span>
          </div>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-4 border-b bg-muted/30">
                <div className="text-sm font-medium mb-3">Quick Actions:</div>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => {
                    const IconComponent = action.icon;
                    return (
                      <Button
                        key={action.action}
                        variant="ghost"
                        className="h-auto p-2 flex flex-col items-center gap-1 hover:bg-primary/10"
                        onClick={() => handleQuickAction(action.action)}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span className="text-xs text-center">{action.title}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 p-4 max-h-64 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.type === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-secondary flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="h-9 w-9"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default AssistantWidget;