import React from 'react';
import { Satellite, Map, Layers, Cloud, TreeDeciduous, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const SatelliteVision: React.FC = () => {
  const { t } = useLanguage();

  const mapLayers = [
    { icon: TreeDeciduous, name: 'Vegetation Index (NDVI)', color: 'bg-forest', status: 'Active' },
    { icon: Droplets, name: 'Soil Moisture', color: 'bg-blue-500', status: 'Active' },
    { icon: Cloud, name: 'Weather Overlay', color: 'bg-gray-400', status: 'Available' },
    { icon: Layers, name: 'Crop Health Map', color: 'bg-olive', status: 'Processing' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t('satellite')}</h1>
        <p className="text-muted-foreground">Satellite imagery and vegetation analysis for your farm</p>
      </div>

      {/* Map Placeholder */}
      <div className="relative bg-card rounded-2xl overflow-hidden shadow-agri-md">
        <div className="aspect-video bg-gradient-to-br from-forest/20 via-olive/20 to-leaf/20 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto rounded-2xl gradient-hero flex items-center justify-center mb-4 animate-float">
              <Satellite className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">
              Satellite View Coming Soon
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Connect your farm location to access satellite imagery, vegetation indices, 
              and crop health monitoring.
            </p>
            <Button variant="hero">
              <Map className="w-4 h-4 mr-2" />
              Set Farm Location
            </Button>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button variant="secondary" size="icon" className="shadow-agri-sm">
            <Layers className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Available Layers */}
      <div className="bg-card rounded-2xl p-6 shadow-agri-sm">
        <h2 className="text-xl font-display font-semibold text-foreground mb-5">Map Layers</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {mapLayers.map((layer, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-accent/50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${layer.color} rounded-xl flex items-center justify-center`}>
                  <layer.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-medium text-foreground">{layer.name}</span>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                layer.status === 'Active' ? 'bg-forest/20 text-forest' :
                layer.status === 'Processing' ? 'bg-olive/20 text-olive' :
                'bg-muted text-muted-foreground'
              }`}>
                {layer.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Features Info */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { title: 'Daily Updates', desc: 'Fresh satellite data every 24 hours' },
          { title: '10m Resolution', desc: 'High-detail imagery for precision' },
          { title: 'Historical Data', desc: 'Track changes over seasons' },
        ].map((item, index) => (
          <div key={index} className="bg-card rounded-2xl p-5 shadow-agri-sm text-center">
            <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SatelliteVision;
