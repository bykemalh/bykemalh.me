"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import type { Components } from "react-markdown";
import { memo, useMemo } from "react";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";

interface MarkdownRendererProps {
  content: string;
}

// Markdown component'lerini sabit tut - her render'da yeniden oluşturma
const createMarkdownComponents = (): Components => ({
    // Images with figure caption support
    img: ({ ...props }) => (
      <span className="block my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...props}
          className="rounded-lg w-full h-auto border border-gray-200 dark:border-gray-800 shadow-md"
          loading="lazy"
          alt={props.alt || ""}
        />
        {props.alt && (
          <span className="block text-center text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
            {props.alt}
          </span>
        )}
      </span>
    ),

    // Figure element (HTML support)
    figure: ({ ...props }) => (
      <figure className="my-8" {...props} />
    ),
    figcaption: ({ ...props }) => (
      <figcaption
        className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3 italic"
        {...props}
      />
    ),

    // Videos (GitHub-style)
    video: ({ ...props }) => (
      <span className="block my-8">
        <video
          {...props}
          className="rounded-lg w-full h-auto border border-gray-200 dark:border-gray-800 shadow-md"
          controls
          preload="metadata"
        />
      </span>
    ),

    // iFrame (YouTube, etc.)
    iframe: ({ ...props }) => (
      <div className="my-8 relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          {...props}
          className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-200 dark:border-gray-800 shadow-md"
          loading="lazy"
        />
      </div>
    ),

    // Details/Summary (collapsible)
    details: ({ ...props }) => (
      <details
        className="my-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
        {...props}
      />
    ),
    summary: ({ ...props }) => (
      <summary
        className="font-semibold cursor-pointer text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
        {...props}
      />
    ),

    // Code blocks
    code: ({ className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !match;

      if (isInline) {
        return (
          <code
            className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },

    // Headings with better spacing
    h1: ({ ...props }) => (
      <h1
        className="text-3xl font-bold mt-12 mb-6 first:mt-0 text-black dark:text-white"
        {...props}
      />
    ),
    h2: ({ ...props }) => (
      <h2
        className="text-2xl font-bold mt-10 mb-5 text-black dark:text-white"
        {...props}
      />
    ),
    h3: ({ ...props }) => (
      <h3
        className="text-xl font-bold mt-8 mb-4 text-black dark:text-white"
        {...props}
      />
    ),
    h4: ({ ...props }) => (
      <h4
        className="text-lg font-bold mt-6 mb-3 text-black dark:text-white"
        {...props}
      />
    ),
    h5: ({ ...props }) => (
      <h5
        className="text-base font-bold mt-5 mb-2 text-black dark:text-white"
        {...props}
      />
    ),
    h6: ({ ...props }) => (
      <h6
        className="text-sm font-bold mt-4 mb-2 text-black dark:text-white"
        {...props}
      />
    ),

    // Paragraphs with spacing
    p: ({ ...props }) => (
      <p
        className="my-6 leading-relaxed text-gray-800 dark:text-gray-200"
        {...props}
      />
    ),

    // Links
    a: ({ ...props }) => (
      <a
        className="text-blue-600 dark:text-blue-400 hover:underline break-words"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),

    // Lists
    ul: ({ ...props }) => (
      <ul className="my-6 ml-6 list-disc space-y-2" {...props} />
    ),
    ol: ({ ...props }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2" {...props} />
    ),
    li: ({ children, ...props }) => {
      // Task list detection
      const isTaskList = typeof children === 'object' && 
        Array.isArray(children) && 
        children[0]?.type === 'input';

      if (isTaskList) {
        return (
          <li className="flex items-start gap-2 text-gray-800 dark:text-gray-200 list-none -ml-6" {...props}>
            {children}
          </li>
        );
      }

      return (
        <li className="text-gray-800 dark:text-gray-200" {...props}>
          {children}
        </li>
      );
    },

    // Task list checkbox
    input: ({ ...props }) => {
      if (props.type === 'checkbox') {
        return (
          <input
            {...props}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800 mt-1"
            disabled
          />
        );
      }
      return <input {...props} className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" />;
    },

    // Blockquotes
    blockquote: ({ ...props }) => (
      <blockquote
        className="my-6 pl-4 border-l-4 border-gray-300 dark:border-gray-700 italic text-gray-700 dark:text-gray-300"
        {...props}
      />
    ),

    // Tables
    table: ({ ...props }) => (
      <div className="my-8 overflow-x-auto">
        <table
          className="min-w-full border-collapse border border-gray-300 dark:border-gray-700"
          {...props}
        />
      </div>
    ),
    thead: ({ ...props }) => (
      <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
    ),
    th: ({ ...props }) => (
      <th
        className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold text-black dark:text-white"
        {...props}
      />
    ),
    td: ({ ...props }) => (
      <td
        className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-200"
        {...props}
      />
    ),

    // Horizontal rule
    hr: ({ ...props }) => (
      <hr className="my-8 border-gray-300 dark:border-gray-700" {...props} />
    ),

    // Pre (code block container)
    pre: ({ ...props }) => (
      <pre
        className="my-6 p-4 rounded-lg overflow-x-auto bg-gray-900 dark:bg-gray-950"
        {...props}
      />
    ),

    // Form elements
    form: ({ ...props }) => (
      <form className="my-6 space-y-4" {...props} />
    ),
    label: ({ ...props }) => (
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" {...props} />
    ),
    button: ({ ...props }) => (
      <button
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
        {...props}
      />
    ),

    // Definition list (dl, dt, dd)
    dl: ({ ...props }) => (
      <dl className="my-6 space-y-4" {...props} />
    ),
    dt: ({ ...props }) => (
      <dt className="font-semibold text-black dark:text-white" {...props} />
    ),
    dd: ({ ...props }) => (
      <dd className="ml-6 text-gray-700 dark:text-gray-300" {...props} />
    ),
});

// Rehype plugins'i sabit tut - her render'da yeniden oluşturma
const rehypePlugins = [
  rehypeRaw,
  rehypeSlug,
  rehypeKatex,
  rehypeHighlight,
];

// Remark plugins'i sabit tut
const remarkPlugins = [remarkGfm, remarkMath];

// Memoize edilmiş MarkdownRenderer - content aynıysa yeniden render etme
export const MarkdownRenderer = memo(function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Components'i memo ile cache'le
  const components = useMemo(() => createMarkdownComponents(), []);

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
