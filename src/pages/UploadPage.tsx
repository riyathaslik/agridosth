import React, { useState, useCallback, useRef } from 'react';
import { Upload, Camera, Image, X, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const UploadPage: React.FC = () => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    disease: string;
    confidence: number;
    severity: string;
    treatment: string[];
  } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please upload an image file');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulated AI analysis - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setAnalysisResult({
      disease: 'Early Blight (Alternaria solani)',
      confidence: 94.5,
      severity: 'Moderate',
      treatment: [
        'Apply copper-based fungicide (2g/L)',
        'Remove and destroy infected leaves',
        'Ensure proper plant spacing for air circulation',
        'Water plants at the base, avoid wetting leaves',
        'Apply neem oil spray as preventive measure',
      ],
    });
    
    setIsAnalyzing(false);
    toast.success('Analysis complete!');
  };

  const clearImage = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">{t('upload')}</h1>
        <p className="text-muted-foreground">Upload or capture a photo of your crop for instant AI diagnosis</p>
      </div>

      {!selectedImage ? (
        <>
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? 'border-primary bg-primary/5 scale-[1.02]'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
          >
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl gradient-hero flex items-center justify-center animate-float">
                <Upload className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <p className="text-lg font-medium text-foreground">{t('dragDrop')}</p>
                <p className="text-muted-foreground mt-1">{t('orBrowse')}</p>
              </div>
              <p className="text-sm text-muted-foreground">Supports: JPG, PNG, WEBP (Max 10MB)</p>
            </div>
          </div>

          {/* Upload Options */}
          <div className="grid sm:grid-cols-3 gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => fileInputRef.current?.click()}
              className="h-24 flex-col gap-3"
            >
              <Image className="w-8 h-8 text-olive" />
              <span>Browse Gallery</span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => cameraInputRef.current?.click()}
              className="h-24 flex-col gap-3"
            >
              <Camera className="w-8 h-8 text-olive" />
              <span>{t('camera')}</span>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => fileInputRef.current?.click()}
              className="h-24 flex-col gap-3"
            >
              <Upload className="w-8 h-8 text-olive" />
              <span>Upload File</span>
            </Button>
          </div>
        </>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image Preview */}
          <div className="relative bg-card rounded-2xl overflow-hidden shadow-agri-md">
            <img
              src={selectedImage}
              alt="Crop preview"
              className="w-full aspect-square object-cover"
            />
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            
            {!analysisResult && (
              <div className="absolute bottom-4 left-4 right-4">
                <Button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  variant="hero"
                  size="lg"
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {t('analyze')}
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="bg-card rounded-2xl p-6 shadow-agri-md space-y-6 animate-scale-in">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-destructive/10">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Disease Detected</h3>
                  <p className="text-xl font-display font-bold text-foreground mt-1">
                    {analysisResult.disease}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-accent/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                  <p className="text-2xl font-bold text-forest">{analysisResult.confidence}%</p>
                </div>
                <div className="bg-accent/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Severity</p>
                  <p className="text-2xl font-bold text-olive">{analysisResult.severity}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-forest" />
                  Treatment Recommendations
                </h4>
                <ul className="space-y-2">
                  {analysisResult.treatment.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl"
                    >
                      <span className="w-6 h-6 rounded-full gradient-hero flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="outline" onClick={clearImage} className="w-full">
                Analyze Another Image
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadPage;
