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
- OpenAI API key (for AI analysis)
- Supabase account (for backend functions)

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

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` with your actual values:
- Get Supabase credentials from your [Supabase dashboard](https://supabase.com/dashboard)
- Get OpenAI API key from [OpenAI platform](https://platform.openai.com/api-keys)

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Local Development Setup

For full functionality during development:

1. **Get API Keys**
   - OpenAI API key from [OpenAI platform](https://platform.openai.com/api-keys)
   - Supabase credentials from [Supabase dashboard](https://supabase.com/dashboard)

2. **Setup Supabase Locally (Optional)**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Start local Supabase
   supabase start
   
   # Deploy function locally
   supabase functions serve analyze-health
   ```

3. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your actual API keys and Supabase credentials

4. **Test the Application**
   - Frontend: `http://localhost:8080`
   - Backend function: `http://localhost:54321/functions/v1/analyze-health`

## 🛠️ Technology Stack

### Frontend
- **React 18.3** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icon set

### Backend
- **Supabase Edge Functions** - Serverless backend functions
- **PostgreSQL** - Robust database (if needed for future features)
- **Custom AI Gateway** - Seamless AI model integration

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

**Frontend (.env file):**
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase public key
- `VITE_SUPABASE_PROJECT_ID` - Supabase project ID

**Backend (Supabase Edge Functions):**
- `AI_API_KEY` - OpenAI API key for AI model integration

## 🚀 Deployment

### Recommended: Frontend to Hostinger + Backend to Supabase

#### Backend Setup (Supabase)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note down: Project URL, API Key, Project ID

2. **Deploy Edge Function**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link your project
   supabase link --project-ref YOUR_PROJECT_ID
   
   # Deploy the function
   supabase functions deploy analyze-health
   ```

3. **Set Environment Variables in Supabase**
   - Go to Project Settings → Edge Functions
   - Add environment variable: `AI_API_KEY` = your OpenAI API key

#### Frontend Setup (Hostinger)

1. **Update Environment Variables**
   ```bash
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   VITE_SUPABASE_PROJECT_ID=your-project-id
   ```

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Deploy to Hostinger**
   - Login to Hostinger control panel
   - Go to File Manager
   - Upload entire `dist` folder contents to `public_html`
   - Or use FTP to upload `dist` folder contents

4. **Domain Setup**
   - In Hostinger: Point domain to `public_html`
   - Update Supabase CORS settings to allow your domain

### GitHub Pages Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **Setup GitHub Secrets**
   - Go to your GitHub repo → Settings → Secrets and variables → Actions
   - Add these secrets:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY` 
     - `VITE_SUPABASE_PROJECT_ID`

3. **Enable GitHub Pages**
   - Go to repo Settings → Pages
   - Source: GitHub Actions
   - The workflow will auto-deploy on push to main

4. **Access Your Site**
   - URL: `https://yourusername.github.io/Visage-Health/`

### Alternative Deployment Options

The application can also be deployed to other static hosting services:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Hostinger

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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](#) - Coming soon
- [Project Repository](https://github.com/yourusername/visage-health)

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
- Open an issue in this repository
- Contact the developer directly

## ⚠️ Disclaimer

**This application is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.**

---

Built by Syed Khaja Moinuddin