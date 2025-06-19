import QRCodeGenerator from './components/QRCodeGenerator';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="container">
      <h1>🔳 QR Code Generator</h1>
      <ErrorBoundary>
        <QRCodeGenerator />
      </ErrorBoundary>
    </div>
  );
}

export default App;
