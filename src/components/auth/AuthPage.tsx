import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, Eye, EyeOff, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success: boolean;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await signup(email, password, name);
      }

      if (success) {
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex leaf-pattern">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-primary-foreground/20 animate-float" />
          <div className="absolute bottom-40 right-20 w-60 h-60 rounded-full bg-primary-foreground/10 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-primary-foreground/15 animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center px-16 text-primary-foreground">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-primary-foreground/20 rounded-2xl backdrop-blur-sm">
              <Leaf className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">AgriVision</h1>
              <p className="text-primary-foreground/80 text-lg">IoT & Edge AI</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-display font-semibold mb-4">
            Smart Crop Diagnosis
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-md">
            AI-powered disease detection and treatment recommendations for healthier crops and better yields.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6">
            {[
              { icon: '🌾', label: 'Crop Analysis' },
              { icon: '🤖', label: 'AI Diagnosis' },
              { icon: '📡', label: 'IoT Monitoring' },
              { icon: '💬', label: '24/7 Support' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-primary-foreground/10 rounded-xl backdrop-blur-sm">
                <span className="text-2xl">{feature.icon}</span>
                <span className="font-medium">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="p-3 gradient-hero rounded-xl">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">AgriVision</h1>
              <p className="text-muted-foreground text-sm">IoT & Edge AI</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              {isLogin ? t('login') : t('signup')}
            </h2>
            <p className="text-muted-foreground">
              {isLogin ? 'Welcome back to AgriVision' : 'Create your farming account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="pl-12 h-12 bg-muted/50 border-border focus:border-primary"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t('email')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-12 h-12 bg-muted/50 border-border focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t('password')}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-12 pr-12 h-12 bg-muted/50 border-border focus:border-primary"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 animate-spin" />
                  <span>Please wait...</span>
                </div>
              ) : (
                <span>{isLogin ? t('login') : t('signup')}</span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-primary font-semibold hover:underline"
              >
                {isLogin ? t('signup') : t('login')}
              </button>
            </p>
          </div>

          <div className="mt-8 p-4 bg-accent/50 rounded-xl">
            <p className="text-sm text-muted-foreground text-center">
              🌱 Start your smart farming journey with AI-powered crop analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
