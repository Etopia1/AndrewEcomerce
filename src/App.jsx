

// import React from 'react';
// import RoutePageNew from './RoutePageNew';
// import VideoCall from './VideoCall';
// import ScreenSharingDemo from './ScreenSharingDemo';

// const App = () => {
//   return (
//     <>
//       <ScreenSharingDemo/>
//     </>
//   );
// }

// export default App;

import React from 'react';
// import VideoCall from './VideoCall';
import RoutePageNew from './RoutePageNew';

function App() {
  return <>
    <RoutePageNew  />

  </>
  
}

export default App;

// import React, { useEffect, useRef, useState } from 'react';

// const ws = new WebSocket('ws://localhost:8080');
// const clientId = Math.random().toString(36).substr(2, 9);
// let peerConnection = null;
// let currentTargetId = null;

// const config = {
//   iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
// };

// function App() {
//   const videoRef = useRef();
//   const [role, setRole] = useState(null);
//   const [chatInput, setChatInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [selfStream, setSelfStream] = useState(null);

//   useEffect(() => {
//     ws.onopen = () => {
//       ws.send(JSON.stringify({ type: 'register', id: clientId }));
//     };

//     ws.onmessage = async (message) => {
//       const data = JSON.parse(message.data);

//       if (data.type === 'viewer-connected') {
//         currentTargetId = data.viewerId;
//         await createOffer();

//       } else if (data.type === 'offer') {
//         currentTargetId = data.senderId;
//         await handleOffer(data.sdp);

//       } else if (data.type === 'answer') {
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));

//       } else if (data.type === 'ice-candidate') {
//         if (data.candidate) {
//           await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
//         }

//       } else if (data.type === 'chat') {
//         setMessages(prev => [...prev, { from: data.from, text: data.text }]);
//       }
//     };
//   }, []);

//   const startBroadcast = async () => {
//     setRole('broadcaster');
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     videoRef.current.srcObject = stream;
//     setSelfStream(stream);

//     peerConnection = new RTCPeerConnection(config);
//     stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate && currentTargetId) {
//         ws.send(JSON.stringify({
//           type: 'ice-candidate',
//           candidate: event.candidate,
//           targetId: currentTargetId
//         }));
//       }
//     };
//   };

//   const watchStream = async () => {
//     setRole('viewer');

//     peerConnection = new RTCPeerConnection(config);

//     peerConnection.ontrack = (event) => {
//       videoRef.current.srcObject = event.streams[0];
//     };

//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate && currentTargetId) {
//         ws.send(JSON.stringify({
//           type: 'ice-candidate',
//           candidate: event.candidate,
//           targetId: currentTargetId
//         }));
//       }
//     };

//     const broadcasterId = prompt("Enter broadcaster's client ID:");
//     currentTargetId = broadcasterId;

//     ws.send(JSON.stringify({
//       type: 'viewer-connected',
//       targetId: broadcasterId
//     }));
//   };

//   const createOffer = async () => {
//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);

//     ws.send(JSON.stringify({
//       type: 'offer',
//       sdp: offer,
//       targetId: currentTargetId
//     }));
//   };

//   const handleOffer = async (sdp) => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     setSelfStream(stream);
//     peerConnection.addStream?.(stream); // fallback

//     await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
//     const answer = await peerConnection.createAnswer();
//     await peerConnection.setLocalDescription(answer);

//     ws.send(JSON.stringify({
//       type: 'answer',
//       sdp: answer,
//       targetId: currentTargetId
//     }));
//   };

//   const sendMessage = () => {
//     if (chatInput.trim()) {
//       ws.send(JSON.stringify({
//         type: 'chat',
//         text: chatInput
//       }));
//       setChatInput('');
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>🟢 Live Stream + Chat</h1>

//       {!role && (
//         <>
//           <button onClick={startBroadcast}>Start Broadcasting</button>
//           <button onClick={watchStream}>Join as Viewer</button>
//         </>
//       )}

//       <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
//         <video ref={videoRef} autoPlay playsInline controls muted={role === 'broadcaster'} width="500" />
//         {selfStream && (
//           <video
//             autoPlay
//             playsInline
//             muted
//             width="200"
//             style={{ border: '1px solid #ccc' }}
//             ref={(el) => {
//               if (el) el.srcObject = selfStream;
//             }}
//           />
//         )}
//       </div>

//       <div style={{ marginTop: 30 }}>
//         <h3>💬 Chat</h3>
//         <div style={{ height: 150, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
//           {messages.map((msg, idx) => (
//             <div key={idx}><strong>{msg.from === clientId ? 'You' : msg.from}:</strong> {msg.text}</div>
//           ))}
//         </div>
//         <input
//           type="text"
//           value={chatInput}
//           onChange={(e) => setChatInput(e.target.value)}
//           placeholder="Type your message"
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//       <p style={{ marginTop: 20, color: 'gray' }}>Your ID: <strong>{clientId}</strong></p>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect, useRef } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import './App.css';

// const WS = 'ws://localhost:8080';
// const ws = new WebSocket(WS);
// let pc = null;

// function App() {
//   const [meetingId, setMeetingId] = useState('');
//   const [inputId, setInputId] = useState('');
//   const [role, setRole] = useState(null);
//   const [joinedId, setJoinedId] = useState('');
//   const [chat, setChat] = useState([]);
//   const [msg, setMsg] = useState('');
//   const localRef = useRef();
//   const remoteGrid = useRef();

//   const clientId = useRef(uuidv4());
//   const peers = useRef({}); // { [peerId]: RTCPeerConnection }

//   useEffect(() => {
//     ws.onopen = () => ws.send(JSON.stringify({ type: 'register', id: clientId.current }));

//     ws.onmessage = async (ev) => {
//       const data = JSON.parse(ev.data);
//       const { type, from, to, sdp, candidate, text } = data;

//       if (type === 'viewer-connected' && from === clientId.current) return;
//       if (type === 'viewer-connected' && role === 'host') await createOffer(from);

//       if (type === 'offer') await handleOffer(from, sdp);
//       if (type === 'answer') peers.current[from]?.setRemoteDescription(new RTCSessionDescription(sdp));
//       if (type === 'ice-candidate') peers.current[from]?.addIceCandidate(new RTCIceCandidate(candidate));
//       if (type === 'chat') setChat((c) => [...c, { from, text }]);
//     };
//   }, [role]);

//   const joinAsHost = async () => {
//     const id = uuidv4().slice(0, 8);
//     setMeetingId(id); setJoinedId(id); setRole('host');
//     await startCam();
//   };

//   const joinAsViewer = async () => {
//     setJoinedId(inputId); setRole('viewer');
//     await startCam();
//     ws.send(JSON.stringify({ type: 'viewer-connected', targetId: inputId }));
//   };

//   const startCam = async () => {
//     pc = null;
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     localRef.current.srcObject = stream;
//   };

//   const createPeer = (peerId) => {
//     const conn = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
//     peers.current[peerId] = conn;
//     localRef.current.srcObject.getTracks().forEach((t) => conn.addTrack(t, localRef.current.srcObject));
//     conn.onicecandidate = (e) => {
//       if (e.candidate) ws.send(JSON.stringify({ type: 'ice-candidate', candidate: e.candidate, targetId: peerId }));
//     };
//     conn.ontrack = (e) => addRemote(peerId, e.streams[0]);
//     return conn;
//   };

//   const addRemote = (peerId, stream) => {
//     let vid = document.getElementById('v-' + peerId);
//     if (!vid) {
//       vid = document.createElement('video');
//       vid.id = 'v-' + peerId;
//       vid.autoplay = true;
//       vid.playsInline = true;
//       vid.className = 'w-1/3 h-auto';
//       remoteGrid.current.appendChild(vid);
//     }
//     vid.srcObject = stream;
//   };

//   const createOffer = async (peerId) => {
//     const conn = createPeer(peerId);
//     const offer = await conn.createOffer();
//     await conn.setLocalDescription(offer);
//     ws.send(JSON.stringify({ type: 'offer', sdp: offer, targetId: peerId }));
//   };

//   const handleOffer = async (peerId, sdp) => {
//     const conn = createPeer(peerId);
//     await conn.setRemoteDescription(new RTCSessionDescription(sdp));
//     const answer = await conn.createAnswer();
//     await conn.setLocalDescription(answer);
//     ws.send(JSON.stringify({ type: 'answer', sdp: answer, targetId: peerId }));
//   };

//   const sendMsg = () => {
//     ws.send(JSON.stringify({ type: 'chat', text: msg }));
//     setChat((c) => [...c, { from: clientId.current, text: msg }]);
//     setMsg('');
//   };

//   return (
//     <div className="min-h-screen p-4 bg-gray-100">
//       {!role ? (
//         <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow">
//           <h2 className="text-xl font-semibold mb-4">📞 Create or Join Meeting</h2>
//           <button onClick={joinAsHost} className="btn">Start Meeting</button>
//           <div className="mt-4">
//             <input value={inputId} onChange={e => setInputId(e.target.value)} placeholder="Meeting ID" className="input" />
//             <button onClick={joinAsViewer} className="btn">Join</button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <h2 className="text-lg font-medium">Meeting ID: <code>{joinedId}</code></h2>
//           <div className="flex gap-4 mt-4">
//             <video ref={localRef} autoPlay muted className="w-1/3 rounded-md bg-black" />
//             <div ref={remoteGrid} className="flex flex-wrap gap-2 w-2/3"></div>
//           </div>
//           <div className="mt-6 bg-white rounded shadow p-4">
//             <h3 className="font-semibold">Chat</h3>
//             <div className="max-h-40 overflow-y-auto mb-2">
//               {chat.map((m,i) => (
//                 <div key={i}><strong className="text-blue-600">{m.from===clientId.current ? 'Me' : m.from}:</strong> {m.text}</div>
//               ))}
//             </div>
//             <div className="flex">
//               <input value={msg} onChange={e => setMsg(e.target.value)} className="input flex-grow" />
//               <button onClick={sendMsg} className="btn ml-2">Send</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect, useRef } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const WS = 'ws://localhost:8080';

// function App() {
//   const [meetingId, setMeetingId] = useState('');
//   const [inputId, setInputId] = useState('');
//   const [role, setRole] = useState(null);
//   const [joinedId, setJoinedId] = useState('');
//   const [chat, setChat] = useState([]);
  // const [msg, setMsg] = useState('');
//   const [micOn, setMicOn] = useState(true);
//   const [camOn, setCamOn] = useState(true);

//   const localVideoRef = useRef();
//   const remoteGridRef = useRef();
//   const ws = useRef(null);
//   const peers = useRef({}); // peerId -> RTCPeerConnection
//   const localStream = useRef(null);
//   const clientId = useRef(uuidv4());

//   useEffect(() => {
//     ws.current = new WebSocket(WS);
//     ws.current.onopen = () => ws.current.send(JSON.stringify({ type: 'register', id: clientId.current }));
//     ws.current.onmessage = handleMessage;
//     return () => {
//       ws.current.close();
//     };
//   }, []);

//   const handleMessage = async (event) => {
//     const data = JSON.parse(event.data);
//     const { type, sdp, candidate, senderId, from, text, viewerId } = data;

//     if (type === 'viewer-connected' && role === 'host') {
//       await createOffer(viewerId);
//     } else if (type === 'offer') {
//       await handleOffer(senderId, sdp);
//     } else if (type === 'answer') {
//       await peers.current[senderId]?.setRemoteDescription(new RTCSessionDescription(sdp));
//     } else if (type === 'ice-candidate') {
//       await peers.current[senderId]?.addIceCandidate(new RTCIceCandidate(candidate));
//     } else if (type === 'chat') {
//       setChat((c) => [...c, { from, text }]);
//     }
//   };

//   const startLocalStream = async () => {
//     try {
//       localStream.current = await navigator.mediaDevices.getUserMedia({ video: camOn, audio: micOn });
//       localVideoRef.current.srcObject = localStream.current;
//     } catch (err) {
//       alert('Failed to access camera or microphone');
//     }
//   };

//   const joinAsHost = async () => {
//     const id = uuidv4().slice(0, 8);
//     setMeetingId(id);
//     setJoinedId(id);
//     setRole('host');
//     await startLocalStream();
//   };

//   const joinAsViewer = async () => {
//     setJoinedId(inputId);
//     setRole('viewer');
//     await startLocalStream();
//     ws.current.send(JSON.stringify({ type: 'viewer-connected', targetId: inputId }));
//   };

//   const createPeerConnection = (peerId) => {
//     const pc = new RTCPeerConnection({
//       iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//     });
//     peers.current[peerId] = pc;

//     localStream.current.getTracks().forEach((track) => pc.addTrack(track, localStream.current));

//     pc.onicecandidate = (e) => {
//       if (e.candidate) {
//         ws.current.send(JSON.stringify({ type: 'ice-candidate', candidate: e.candidate, targetId: peerId }));
//       }
//     };

//     pc.ontrack = (e) => {
//       addRemoteStream(peerId, e.streams[0]);
//     };

//     return pc;
//   };

//   const createOffer = async (peerId) => {
//     const pc = createPeerConnection(peerId);
//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);
//     ws.current.send(JSON.stringify({ type: 'offer', sdp: offer, targetId: peerId }));
//   };

//   const handleOffer = async (peerId, sdp) => {
//     const pc = createPeerConnection(peerId);
//     await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);
//     ws.current.send(JSON.stringify({ type: 'answer', sdp: answer, targetId: peerId }));
//   };

//   const addRemoteStream = (peerId, stream) => {
//     let video = document.getElementById(`remote-video-${peerId}`);
//     if (!video) {
//       video = document.createElement('video');
//       video.id = `remote-video-${peerId}`;
//       video.autoplay = true;
//       video.playsInline = true;
//       video.className = 'w-1/3 rounded-md';
//       remoteGridRef.current.appendChild(video);
//     }
//     video.srcObject = stream;
//   };

//   const toggleMic = () => {
//     if (!localStream.current) return;
//     localStream.current.getAudioTracks().forEach(track => {
//       track.enabled = !micOn;
//     });
//     setMicOn(!micOn);
//   };

//   const toggleCam = () => {
//     if (!localStream.current) return;
//     localStream.current.getVideoTracks().forEach(track => {
//       track.enabled = !camOn;
//     });
//     setCamOn(!camOn);
//   };

//   const sendMessage = () => {
//     if (!msg.trim()) return;
//     ws.current.send(JSON.stringify({ type: 'chat', text: msg }));
//     setChat((c) => [...c, { from: clientId.current, text: msg }]);
//     setMsg('');
//   };

//   // const [msg, setMsg] = useState('');

//   return (
//     <div className="min-h-screen p-4 bg-gray-100">
//       {!role ? (
//         <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow">
//           <h2 className="text-xl font-semibold mb-4">📞 Create or Join Meeting</h2>
//           <button onClick={joinAsHost} className="btn mb-3">Start Meeting</button>
//           <input
//             type="text"
//             value={inputId}
//             onChange={e => setInputId(e.target.value)}
//             placeholder="Enter Meeting ID"
//             className="input mb-3"
//           />
//           <button onClick={joinAsViewer} className="btn">Join Meeting</button>
//         </div>
//       ) : (
//         <>
//           <h2 className="text-lg font-medium mb-3">
//             Meeting ID: <code>{joinedId}</code>
//           </h2>
//           <div className="flex gap-4">
//             <div>
//               <video
//                 ref={localVideoRef}
//                 autoPlay
//                 muted
//                 playsInline
//                 className="w-64 rounded-md bg-black"
//               />
//               <div className="mt-2 flex gap-2">
//                 <button onClick={toggleMic} className="btn">
//                   {micOn ? 'Mute Mic' : 'Unmute Mic'}
//                 </button>
//                 <button onClick={toggleCam} className="btn">
//                   {camOn ? 'Stop Cam' : 'Start Cam'}
//                 </button>
//               </div>
//             </div>

//             <div
//               ref={remoteGridRef}
//               className="flex flex-wrap gap-2 flex-grow"
//             ></div>
//           </div>

//           <div className="mt-6 bg-white rounded shadow p-4 max-w-2xl mx-auto">
//             <h3 className="font-semibold mb-2">Chat</h3>
//             <div className="max-h-48 overflow-y-auto mb-3 border border-gray-300 p-2 rounded">
//               {chat.map((m, i) => (
//                 <div key={i}>
//                   <strong className="text-blue-600">
//                     {m.from === clientId.current ? 'Me' : m.from}:
//                   </strong>{' '}
//                   {m.text}
//                 </div>
//               ))}
//             </div>
//             <div className="flex gap-2">
//               <input
//                 value={msg}
//                 onChange={e => setMsg(e.target.value)}
//                 className="input flex-grow"
//                 placeholder="Type message"
//                 onKeyDown={e => {
//                   if (e.key === 'Enter') sendMessage();
//                 }}
//               />
//               <button onClick={sendMessage} className="btn">
//                 Send
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect, useRef } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const WS_URL = 'ws://localhost:8080';

// function App() {
//   const [role, setRole] = useState(null);
//   const [meetingId, setMeetingId] = useState('');
//   const [inputId, setInputId] = useState('');
//   const ws = useRef(null);
//   const localStream = useRef(null);
//   const peers = useRef({});
//   const remoteStreams = useRef({});
//   const localVideoRef = useRef(null);
//   const remoteVideosRef = useRef(null);
//   const clientId = useRef(uuidv4());

//   useEffect(() => {
//     ws.current = new WebSocket(WS_URL);

//     ws.current.onopen = () => {
//       ws.current.send(JSON.stringify({ type: 'register', id: clientId.current }));
//     };

//     ws.current.onmessage = async (event) => {
//       const data = JSON.parse(event.data);
//       await handleMessage(data);
//     };

//     return () => {
//       ws.current.close();
//       cleanup();
//     };
//   }, []);

//   const handleMessage = async (data) => {
//     if (data.type === 'viewer-connected' && role === 'host') {
//       await createOffer(data.viewerId);
//     } else if (data.type === 'offer' && role === 'viewer') {
//       await handleOffer(data.senderId, data.sdp);
//     } else if (data.type === 'answer' && role === 'host') {
//       await peers.current[data.senderId]?.setRemoteDescription(new RTCSessionDescription(data.sdp));
//     } else if (data.type === 'ice-candidate') {
//       if (peers.current[data.senderId]) {
//         await peers.current[data.senderId].addIceCandidate(new RTCIceCandidate(data.candidate));
//       }
//     }
//   };

//   const cleanup = () => {
//     Object.values(peers.current).forEach(pc => pc.close());
//     peers.current = {};
//     remoteStreams.current = {};
//     if (localStream.current) {
//       localStream.current.getTracks().forEach(t => t.stop());
//       localStream.current = null;
//     }
//   };

//   const startLocalStream = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       localStream.current = stream;
//       if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//     } catch (err) {
//       alert('Camera/mic access denied');
//     }
//   };

//   const startMeeting = async () => {
//     setRole('host');
//     const id = uuidv4().slice(0, 8);
//     setMeetingId(id);
//     await startLocalStream();
//   };

//   const joinMeeting = async () => {
//     if (!inputId) return alert('Enter meeting ID');
//     setRole('viewer');
//     setMeetingId(inputId);
//     await startLocalStream();
//     ws.current.send(JSON.stringify({ type: 'viewer-connected', viewerId: clientId.current, targetId: inputId }));
//   };

//   const createOffer = async (peerId) => {
//     if (peers.current[peerId]) return;
//     const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
//     peers.current[peerId] = pc;

//     localStream.current.getTracks().forEach(t => pc.addTrack(t, localStream.current));

//     pc.onicecandidate = e => {
//       if (e.candidate) {
//         ws.current.send(JSON.stringify({ type: 'ice-candidate', candidate: e.candidate, targetId: peerId, senderId: clientId.current }));
//       }
//     };

//     pc.ontrack = e => {
//       remoteStreams.current[peerId] = e.streams[0];
//       renderRemoteVideos();
//     };

//     const offer = await pc.createOffer();
//     await pc.setLocalDescription(offer);

//     ws.current.send(JSON.stringify({ type: 'offer', sdp: offer, targetId: peerId, senderId: clientId.current }));
//   };

//   const handleOffer = async (peerId, sdp) => {
//     if (peers.current[peerId]) return;

//     const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] });
//     peers.current[peerId] = pc;

//     localStream.current.getTracks().forEach(t => pc.addTrack(t, localStream.current));

//     pc.onicecandidate = e => {
//       if (e.candidate) {
//         ws.current.send(JSON.stringify({ type: 'ice-candidate', candidate: e.candidate, targetId: peerId, senderId: clientId.current }));
//       }
//     };

//     pc.ontrack = e => {
//       // For viewers, we might show host video here if needed
//     };

//     await pc.setRemoteDescription(new RTCSessionDescription(sdp));
//     const answer = await pc.createAnswer();
//     await pc.setLocalDescription(answer);

//     ws.current.send(JSON.stringify({ type: 'answer', sdp: answer, targetId: peerId, senderId: clientId.current }));
//   };

//   const renderRemoteVideos = () => {
//     if (!remoteVideosRef.current) return;

//     remoteVideosRef.current.innerHTML = ''; // clear

//     for (const id in remoteStreams.current) {
//       let video = document.getElementById(id);
//       if (!video) {
//         video = document.createElement('video');
//         video.id = id;
//         video.autoplay = true;
//         video.playsInline = true;
//         video.width = 200;
//         video.height = 150;
//         video.style.margin = '5px';
//         remoteVideosRef.current.appendChild(video);
//       }
//       video.srcObject = remoteStreams.current[id];
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       {!role && (
//         <>
//           <button onClick={startMeeting}>Start Meeting (Host)</button>
//           <br /><br />
//           <input
//             placeholder="Meeting ID"
//             value={inputId}
//             onChange={e => setInputId(e.target.value)}
//           />
//           <button onClick={joinMeeting}>Join Meeting (Viewer)</button>
//         </>
//       )}

//       {role && (
//         <>
//           <h3>You are {role}</h3>
//           <h4>Meeting ID: {meetingId}</h4>

//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             playsInline
//             style={{ width: 200, height: 150, backgroundColor: 'black' }}
//           />

//           {role === 'host' && (
//             <>
//               <h4>Viewers:</h4>
//               <div ref={remoteVideosRef} />
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
