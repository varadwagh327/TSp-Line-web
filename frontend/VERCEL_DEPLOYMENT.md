# 🚀 Vercel Frontend Deployment Guide

## ✅ Fixed Issues:
1. **Added `.npmrc`** - Resolves dependency conflicts with `legacy-peer-deps=true`
2. **Added `vercel.json`** - Proper routing configuration for SPA
3. **Updated build script** - `CI=false` to ignore warnings as errors

---

## 📝 Vercel Deployment Steps:

### **Option 1: Via Vercel Dashboard (Recommended)**

1. **Go to Vercel Dashboard** - https://vercel.com/
2. **Click "Add New Project"**
3. **Import from GitHub:**
   - Select: `varadwagh327/TSp-Line-web`
   - Branch: `main`
4. **Configure Project:**

   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

5. **Environment Variables:**
   Add this in Vercel dashboard:
   ```
   Key: REACT_APP_API_BASE
   Value: https://tsp-line-web.onrender.com
   ```

6. **Click "Deploy"**

---

### **Option 2: Via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

When prompted:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → tsp-line-web-frontend
- **Directory?** → ./
- **Override settings?** → Yes
  - **Build Command:** `npm run build`
  - **Output Directory:** `build`
  - **Development Command:** Leave default

---

## 🔧 **Settings Already Configured:**

### **vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    { "src": "/static/(.*)", "dest": "/static/$1" },
    { "src": "/(.*)", "dest": "/index.html" }  // SPA routing
  ]
}
```

### **.npmrc**
```
legacy-peer-deps=true  // Fixes dependency conflicts
```

### **package.json**
```json
"build": "CI=false react-scripts build"  // Ignore warnings
```

---

## ⚠️ **After Deployment:**

### **1. Update Backend CORS:**
Go to **Render Dashboard** → **TSp-Line-web** → **Environment**:

**Update `FRONTEND_URL`:**
```env
FRONTEND_URL=https://your-vercel-app.vercel.app
```

Replace with your actual Vercel URL (e.g., `tsp-line-web-solutions.vercel.app`)

### **2. Update Google OAuth:**
If using Google login:
- Go to **Google Cloud Console**
- Add Vercel domain to **Authorized JavaScript origins**
- Add redirect URIs

### **3. Test the Site:**
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Login/Register
- ✅ API calls work
- ✅ Products page
- ✅ Contact form

---

## 🐛 **Troubleshooting:**

### **Build Fails on Vercel:**
```bash
# Clear npm cache locally and recommit
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "chore: update package-lock"
git push
```

### **CORS Errors:**
- Update `FRONTEND_URL` in Render backend
- Make sure no trailing slash: ✅ `https://app.vercel.app` ❌ `https://app.vercel.app/`

### **Routing Issues (404 on refresh):**
- `vercel.json` is already configured to handle SPA routing
- All routes redirect to `index.html`

### **Environment Variable Not Working:**
- Must start with `REACT_APP_`
- Rebuild after adding env vars in Vercel
- Vercel Dashboard → Settings → Environment Variables → Redeploy

---

## 📊 **Expected Results:**

### **Build Output:**
```
✓ Compiled successfully
File sizes after gzip:
  XX kB  build/static/js/main.338d07e3.js
  XX kB  build/static/css/main.c7918b12.css

The build folder is ready to be deployed.
```

### **Deployment:**
```
✓ Production: https://tsp-line-web-solutions.vercel.app
✓ Preview: https://tsp-line-web-git-main-varadwagh327.vercel.app
```

---

## 🎯 **Quick Summary:**

| Setting | Value |
|---------|-------|
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |
| **Install Command** | `npm install` |
| **Framework** | Create React App |
| **Node Version** | 18.x (auto-detected) |

---

## 🔐 **Environment Variables Needed:**

```env
REACT_APP_API_BASE=https://tsp-line-web.onrender.com
```

---

**Your deployment should now succeed! The integrity errors are fixed with `.npmrc` and proper Vercel configuration.** 🎉
