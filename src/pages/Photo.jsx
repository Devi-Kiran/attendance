import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const Photo = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture Photo</button>
      {capturedImage && (
        <div>
          <h2>Captured Photo</h2>
          <img src={capturedImage} alt="captured" />
        </div>
      )}
    </div>
  );
};

export default Photo;