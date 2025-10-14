# Visage Health 🏥

An AI-powered health analysis application that provides comprehensive health insights by analyzing facial features using advanced computer vision and machine learning.

![Visage Health](https://img.shields.io/badge/AI-Powered-blue) ![Built with React](https://img.shields.io/badge/React-18.3-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6)

## 🌟 Features

- **AI-Powered Analysis**: Leverages Google's Gemini 2.5 Flash model for advanced facial feature detection and health insights
- **Dual Input Methods**: 
  - Live camera capture for instant analysis
  - Photo upload for analyzing existing images
- **Comprehensive Health Insights**:
  - Detailed skin health analysis
  - Facial feature assessment
  - Personalized health recommendations
  - Key health findings and observations
- **Privacy-Focused**: Images are processed securely and never stored permanently
- **Instant Results**: Get detailed health insights in seconds
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Dark Mode Support**: Automatic theme adaptation for comfortable viewing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git for version control

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🛠️ Technology Stack

### Frontend
- **React 18.3** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icon set

### Backend (Lovable Cloud)
- **Supabase Edge Functions** - Serverless backend functions
- **PostgreSQL** - Robust database (if needed for future features)
- **Lovable AI Gateway** - Seamless AI model integration

### AI/ML
- **Google Gemini 2.5 Flash** - Multimodal AI for image analysis
- Vision API integration for facial feature detection

## 📁 Project Structure

```
visage-health/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AnalysisResult.tsx
│   │   ├── CameraCapture.tsx
│   │   └── ImageUpload.tsx
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Main landing page
│   │   └── NotFound.tsx    # 404 page
│   ├── integrations/       # Third-party integrations
│   │   └── supabase/       # Supabase client setup
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── main.tsx           # Application entry point
├── supabase/
│   └── functions/          # Edge functions
│       └── analyze-health/ # Health analysis function
├── public/                 # Static assets
└── index.html             # HTML entry point
```

## 🎨 Key Components

### CameraCapture
Handles live camera feed and photo capture functionality with a clean, intuitive interface.

### ImageUpload
Drag-and-drop or click-to-upload interface for analyzing existing photos.

### AnalysisResult
Displays comprehensive health analysis results with organized sections:
- Key health findings
- Skin health assessment
- Facial feature analysis
- Personalized recommendations

## 🔧 Configuration

### Environment Variables

The following environment variables are automatically configured by Lovable Cloud:

- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase public key
- `VITE_SUPABASE_PROJECT_ID` - Supabase project ID
- `LOVABLE_API_KEY` - API key for Lovable AI Gateway (backend only)

## 🚀 Deployment

### Deploy with Lovable

1. Open your project in [Lovable](https://lovable.dev)
2. Click on **Share** → **Publish**
3. Your app will be deployed instantly

### Custom Domain

To connect a custom domain:
1. Navigate to **Project** → **Settings** → **Domains**
2. Click **Connect Domain**
3. Follow the DNS configuration instructions

Learn more: [Custom Domain Setup](https://docs.lovable.dev/features/custom-domain)

### Self-Hosting

The application can be deployed to any static hosting service:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deploy the `dist` folder to services like:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

## 🔐 Security & Privacy

- **No Data Storage**: Images are analyzed in real-time and not stored
- **Secure Processing**: All API calls are encrypted using HTTPS
- **Edge Functions**: Backend logic runs in secure, isolated environments
- **Privacy-First**: No personal health data is collected or retained

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is built with Lovable and follows standard open-source practices.

## 🔗 Links

- [Live Demo](https://lovable.dev/projects/fae1e059-ade8-4abd-8e32-abf608964241)
- [Lovable Documentation](https://docs.lovable.dev/)
- [Lovable AI Features](https://docs.lovable.dev/features/ai)
- [Lovable Cloud Features](https://docs.lovable.dev/features/cloud)

## 💡 Future Enhancements

- [ ] User authentication and profile management
- [ ] Historical analysis tracking
- [ ] Export analysis reports as PDF
- [ ] Multiple language support
- [ ] Mobile app version
- [ ] Advanced health metrics and trends
- [ ] Integration with wearable devices

## 🆘 Support

For questions or issues:
- Check the [Lovable Documentation](https://docs.lovable.dev/)
- Join the [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- Open an issue in this repository

## ⚠️ Disclaimer

**This application is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.**

---

Built with ❤️ using [Lovable](https://lovable.dev)