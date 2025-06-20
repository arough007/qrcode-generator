import QRCodeGenerator from './components/QRCodeGenerator';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="container">
      <a 
        href="https://github.com/arough007/qrcode" 
        target="_blank" 
        rel="noopener noreferrer"
        className="github-link"
        aria-label="View source code on GitHub"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>

      <header role="banner">
        <h1>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className="qr-icon"
            aria-hidden="true"
          >
            {/* Outer border */}
            <rect
              x="1"
              y="1"
              width="30"
              height="30"
              fill="none"
              stroke="#2d3748"
              strokeWidth="2"
              rx="3"
            />

            {/* Top-left corner square */}
            <rect x="3" y="3" width="10" height="10" fill="#2d3748" rx="1" />
            <rect x="5" y="5" width="6" height="6" fill="white" rx="1" />
            <rect x="7" y="7" width="2" height="2" fill="#2d3748" />

            {/* Top-right corner square */}
            <rect x="19" y="3" width="10" height="10" fill="#2d3748" rx="1" />
            <rect x="21" y="5" width="6" height="6" fill="white" rx="1" />
            <rect x="23" y="7" width="2" height="2" fill="#2d3748" />

            {/* Bottom-left corner square */}
            <rect x="3" y="19" width="10" height="10" fill="#2d3748" rx="1" />
            <rect x="5" y="21" width="6" height="6" fill="white" rx="1" />
            <rect x="7" y="23" width="2" height="2" fill="#2d3748" />

            {/* Data pattern dots */}
            <rect x="15" y="5" width="2" height="2" fill="#4a5568" />
            <rect x="15" y="9" width="2" height="2" fill="#4a5568" />
            <rect x="5" y="15" width="2" height="2" fill="#4a5568" />
            <rect x="9" y="15" width="2" height="2" fill="#4a5568" />
            <rect x="15" y="15" width="2" height="2" fill="#4a5568" />
            <rect x="19" y="15" width="2" height="2" fill="#4a5568" />
            <rect x="23" y="15" width="2" height="2" fill="#4a5568" />
            <rect x="27" y="15" width="2" height="2" fill="#4a5568" />
            <rect x="15" y="19" width="2" height="2" fill="#4a5568" />
            <rect x="19" y="19" width="2" height="2" fill="#4a5568" />
            <rect x="15" y="23" width="2" height="2" fill="#4a5568" />
            <rect x="19" y="23" width="2" height="2" fill="#4a5568" />
            <rect x="23" y="23" width="2" height="2" fill="#4a5568" />
            <rect x="27" y="23" width="2" height="2" fill="#4a5568" />
            <rect x="15" y="27" width="2" height="2" fill="#4a5568" />
            <rect x="19" y="27" width="2" height="2" fill="#4a5568" />
            <rect x="23" y="27" width="2" height="2" fill="#4a5568" />
            <rect x="27" y="27" width="2" height="2" fill="#4a5568" />
          </svg>
          QR Code Generator
        </h1>
      </header>

      <main role="main" aria-label="QR Code Generator Application">
        <ErrorBoundary>
          <QRCodeGenerator />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
