import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Sun, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SensorData {
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightIntensity: number;
  lastUpdated: Date;
}

interface Suggestion {
  type: 'warning' | 'success' | 'info';
  message: string;
}

const IotMonitor: React.FC = () => {
  const { t } = useLanguage();
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 28.5,
    humidity: 65,
    soilMoisture: 42,
    lightIntensity: 78,
    lastUpdated: new Date(),
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateSuggestions = (data: SensorData): Suggestion[] => {
    const suggestions: Suggestion[] = [];

    if (data.temperature > 35) {
      suggestions.push({
        type: 'warning',
        message: 'Temperature is too high! Consider providing shade or increasing irrigation.',
      });
    } else if (data.temperature < 15) {
      suggestions.push({
        type: 'warning',
        message: 'Temperature is too low! Protect crops from frost damage.',
      });
    } else {
      suggestions.push({
        type: 'success',
        message: 'Temperature is optimal for most crops.',
      });
    }

    if (data.soilMoisture < 30) {
      suggestions.push({
        type: 'warning',
        message: 'Soil moisture is low! Irrigate immediately to prevent wilting.',
      });
    } else if (data.soilMoisture > 80) {
      suggestions.push({
        type: 'warning',
        message: 'Soil is waterlogged! Reduce irrigation to prevent root rot.',
      });
    } else {
      suggestions.push({
        type: 'success',
        message: 'Soil moisture levels are adequate.',
      });
    }

    if (data.humidity > 85) {
      suggestions.push({
        type: 'info',
        message: 'High humidity may increase risk of fungal diseases. Monitor crops closely.',
      });
    }

    return suggestions;
  };

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSensorData({
        temperature: 25 + Math.random() * 10,
        humidity: 50 + Math.random() * 30,
        soilMoisture: 30 + Math.random() * 40,
        lightIntensity: 60 + Math.random() * 30,
        lastUpdated: new Date(),
      });
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  const suggestions = generateSuggestions(sensorData);

  const getStatusColor = (value: number, low: number, high: number) => {
    if (value < low || value > high) return 'text-destructive';
    return 'text-forest';
  };

  const sensors = [
    {
      icon: Thermometer,
      label: t('temperature'),
      value: sensorData.temperature.toFixed(1),
      unit: '°C',
      status: getStatusColor(sensorData.temperature, 15, 35),
      bgColor: 'from-orange-500/20 to-red-500/20',
      iconColor: 'text-orange-600',
    },
    {
      icon: Droplets,
      label: t('humidity'),
      value: sensorData.humidity.toFixed(0),
      unit: '%',
      status: getStatusColor(sensorData.humidity, 40, 85),
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-600',
    },
    {
      icon: Wind,
      label: t('soilMoisture'),
      value: sensorData.soilMoisture.toFixed(0),
      unit: '%',
      status: getStatusColor(sensorData.soilMoisture, 30, 80),
      bgColor: 'from-olive/20 to-forest/20',
      iconColor: 'text-olive',
    },
    {
      icon: Sun,
      label: 'Light Intensity',
      value: sensorData.lightIntensity.toFixed(0),
      unit: '%',
      status: 'text-forest',
      bgColor: 'from-yellow-500/20 to-orange-500/20',
      iconColor: 'text-yellow-600',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t('iotMonitor')}</h1>
          <p className="text-muted-foreground">Real-time sensor data from your farm</p>
        </div>
        <Button
          variant="outline"
          onClick={refreshData}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Last Updated */}
      <div className="text-sm text-muted-foreground">
        Last updated: {sensorData.lastUpdated.toLocaleTimeString()}
      </div>

      {/* Sensor Cards */}
      <div className="grid sm:grid-cols-2 gap-5">
        {sensors.map((sensor, index) => (
          <div
            key={index}
            className="bg-card rounded-2xl p-6 shadow-agri-sm hover:shadow-agri-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${sensor.bgColor}`}>
                <sensor.icon className={`w-6 h-6 ${sensor.iconColor}`} />
              </div>
              <div className={`w-3 h-3 rounded-full ${
                sensor.status === 'text-forest' ? 'bg-forest animate-pulse' : 'bg-destructive animate-pulse'
              }`} />
            </div>
            <p className="text-sm text-muted-foreground mb-1">{sensor.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl font-display font-bold ${sensor.status}`}>
                {sensor.value}
              </span>
              <span className="text-lg text-muted-foreground">{sensor.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="bg-card rounded-2xl p-6 shadow-agri-sm">
        <h2 className="text-xl font-display font-semibold text-foreground mb-5 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-olive" />
          {t('suggestions')}
        </h2>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-xl ${
                suggestion.type === 'warning'
                  ? 'bg-destructive/10'
                  : suggestion.type === 'success'
                  ? 'bg-forest/10'
                  : 'bg-olive/10'
              }`}
            >
              {suggestion.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm text-foreground">{suggestion.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sensor Locations */}
      <div className="bg-card rounded-2xl p-6 shadow-agri-sm">
        <h2 className="text-xl font-display font-semibold text-foreground mb-5">Sensor Network</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Field A - North', 'Field A - South', 'Field B - East', 'Field B - West'].map((location, index) => (
            <div key={index} className="text-center p-4 bg-accent/50 rounded-xl">
              <div className="w-3 h-3 rounded-full bg-forest mx-auto mb-2 animate-pulse" />
              <p className="text-sm font-medium text-foreground">Sensor {index + 1}</p>
              <p className="text-xs text-muted-foreground">{location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IotMonitor;
