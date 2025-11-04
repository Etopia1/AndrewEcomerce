// // import React, { useRef, useState, useEffect } from 'react';
// // import Peer from 'simple-peer';

// // const WS_URL = 'ws://localhost:8080';

// // function VideoCall({ clientId }) {
// //   const ws = useRef(null);
// //   const peer = useRef(null);
// //   const localVideo = useRef();
// //   const remoteVideo = useRef();
// //   const [targetId, setTargetId] = useState('');
// //   const [chatMessages, setChatMessages] = useState([]);
// //   const [chatInput, setChatInput] = useState('');
// //   const [connectedId, setConnectedId] = useState(null);
// //   const [sharingScreen, setSharingScreen] = useState(false);

// //   const iceServers = [
// //     { urls: 'stun:stun.l.google.com:19302' },
// //     {
// //       urls: 'turn:your-turn-server.com:3478',
// //       username: 'TURN_USERNAME',
// //       credential: 'TURN_CREDENTIAL'
// //     }
// //   ];

// //   useEffect(() => {
// //     ws.current = new WebSocket(WS_URL);
// //     ws.current.onopen = () => ws.current.send(JSON.stringify({ type: 'register', id: clientId }));
// //     ws.current.onmessage = async (msg) => {
// //       const data = JSON.parse(msg.data);
// //       if (data.type === 'offer' && data.senderId) {
// //         await startPeer(false, data.senderId, data.sdp);
// //       } else if (data.type === 'answer') {
// //         peer.current.signal(data.sdp);
// //       } else if (data.type === 'ice-candidate') {
// //         peer.current.signal(data.candidate);
// //       } else if (data.type === 'chat') {
// //         setChatMessages(prev => [...prev, { from: data.from, text: data.text }]);
// //       }
// //     };
// //     return () => ws.current.close();
// //   }, [clientId]);

// //   const startPeer = async (initiator, otherId, signalData = null) => {
// //     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// //     localVideo.current.srcObject = stream;

// //     peer.current = new Peer({ initiator, trickle: false, stream, config: { iceServers } });
// //     if (signalData) peer.current.signal(signalData);

// //     peer.current.on('signal', data => {
// //       ws.current.send(JSON.stringify({
// //         type: initiator ? 'offer' : 'answer',
// //         sdp: data,
// //         targetId: otherId,
// //       }));
// //     });

// //     peer.current.on('stream', stream => {
// //       remoteVideo.current.srcObject = stream;
// //     });

// //     peer.current.on('data', data => {
// //       const message = JSON.parse(data.toString());
// //       setChatMessages(prev => [...prev, message]);
// //     });

// //     peer.current.on('error', err => console.error(err));
// //     setConnectedId(otherId);
// //   };

// //   const callUser = () => {
// //     if (targetId) startPeer(true, targetId);
// //   };

// //   const sendChat = () => {
// //     const message = { from: clientId, text: chatInput };
// //     peer.current.send(JSON.stringify(message));
// //     setChatMessages(prev => [...prev, message]);
// //     setChatInput('');
// //     ws.current.send(JSON.stringify({ type: 'chat', text: message.text }));
// //   };

// //   const shareScreen = async () => {
// //     if (!peer.current) return;
// //     if (!sharingScreen) {
// //       const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
// //       const screenTrack = screenStream.getVideoTracks()[0];
// //       peer.current.replaceTrack(
// //         localVideo.current.srcObject.getVideoTracks()[0],
// //         screenTrack,
// //         localVideo.current.srcObject
// //       );
// //       localVideo.current.srcObject = new MediaStream([screenTrack, ...localVideo.current.srcObject.getAudioTracks()]);
// //       setSharingScreen(true);
// //       screenTrack.onended = () => {
// //         // revert to camera
// //         navigator.mediaDevices.getUserMedia({ video: true }).then(cam => {
// //           const camTrack = cam.getVideoTracks()[0];
// //           peer.current.replaceTrack(screenTrack, camTrack, cam);
// //           localVideo.current.srcObject = cam;
// //           setSharingScreen(false);
// //         });
// //       };
// //     }
// //   };

// //   return (
// //     <div className="p-4 space-y-4">
// //       <h2 className="text-xl font-bold">Client: {clientId}</h2>
// //       {!connectedId && (
// //         <div>
// //           <input
// //             className="border px-2 py-1 mr-2"
// //             placeholder="Target ID"
// //             value={targetId}
// //             onChange={e => setTargetId(e.target.value)}
// //           />
// //           <button onClick={callUser} className="bg-blue-600 text-white px-4 py-2 rounded">Call</button>
// //         </div>
// //       )}
// //       {connectedId && (
// //         <>
// //           <button onClick={shareScreen} className="bg-green-600 text-white px-4 py-2 rounded">
// //             {sharingScreen ? 'Screen Sharing …' : 'Share Screen'}
// //           </button>
// //         </>
// //       )}
// //       <div className="grid grid-cols-2 gap-4">
// //         <video ref={localVideo} autoPlay muted className="w-full h-64 bg-black rounded" />
// //         <video ref={remoteVideo} autoPlay className="w-full h-64 bg-black rounded" />
// //       </div>

// //       <div className="border p-2 rounded h-64 overflow-y-auto space-y-2">
// //         {chatMessages.map((m,i) => (
// //           <div key={i}><strong>{m.from}:</strong> {m.text}</div>
// //         ))}
// //       </div>
// //       <div className="flex space-x-2">
// //         <input
// //           className="flex-1 border px-2 py-1"
// //           placeholder="Type message"
// //           value={chatInput}
// //           onChange={e => setChatInput(e.target.value)}
// //         />
// //         <button onClick={sendChat} className="bg-gray-700 text-white px-4 py-1 rounded">Send</button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default VideoCall;

// import React, { useRef, useState, useEffect } from 'react';
// import Peer from 'simple-peer';

// const WS_URL = 'ws://localhost:8080';

// function VideoCall({ clientId }) {
//   const ws = useRef(null);
//   const peer = useRef(null);
//   const localVideo = useRef();
//   const remoteVideo = useRef();

//   const [targetId, setTargetId] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [chatInput, setChatInput] = useState('');
//   const [connectedId, setConnectedId] = useState(null);
//   const [sharingScreen, setSharingScreen] = useState(false);

//   const iceServers = [
//     { urls: 'stun:stun.l.google.com:19302' },
//     // Replace with your own TURN server credentials if available:
//     // {
//     //   urls: 'turn:your-turn-server.com:3478',
//     //   username: 'TURN_USERNAME',
//     //   credential: 'TURN_CREDENTIAL',
//     // }
//   ];

//   useEffect(() => {
//     ws.current = new WebSocket(WS_URL);

//     ws.current.onopen = () => {
//       ws.current.send(JSON.stringify({ type: 'register', id: clientId }));
//     };

//     ws.current.onmessage = async (msg) => {
//       const data = JSON.parse(msg.data);

//       if (data.type === 'offer' && data.senderId) {
//         await startPeer(false, data.senderId, data.sdp);
//       } else if (data.type === 'answer') {
//         peer.current.signal(data.sdp);
//       } else if (data.type === 'ice-candidate') {
//         peer.current.signal(data.candidate);
//       } else if (data.type === 'chat') {
//         setChatMessages(prev => [...prev, { from: data.from, text: data.text }]);
//       }
//     };

//     return () => {
//       if (ws.current) ws.current.close();
//     };
//   }, [clientId]);

//   const startPeer = async (initiator, otherId, signalData = null) => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     localVideo.current.srcObject = stream;

//     peer.current = new Peer({ initiator, trickle: false, stream, config: { iceServers } });

//     if (signalData) peer.current.signal(signalData);

//     peer.current.on('signal', data => {
//       if (data.candidate) {
//         ws.current.send(JSON.stringify({
//           type: 'ice-candidate',
//           candidate: data,
//           targetId: otherId,
//         }));
//       } else if (data.sdp) {
//         ws.current.send(JSON.stringify({
//           type: initiator ? 'offer' : 'answer',
//           sdp: data,
//           targetId: otherId,
//         }));
//       }
//     });

//     peer.current.on('stream', remoteStream => {
//       remoteVideo.current.srcObject = remoteStream;
//     });

//     peer.current.on('data', data => {
//       const message = JSON.parse(data.toString());
//       setChatMessages(prev => [...prev, message]);
//     });

//     peer.current.on('error', err => console.error('Peer error:', err));

//     setConnectedId(otherId);
//   };

//   const callUser = () => {
//     if (targetId.trim() !== '') {
//       startPeer(true, targetId.trim());
//     }
//   };

//   const sendChat = () => {
//     if (!peer.current) return;
//     const message = { from: clientId, text: chatInput };
//     peer.current.send(JSON.stringify(message));
//     setChatMessages(prev => [...prev, message]);
//     setChatInput('');
//     // Optionally broadcast to everyone
//     ws.current.send(JSON.stringify({ type: 'chat', text: message.text }));
//   };

//   const shareScreen = async () => {
//     if (!peer.current) return;

//     if (!sharingScreen) {
//       try {
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//         const screenTrack = screenStream.getVideoTracks()[0];

//         // Replace video track in peer connection
//         const sender = peer.current.streams[0]
//           .getTracks()
//           .find(track => track.kind === 'video');

//         peer.current.replaceTrack(sender, screenTrack, localVideo.current.srcObject);

//         // Update local video to screen share
//         localVideo.current.srcObject = new MediaStream([
//           screenTrack,
//           ...localVideo.current.srcObject.getAudioTracks(),
//         ]);

//         setSharingScreen(true);

//         screenTrack.onended = async () => {
//           const camStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//           const camTrack = camStream.getVideoTracks()[0];

//           peer.current.replaceTrack(screenTrack, camTrack, camStream);
//           localVideo.current.srcObject = camStream;
//           setSharingScreen(false);
//         };
//       } catch (err) {
//         console.error('Screen share error:', err);
//       }
//     }
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <h2 className="text-xl font-bold">Client ID: {clientId}</h2>

//       {!connectedId && (
//         <div className="flex items-center space-x-2">
//           <input
//             className="border px-2 py-1"
//             placeholder="Enter target client ID"
//             value={targetId}
//             onChange={e => setTargetId(e.target.value)}
//           />
//           <button
//             onClick={callUser}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Call
//           </button>
//         </div>
//       )}

//       {connectedId && (
//         <button
//           onClick={shareScreen}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           {sharingScreen ? 'Sharing Screen...' : 'Share Screen'}
//         </button>
//       )}

//       <div className="grid grid-cols-2 gap-4 mt-4">
//         <video ref={localVideo} autoPlay muted playsInline className="w-full h-64 bg-black rounded" />
//         <video ref={remoteVideo} autoPlay playsInline className="w-full h-64 bg-black rounded" />
//       </div>

//       <div className="border p-2 rounded h-48 overflow-y-auto space-y-2 mt-4">
//         {chatMessages.map((msg, idx) => (
//           <div key={idx}>
//             <strong>{msg.from}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex space-x-2 mt-2">
//         <input
//           className="flex-1 border px-2 py-1"
//           placeholder="Type a message..."
//           value={chatInput}
//           onChange={e => setChatInput(e.target.value)}
//           onKeyDown={e => e.key === 'Enter' && sendChat()}
//         />
//         <button
//           onClick={sendChat}
//           className="bg-gray-700 text-white px-4 py-1 rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default VideoCall;

import React, { useRef, useState, useEffect } from 'react';
import Peer from 'simple-peer';

const WS_URL = 'https://videio-live-streem-back.onrender.com';

function VideoCall({ clientId }) {
  const ws = useRef(null);
  const peer = useRef(null);
  const localVideo = useRef();
  const remoteVideo = useRef();
  const [targetId, setTargetId] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [connectedId, setConnectedId] = useState(null);
  const [sharingScreen, setSharingScreen] = useState(false);

  const iceServers = [
    { urls: 'stun:stun.l.google.com:19302' },
  ];

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);
    ws.current.onopen = () => ws.current.send(JSON.stringify({ type: 'register', id: clientId }));
    ws.current.onmessage = async (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === 'offer' && data.senderId) {
        await startPeer(false, data.senderId, data.sdp);
      } else if (data.type === 'answer') {
        peer.current.signal(data.sdp);
      } else if (data.type === 'ice-candidate') {
        peer.current.signal(data.candidate);
      } else if (data.type === 'chat') {
        setChatMessages(prev => [...prev, { from: data.from, text: data.text }]);
      }
    };
    return () => ws.current.close();
  }, [clientId]);

  const startPeer = async (initiator, otherId, signalData = null) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideo.current.srcObject = stream;

      peer.current = new Peer({ initiator, trickle: false, stream, config: { iceServers } });
      if (signalData) peer.current.signal(signalData);

      peer.current.on('signal', data => {
        ws.current.send(JSON.stringify({
          type: initiator ? 'offer' : 'answer',
          sdp: data,
          targetId: otherId,
        }));
      });

      peer.current.on('stream', stream => {
        remoteVideo.current.srcObject = stream;
      });

      peer.current.on('data', data => {
        const message = JSON.parse(data.toString());
        setChatMessages(prev => [...prev, message]);
      });

      peer.current.on('error', err => console.error(err));
      setConnectedId(otherId);
    } catch (err) {
      console.error('Failed to get media stream:', err);
      alert('Permission denied or error accessing camera and microphone. Please allow access and try again.');
    }
  };

  const callUser = () => {
    if (targetId) startPeer(true, targetId);
  };

  const sendChat = () => {
    if (!peer.current || peer.current.destroyed) {
      alert('Peer connection not established.');
      return;
    }
    if (peer.current.connected) {
      const message = { from: clientId, text: chatInput };
      peer.current.send(JSON.stringify(message));
      setChatMessages(prev => [...prev, message]);
      setChatInput('');
      ws.current.send(JSON.stringify({ type: 'chat', text: message.text }));
    } else {
      alert('Connection is not open yet.');
    }
  };

  const shareScreen = async () => {
    if (!peer.current) return;
    if (!sharingScreen) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        peer.current.replaceTrack(
          localVideo.current.srcObject.getVideoTracks()[0],
          screenTrack,
          localVideo.current.srcObject
        );
        localVideo.current.srcObject = new MediaStream([screenTrack, ...localVideo.current.srcObject.getAudioTracks()]);
        setSharingScreen(true);
        screenTrack.onended = () => {
          navigator.mediaDevices.getUserMedia({ video: true }).then(cam => {
            const camTrack = cam.getVideoTracks()[0];
            peer.current.replaceTrack(screenTrack, camTrack, cam);
            localVideo.current.srcObject = cam;
            setSharingScreen(false);
          });
        };
      } catch (err) {
        console.error('Error sharing screen:', err);
        alert('Failed to share screen.');
      }
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Client: {clientId}</h2>

      {!connectedId && (
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            className="border px-2 py-1 flex-1 rounded"
            placeholder="Target ID"
            value={targetId}
            onChange={e => setTargetId(e.target.value)}
          />
          <button
            onClick={callUser}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Call
          </button>
        </div>
      )}

      {connectedId && (
        <button
          onClick={shareScreen}
          className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto mb-4"
        >
          {sharingScreen ? 'Screen Sharing …' : 'Share Screen'}
        </button>
      )}

      {/* Videos: stacked on small, side-by-side on md+ */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <video
          ref={localVideo}
          autoPlay
          muted
          playsInline
          className="w-full md:w-1/2 h-48 md:h-64 bg-black rounded object-cover"
        />
        <video
          ref={remoteVideo}
          autoPlay
          playsInline
          className="w-full md:w-1/2 h-48 md:h-64 bg-black rounded object-cover"
        />
      </div>

      {/* Chat messages */}
      <div className="border p-2 rounded h-48 overflow-y-auto space-y-2 mb-4 bg-gray-50">
        {chatMessages.length === 0 && (
          <p className="text-gray-400 text-sm italic">No messages yet</p>
        )}
        {chatMessages.map((m, i) => (
          <div key={i} className="break-words">
            <strong>{m.from}:</strong> {m.text}
          </div>
        ))}
      </div>

      {/* Chat input */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          className="border px-2 py-1 flex-1 rounded"
          placeholder="Type message"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendChat()}
        />
        <button
          onClick={sendChat}
          className="bg-gray-700 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default VideoCall;
