import React, { useRef, useState } from 'react';

function ScreenSharingDemo() {
  const videoRef = useRef(null);
  const [sharing, setSharing] = useState(false);

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      videoRef.current.srcObject = stream;
      setSharing(true);

      // When user stops sharing from browser UI
      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
    } catch (err) {
      console.error('Error sharing screen:', err);
      alert('Failed to start screen sharing.');
    }
  };

  const stopScreenShare = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setSharing(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Screen Sharing Demo</h2>
      <button
        onClick={sharing ? stopScreenShare : startScreenShare}
        className={`px-4 py-2 rounded text-white ${
          sharing ? 'bg-red-600' : 'bg-green-600'
        } mb-4`}
      >
        {sharing ? 'Stop Sharing' : 'Start Screen Sharing'}
      </button>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        controls={false}
        className="w-full h-64 bg-black rounded object-cover"
      />
    </div>
  );
}

export default ScreenSharingDemo;
