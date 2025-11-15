// OpenRouter API Configuration
const OPENROUTER_API_KEY = 'your-api-key-here';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'meta-llama/llama-4-maverick:free';

// State Management
let history = JSON.parse(localStorage.getItem('codeCompanionHistory')) || [];
let savedCode = localStorage.getItem('savedCode') || '';

// DOM Elements
const codeInput = document.getElementById('codeInput');
const charCount = document.getElementById('charCount');
const lineCount = document.getElementById('lineCount');
const clearBtn = document.getElementById('clearBtn');
const outputContent = document.getElementById('outputContent');
const loadingOverlay = document.getElementById('loadingOverlay');
const copyAllBtn = document.getElementById('copyAllBtn');
const clearOutputBtn = document.getElementById('clearOutputBtn');
const lineNumbers = document.getElementById('lineNumbers');
const codeEditorWrapper = document.getElementById('codeEditorWrapper');

// Modals
const generateModal = document.getElementById('generateModal');
const convertModal = document.getElementById('convertModal');
const historyModal = document.getElementById('historyModal');
const templatesModal = document.getElementById('templatesModal');
const shortcutsModal = document.getElementById('shortcutsModal');
const historyContent = document.getElementById('historyContent');

// Action Buttons
const explainBtn = document.getElementById('explainBtn');
const reviewBtn = document.getElementById('reviewBtn');
const optimizeBtn = document.getElementById('optimizeBtn');
const debugBtn = document.getElementById('debugBtn');
const testBtn = document.getElementById('testBtn');
const documentBtn = document.getElementById('documentBtn');
const commentsBtn = document.getElementById('commentsBtn');
const convertBtn = document.getElementById('convertBtn');
const refactorBtn = document.getElementById('refactorBtn');
const formatBtn = document.getElementById('formatBtn');
const securityBtn = document.getElementById('securityBtn');

// Quick Actions
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const exportBtn = document.getElementById('exportBtn');
const newSessionBtn = document.getElementById('newSessionBtn');

// Initialize
if (savedCode) {
    codeInput.value = savedCode;
    updateCounts();
    updateLineNumbers();
    updateCursorPosition();
    setTimeout(autoResizeTextarea, 0);
}

// Update character and line counts
function updateCounts() {
    const text = codeInput.value;
    charCount.textContent = text.length;
    lineCount.textContent = text.split('\n').length;
}

// Update cursor position
function updateCursorPosition() {
    const cursorPos = codeInput.selectionStart;
    const textBeforeCursor = codeInput.value.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    
    const cursorElement = document.getElementById('cursorPosition');
    if (cursorElement) {
        cursorElement.textContent = `${line}:${column}`;
    }
}

// Update line numbers
function updateLineNumbers() {
    const lines = codeInput.value.split('\n').length;
    const lineNumbersText = Array.from({ length: Math.max(lines, 1) }, (_, i) => i + 1).join('\n');
    lineNumbers.textContent = lineNumbersText;
    
    // Sync line numbers height with code input
    const codeHeight = codeInput.scrollHeight;
    lineNumbers.style.height = codeHeight + 'px';
}

// Sync line numbers scroll with code editor
codeEditorWrapper.addEventListener('scroll', () => {
    lineNumbers.style.transform = `translateY(-${codeEditorWrapper.scrollTop}px)`;
});

// Character counter and cursor position
codeInput.addEventListener('input', () => {
    updateCounts();
    updateLineNumbers();
    updateCursorPosition();
    autoResizeTextarea();
    localStorage.setItem('savedCode', codeInput.value);
});

// Auto-resize textarea to fit content
function autoResizeTextarea() {
    // Reset height
    codeInput.style.height = 'auto';
    codeInput.style.height = Math.max(codeInput.scrollHeight, codeEditorWrapper.clientHeight) + 'px';
    
    // Calculate width based on longest line
    const lines = codeInput.value.split('\n');
    const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);
    
    // Approximate character width (adjust based on font)
    const charWidth = 8.4; // Approximate width for Fira Code at 0.9rem
    const calculatedWidth = Math.max(
        codeEditorWrapper.clientWidth - 32, // Minimum width (wrapper width minus padding)
        (longestLine * charWidth) + 48 // Width based on content plus padding
    );
    
    codeInput.style.width = calculatedWidth + 'px';
}

// Update cursor position on click and keyboard navigation
codeInput.addEventListener('click', updateCursorPosition);
codeInput.addEventListener('keyup', updateCursorPosition);
codeInput.addEventListener('focus', updateCursorPosition);

// Navigation buttons
document.getElementById('historyBtn').addEventListener('click', () => {
    historyModal.classList.add('active');
    renderHistory();
});

document.getElementById('shortcutsBtn').addEventListener('click', () => {
    shortcutsModal.classList.add('active');
});

// Generate Code button in navbar
document.getElementById('generateCodeBtn').addEventListener('click', () => {
    generateModal.classList.add('active');
    document.getElementById('generateInput').focus();
});

newSessionBtn.addEventListener('click', () => {
    if (confirm('Start a new session? This will clear your current code.')) {
        codeInput.value = '';
        updateCounts();
        updateLineNumbers();
        autoResizeTextarea();
        localStorage.removeItem('savedCode');
        clearOutputBtn.click();
    }
});

// Clear button
clearBtn.addEventListener('click', () => {
    if (confirm('Clear all code?')) {
        codeInput.value = '';
        updateCounts();
        updateLineNumbers();
        autoResizeTextarea();
        localStorage.removeItem('savedCode');
        codeInput.focus();
    }
});

// Clear output button
clearOutputBtn.addEventListener('click', () => {
    outputContent.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                </svg>
            </div>
            <h3>Ready to Assist</h3>
            <p>Paste your code and select an AI action to get started</p>
            <div class="quick-tips">
                <span class="tip">💡 Use keyboard shortcuts for faster workflow</span>
                <span class="tip">🚀 DeepSeek R1 provides advanced code analysis</span>
            </div>
        </div>
    `;
});

// Copy all button
copyAllBtn.addEventListener('click', async () => {
    const text = outputContent.innerText;
    if (!text || text.includes('Ready to Assist')) {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        showSuccess('Copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
        showError('Failed to copy to clipboard');
    }
});

// Export - Show modal
exportBtn.addEventListener('click', () => {
    const code = codeInput.value;
    if (!code.trim()) {
        showError('No code to export!');
        return;
    }
    
    // Show export modal
    const exportModal = document.getElementById('exportModal');
    exportModal.classList.add('active');
    
    // Set default file name
    document.getElementById('exportFileName').value = 'my-code';
    document.getElementById('exportFileName').focus();
    document.getElementById('exportFileName').select();
});

// Action button handlers
explainBtn.addEventListener('click', () => handleAction('explain'));
reviewBtn.addEventListener('click', () => handleAction('review'));
optimizeBtn.addEventListener('click', () => handleAction('optimize'));
debugBtn.addEventListener('click', () => handleAction('debug'));
testBtn.addEventListener('click', () => handleAction('test'));
documentBtn.addEventListener('click', () => handleAction('document'));
commentsBtn.addEventListener('click', () => handleAction('comments'));
refactorBtn.addEventListener('click', () => handleAction('refactor'));
formatBtn.addEventListener('click', () => handleAction('format'));
securityBtn.addEventListener('click', () => handleAction('security'));

convertBtn.addEventListener('click', () => {
    if (!codeInput.value.trim()) {
        showError('Please enter code to convert!');
        return;
    }
    convertModal.classList.add('active');
});

// Modal handlers
document.getElementById('closeGenerateModal').addEventListener('click', () => {
    generateModal.classList.remove('active');
});

document.getElementById('cancelGenerateBtn').addEventListener('click', () => {
    generateModal.classList.remove('active');
});

document.getElementById('generateSubmitBtn').addEventListener('click', async () => {
    const description = document.getElementById('generateInput').value.trim();
    if (!description) {
        showError('Please describe what you want to generate!');
        return;
    }
    generateModal.classList.remove('active');
    await handleGenerate(description);
    document.getElementById('generateInput').value = '';
});

document.getElementById('closeConvertModal').addEventListener('click', () => {
    convertModal.classList.remove('active');
});

document.getElementById('cancelConvertBtn').addEventListener('click', () => {
    convertModal.classList.remove('active');
});

document.getElementById('convertSubmitBtn').addEventListener('click', async () => {
    const targetLang = document.getElementById('targetLanguage').value;
    convertModal.classList.remove('active');
    await handleConvert(targetLang);
});

document.getElementById('closeHistoryBtn').addEventListener('click', () => {
    historyModal.classList.remove('active');
});

document.getElementById('closeTemplatesBtn').addEventListener('click', () => {
    templatesModal.classList.remove('active');
});

document.getElementById('closeShortcutsBtn').addEventListener('click', () => {
    shortcutsModal.classList.remove('active');
});

// Export Modal handlers
document.getElementById('closeExportModal').addEventListener('click', () => {
    document.getElementById('exportModal').classList.remove('active');
});

document.getElementById('cancelExportBtn').addEventListener('click', () => {
    document.getElementById('exportModal').classList.remove('active');
});

document.getElementById('exportSubmitBtn').addEventListener('click', () => {
    const code = codeInput.value;
    const fileName = document.getElementById('exportFileName').value.trim() || 'my-code';
    const fileExtension = document.getElementById('exportFileExtension').value;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName + fileExtension;
    a.click();
    URL.revokeObjectURL(url);
    
    document.getElementById('exportModal').classList.remove('active');
    showSuccess('Code exported successfully!');
});

// Close modals on outside click
const exportModal = document.getElementById('exportModal');
[generateModal, convertModal, historyModal, templatesModal, shortcutsModal, exportModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Template Search (no filter)
function renderTemplates(searchQuery = '') {
    const grid = document.getElementById('templatesGrid');
    const noResults = document.getElementById('noResults');
    
    let filtered = templates;
    
    // Apply search query only
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(t => 
            t.name.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query) ||
            t.language.toLowerCase().includes(query) ||
            t.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }
    
    // Render templates
    if (filtered.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'flex';
    } else {
        grid.style.display = 'grid';
        noResults.style.display = 'none';
        
        grid.innerHTML = filtered.map(template => `
            <div class="template-card" data-template-id="${template.id}">
                <div class="template-icon">${template.icon}</div>
                <h4>${template.name}</h4>
                <p>${template.description}</p>
                <div class="template-tags">
                    ${template.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <span class="template-lang">${template.language}</span>
            </div>
        `).join('');
        
        // Add click handlers to load template code
        grid.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                const templateId = card.dataset.templateId;
                const template = templates.find(t => t.id === templateId);
                if (template) {
                    codeInput.value = template.code;
                    updateCounts();
                    updateLineNumbers();
                    autoResizeTextarea();
                    templatesModal.classList.remove('active');
                    showSuccess(`Template "${template.name}" loaded!`);
                }
            });
        });
    }
}

// Template search (no filters)
const templateSearch = document.getElementById('templateSearch');
const clearSearch = document.getElementById('clearSearch');

if (templateSearch) {
    templateSearch.addEventListener('input', (e) => {
        const query = e.target.value;
        clearSearch.style.display = query ? 'flex' : 'none';
        renderTemplates(query);
    });
}

if (clearSearch) {
    clearSearch.addEventListener('click', () => {
        templateSearch.value = '';
        clearSearch.style.display = 'none';
        renderTemplates('');
        templateSearch.focus();
    });
}

// Generate custom code buttons (if templates modal is still used elsewhere)
if (document.getElementById('generateCustomBtn')) {
    document.getElementById('generateCustomBtn').addEventListener('click', () => {
        templatesModal.classList.remove('active');
        generateModal.classList.add('active');
        document.getElementById('generateInput').focus();
    });
}

if (document.getElementById('generateCustomFromTemplates')) {
    document.getElementById('generateCustomFromTemplates').addEventListener('click', () => {
        templatesModal.classList.remove('active');
        generateModal.classList.add('active');
        document.getElementById('generateInput').focus();
    });
}

// Action handler
async function handleAction(action) {
    const code = codeInput.value.trim();
    
    if (!code) {
        showError('Please enter some code first!');
        return;
    }
    
    showLoading();
    
    try {
        const prompt = generatePrompt(action, code);
        const response = await callOpenRouterAPI(prompt);
        
        if (response && response.content) {
            displayResponse(response.content, action);
            addToHistory(action, code.substring(0, 100), response.content.substring(0, 200));
        } else {
            throw new Error('Invalid response from API');
        }
    } catch (error) {
        console.error('Error:', error);
        showError(`Error: ${error.message || 'Failed to get response from AI'}`);
    } finally {
        hideLoading();
    }
}

// Handle Generate
async function handleGenerate(description) {
    showLoading();
    
    try {
        const prompt = `Generate code based on this description: ${description}\n\nProvide complete, working code with comments explaining key parts. Choose the most appropriate programming language for the task.`;
        const response = await callOpenRouterAPI(prompt);
        
        if (response && response.content) {
            const codeMatch = response.content.match(/```[\w]*\n([\s\S]*?)```/);
            if (codeMatch) {
                codeInput.value = codeMatch[1];
                updateCounts();
                updateLineNumbers();
                autoResizeTextarea();
            }
            displayResponse(response.content, 'generate');
            addToHistory('generate', description, response.content.substring(0, 200));
        }
    } catch (error) {
        showError(`Error: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// Handle Convert
async function handleConvert(targetLang) {
    const code = codeInput.value.trim();
    showLoading();
    
    try {
        const prompt = `Convert the following code to ${targetLang}. Maintain the same functionality and logic. Provide only the converted code with brief explanations if needed.\n\nCode:\n\`\`\`\n${code}\n\`\`\``;
        const response = await callOpenRouterAPI(prompt);
        
        if (response && response.content) {
            const codeMatch = response.content.match(/```[\w]*\n([\s\S]*?)```/);
            if (codeMatch) {
                codeInput.value = codeMatch[1];
                updateCounts();
                updateLineNumbers();
                autoResizeTextarea();
            }
            displayResponse(response.content, 'convert');
            addToHistory('convert', `Convert to ${targetLang}`, response.content.substring(0, 200));
        }
    } catch (error) {
        showError(`Error: ${error.message}`);
    } finally {
        hideLoading();
    }
}

// Generate prompts based on action
function generatePrompt(action, code) {
    const basePrompts = {
        explain: `You are an expert code explainer. Analyze the following code and provide a comprehensive explanation. Break it down into:
1. Overall purpose and functionality
2. Step-by-step explanation of what the code does
3. Key concepts and patterns used
4. Input/output behavior
5. Any important details or edge cases

Format your response in clear, easy-to-understand language with proper markdown formatting. Use code blocks for code snippets.

Code:
\`\`\`
${code}
\`\`\``,

        review: `You are a senior code reviewer. Review the following code and provide:
1. Overall assessment (strengths and weaknesses)
2. Code quality issues (if any)
3. Best practices violations
4. Security concerns (if any)
5. Suggestions for improvement
6. What the code does well

Be constructive and professional. Format your response with clear sections using markdown.

Code:
\`\`\`
${code}
\`\`\``,

        optimize: `You are a performance optimization expert. Analyze the following code and provide:
1. Performance bottlenecks identified
2. Optimization suggestions with explanations
3. Improved code examples (if applicable)
4. Time/space complexity improvements
5. Best practices for better performance

Provide specific, actionable recommendations. Format your response with markdown and code blocks.

Code:
\`\`\`
${code}
\`\`\``,

        document: `You are a technical documentation expert. Generate comprehensive documentation for the following code:
1. Function/class/module overview
2. Parameters and return values (if applicable)
3. Usage examples
4. Edge cases and error handling
5. Dependencies and requirements

Format as professional documentation with proper markdown, code blocks, and clear structure.

Code:
\`\`\`
${code}
\`\`\``,

        debug: `You are a debugging expert. Analyze the following code for potential issues:
1. Common bugs and errors that might occur
2. Logic errors or edge cases
3. Runtime errors to watch for
4. Debugging strategies
5. Suggested fixes or improvements

Be thorough and help identify both obvious and subtle issues. Use markdown formatting.

Code:
\`\`\`
${code}
\`\`\``,

        test: `Generate comprehensive test cases for the following code:
1. Unit tests covering main functionality
2. Edge case tests
3. Error handling tests
4. Test examples with expected outputs
5. Testing framework recommendations

Provide test code examples.

Code:
\`\`\`
${code}
\`\`\``,

        comments: `Add detailed, helpful comments to the following code. Explain:
1. What each function/method does
2. Complex logic and algorithms
3. Important parameters and return values
4. Edge cases and assumptions
5. Any non-obvious implementation details

IMPORTANT: Provide the code with comments added. Use proper multi-line formatting with correct indentation. Each line should be on its own line, never compress code into single lines.

Code:
\`\`\`
${code}
\`\`\``,

        refactor: `Refactor the following code to improve:
1. Code readability and maintainability
2. Structure and organization
3. Remove code duplication
4. Apply design patterns where appropriate
5. Improve naming conventions

IMPORTANT: Provide the refactored code with proper multi-line formatting and correct indentation. Never compress code into single lines. Each statement should be on its own line.

Code:
\`\`\`
${code}
\`\`\``,

        format: `Format and clean up the following code:
1. Proper indentation and spacing (use multiple lines, never single line)
2. Consistent code style
3. Remove unnecessary code
4. Organize imports/dependencies
5. Follow language-specific formatting conventions

CRITICAL: Provide the formatted code with PROPER MULTI-LINE FORMATTING. Each statement, function, and block should span multiple lines with correct indentation. NEVER compress code into single or two lines.

Code:
\`\`\`
${code}
\`\`\``,

        security: `Perform a security audit of the following code:
1. Security vulnerabilities identified
2. Potential attack vectors
3. Input validation issues
4. Authentication/authorization concerns
5. Recommendations for securing the code

Be thorough and prioritize critical issues.

Code:
\`\`\`
${code}
\`\`\``
    };
    
    return basePrompts[action] || basePrompts.explain;
}

// Call OpenRouter API with retry logic
async function callOpenRouterAPI(prompt, retries = 2) {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
            
            const response = await fetch(OPENROUTER_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'AI Code Companion'
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        {
                            role: 'system',
                            content: `You are an expert programming assistant. Provide clear, detailed, and helpful responses about code.

IMPORTANT FORMATTING RULES:
1. Always use proper markdown formatting with clear sections
2. When showing code, ALWAYS use proper multi-line formatting with proper indentation
3. NEVER put all code on a single line or compress it
4. Use code blocks with language specification: \`\`\`language
5. Add blank lines between sections for better readability
6. Use proper line breaks and indentation in all code examples
7. Format code exactly as it would appear in a real file
8. Each function, class, or code block should span multiple lines with proper structure

Example of GOOD code formatting:
\`\`\`javascript
function example(param) {
    if (param) {
        return true;
    }
    return false;
}
\`\`\`

Example of BAD code formatting (NEVER do this):
\`\`\`javascript
function example(param) { if (param) { return true; } return false; }
\`\`\``
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 3000
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error?.message || response.statusText;
                
                // Provide user-friendly error messages
                if (response.status === 401) {
                    throw new Error('Authentication failed. Please check your API key.');
                } else if (response.status === 429) {
                    throw new Error('Rate limit exceeded. Please wait a moment and try again.');
                } else if (response.status === 500 || response.status === 502 || response.status === 503) {
                    if (attempt < retries) {
                        console.log(`Server error, retrying... (Attempt ${attempt + 1}/${retries + 1})`);
                        await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1))); // Exponential backoff
                        continue;
                    }
                    throw new Error('The AI service is temporarily unavailable. Please try again in a moment.');
                } else {
                    throw new Error(`API Error (${response.status}): ${errorMessage}`);
                }
            }
            
            const data = await response.json();
            
            if (data.choices && data.choices.length > 0) {
                return {
                    content: data.choices[0].message.content,
                    usage: data.usage
                };
            } else {
                throw new Error('No response received from AI model. Please try again.');
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timed out. Please try again with a shorter code snippet.');
            }
            
            if (attempt < retries && !error.message.includes('Authentication') && !error.message.includes('Rate limit')) {
                console.log(`Network error, retrying... (Attempt ${attempt + 1}/${retries + 1})`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                continue;
            }
            
            // If it's already a formatted error, throw it as is
            if (error.message.includes('API Error') || error.message.includes('Authentication') || 
                error.message.includes('Rate limit') || error.message.includes('temporarily unavailable') ||
                error.message.includes('timed out')) {
                throw error;
            }
            
            // Generic network error
            throw new Error(`Network error: Unable to connect to AI service. Please check your internet connection and try again.`);
        }
    }
}

// Display response with syntax highlighting
function displayResponse(content, action) {
    const htmlContent = convertMarkdownToHTML(content);
    
    outputContent.innerHTML = `
        <div class="ai-response">
            <div class="message success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>AI ${getActionName(action)} completed successfully!</span>
            </div>
            ${htmlContent}
        </div>
    `;
    
    // Apply syntax highlighting to all code blocks
    document.querySelectorAll('.ai-response pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
    
    // Add copy buttons to code blocks
    addCopyButtonsToCodeBlocks();
    
    outputContent.scrollTop = 0;
}

// Add copy buttons to all code blocks
function addCopyButtonsToCodeBlocks() {
    document.querySelectorAll('.ai-response pre').forEach((pre, index) => {
        // Detect language from class or content
        const codeBlock = pre.querySelector('code');
        const classes = codeBlock.className.split(' ');
        const langClass = classes.find(c => c.startsWith('language-'));
        const lang = langClass ? langClass.replace('language-', '') : 'code';
        
        // Create header with language and copy button
        const header = document.createElement('div');
        header.className = 'code-block-header';
        header.innerHTML = `
            <span class="code-lang">${lang}</span>
            <button class="copy-code-btn" data-code-index="${index}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
            </button>
        `;
        
        pre.insertBefore(header, pre.firstChild);
        
        // Add click handler for copy button
        const copyBtn = header.querySelector('.copy-code-btn');
        copyBtn.addEventListener('click', async () => {
            const code = codeBlock.textContent;
            try {
                await navigator.clipboard.writeText(code);
                copyBtn.classList.add('copied');
                copyBtn.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copied!
                `;
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.innerHTML = `
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                    `;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

// Convert markdown to HTML
function convertMarkdownToHTML(markdown) {
    let html = markdown;
    
    // Store code blocks temporarily to protect them from line break processing
    const codeBlocks = [];
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'plaintext';
        const placeholder = `___CODE_BLOCK_${codeBlocks.length}___`;
        codeBlocks.push(`<pre><code class="language-${language}">${escapeHtml(code)}</code></pre>`);
        return placeholder;
    });
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Inline code (after code blocks)
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    
    // Wrap consecutive list items
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    
    // Paragraphs
    html = html.split('\n\n').map(para => {
        if (para.trim() && !para.match(/^<[h|u|o|p|d|s|b]/) && !para.includes('___CODE_BLOCK_')) {
            return `<p>${para.trim()}</p>`;
        }
        return para;
    }).join('\n');
    
    // Line breaks (but not inside code block placeholders)
    html = html.replace(/\n/g, '<br>');
    
    // Restore code blocks (they maintain their original formatting with newlines preserved)
    codeBlocks.forEach((block, index) => {
        html = html.replace(`___CODE_BLOCK_${index}___`, block);
    });
    
    return html;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Get action name
function getActionName(action) {
    const names = {
        explain: 'Explanation',
        review: 'Review',
        optimize: 'Optimization',
        document: 'Documentation',
        debug: 'Debug Analysis',
        generate: 'Code Generation',
        test: 'Test Generation',
        comments: 'Comment Addition',
        convert: 'Code Conversion',
        refactor: 'Refactoring',
        format: 'Code Formatting',
        security: 'Security Audit'
    };
    return names[action] || 'Analysis';
}

// History management
function addToHistory(action, codePreview, responsePreview) {
    history.unshift({
        id: Date.now(),
        action,
        codePreview,
        responsePreview,
        timestamp: new Date().toLocaleString()
    });
    
    if (history.length > 50) {
        history = history.slice(0, 50);
    }
    
    localStorage.setItem('codeCompanionHistory', JSON.stringify(history));
}

function renderHistory() {
    if (history.length === 0) {
        historyContent.innerHTML = `
            <div class="empty-state-small">
                <p>No history yet</p>
            </div>
        `;
        return;
    }
    
    historyContent.innerHTML = history.map(item => `
        <div class="history-card" data-id="${item.id}">
            <h4>${getActionName(item.action)}</h4>
            <p>${item.codePreview}...</p>
            <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">${item.timestamp}</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.history-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            const historyItem = history.find(h => h.id === id);
            if (historyItem) {
                outputContent.innerHTML = `
                    <div class="ai-response">
                        <div class="message success">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            <span>History Item - ${getActionName(historyItem.action)}</span>
                        </div>
                        <p><strong>Code Preview:</strong> ${historyItem.codePreview}...</p>
                        <p><strong>Response Preview:</strong> ${historyItem.responsePreview}...</p>
                    </div>
                `;
                historyModal.classList.remove('active');
            }
        });
    });
}

// Project Templates Library
const templates = [
    {
        id: 'ai-chatbot',
        name: 'AI Chatbot',
        description: 'Build an interactive AI chatbot',
        language: 'javascript',
        icon: '🤖',
        tags: ['ai', 'chatbot', 'interactive'],
        code: `// AI Chatbot starter template
// Add your AI API integration here`
    },
    {
        id: 'drawing-app',
        name: 'Build a Drawing App',
        description: 'Create a canvas-based drawing application',
        language: 'javascript',
        icon: '🎨',
        tags: ['canvas', 'drawing', 'graphics'],
        code: `// Drawing App starter template
// Use HTML5 Canvas API`
    },
    {
        id: 'calculator',
        name: 'Calculator',
        description: 'Build a functional calculator',
        language: 'javascript',
        icon: '🔢',
        tags: ['calculator', 'math', 'utility'],
        code: `// Calculator starter template`
    },
    {
        id: 'calendar',
        name: 'Calendar',
        description: 'Create an interactive calendar',
        language: 'javascript',
        icon: '📅',
        tags: ['calendar', 'date', 'scheduling'],
        code: `// Calendar starter template`
    },
    {
        id: 'countdown-timer',
        name: 'Countdown Timer',
        description: 'Build a countdown timer',
        language: 'javascript',
        icon: '⏱️',
        tags: ['timer', 'countdown', 'time'],
        code: `// Countdown Timer starter template`
    },
    {
        id: 'slideshow',
        name: 'Create a JavaScript Slideshow',
        description: 'Image slideshow with transitions',
        language: 'javascript',
        icon: '🖼️',
        tags: ['slideshow', 'images', 'carousel'],
        code: `// Slideshow starter template`
    },
    {
        id: 'currency-converter',
        name: 'Currency Converter',
        description: 'Convert between currencies',
        language: 'javascript',
        icon: '💱',
        tags: ['currency', 'converter', 'api'],
        code: `// Currency Converter starter template`
    },
    {
        id: 'file-uploader',
        name: 'File Uploader',
        description: 'Upload and manage files',
        language: 'javascript',
        icon: '📤',
        tags: ['upload', 'files', 'storage'],
        code: `// File Uploader starter template`
    },
    {
        id: 'flip-images',
        name: 'Flip Images',
        description: 'Image flip and transform effects',
        language: 'javascript',
        icon: '🔄',
        tags: ['images', 'transform', 'effects'],
        code: `// Flip Images starter template`
    },
    {
        id: 'food-delivery-app',
        name: 'Food Delivery App',
        description: 'Build a food ordering system',
        language: 'javascript',
        icon: '🍕',
        tags: ['food', 'delivery', 'ecommerce'],
        code: `// Food Delivery App starter template`
    },
    {
        id: 'guessing-game',
        name: 'Guessing Game',
        description: 'Number guessing game',
        language: 'javascript',
        icon: '🎲',
        tags: ['game', 'random', 'interactive'],
        code: `// Guessing Game starter template`
    },
    {
        id: 'hangman',
        name: 'Hangman',
        description: 'Classic word guessing game',
        language: 'javascript',
        icon: '🎮',
        tags: ['game', 'word', 'puzzle'],
        code: `// Hangman starter template`
    },
    {
        id: 'mad-libs',
        name: 'Mad Libs',
        description: 'Interactive story generator',
        language: 'javascript',
        icon: '📖',
        tags: ['game', 'story', 'text'],
        code: `// Mad Libs starter template`
    },
    {
        id: 'mobile-app',
        name: 'Make a Mobile App',
        description: 'Mobile-responsive application',
        language: 'javascript',
        icon: '📱',
        tags: ['mobile', 'responsive', 'app'],
        code: `// Mobile App starter template`
    },
    {
        id: 'tic-tac-toe',
        name: 'Multiplayer Tic-Tac-Toe Game',
        description: 'Two-player tic-tac-toe',
        language: 'javascript',
        icon: '❌',
        tags: ['game', 'multiplayer', 'strategy'],
        code: `// Tic-Tac-Toe starter template`
    },
    {
        id: 'portfolio',
        name: 'Portfolio',
        description: 'Personal portfolio website',
        language: 'html',
        icon: '💼',
        tags: ['portfolio', 'website', 'showcase'],
        code: `<!-- Portfolio starter template -->`
    },
    {
        id: 'quiz',
        name: 'Quiz',
        description: 'Interactive quiz application',
        language: 'javascript',
        icon: '❓',
        tags: ['quiz', 'trivia', 'education'],
        code: `// Quiz starter template`
    },
    {
        id: 'randomizer',
        name: 'Randomizer',
        description: 'Random selection tool',
        language: 'javascript',
        icon: '🎰',
        tags: ['random', 'generator', 'utility'],
        code: `// Randomizer starter template`
    },
    {
        id: 'rock-paper-scissors',
        name: 'Rock Paper Scissors',
        description: 'Classic hand game',
        language: 'javascript',
        icon: '✊',
        tags: ['game', 'classic', 'interactive'],
        code: `// Rock Paper Scissors starter template`
    },
    {
        id: 'small-game',
        name: 'A Small JavaScript Game',
        description: 'Simple browser game',
        language: 'javascript',
        icon: '🕹️',
        tags: ['game', 'simple', 'fun'],
        code: `// Small Game starter template`
    },
    {
        id: 'stopwatch',
        name: 'Stopwatch',
        description: 'Precision timing tool',
        language: 'javascript',
        icon: '⏲️',
        tags: ['stopwatch', 'timer', 'utility'],
        code: `// Stopwatch starter template`
    },
    {
        id: 'todo-list',
        name: 'A To-Do List App',
        description: 'Task management application',
        language: 'javascript',
        icon: '✅',
        tags: ['todo', 'tasks', 'productivity'],
        code: `// To-Do List starter template`
    },
    {
        id: 'weather-app',
        name: 'Weather App',
        description: 'Weather forecast application',
        language: 'javascript',
        icon: '🌤️',
        tags: ['weather', 'api', 'forecast'],
        code: `// Weather App starter template`
    },
    {
        id: 'web-scraping',
        name: 'Web Scraping',
        description: 'Extract data from websites',
        language: 'python',
        icon: '🕷️',
        tags: ['scraping', 'data', 'automation'],
        code: `# Web Scraping starter template
# Use BeautifulSoup or Scrapy`
    }
];

// Template loading is now handled in renderTemplates function

// Utility functions
function getFileExtension(language) {
    const extensions = {
        javascript: 'js',
        python: 'py',
        java: 'java',
        cpp: 'cpp',
        c: 'c',
        html: 'html',
        css: 'css',
        typescript: 'ts',
        go: 'go',
        rust: 'rs',
        php: 'php',
        ruby: 'rb',
        sql: 'sql'
    };
    return extensions[language] || 'txt';
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'message success';
    successDiv.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
    `;
    outputContent.insertBefore(successDiv, outputContent.firstChild);
    setTimeout(() => {
        successDiv.style.transition = 'opacity 0.3s ease';
        successDiv.style.opacity = '0';
        setTimeout(() => successDiv.remove(), 300);
    }, 2700);
}

function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

function showError(message) {
    // Extract just the error message without "Error:" prefix if present
    const cleanMessage = message.replace(/^Error:\s*/i, '');
    
    outputContent.innerHTML = `
        <div class="error-state">
            <div class="error-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <h3>Oops! Something went wrong</h3>
            <p class="error-message">${cleanMessage}</p>
            <div class="error-actions">
                <button class="error-btn" onclick="location.reload()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                    Refresh Page
                </button>
                <button class="error-btn secondary" onclick="document.getElementById('clearOutputBtn').click()">
                    Try Again
                </button>
            </div>
            <div class="error-tips">
                <p><strong>Common solutions:</strong></p>
                <ul>
                    <li>Check your internet connection</li>
                    <li>Try with a smaller code snippet</li>
                    <li>Wait a moment if you've made many requests</li>
                    <li>Refresh the page and try again</li>
                </ul>
            </div>
        </div>
    `;
}

// Focus code input on load
window.addEventListener('load', () => {
    codeInput.focus();
    autoResizeTextarea();
});

// Handle window resize
window.addEventListener('resize', () => {
    autoResizeTextarea();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to explain
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && document.activeElement === codeInput) {
        e.preventDefault();
        explainBtn.click();
    }
    
    // Ctrl/Cmd + Shift + Key combinations
    if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        switch(e.key.toUpperCase()) {
            case 'R':
                e.preventDefault();
                reviewBtn.click();
                break;
            case 'O':
                e.preventDefault();
                optimizeBtn.click();
                break;
            case 'D':
                e.preventDefault();
                debugBtn.click();
                break;
            case 'T':
                e.preventDefault();
                testBtn.click();
                break;
            case 'M':
                e.preventDefault();
                documentBtn.click();
                break;
            case 'C':
                e.preventDefault();
                commentsBtn.click();
                break;
            case 'F':
                e.preventDefault();
                refactorBtn.click();
                break;
            case 'P':
                e.preventDefault();
                formatBtn.click();
                break;
            case 'U':
                e.preventDefault();
                securityBtn.click();
                break;
            case 'E':
                e.preventDefault();
                exportBtn.click();
                break;
            case 'N':
                e.preventDefault();
                newSessionBtn.click();
                break;
        }
    }
    
    // Ctrl/Cmd + Key (without Shift)
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
        switch(e.key.toLowerCase()) {
            case 'h':
                e.preventDefault();
                document.getElementById('historyBtn').click();
                break;
            case 'g':
                e.preventDefault();
                document.getElementById('generateCodeBtn').click();
                break;
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        generateModal.classList.remove('active');
        convertModal.classList.remove('active');
        historyModal.classList.remove('active');
        templatesModal.classList.remove('active');
        shortcutsModal.classList.remove('active');
        document.getElementById('exportModal').classList.remove('active');
    }
});

// Enter key in generate modal
document.getElementById('generateInput').addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        document.getElementById('generateSubmitBtn').click();
    }
});

// Enter key in export modal
document.getElementById('exportFileName').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('exportSubmitBtn').click();
    }
});
