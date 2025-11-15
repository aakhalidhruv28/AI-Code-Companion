# 📸 Screenshots Guide

This guide will help you capture and add screenshots to your AI Code Companion repository.

## 📁 Required Screenshots

Create a `screenshots` folder in your project root and add these images:

### 1. **preview.png** (Main Preview - Hero Image)
- **Size**: 1200x630px (optimal for GitHub social preview)
- **Content**: Full application interface showing all three panels
- **Purpose**: Main preview image shown at the top of README
- **Tips**: 
  - Use a clean, example code snippet
  - Show an AI response with formatted code
  - Capture in good lighting/contrast

### 2. **main-interface.png** (Full Interface)
- **Size**: 1920x1080px or similar
- **Content**: Complete view of the application
- **Show**:
  - Code editor with sample code
  - All AI action buttons visible
  - AI response panel with content
  - Navigation bar at top

### 3. **code-editor.png** (Code Editor Focus)
- **Size**: 1200x800px
- **Content**: Close-up of the code editor
- **Show**:
  - Line numbers
  - Syntax highlighting
  - Code with proper formatting
  - Footer with stats (lines, chars, cursor position)

### 4. **ai-response.png** (AI Response Panel)
- **Size**: 1200x800px
- **Content**: AI response with code blocks
- **Show**:
  - Formatted markdown text
  - Dark theme code block
  - Syntax highlighting
  - Copy button on code block
  - Success message at top

### 5. **generate-modal.png** (Generate Code Modal)
- **Size**: 800x600px
- **Content**: Generate code modal dialog
- **Show**:
  - Modal overlay
  - Text input with example description
  - Generate button
  - Clean, centered modal

### 6. **export-modal.png** (Export Modal)
- **Size**: 800x600px
- **Content**: Export code modal dialog
- **Show**:
  - File name input field
  - Extension dropdown
  - Download button
  - Modal styling

## 🎨 Screenshot Best Practices

### Preparation
1. **Clear Browser Cache** - Fresh, clean interface
2. **Use Incognito/Private Mode** - No extensions visible
3. **Set Browser Zoom to 100%** - Consistent sizing
4. **Close DevTools** - Clean screenshot
5. **Use Sample Code** - Professional, readable examples

### Sample Code Suggestions

**JavaScript Example:**
```javascript
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 Fibonacci numbers
for (let i = 0; i < 10; i++) {
    console.log(`F(${i}) = ${fibonacci(i)}`);
}
```

**Python Example:**
```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Example usage
numbers = [64, 34, 25, 12, 22, 11, 90]
print(quick_sort(numbers))
```

### Taking Screenshots

#### macOS
- **Full Screen**: `Cmd + Shift + 3`
- **Selection**: `Cmd + Shift + 4`
- **Window**: `Cmd + Shift + 4`, then `Space`

#### Windows
- **Full Screen**: `PrtScn` or `Win + PrtScn`
- **Selection**: `Win + Shift + S`
- **Snipping Tool**: Search for "Snipping Tool"

#### Linux
- **Full Screen**: `PrtScn`
- **Selection**: `Shift + PrtScn`
- **GNOME Screenshot**: `gnome-screenshot`

### Editing Screenshots

#### Recommended Tools
- **macOS**: Preview, Pixelmator, Sketch
- **Windows**: Paint, Paint.NET, GIMP
- **Linux**: GIMP, Krita, Pinta
- **Online**: Photopea, Canva, Figma

#### Editing Steps
1. **Crop** - Remove unnecessary parts
2. **Resize** - Match recommended dimensions
3. **Compress** - Optimize file size (use TinyPNG, ImageOptim)
4. **Format** - Save as PNG for best quality
5. **Name** - Use exact names from the list above

## 📤 Adding Screenshots to Repository

### Step 1: Create Folder
```bash
mkdir screenshots
```

### Step 2: Add Screenshots
```bash
# Copy your screenshots to the folder
cp ~/Desktop/preview.png screenshots/
cp ~/Desktop/main-interface.png screenshots/
cp ~/Desktop/code-editor.png screenshots/
cp ~/Desktop/ai-response.png screenshots/
cp ~/Desktop/generate-modal.png screenshots/
cp ~/Desktop/export-modal.png screenshots/
```

### Step 3: Optimize Images
```bash
# Using ImageOptim (macOS)
imageoptim screenshots/*.png

# Using TinyPNG CLI
tinypng screenshots/*.png

# Using ImageMagick
mogrify -strip -quality 85 screenshots/*.png
```

### Step 4: Commit to Git
```bash
git add screenshots/
git commit -m "Add screenshots for README"
git push origin main
```

## 🌐 Setting Up GitHub Pages (for Live Demo)

### Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under **Source**, select **main** branch
5. Click **Save**
6. Your site will be live at: `https://yourusername.github.io/ai-code-companion`

### Update README Links
Replace `yourusername` with your actual GitHub username:
```markdown
[🚀 Live Demo](https://yourusername.github.io/ai-code-companion)
```

## 🎯 Screenshot Checklist

Before committing, verify:

- [ ] All 6 screenshots are present
- [ ] Images are properly named (lowercase, hyphens)
- [ ] File sizes are optimized (< 500KB each)
- [ ] Images are clear and readable
- [ ] No personal information visible
- [ ] Consistent styling across screenshots
- [ ] Professional sample code used
- [ ] Dark theme code blocks visible
- [ ] UI elements are clear
- [ ] No browser extensions visible

## 📊 Recommended Image Sizes

| Screenshot | Dimensions | Max Size |
|------------|------------|----------|
| preview.png | 1200x630px | 500KB |
| main-interface.png | 1920x1080px | 800KB |
| code-editor.png | 1200x800px | 400KB |
| ai-response.png | 1200x800px | 400KB |
| generate-modal.png | 800x600px | 300KB |
| export-modal.png | 800x600px | 300KB |

## 🎨 Alternative: Use Placeholder Images

If you don't have screenshots yet, you can use placeholder images:

```markdown
![Preview](https://via.placeholder.com/1200x630/6366f1/ffffff?text=AI+Code+Companion)
```

Or create simple graphics with:
- [Canva](https://www.canva.com/)
- [Figma](https://www.figma.com/)
- [Excalidraw](https://excalidraw.com/)

## 🚀 Pro Tips

1. **Use Consistent Browser Window Size** - Set browser to specific dimensions
2. **Hide Cursor** - Take screenshot without mouse cursor
3. **Use High DPI Display** - Better quality screenshots
4. **Add Annotations** - Highlight important features (optional)
5. **Create GIFs** - Show interactions (use LICEcap, Kap, or ScreenToGif)
6. **Version Control** - Keep original high-res versions
7. **Update Regularly** - Refresh screenshots when UI changes

## 📝 Example Git Workflow

```bash
# 1. Create screenshots folder
mkdir screenshots

# 2. Add your screenshots
# (Take screenshots and save them to the folder)

# 3. Optimize images
# (Use your preferred optimization tool)

# 4. Check file sizes
ls -lh screenshots/

# 5. Add to git
git add screenshots/
git add README.md

# 6. Commit
git commit -m "Add screenshots and update README with preview images"

# 7. Push to GitHub
git push origin main

# 8. Verify on GitHub
# Check that images display correctly in README
```

## ✅ Final Verification

After pushing to GitHub:

1. Visit your repository
2. Check README displays all images
3. Verify images load quickly
4. Test on mobile view
5. Check social preview (share link on Twitter/Discord)
6. Ensure live demo link works

---

**Need Help?** 
- Check [GitHub's Image Documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#images)
- Use [Shields.io](https://shields.io/) for badges
- Try [Carbon](https://carbon.now.sh/) for beautiful code screenshots
