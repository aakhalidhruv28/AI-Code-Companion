# 🤖 AI Code Companion

<div align="center">

![AI Code Companion](https://img.shields.io/badge/AI-Code%20Companion-6366f1?style=for-the-badge&logo=openai&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A powerful, modern web application that leverages AI to help developers write, analyze, and improve their code.**

[🚀 Live Demo](https://yourusername.github.io/ai-code-companion) • [Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Setup](#-api-setup)

![AI Code Companion Preview](./screenshots/preview.png)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [API Setup](#-api-setup)
- [Usage](#-usage)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

AI Code Companion is a sophisticated web-based IDE assistant that integrates AI capabilities to help developers with various coding tasks. From explaining complex code to generating documentation, debugging, and optimizing performance, this tool is designed to enhance your development workflow.

### Why AI Code Companion?

- 🚀 **Boost Productivity** - Get instant AI-powered insights on your code
- 🎯 **Multi-Purpose** - 11 different AI actions for various coding needs
- 💡 **Learn & Improve** - Understand code better with detailed explanations
- 🎨 **Beautiful UI** - Modern, clean interface with dark theme code blocks
- ⚡ **Fast & Responsive** - Optimized for performance and user experience
- 🔒 **Privacy-Focused** - Code stored locally in your browser

---

## ✨ Features

### 🤖 AI-Powered Actions

| Action | Description | Use Case |
|--------|-------------|----------|
| **Explain** | Get detailed explanations of code functionality | Understanding complex algorithms |
| **Review** | Receive comprehensive code reviews | Code quality improvement |
| **Optimize** | Get performance optimization suggestions | Speed up your code |
| **Debug** | Identify and fix potential bugs | Error detection |
| **Test** | Generate unit tests automatically | Test coverage |
| **Document** | Create professional documentation | API docs, comments |
| **Convert** | Convert code between languages | Language migration |
| **Refactor** | Improve code structure and readability | Code maintenance |
| **Security** | Identify security vulnerabilities | Security audits |
| **Format** | Clean and beautify code | Code consistency |
| **Comments** | Add helpful inline comments | Code documentation |

### 🎨 Code Editor Features

- **Line Numbers** - Professional code editor with line numbering
- **Syntax Highlighting** - Beautiful syntax highlighting for code blocks
- **Auto-Resize** - Editor automatically adjusts to content
- **Character Counter** - Real-time character and line count
- **Cursor Position** - Track your cursor location
- **Export Functionality** - Export code with custom filename and extension

### 💾 Additional Features

- **History Tracking** - Keep track of all your AI interactions
- **Local Storage** - Automatically save your work
- **Keyboard Shortcuts** - Speed up your workflow with hotkeys
- **Generate Code** - Create code from natural language descriptions
- **Dark Theme Code Blocks** - Easy-to-read code with syntax highlighting
- **Copy to Clipboard** - One-click copy for code blocks
- **Responsive Design** - Works on desktop, laptop, and tablet devices

---

## 📸 Screenshots

> **Note**: Add your own screenshots by following the guide in [SCREENSHOTS_GUIDE.md](./SCREENSHOTS_GUIDE.md)

### Main Interface
<div align="center">
  <img src="./screenshots/main-interface.png" alt="Main Interface" width="800"/>
  <p><em>Clean, modern interface with code editor, AI actions, and response panel</em></p>
</div>

### Code Editor with Line Numbers
<div align="center">
  <img src="./screenshots/code-editor.png" alt="Code Editor" width="800"/>
  <p><em>Professional code editor with syntax highlighting and line numbers</em></p>
</div>

### AI Response with Code Blocks
<div align="center">
  <img src="./screenshots/ai-response.png" alt="AI Response" width="800"/>
  <p><em>Beautiful dark theme code blocks with syntax highlighting and copy buttons</em></p>
</div>

### Generate Code Modal
<div align="center">
  <img src="./screenshots/generate-modal.png" alt="Generate Code" width="600"/>
  <p><em>Generate code from natural language descriptions</em></p>
</div>

### Export Functionality
<div align="center">
  <img src="./screenshots/export-modal.png" alt="Export Code" width="600"/>
  <p><em>Export code with custom filename and extension</em></p>
</div>

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Highlight.js** - Syntax highlighting for code blocks

### Fonts
- **Inter** - UI text (Google Fonts)
- **Fira Code** - Code editor and blocks (Google Fonts)

### AI Integration
- **OpenRouter API** - AI model access
- **Google Gemini 2.0 Flash** - Free AI model for code analysis

### Storage
- **LocalStorage** - Client-side data persistence

---

## 📦 Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for AI API calls)
- OpenRouter API key (free tier available)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-code-companion.git
   cd ai-code-companion
   ```

2. **Create screenshots folder** (optional, for your own screenshots)
   ```bash
   mkdir screenshots
   ```

3. **Open the application**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   start index.html
   # or double-click index.html
   ```

4. **Configure API Key** (See [API Setup](#-api-setup))

### 🌐 Live Demo

Try it now without installation: **[AI Code Companion Live Demo](https://yourusername.github.io/ai-code-companion)**

> Note: You'll need to add your own OpenRouter API key to use the AI features.

### Alternative: Use a Local Server

For better development experience:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

---

## 🔑 API Setup

### Getting Your OpenRouter API Key

1. **Sign up for OpenRouter**
   - Visit [OpenRouter.ai](https://openrouter.ai/)
   - Create a free account
   - Navigate to API Keys section

2. **Generate API Key**
   - Click "Create API Key"
   - Copy your API key

3. **Configure the Application**
   
   Open `script.js` and update the API key:
   
   ```javascript
   // Line 2 in script.js
   const OPENROUTER_API_KEY = 'your-api-key-here';
   ```

4. **Choose Your Model** (Optional)
   
   The app uses Google Gemini 2.0 Flash (free) by default:
   
   ```javascript
   // Line 4 in script.js
   const MODEL = 'google/gemini-2.0-flash-exp:free';
   ```
   
   Other free models available:
   - `openai/gpt-3.5-turbo`
   - `meta-llama/llama-3-8b-instruct:free`
   - `mistralai/mistral-7b-instruct:free`

### API Rate Limits

- **Free Tier**: Generous limits for personal use
- **Paid Tier**: Higher limits and faster responses
- Check [OpenRouter Pricing](https://openrouter.ai/docs#pricing) for details

---

## 🚀 Usage

### Basic Workflow

1. **Write or Paste Code**
   - Type directly in the code editor
   - Or paste existing code

2. **Select an AI Action**
   - Click any action button (Explain, Review, etc.)
   - Or use keyboard shortcuts

3. **Review AI Response**
   - Read the AI-generated insights
   - Copy code blocks with one click
   - Export results if needed

### Generate Code from Description

1. **Click "Generate Code" in navbar**
2. **Describe what you want**
   ```
   Example: "Create a function that validates email addresses 
   using regex and returns true/false"
   ```
3. **Get Generated Code**
   - AI generates complete, working code
   - Code appears in the editor
   - Explanation shown in response panel

### Export Your Code

1. **Click "Export" button**
2. **Enter filename** (e.g., "my-script")
3. **Choose extension** (.js, .py, .html, etc.)
4. **Download** - File downloads automatically

### View History

- Click "History" button in navbar
- See all previous AI interactions
- Click any history item to view details

---

## ⌨️ Keyboard Shortcuts

### AI Actions
| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Explain Code |
| `Ctrl/Cmd + Shift + R` | Code Review |
| `Ctrl/Cmd + Shift + O` | Optimize Code |
| `Ctrl/Cmd + Shift + D` | Debug Code |
| `Ctrl/Cmd + Shift + T` | Generate Tests |
| `Ctrl/Cmd + Shift + M` | Generate Documentation |
| `Ctrl/Cmd + Shift + C` | Add Comments |
| `Ctrl/Cmd + Shift + F` | Refactor Code |
| `Ctrl/Cmd + Shift + P` | Format Code |
| `Ctrl/Cmd + Shift + U` | Security Audit |

### Navigation
| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + H` | Open History |
| `Ctrl/Cmd + G` | Generate Code |
| `Ctrl/Cmd + Shift + E` | Export Code |
| `Ctrl/Cmd + Shift + N` | New Session |
| `Esc` | Close Modal |

---

## 📁 Project Structure

```
ai-code-companion/
├── index.html                 # Main HTML file
├── script.js                  # JavaScript logic
├── style.css                  # Styling
├── README.md                  # This file
├── LICENSE                    # MIT License
├── AI_RESPONSE_REDESIGN.md    # Design documentation
├── UPDATE_SUMMARY.md          # Update history
└── screenshots/               # Screenshots for README
    ├── preview.png            # Main preview image
    ├── main-interface.png     # Full interface screenshot
    ├── code-editor.png        # Code editor screenshot
    ├── ai-response.png        # AI response screenshot
    ├── generate-modal.png     # Generate code modal
    └── export-modal.png       # Export modal screenshot
```

### Key Files

**index.html**
- Main application structure
- Modals for Generate, Convert, Export, History
- Code editor and AI response panels

**script.js**
- API integration with OpenRouter
- Markdown to HTML conversion
- Code editor functionality
- Event handlers and keyboard shortcuts
- Local storage management

**style.css**
- Modern, responsive design
- Dark theme code blocks
- Custom scrollbars
- Animations and transitions

---

## 🎨 Customization

### Change Color Scheme

Edit CSS variables in `style.css`:

```css
:root {
    --primary: #6366f1;        /* Primary color */
    --primary-dark: #4f46e5;   /* Primary dark */
    --success: #10b981;        /* Success color */
    --danger: #ef4444;         /* Error color */
    /* ... more colors ... */
}
```

### Modify AI Prompts

Edit prompt templates in `script.js`:

```javascript
function generatePrompt(action, code) {
    const basePrompts = {
        explain: `Your custom prompt here...`,
        review: `Your custom prompt here...`,
        // ... more prompts ...
    };
}
```

### Add New AI Actions

1. Add button in `index.html`
2. Add event listener in `script.js`
3. Add prompt template in `generatePrompt()`
4. Add styling in `style.css`

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

1. Check if the bug is already reported
2. Open a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and its benefits
3. Provide examples or mockups if possible

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Comment your code
- Test thoroughly before submitting
- Update documentation if needed

---

## 🐛 Known Issues

- Mobile responsive version in development
- Some AI models may have rate limits
- Large code files may take longer to process

---

## 🔮 Roadmap

### Version 1.1
- [ ] Mobile responsive design
- [ ] Multiple theme options
- [ ] More AI models support
- [ ] Code diff viewer
- [ ] Collaborative features

### Version 1.2
- [ ] Plugin system
- [ ] Custom AI prompts
- [ ] Code snippets library
- [ ] Git integration
- [ ] Cloud sync

### Version 2.0
- [ ] Desktop app (Electron)
- [ ] VS Code extension
- [ ] Team collaboration
- [ ] Advanced analytics
- [ ] Custom AI training

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 AI Code Companion

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

### Technologies
- [OpenRouter](https://openrouter.ai/) - AI API gateway
- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI model
- [Highlight.js](https://highlightjs.org/) - Syntax highlighting
- [Google Fonts](https://fonts.google.com/) - Inter & Fira Code fonts

### Inspiration
- GitHub Copilot
- ChatGPT
- Replit AI
- CodePen

### Special Thanks
- All contributors and users
- Open source community
- AI/ML researchers and developers

---

## 📞 Contact & Support

### Get Help
- 📧 Email: support@example.com
- 💬 Discord: [Join our server](#)
- 🐦 Twitter: [@aicodcompanion](#)
- 📖 Documentation: [Wiki](#)

### Report Issues
- 🐛 Bug Reports: [GitHub Issues](https://github.com/yourusername/ai-code-companion/issues)
- 💡 Feature Requests: [GitHub Discussions](https://github.com/yourusername/ai-code-companion/discussions)

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/ai-code-companion?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/ai-code-companion?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/yourusername/ai-code-companion?style=social)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ by developers, for developers

[Back to Top](#-ai-code-companion)

</div>
