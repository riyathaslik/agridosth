import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, BookOpen, Cpu, MessageCircle, Leaf, TrendingUp, Droplets, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const quickActions = [
    {
      icon: Upload,
      title: t('upload'),
      description: 'Diagnose crop diseases instantly',
      path: '/upload',
      color: 'from-forest to-olive',
    },
    {
      icon: BookOpen,
      title: t('cropGuide'),
      description: 'Learn about crop cultivation',
      path: '/crop-guide',
      color: 'from-olive to-leaf',
    },
    {
      icon: Cpu,
      title: t('iotMonitor'),
      description: 'Real-time sensor data',
      path: '/iot-monitor',
      color: 'from-forest-light to-forest',
    },
    {
      icon: MessageCircle,
      title: t('chatbot'),
      description: 'Get farming advice',
      path: '/chatbot',
      color: 'from-olive-dark to-olive',
    },
  ];

  const stats = [
    { icon: Leaf, label: 'Crops Analyzed', value: '1,234', change: '+12%' },
    { icon: TrendingUp, label: 'Accuracy Rate', value: '94.5%', change: '+2.3%' },
    { icon: Droplets, label: 'Active Sensors', value: '8', change: 'Online' },
    { icon: Sun, label: 'Weather Score', value: '85/100', change: 'Good' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-12 text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary-foreground/30 animate-float" />
          <div className="absolute bottom-10 left-1/4 w-24 h-24 rounded-full bg-primary-foreground/20 animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">👋</span>
            <h1 className="text-2xl md:text-3xl font-display font-bold">
              {t('welcome')}, {user?.name}!
            </h1>
          </div>
          <p className="text-primary-foreground/80 text-lg max-w-xl mb-6">
            {t('smartFarming')} — Upload crop images for instant AI diagnosis and get personalized treatment recommendations.
          </p>
          <Link to="/upload">
            <Button variant="accent" size="lg" className="group">
              <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Diagnosis
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl p-5 shadow-agri-sm hover:shadow-agri-md transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-accent rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-display font-bold text-foreground">{stat.value}</span>
              <span className="text-xs font-medium text-olive">{stat.change}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-display font-semibold text-foreground mb-5">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className="group bg-card rounded-2xl p-6 shadow-agri-sm hover:shadow-agri-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{action.title}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-card rounded-2xl p-6 shadow-agri-sm">
        <h2 className="text-xl font-display font-semibold text-foreground mb-5">Recent Diagnoses</h2>
        <div className="space-y-4">
          {[
            { crop: 'Tomato', disease: 'Early Blight', severity: 'Moderate', time: '2 hours ago' },
            { crop: 'Paddy', disease: 'Brown Spot', severity: 'Low', time: '5 hours ago' },
            { crop: 'Potato', disease: 'Late Blight', severity: 'High', time: '1 day ago' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-olive-light to-olive flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.crop}</p>
                  <p className="text-sm text-muted-foreground">{item.disease}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  item.severity === 'High' ? 'bg-destructive/10 text-destructive' :
                  item.severity === 'Moderate' ? 'bg-wheat/50 text-soil' :
                  'bg-accent text-accent-foreground'
                }`}>
                  {item.severity}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
