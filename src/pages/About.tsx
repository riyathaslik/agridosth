import React from 'react';
import { Leaf, Cpu, Satellite, MessageCircle, Shield, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Cpu,
      title: 'Edge AI Diagnosis',
      description: 'Advanced machine learning models running on edge devices for instant crop disease detection and analysis.',
    },
    {
      icon: Satellite,
      title: 'IoT Integration',
      description: 'Real-time monitoring of soil conditions, temperature, and humidity through connected sensors.',
    },
    {
      icon: MessageCircle,
      title: 'AI Chatbot',
      description: 'Natural language processing powered assistant for farming queries and recommendations.',
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Available in English, Malayalam, Hindi, and Tamil for wider accessibility.',
    },
    {
      icon: Shield,
      title: 'Data Security',
      description: 'Your farm data is encrypted and securely stored with privacy-first approach.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Farming',
      description: 'Recommendations focused on eco-friendly practices and optimal resource usage.',
    },
  ];

  const team = [
    { name: 'Agricultural AI Team', role: 'AI & ML Development' },
    { name: 'IoT Engineers', role: 'Sensor Integration' },
    { name: 'Agricultural Experts', role: 'Domain Knowledge' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t('about')}</h1>
        <p className="text-muted-foreground">Learn more about AgriVision IoT</p>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-12 text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary-foreground/30 animate-float" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="w-10 h-10" />
            <h2 className="text-3xl font-display font-bold">AgriVision IoT</h2>
          </div>
          <p className="text-lg text-primary-foreground/90 leading-relaxed">
            AgriVision is an AI-powered agricultural platform that combines edge computing, 
            IoT sensors, and machine learning to help farmers detect crop diseases early, 
            optimize resource usage, and improve yields sustainably.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-card rounded-2xl p-6 shadow-agri-sm">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          To empower farmers with cutting-edge technology that makes precision agriculture 
          accessible to everyone. We believe that combining traditional farming wisdom with 
          modern AI can create a more sustainable and productive agricultural ecosystem.
        </p>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-xl font-display font-semibold text-foreground mb-5">Key Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-5 shadow-agri-sm hover:shadow-agri-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-card rounded-2xl p-6 shadow-agri-sm">
        <h2 className="text-xl font-display font-semibold text-foreground mb-5">Technology Stack</h2>
        <div className="flex flex-wrap gap-3">
          {['TensorFlow Lite', 'Edge Computing', 'IoT Sensors', 'React Native', 'Cloud AI', 'Computer Vision'].map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-accent rounded-full text-sm font-medium text-accent-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Version Info */}
      <div className="text-center py-8 border-t border-border">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf className="w-5 h-5 text-olive" />
          <span className="font-display font-semibold text-foreground">AgriVision IoT</span>
        </div>
        <p className="text-sm text-muted-foreground">Version 1.0.0 • Made with ❤️ for Farmers</p>
      </div>
    </div>
  );
};

export default About;
