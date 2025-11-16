import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Verification */}
        <meta
          name="google-site-verification"
          content="d8d_1kq-ciq9ByO6gLexUEE9t9snSDd8vwgfnhycVAo"
        />

        {/* Basic SEO */}
        <meta name="title" content="FullTask AI – Created by Akin S Sokpah" />
        <meta
          name="description"
          content="FullTask AI is an advanced AI assistant built to answer questions, provide solutions, and help users with anything. Created by Akin S Sokpah from Liberia."
        />
        <meta
          name="keywords"
          content="FullTask AI, AI tutor, AI chatbot, Liberia AI, Akin Sokpah, Full Task AI, OpenAI bot"
        />

        {/* Social Media Preview */}
        <meta property="og:title" content="FullTask AI – Smart AI Assistant" />
        <meta
          property="og:description"
          content="An AI bot that answers any question instantly. Created by Akin S Sokpah."
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://full-task-ai.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FullTask AI" />
        <meta
          name="twitter:description"
          content="Instant answers, smart responses. Created by Akin S Sokpah."
        />
        <meta name="twitter:image" content="/logo.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* App Icons */}
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />

        <title>FullTask AI</title>
      </Head>

      <body>
        <Main />
        <NextScript />

        {/* Service Worker Register */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== "undefined" && "serviceWorker" in navigator) {
                navigator.serviceWorker.register("/service-worker.js")
                  .catch(err => console.log("SW registration failed", err));
              }
            `,
          }}
        />
      </body>
    </Html>
  );
}
