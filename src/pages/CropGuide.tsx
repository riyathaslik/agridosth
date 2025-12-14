import React, { useState } from 'react';
import { Leaf, Droplets, Sun, Thermometer, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CropInfo {
  id: string;
  name: string;
  nameKey: string;
  emoji: string;
  image: string;
  soilType: string;
  temperature: string;
  water: string;
  season: string;
  regions: string;
  description: string;
  tips: string[];
  fertilizers: string[];
}

const crops: CropInfo[] = [
  {
    id: 'paddy',
    name: 'Paddy (Rice)',
    nameKey: 'paddy',
    emoji: '🌾',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
    soilType: 'Clay or clay loam with good water retention',
    temperature: '20-35°C',
    water: 'High (standing water 5-10cm)',
    season: 'Kharif (June-September)',
    regions: 'Kerala, Tamil Nadu, West Bengal, Punjab',
    description: 'Rice is the staple food crop of India. It requires tropical climate with high humidity and adequate rainfall.',
    tips: [
      'Maintain proper water level during tillering stage',
      'Apply nitrogen fertilizer in 3 split doses',
      'Transplant seedlings 20-25 days after sowing',
    ],
    fertilizers: ['Urea (46-0-0)', 'DAP (18-46-0)', 'MOP (0-0-60)'],
  },
  {
    id: 'tomato',
    name: 'Tomato',
    nameKey: 'tomato',
    emoji: '🍅',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
    soilType: 'Well-drained loamy soil with pH 6.0-7.0',
    temperature: '21-24°C',
    water: 'Moderate (regular, consistent watering)',
    season: 'Rabi (October-March) or Year-round in polyhouse',
    regions: 'Maharashtra, Karnataka, Andhra Pradesh, Madhya Pradesh',
    description: 'Tomato is a warm-season vegetable that requires full sun and consistent moisture for healthy fruit development.',
    tips: [
      'Stake or cage plants for support',
      'Mulch to retain moisture and prevent diseases',
      'Prune suckers for better fruit production',
    ],
    fertilizers: ['NPK 19-19-19', 'Calcium Nitrate', 'Potassium Sulfate'],
  },
  {
    id: 'potato',
    name: 'Potato',
    nameKey: 'potato',
    emoji: '🥔',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber75?w=400&h=300&fit=crop',
    soilType: 'Sandy loam with good drainage, pH 5.5-6.5',
    temperature: '15-20°C',
    water: 'Moderate (regular irrigation)',
    season: 'Rabi (October-December planting)',
    regions: 'Uttar Pradesh, West Bengal, Bihar, Gujarat',
    description: 'Potato is a cool-season crop that thrives in well-drained, loose soil with moderate temperatures.',
    tips: [
      'Hill up soil around plants as they grow',
      'Avoid waterlogging to prevent rot',
      'Harvest when leaves turn yellow',
    ],
    fertilizers: ['NPK 12-32-16', 'Urea', 'Single Super Phosphate'],
  },
  {
    id: 'pepper',
    name: 'Black Pepper',
    nameKey: 'pepper',
    emoji: '🌶️',
    image: 'https://images.unsplash.com/photo-1599909533681-74ff4b9b88d2?w=400&h=300&fit=crop',
    soilType: 'Red laterite or well-drained loamy soil',
    temperature: '23-32°C',
    water: 'High (well-distributed rainfall 2000-3000mm)',
    season: 'Perennial (planted during monsoon)',
    regions: 'Kerala, Karnataka, Tamil Nadu',
    description: 'Black pepper is the "King of Spices" and requires humid tropical climate with support trees for climbing.',
    tips: [
      'Provide strong support poles or trees',
      'Apply organic mulch around base',
      'Prune regularly for better yield',
    ],
    fertilizers: ['FYM (10-15 kg/vine)', 'NPK 50:50:150 g/vine', 'Neem Cake'],
  },
  {
    id: 'papaya',
    name: 'Papaya',
    nameKey: 'papaya',
    emoji: '🍈',
    image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=300&fit=crop',
    soilType: 'Well-drained sandy loam, pH 6.0-7.0',
    temperature: '25-30°C',
    water: 'Moderate (sensitive to waterlogging)',
    season: 'Year-round (best planted Feb-March)',
    regions: 'Andhra Pradesh, Gujarat, Karnataka, Maharashtra',
    description: 'Papaya is a fast-growing tropical fruit that starts bearing fruits within 10-12 months of planting.',
    tips: [
      'Never allow water stagnation',
      'Apply balanced fertilizers monthly',
      'Maintain 3-4m spacing between plants',
    ],
    fertilizers: ['NPK 6:6:6 (200g/month)', 'Vermicompost', 'Micronutrients'],
  },
];

const CropGuide: React.FC = () => {
  const { t } = useLanguage();
  const [expandedCrop, setExpandedCrop] = useState<string | null>('paddy');

  const toggleCrop = (id: string) => {
    setExpandedCrop(expandedCrop === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t('cropGuide')}</h1>
        <p className="text-muted-foreground">Complete cultivation guide for your favorite crops</p>
      </div>

      <div className="space-y-4">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className={`bg-card rounded-2xl shadow-agri-sm overflow-hidden transition-all duration-300 ${
              expandedCrop === crop.id ? 'shadow-agri-lg' : ''
            }`}
          >
            {/* Header */}
            <button
              onClick={() => toggleCrop(crop.id)}
              className="w-full p-5 flex items-center gap-4 hover:bg-accent/30 transition-colors"
            >
              <span className="text-4xl">{crop.emoji}</span>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-foreground">{t(crop.nameKey)}</h3>
                <p className="text-sm text-muted-foreground">{crop.name}</p>
              </div>
              {expandedCrop === crop.id ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {/* Expanded Content */}
            {expandedCrop === crop.id && (
              <div className="px-5 pb-5 space-y-5 animate-slide-up">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-48 object-cover rounded-xl"
                />

                <p className="text-muted-foreground">{crop.description}</p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-accent/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-olive mb-1">
                      <Leaf className="w-4 h-4" />
                      <span className="text-xs font-medium">Soil Type</span>
                    </div>
                    <p className="text-sm text-foreground">{crop.soilType}</p>
                  </div>
                  <div className="bg-accent/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-olive mb-1">
                      <Thermometer className="w-4 h-4" />
                      <span className="text-xs font-medium">{t('temperature')}</span>
                    </div>
                    <p className="text-sm text-foreground">{crop.temperature}</p>
                  </div>
                  <div className="bg-accent/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-olive mb-1">
                      <Droplets className="w-4 h-4" />
                      <span className="text-xs font-medium">Water</span>
                    </div>
                    <p className="text-sm text-foreground">{crop.water}</p>
                  </div>
                  <div className="bg-accent/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-olive mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-medium">Season</span>
                    </div>
                    <p className="text-sm text-foreground">{crop.season}</p>
                  </div>
                  <div className="bg-accent/50 rounded-xl p-3 col-span-2">
                    <div className="flex items-center gap-2 text-olive mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-medium">Regions</span>
                    </div>
                    <p className="text-sm text-foreground">{crop.regions}</p>
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Sun className="w-5 h-5 text-olive" />
                    Growing Tips
                  </h4>
                  <ul className="space-y-2">
                    {crop.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-olive/20 text-olive text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fertilizers */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Recommended Fertilizers</h4>
                  <div className="flex flex-wrap gap-2">
                    {crop.fertilizers.map((fertilizer, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-forest/10 text-forest rounded-full text-sm font-medium"
                      >
                        {fertilizer}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropGuide;
