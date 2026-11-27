import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const CodeSnippetBlock = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Snippet copied to clipboard');
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Unable to copy snippet');
    }
  };

  return (
    <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <span className="text-[11px] font-code uppercase tracking-wider text-[var(--text-muted)]">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${language} snippet`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-500" />
              <span className="text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3 sm:p-4 overflow-x-auto text-xs sm:text-[13px] leading-relaxed font-code text-[var(--text-primary)]">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippetBlock;
