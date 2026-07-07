# PlaceProAI Frontend - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Backend API running on `http://localhost:8000`

### Installation & Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install missing packages** (if needed)
   ```bash
   npm install framer-motion recharts lucide-react axios
   ```

4. **Create environment file** (.env)
   ```bash
   cat > .env << EOF
   VITE_API_URL=http://localhost:8000
   VITE_APP_NAME=PlaceProAI
   EOF
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   The app will start at `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── StatCard.jsx    # KPI cards
│   │   ├── SectionCard.jsx # Content containers
│   │   ├── Button.jsx      # Button components
│   │   ├── Badge.jsx       # Badge elements
│   │   ├── Modal.jsx       # Modal dialogs
│   │   ├── ProgressRing.jsx # Circular progress
│   │   ├── PredictionChart.jsx # Charts
│   │   ├── ActivityTimeline.jsx # Timeline
│   │   ├── CompanyTable.jsx # Data tables
│   │   ├── SkillList.jsx   # Skill display
│   │   └── RoadmapCard.jsx # Roadmap cards
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration
│   │   ├── ResumeAnalysis.jsx # Resume upload & analysis
│   │   ├── CompanyPredictor.jsx # Company matching
│   │   ├── SkillRoadmap.jsx # Learning paths
│   │   ├── InterviewPrep.jsx # Interview questions
│   │   └── Profile.jsx     # User profile
│   ├── services/
│   │   └── api.js          # API integration
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## 🎨 Theme & Colors

### Primary Colors
- **Purple**: #8B5CF6
- **Cyan**: #06B6D4
- **Gradient**: Linear(135deg, #8B5CF6 → #06B6D4)

### Background
- **Primary Dark**: #0F172A
- **Secondary Dark**: #1E293B
- **Card Background**: rgba(30, 41, 59, 0.7)

### Text
- **Primary Text**: #F1F5F9
- **Secondary Text**: #CBD5E1
- **Tertiary Text**: #94A3B8

## 📱 Responsive Breakpoints

```css
Mobile:     < 768px
Tablet:     768px - 1024px
Desktop:    > 1024px
```

## 🔐 Authentication Flow

1. User arrives at `/login`
2. Enters credentials
3. Backend returns `access_token`
4. Token stored in `localStorage`
5. Redirected to `/dashboard`
6. Protected routes check for token
7. If no token → Redirected to `/login`

## 📊 Available Pages

| Page | Route | Auth Required | Purpose |
|------|-------|---------------|---------|
| Login | `/login` | ❌ | User authentication |
| Register | `/register` | ❌ | Account creation |
| Dashboard | `/dashboard` | ✅ | Main dashboard with metrics |
| Resume Analysis | `/resume` | ✅ | Upload & analyze resume |
| Company Predictor | `/company` | ✅ | Find company matches |
| Skill Roadmap | `/roadmap` | ✅ | Learning paths |
| Interview Prep | `/interview` | ✅ | Interview questions |
| Profile | `/profile` | ✅ | User profile management |
| ATS Report | `/report` | ✅ | ATS score report |
| Job Matching | `/job-match` | ✅ | Job recommendations |

## 🛠 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🔧 Configuration

### API Endpoints
Update in `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000';
```

### Vite Config
Edit `vite.config.js` for build optimization:
```javascript
export default {
  server: {
    port: 5173,
  }
}
```

## 🚀 Building for Production

```bash
# Build the project
npm run build

# Output will be in `dist/` folder

# Deploy to hosting
# Copy contents of `dist/` to your hosting provider
```

## 📦 Dependencies

### Core
- `react` - UI library
- `react-router-dom` - Routing
- `vite` - Build tool

### UI & Animations
- `framer-motion` - Animations
- `lucide-react` - Icons
- `recharts` - Charts

### API & Utils
- `axios` - HTTP client

## 🎯 Key Features Implemented

✅ **Modern UI**
- Glassmorphism design
- Gradient overlays
- Smooth animations

✅ **Responsive Design**
- Mobile-first approach
- Adaptive layouts
- Touch-friendly

✅ **Performance**
- Code splitting
- Lazy loading
- Optimized assets

✅ **Security**
- Protected routes
- Token-based auth
- Input validation

✅ **User Experience**
- Loading states
- Error handling
- Success feedback

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear vite cache
rm -rf dist/ .vite
npm run build
```

## 📚 Component Usage Examples

### Button
```jsx
<Button variant="primary" size="lg">
  Click Me
</Button>
```

### StatCard
```jsx
<StatCard 
  icon={TrendingUp}
  label="Score"
  value={85}
  change={10}
  trend="up"
/>
```

### SectionCard
```jsx
<SectionCard title="Section Title">
  Content here
</SectionCard>
```

### Modal
```jsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal">
  Modal content
</Modal>
```

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Framer Motion](https://www.framer.com/motion)
- [Vite Docs](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📝 License

Part of PlaceProAI project.

## 💡 Next Steps

1. ✅ Backend integration testing
2. ✅ UI/UX refinement
3. ✅ Performance optimization
4. ✅ Accessibility audit
5. ✅ Security testing
6. ✅ Deployment setup

---

**Need Help?** Check the [FRONTEND_IMPLEMENTATION.md](./FRONTEND_IMPLEMENTATION.md) for detailed documentation.

**Version**: 1.0.0  
**Last Updated**: 2026-07-07
