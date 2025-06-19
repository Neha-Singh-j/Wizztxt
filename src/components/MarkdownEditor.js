import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub-flavored markdown
import { Prism as SyntaxHighlighter } from 'prism-react-renderer'; // For code highlighting
import PropTypes from 'prop-types'; // For prop type checking

export default function MarkdownEditor({ mode, showAlert }) {
  const [markdown, setMarkdown] = useState(
    `# Welcome to Markdown Editor!\n\n` +
    `## Try these features:\n` +
    `- **Bold text**\n` +
    `- *Italic text*\n` +
    `- [Links](https://example.com)\n` +
    `- \`inline code\`\n\n` +
    `\`\`\`javascript\n// Code blocks\nconst hello = () => {\n  console.log("Hello Markdown!");\n};\n\`\`\``
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    showAlert('Markdown copied to clipboard!', 'success');
  };

  const handleClear = () => {
    setMarkdown('');
    showAlert('Editor cleared!', 'success');
  };

  return (
    <div className={`markdown-editor ${mode === 'dark' ? 'dark' : ''}`}>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Markdown Editor</h2>
        <div className="space-x-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Copy Markdown
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="editor-section">
          <label htmlFor="markdown-input" className="block mb-2 font-medium">
            Edit Markdown:
          </label>
          <textarea
            id="markdown-input"
            className="w-full h-96 p-4 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
          />
        </div>

        <div className="preview-section">
          <label className="block mb-2 font-medium">Live Preview:</label>
          <div className="h-96 p-4 border rounded-lg dark:bg-gray-800 dark:border-gray-600 overflow-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
              className="prose dark:prose-invert max-w-none"
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

MarkdownEditor.propTypes = {
  mode: PropTypes.oneOf(['light', 'dark']),
  showAlert: PropTypes.func
};

MarkdownEditor.defaultProps = {
  mode: 'light'
};