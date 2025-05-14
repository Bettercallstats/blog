'use client';

import { useEffect, useRef } from 'react';

export default function PerfectEmbed({
  htmlPath,
  className = ''
}: {
  htmlPath: string;
  className?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle both same-origin and refresh cases
  const resizeIframe = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      // Method 1: Direct access (same origin)
      if (iframe.contentDocument?.body) {
        const height = iframe.contentDocument.body.scrollHeight;
        iframe.style.height = `${height}px`;
        return;
      }

      // Method 2: postMessage fallback
      iframe.contentWindow?.postMessage({ type: 'height-request' }, '*');
    } catch (error) {
      console.log('Resize attempt failed:', error);
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Listen for postMessage responses
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'height-response') {
        iframe.style.height = `${event.data.height}px`;
      }
    };

    window.addEventListener('message', handleMessage);
    const timer = setInterval(resizeIframe, 1000); // Fallback interval

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(timer);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={`/${htmlPath}`}
      className={`w-full overflow-hidden border border-gray-300 p-4 rounded-lg bg-white shadow-sm m-3" ${className}`}
      loading="lazy"
      onLoad={resizeIframe}
    />
  );
}