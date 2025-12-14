import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ml' | 'hi' | 'ta';

interface Translations {
  [key: string]: {
    en: string;
    ml: string;
    hi: string;
    ta: string;
  };
}

const translations: Translations = {
  // Navigation
  dashboard: { en: 'Dashboard', ml: 'ഡാഷ്ബോർഡ്', hi: 'डैशबोर्ड', ta: 'டாஷ்போர்டு' },
  upload: { en: 'Upload Image', ml: 'ചിത്രം അപ്‌ലോഡ് ചെയ്യുക', hi: 'छवि अपलोड करें', ta: 'படத்தை பதிவேற்று' },
  cropGuide: { en: 'Crop Guide', ml: 'വിള ഗൈഡ്', hi: 'फसल गाइड', ta: 'பயிர் வழிகாட்டி' },
  iotMonitor: { en: 'IoT Monitor', ml: 'IoT മോണിറ്റർ', hi: 'IoT मॉनिटर', ta: 'IoT கண்காணிப்பு' },
  chatbot: { en: 'AI Assistant', ml: 'AI സഹായി', hi: 'AI सहायक', ta: 'AI உதவியாளர்' },
  helpline: { en: 'Helpline', ml: 'ഹെൽപ്പ്‌ലൈൻ', hi: 'हेल्पलाइन', ta: 'உதவி எண்' },
  about: { en: 'About', ml: 'വിവരം', hi: 'के बारे में', ta: 'பற்றி' },
  satellite: { en: 'Satellite Vision', ml: 'സാറ്റലൈറ്റ് വിഷൻ', hi: 'उपग्रह दृष्टि', ta: 'செயற்கைக்கோள் பார்வை' },
  
  // Auth
  login: { en: 'Login', ml: 'ലോഗിൻ', hi: 'लॉगिन', ta: 'உள்நுழை' },
  signup: { en: 'Sign Up', ml: 'സൈൻ അപ്പ്', hi: 'साइन अप करें', ta: 'பதிவு செய்க' },
  email: { en: 'Email', ml: 'ഇമെയിൽ', hi: 'ईमेल', ta: 'மின்னஞ்சல்' },
  password: { en: 'Password', ml: 'പാസ്‌വേഡ്', hi: 'पासवर्ड', ta: 'கடவுச்சொல்' },
  logout: { en: 'Logout', ml: 'ലോഗൗട്ട്', hi: 'लॉगआउट', ta: 'வெளியேறு' },
  
  // Upload
  dragDrop: { en: 'Drag & drop your crop image here', ml: 'നിങ്ങളുടെ വിളയുടെ ചിത്രം ഇവിടെ വലിച്ചിടുക', hi: 'अपनी फसल की छवि यहां खींचें और छोड़ें', ta: 'உங்கள் பயிர் படத்தை இங்கே இழுத்து விடுங்கள்' },
  orBrowse: { en: 'or browse files', ml: 'അല്ലെങ്കിൽ ഫയലുകൾ ബ്രൗസ് ചെയ്യുക', hi: 'या फ़ाइलें ब्राउज़ करें', ta: 'அல்லது கோப்புகளை உலாவுக' },
  camera: { en: 'Take Photo', ml: 'ഫോട്ടോ എടുക്കുക', hi: 'फोटो लें', ta: 'புகைப்படம் எடு' },
  analyze: { en: 'Analyze Crop', ml: 'വിള വിശകലനം ചെയ്യുക', hi: 'फसल का विश्लेषण करें', ta: 'பயிரை பகுப்பாய்வு செய்' },
  
  // Crops
  paddy: { en: 'Paddy', ml: 'നെല്ല്', hi: 'धान', ta: 'நெல்' },
  tomato: { en: 'Tomato', ml: 'തക്കാളി', hi: 'टमाटर', ta: 'தக்காளி' },
  potato: { en: 'Potato', ml: 'ഉരുളക്കിഴങ്ങ്', hi: 'आलू', ta: 'உருளைக்கிழங்கு' },
  pepper: { en: 'Pepper', ml: 'കുരുമുളക്', hi: 'मिर्च', ta: 'மிளகு' },
  papaya: { en: 'Papaya', ml: 'പപ്പായ', hi: 'पपीता', ta: 'பப்பாளி' },
  
  // IoT
  temperature: { en: 'Temperature', ml: 'താപനില', hi: 'तापमान', ta: 'வெப்பநிலை' },
  humidity: { en: 'Humidity', ml: 'ആർദ്രത', hi: 'नमी', ta: 'ஈரப்பதம்' },
  soilMoisture: { en: 'Soil Moisture', ml: 'മണ്ണിന്റെ ഈർപ്പം', hi: 'मिट्टी की नमी', ta: 'மண் ஈரப்பதம்' },
  suggestions: { en: 'Suggestions', ml: 'നിർദ്ദേശങ്ങൾ', hi: 'सुझाव', ta: 'பரிந்துரைகள்' },
  
  // Misc
  welcome: { en: 'Welcome to AgriVision', ml: 'അഗ്രിവിഷനിലേക്ക് സ്വാഗതം', hi: 'एग्रीविजन में आपका स्वागत है', ta: 'அக்ரிவிஷனுக்கு வரவேற்கிறோம்' },
  smartFarming: { en: 'Smart Farming with AI', ml: 'AI ഉപയോഗിച്ച് സ്മാർട്ട് കൃഷി', hi: 'AI के साथ स्मार्ट खेती', ta: 'AI உடன் ஸ்மார்ட் விவசாயம்' },
  askQuestion: { en: 'Ask a question...', ml: 'ഒരു ചോദ്യം ചോദിക്കൂ...', hi: 'एक सवाल पूछें...', ta: 'கேள்வி கேளுங்கள்...' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: { code: Language; name: string; nativeName: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'ml' as Language, name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta' as Language, name: 'Tamil', nativeName: 'தமிழ்' },
];

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
