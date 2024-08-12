import React, { useState } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState([null, null, null, null]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speechBubbles, setSpeechBubbles] = useState([false, false, false, false]);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const newImages = [...images];
      newImages[currentIndex] = reader.result;
      setImages(newImages);

      // Move to the next index, wrapping around if necessary
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const addSpeechBubbles = () => {
    const newSpeechBubbles = speechBubbles.map((_, index) => images[index] ? true : false);
    setSpeechBubbles(newSpeechBubbles);
  };
  

  return (
    <div className="App">
      <div className="grid-container">
        {images.map((image, index) => (
          <div className="grid-item" key={index}>
            {image && (
              <div className="image-container">
                <img src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
                {speechBubbles[index] && (
                  <div className="speech-bubble">
                    <div className="speech-text">Hello!</div>
                    <div className="speech-tail"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <label className="upload-label">
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="single-upload-button"
        />
      </label>
      <button onClick={addSpeechBubbles} className="speech-bubble-button">
      Speech Bubbles
      </button>

    </div>
  );
}

export default App;
