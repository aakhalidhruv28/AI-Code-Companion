# 🚀 Quick Start Guide

Get up and running with AI Code Companion in 5 minutes!

## ⚡ Super Quick Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/ai-code-companion.git
cd ai-code-companion

# 2. Open in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux

# 3. Add your API key (see below)
```

## 🔑 Get Your Free API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up (free)
3. Go to **API Keys** → **Create Key**
4. Copy your key

## ⚙️ Configure API Key

Open `script.js` and update line 2:

```javascript
const OPENROUTER_API_KEY = 'sk-or-v1-your-key-here';
```

**That's it!** You're ready to use AI Code Companion! 🎉

## 🎯 First Steps

### 1. Try Explaining Code
```javascript
// Paste this in the editor:
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}
```
- Click **"Explain"** button
- See detailed explanation in right panel

### 2. Generate New Code
- Click **"Generate Code"** in navbar
- Type: "Create a function to validate email addresses"
- Click **"Generate Code"**
- See generated code in editor

### 3. Use Keyboard Shortcuts
- `Ctrl/Cmd + Enter` - Explain code
- `Ctrl/Cmd + Shift + R` - Review code
- `Ctrl/Cmd + G` - Generate code

## 📚 Learn More

- [Full Documentation](./README.md)
- [Screenshots Guide](./SCREENSHOTS_GUIDE.md)
- [Keyboard Shortcuts](./README.md#-keyboard-shortcuts)

## 🆘 Troubleshooting

### API Key Not Working?
- Check if key is correctly pasted
- Ensure no extra spaces
- Verify key is active on OpenRouter

### No Response from AI?
- Check internet connection
- Verify API key is valid
- Check browser console for errors (F12)

### Code Not Displaying?
- Clear browser cache
- Try different browser
- Check if JavaScript is enabled

## 💡 Pro Tips

1. **Save Your Work** - Code auto-saves to browser storage
2. **Use History** - Access previous AI interactions
3. **Export Code** - Download with custom filename
4. **Keyboard Shortcuts** - Speed up your workflow
5. **Try Different Actions** - Each AI action has unique insights

## 🎓 Example Workflows

### Debug a Function
1. Paste buggy code
2. Click **"Debug"**
3. Review suggestions
4. Fix issues

### Optimize Performance
1. Paste working code
2. Click **"Optimize"**
3. See performance improvements
4. Apply suggestions

### Generate Tests
1. Paste function
2. Click **"Tests"**
3. Get unit tests
4. Copy to test file

## 🌟 Next Steps

- ⭐ Star the repo
- 🐛 Report bugs
- 💡 Suggest features
- 🤝 Contribute code
- 📢 Share with friends

---

**Ready to code smarter?** Start using AI Code Companion now! 🚀
