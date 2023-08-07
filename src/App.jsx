import React, { useState } from 'react';
import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
  const [copied, setCopied] = useState(false);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
  };

  const handleDelete = () => {
    resetTranscript();
    setCopied(false);
  };

  return (
    <div className='container'>
      <h2>Speech To Text converter</h2>
      <br />
      <p>React Hook that converts speech from the microphone to text and makes it available to you</p>
      <div className="main-content">
        {transcript}
      </div>

      <div className="btn-style">
        <button onClick={stopListening}>Stop</button>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={handleCopy} disabled={!transcript || copied}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button onClick={handleDelete} disabled={!transcript}>Delete</button>
      </div>
    </div>
  );
}

export default App;
