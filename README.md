# Ulzhan — Puzzle Generator

Ulzhan is a modern puzzle-generation tool built with **Next.js**, **TypeScript**, **TailwindCSS**, and **Gemini API**.  
Users can generate custom crossword-style puzzles using:

- 📝 A simple **topic**
- 📄 An uploaded **PDF**
- 🧩 A structured **JSON file** (custom puzzle input)

The tool parses uploaded content, validates JSON formats, and dynamically builds personalized puzzles.

---

## 🚀 Live Website
🔗 **https://ulzhan.vercel.app/**


---

## 📖 Features
- Generate puzzles from **topic text**
- Upload **PDF** files as puzzle data sources
- Upload & validate **JSON puzzle formats**
- Interactive modals for JSON format instructions & invalid JSON errors
- Smooth UI animations via **Framer Motion**
- Stylish design using **TailwindCSS**
- Fully client-side validation and puzzle preview

---

## 📁 Accepted JSON Format
```json
{
  "title": "Space Exploration",
  "words": ["Rocket", "NASA", "Moon", "Astronaut"],
  "clues": [
    "Vehicle used to travel into space",
    "US space agency",
    "Earth's satellite",
    "Person who travels in space"
  ]
}
```

**Required fields:**
- `title: string`
- `words: string[]`
- `clues: string[]` (same length as `words`)

---

## 🛠️ Local Development Setup

### **1. Clone the repository**
```bash
git clone https://github.com/knightwor/ulzhan.git
cd ulzhan
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Create your environment variables**
Create `.env.local` file:
```
NEXT_PUBLIC_GEMINI_AI_API_KEY=your_api_key_here
```

### **4. Run the dev server**
```bash
npm run dev
```
Visit:  
📍 `http://localhost:3000`

---

## 🤝 Contribution Guide
We welcome contributions! Follow the steps below:

### **1. Fork the repo**
Click **Fork** on GitHub.

### **2. Create a new branch**
```bash
git checkout -b feature-name
```

### **3. Make your changes**
Follow project structure & linting rules.

### **4. Commit your changes**
```bash
git commit -m "Add: feature description"
```

### **5. Push the branch**
```bash
git push origin feature-name
```

### **6. Open a Pull Request**
Provide a clear description of what you changed.

---

## 📜 License
MIT License — free to use, modify, and distribute.

---

## ⭐ Support
If you like the project, consider giving it a **star on GitHub**!