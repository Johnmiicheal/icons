'use client';

import React, { useState } from 'react';
import { IconType } from '@/lib/icon-import';
import { Check, Copy, Download, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ACTION_CLASS_NAMES =
  'cursor-pointer p-2 size-8 hover:bg-accent rounded-md transition-colors duration-200';

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-3 border w-full h-full border-input rounded-md flex items-center justify-center flex-col">
      {children}
    </div>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-xs text-muted-foreground mt-4 mb-1">{children}</p>;
};

const Actions = ({
  content,
  fileName,
}: Pick<IconType, 'content' | 'fileName'>) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className={ACTION_CLASS_NAMES} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Copy className={ACTION_CLASS_NAMES} onClick={handleCopy} />
          </motion.div>
        )}
      </AnimatePresence>
      <Download className={ACTION_CLASS_NAMES} onClick={handleDownload} />
      <ExternalLink className={ACTION_CLASS_NAMES} />
    </div>
  );
};

const CardTitle = Title;
const CardActions = Actions;

export { Card, CardTitle, CardActions };
