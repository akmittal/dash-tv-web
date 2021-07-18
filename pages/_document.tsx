import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href={`${process.env.PUBLIC_URL}/favicon.png`} />
          <meta name="theme-color" content="#1A202C" />
          <meta name="description" content="Watch 10,000+ TV channels for free. Music, Movies, News, Comedy, Entertainment" />
          <link
            rel="apple-touch-icon"
            href={`${process.env.PUBLIC_URL}/logo.png`}
          />
          <link
            rel="manifest"
            href={`${process.env.PUBLIC_URL}/manifest.json`}
          />
          <link
            href="https://unpkg.com/video.js@7.11.8/dist/video-js.min.css"
            rel="stylesheet"
          />
          
         
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
        <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-0M3V9ZZBQ0"
          />
          <script defer src="https://unpkg.com/video.js@7.11.8/dist/video.min.js" />
          <script defer src="https://unpkg.com/@videojs/http-streaming@2.7.1/dist/videojs-http-streaming.min.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-0M3V9ZZBQ0");
  `,
            }}
          />
      </Html>
    );
  }
}

export default MyDocument;
