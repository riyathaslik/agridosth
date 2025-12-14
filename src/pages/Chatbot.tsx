import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Leaf, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  'How much fertilizer for tomato plants?',
  'Best soil type for paddy?',
  'When to harvest potatoes?',
  'How to prevent crop diseases?',
];

const Chatbot: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '🌱 Hello! I\'m your AgriVision AI assistant. I can help you with:\n\n• Fertilizer recommendations\n• Soil type guidance\n• Weather and climate advice\n• Seasonal planting tips\n• Pest and disease management\n\nHow can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('fertilizer') && lowerQuery.includes('tomato')) {
      return '🍅 **Fertilizer Recommendation for Tomatoes:**\n\n1. **At planting:** Apply NPK 19-19-19 at 50g per plant\n2. **After 3 weeks:** Side-dress with Urea (46-0-0) at 25g per plant\n3. **During flowering:** Apply Calcium Nitrate to prevent blossom end rot\n4. **Monthly:** Apply balanced liquid fertilizer (20-20-20)\n\n**Tips:**\n- Avoid excess nitrogen during fruiting\n- Maintain soil pH between 6.0-7.0\n- Water thoroughly after fertilizer application';
    }

    if (lowerQuery.includes('soil') && lowerQuery.includes('paddy')) {
      return '🌾 **Best Soil for Paddy Cultivation:**\n\n**Ideal Soil Type:** Clay or clay loam\n\n**Characteristics:**\n- Good water retention capacity\n- Rich in organic matter\n- pH range: 5.5-6.5\n- High nutrient holding capacity\n\n**Soil Preparation:**\n1. Plow and puddle the field thoroughly\n2. Maintain 5-10cm standing water\n3. Level the field for uniform water distribution\n4. Add organic manure (FYM) 10-15 tons/hectare';
    }

    if (lowerQuery.includes('harvest') && lowerQuery.includes('potato')) {
      return '🥔 **Potato Harvesting Guide:**\n\n**Harvest Indicators:**\n- Leaves turn yellow and dry\n- Skin becomes firm (doesn\'t peel easily)\n- Usually 90-120 days after planting\n\n**Harvesting Process:**\n1. Stop irrigation 10-15 days before harvest\n2. Cut vines 7-10 days before digging\n3. Harvest during dry weather\n4. Avoid direct sunlight on tubers\n\n**Storage Tips:**\n- Cure at 15-20°C for 10-14 days\n- Store at 4-7°C with 90% humidity';
    }

    if (lowerQuery.includes('disease') || lowerQuery.includes('prevent')) {
      return '🛡️ **Crop Disease Prevention Tips:**\n\n**1. Cultural Practices:**\n- Crop rotation (3-4 year cycle)\n- Proper plant spacing for air circulation\n- Remove infected plant debris\n\n**2. Seed Treatment:**\n- Use certified disease-free seeds\n- Treat with fungicides before planting\n\n**3. Water Management:**\n- Avoid overhead irrigation\n- Water early morning\n- Ensure proper drainage\n\n**4. Regular Monitoring:**\n- Scout fields weekly\n- Use AgriVision AI for early detection\n- Act promptly on first signs';
    }

    return '🌿 Thank you for your question! Based on your query, here are some general recommendations:\n\n1. **For specific crop advice:** Upload a photo in the Upload section for AI analysis\n2. **For fertilizer quantities:** Consider soil test results and crop stage\n3. **For seasonal guidance:** Check our Crop Guide for detailed information\n4. **For real-time conditions:** Monitor IoT sensor data regularly\n\nWould you like more specific information about any particular crop or farming practice?';
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = generateResponse(content);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t('chatbot')}</h1>
        <p className="text-muted-foreground">Get instant farming advice powered by AI</p>
      </div>

      {/* Quick Questions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => sendMessage(question)}
            className="px-3 py-1.5 bg-accent hover:bg-accent/80 text-accent-foreground rounded-full text-sm transition-colors"
          >
            {question}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 bg-card rounded-2xl shadow-agri-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'gradient-hero' : 'bg-accent'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <Bot className="w-5 h-5 text-forest" />
                )}
              </div>
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-muted text-foreground rounded-tl-sm'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Bot className="w-5 h-5 text-forest" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-border">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('askQuestion')}
              className="flex-1 h-12 bg-muted/50 border-border"
              disabled={isLoading}
            />
            <Button type="submit" variant="hero" size="icon" className="h-12 w-12" disabled={isLoading || !input.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
