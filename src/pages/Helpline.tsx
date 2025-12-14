import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Helpline: React.FC = () => {
  const { t } = useLanguage();

  const contacts = [
    {
      title: 'Kisan Call Center',
      phone: '1800-180-1551',
      description: '24x7 toll-free helpline for farmers',
      hours: '24 hours, 7 days',
    },
    {
      title: 'Agricultural Extension Office',
      phone: '+91-XXX-XXXXXXX',
      description: 'Local agricultural support',
      hours: '9 AM - 5 PM, Mon-Sat',
    },
    {
      title: 'Crop Insurance Helpline',
      phone: '1800-419-0505',
      description: 'PMFBY crop insurance queries',
      hours: '8 AM - 8 PM, Mon-Sat',
    },
  ];

  const resources = [
    { name: 'e-NAM Portal', url: 'https://enam.gov.in', description: 'Online agricultural market' },
    { name: 'Kisan Suvidha App', url: '#', description: 'Weather, dealers, prices info' },
    { name: 'Soil Health Card', url: 'https://soilhealth.dac.gov.in', description: 'Soil testing services' },
    { name: 'PM-KISAN Portal', url: 'https://pmkisan.gov.in', description: 'Direct income support' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t('helpline')}</h1>
        <p className="text-muted-foreground">Get assistance from agricultural experts</p>
      </div>

      {/* Emergency Contact */}
      <div className="bg-gradient-to-r from-forest to-olive rounded-2xl p-6 text-primary-foreground">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary-foreground/20 rounded-xl">
            <Phone className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold">Emergency Helpline</h2>
            <p className="text-primary-foreground/80">Available 24x7 for urgent queries</p>
          </div>
        </div>
        <a href="tel:1800-180-1551">
          <Button variant="accent" size="lg" className="gap-2">
            <Phone className="w-5 h-5" />
            Call 1800-180-1551 (Toll Free)
          </Button>
        </a>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {contacts.map((contact, index) => (
          <div key={index} className="bg-card rounded-2xl p-5 shadow-agri-sm">
            <h3 className="font-semibold text-foreground mb-2">{contact.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-olive">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-xs">{contact.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Useful Resources */}
      <div className="bg-card rounded-2xl p-6 shadow-agri-sm">
        <h2 className="text-xl font-display font-semibold text-foreground mb-5">Useful Resources</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-accent/50 rounded-xl hover:bg-accent transition-colors"
            >
              <div>
                <p className="font-medium text-foreground">{resource.name}</p>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-olive" />
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-card rounded-2xl p-6 shadow-agri-sm">
        <h2 className="text-xl font-display font-semibold text-foreground mb-5">Send us a Message</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-xl">
            <Mail className="w-5 h-5 text-olive" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground">support@agrivision.app</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-xl">
            <MapPin className="w-5 h-5 text-olive" />
            <div>
              <p className="text-sm text-muted-foreground">Office</p>
              <p className="font-medium text-foreground">Agricultural Tech Hub, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Helpline;
