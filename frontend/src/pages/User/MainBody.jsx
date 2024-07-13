// import React, { useRef, useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BiPlusCircle } from 'react-icons/bi';
// import { FaPaperPlane } from 'react-icons/fa';
// import axios from 'axios';
// import './user.css';

// const MainBody = ({ user, addToHistory, initialMessages }) => {
//   const [query, setQuery] = useState('');
//   const [messages, setMessages] = useState(initialMessages || []);
//   const [chatActive, setChatActive] = useState(false);
//   const fileInputRef = useRef(null);
//   const textareaRef = useRef(null);

//   const handleKeyPress = async (event) => {
//     if (event.key === 'Enter' && !event.shiftKey && query.trim() !== '') {
//       event.preventDefault();
//       await sendMessage();
//     }
//   };

//   const sendMessage = async () => {
//     if (query.trim() === '') return;

//     // Create a single message object for the entire query
//     const userMessage = { user: 'user', text: query.trim() };

//     // Update messages state with new message
//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setQuery('');
//     addToHistory(updatedMessages);

//     try {
//       // Send the entire query as a single message to the backend
//       const response = await axios.post('http://localhost:8081/api/chat', { message: query.trim() });
//       const botMessage = { user: 'bot', text: response.data.reply };
//       updatedMessages.push(botMessage);

//       // Update state with final messages after receiving reply
//       setMessages(updatedMessages);
//       addToHistory(updatedMessages);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage = { user: 'bot', text: "Sorry, something went wrong. Please try again later." };
//       updatedMessages.push(errorMessage);
//       setMessages(updatedMessages);
//       addToHistory(updatedMessages);
//     }
//   };

//   const handleAddDocument = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//   };

//   const handleChatFocus = () => {
//     setChatActive(true);
//   };

//   const handleChatBlur = () => {
//     setChatActive(false);
//   };

//   const adjustTextareaHeight = () => {
//     const textarea = textareaRef.current;
//     textarea.style.height = 'auto';
//     textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
//   };

//   useEffect(() => {
//     setMessages(initialMessages || []);
//   }, [initialMessages]);

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [query]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const chatWindow = document.querySelector('.chat-window');
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="main-body d-flex flex-column align-items-center">
//       {(!chatActive && messages.length === 0) && <h1 className="welcome mb-5">{`Welcome ${user.name}`}</h1>}
//       <div className="chat-window w-75 mb-2 justify-content-center" style={{ overflowY: 'auto' }} onFocus={handleChatFocus} onBlur={handleChatBlur}>
//         {chatActive && <h1 className="welcome mb-5">{`Welcome ${user.name}`}</h1>}
//         <div className="messages p-3 rounded">
//           {messages.map((msg, index) => (
//             <div key={index} className={`message ${msg.user}`}>
//               {msg.text.split('\n').map((line, idx) => (
//                 <div key={idx}>{line}</div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="input-group1 w-75 position-relative">
//         <textarea
//           ref={textareaRef}
//           className="search form-control rounded border border-black"
//           id="search"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="What can I help you with.."
//           onKeyPress={handleKeyPress}
//           style={{ maxHeight: '700px', resize: 'none', overflow: 'hidden' }}
//         />
//         <FaPaperPlane
//           className="fa fa-paper-plane position-absolute"
//           size={24}
//           onClick={sendMessage}
//           style={{ cursor: 'pointer', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
//         />
//         <div className="append position-absolute" style={{ top: '60%', left: '0px', transform: 'translateY(-50%)' }}>
//           <BiPlusCircle
//             className="bi bi-plus-circle"
//             size={30}
//             onClick={handleAddDocument}
//             style={{ cursor: 'pointer' }}
//           />
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//             onChange={handleFileChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainBody;


// import React, { useRef, useState, useEffect } from 'react';
// import { Button } from '@material-tailwind/react';
// import { FaPaperPlane } from 'react-icons/fa';
// import axios from 'axios';

// const MainBody = ({ user, addToHistory, initialMessages }) => {
//   const [query, setQuery] = useState('');
//   const [messages, setMessages] = useState(initialMessages || []);
//   const [currentMessages, setCurrentMessages] = useState(messages); // Initialize with messages
//   const fileInputRef = useRef(null);
//   const textareaRef = useRef(null);

//   const handleKeyPress = async (event) => {
//     if (event.key === 'Enter' && !event.shiftKey && query.trim() !== '') {
//       event.preventDefault();
//       await sendMessage();
//     }
//   };

//   const sendMessage = async () => {
//     if (query.trim() === '') return;

//     const userMessage = { user: 'user', text: query.trim() };

//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setCurrentMessages(updatedMessages); // Update currentMessages

//     setQuery('');

//     try {
//       const response = await axios.post('http://localhost:8081/api/chat', { message: query.trim() });
//       const botMessage = { user: 'bot', text: response.data.reply };
//       updatedMessages.push(botMessage);

//       setMessages(updatedMessages);
//       setCurrentMessages(updatedMessages); // Update currentMessages
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage = { user: 'bot', text: "Sorry, something went wrong. Please try again later." };
//       updatedMessages.push(errorMessage);

//       setMessages(updatedMessages);
//       setCurrentMessages(updatedMessages); // Update currentMessages
//     }
//   };

//   const handleAddDocument = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//   };

//   const adjustTextareaHeight = () => {
//     const textarea = textareaRef.current;
//     textarea.style.height = 'auto';
//     textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
//   };

//   useEffect(() => {
//     setMessages(initialMessages || []);
//     setCurrentMessages(initialMessages || []);
//   }, [initialMessages]);

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [query]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const chatWindow = document.querySelector('.chat-window');
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//     setCurrentMessages(messages); // Update currentMessages whenever messages change
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col p-4 bg-gray-100">
//       <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded bg-white">
//         <div className="messages p-20">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message mb-2 p-2 rounded max-w-lg ${
//                 msg.user === 'user' ? 'bg-gray-300 text-black ml-auto' : 'bg-white text-black mr-auto'
//               }`}
//               style={{ alignSelf: msg.user === 'user' ? 'flex-end' : 'flex-start' }}
//             >
//               {msg.text.split('\n').map((line, idx) => (
//                 <div key={idx}>{line}</div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex items-center mt-4 relative">
//         <textarea
//           ref={textareaRef}
//           className="search flex-1 form-control rounded border border-black p-2"
//           id="search"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="What can I help you with.."
//           onKeyPress={handleKeyPress}
//           style={{ maxHeight: '400px', resize: 'none', overflow: 'hidden' }}
//         />
//         <Button color="lightBlue" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={sendMessage}>
//           <FaPaperPlane className="w-5 h-5" />
//         </Button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: 'none' }}
//           onChange={handleFileChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default MainBody;


// import React, { useRef, useState, useEffect } from 'react';
// import { Button } from '@material-tailwind/react';
// import { FaPaperPlane, FaPlus } from 'react-icons/fa'; // Import FaPlus icon for the plus button
// import axios from 'axios';

// const MainBody = ({ user, addToHistory, initialMessages }) => {
//   const [query, setQuery] = useState('');
//   const [messages, setMessages] = useState(initialMessages || []);
//   const [currentMessages, setCurrentMessages] = useState(messages); // Initialize with messages
//   const fileInputRef = useRef(null);
//   const textareaRef = useRef(null);

//   const handleKeyPress = async (event) => {
//     if (event.key === 'Enter' && !event.shiftKey && query.trim() !== '') {
//       event.preventDefault();
//       await sendMessage();
//     }
//   };

//   const sendMessage = async () => {
//     if (query.trim() === '') return;

//     const userMessage = { user: 'user', text: query.trim() };

//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setCurrentMessages(updatedMessages); // Update currentMessages

//     setQuery('');

//     try {
//       const response = await axios.post('http://localhost:8081/api/chat', { message: query.trim() });
//       const botMessage = { user: 'bot', text: response.data.reply };
//       updatedMessages.push(botMessage);

//       setMessages(updatedMessages);
//       setCurrentMessages(updatedMessages); // Update currentMessages
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage = { user: 'bot', text: "Sorry, something went wrong. Please try again later." };
//       updatedMessages.push(errorMessage);

//       setMessages(updatedMessages);
//       setCurrentMessages(updatedMessages); // Update currentMessages
//     }
//   };

//   const handleAddDocument = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//   };

//   const adjustTextareaHeight = () => {
//     const textarea = textareaRef.current;
//     textarea.style.height = 'auto';
//     textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
//   };

//   useEffect(() => {
//     setMessages(initialMessages || []);
//     setCurrentMessages(initialMessages || []);
//   }, [initialMessages]);

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [query]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const chatWindow = document.querySelector('.chat-window');
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//     setCurrentMessages(messages); // Update currentMessages whenever messages change
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col p-4 bg-gray-100">
//       <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded bg-white">
//         <div className="messages p-20">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message mb-2 p-2 rounded max-w-lg ${
//                 msg.user === 'user' ? 'bg-gray-300 text-black ml-auto' : 'bg-white text-black mr-auto'
//               }`}
//               style={{ alignSelf: msg.user === 'user' ? 'flex-end' : 'flex-start' }}
//             >
//               {msg.text.split('\n').map((line, idx) => (
//                 <div key={idx}>{line}</div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex items-center mt-4 relative">
//         <Button color="gray" className="mr-2" onClick={handleAddDocument}>
//           <FaPlus className="w-3 h-5" />
//         </Button>
//         <textarea
//           ref={textareaRef}
//           className="search flex-1 form-control rounded border border-black p-2"
//           id="search"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="What can I help you with.."
//           onKeyPress={handleKeyPress}
//           style={{ maxHeight: '400px', resize: 'none', overflow: 'hidden' }}
//         />
//         <Button color="lightBlue" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={sendMessage}>
//           <FaPaperPlane className="w-5 h-5" />
//         </Button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: 'none' }}
//           onChange={handleFileChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default MainBody;


// import React, { useRef, useState, useEffect } from 'react';
// import { Button } from '@material-tailwind/react';
// import { FaPaperPlane, FaPlus } from 'react-icons/fa'; // Import FaPlus icon for the plus button
// import axios from 'axios';

// const MainBody = ({ user, addToHistory, initialMessages }) => {
//   const [query, setQuery] = useState('');
//   const [messages, setMessages] = useState(initialMessages || []);
//   const [currentMessages, setCurrentMessages] = useState(messages); // Initialize with messages
//   const fileInputRef = useRef(null);
//   const textareaRef = useRef(null);

//   const handleKeyPress = async (event) => {
//     if (event.key === 'Enter' && !event.shiftKey && query.trim() !== '') {
//       event.preventDefault();
//       await sendMessage();
//     }
//   };

//   const sendMessage = async () => {
//     if (query.trim() === '') return;

//     const userMessage = { user: 'user', text: query.trim() };

//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setCurrentMessages(updatedMessages); // Update currentMessages

//     setQuery('');

//     try {
//       const response = await axios.post('http://localhost:8081/api/chat', { message: query.trim() });
//       const botMessage = { user: 'bot', text: response.data.reply };
//       updatedMessages.push(botMessage);

//       setMessages(updatedMessages);
//       setCurrentMessages(updatedMessages); // Update currentMessages
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage = { user: 'bot', text: "Sorry, something went wrong. Please try again later." };
//       updatedMessages.push(errorMessage);

//       setMessages(updatedMessages);
//       setCurrentMessages(updatedMessages); // Update currentMessages
//     }
//   };

//   const handleAddDocument = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//   };

//   const adjustTextareaHeight = () => {
//     const textarea = textareaRef.current;
//     textarea.style.height = 'auto';
//     textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
//   };

//   useEffect(() => {
//     setMessages(initialMessages || []);
//     setCurrentMessages(initialMessages || []);
//   }, [initialMessages]);

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [query]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const chatWindow = document.querySelector('.chat-window');
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//     setCurrentMessages(messages); // Update currentMessages whenever messages change
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col p-4 bg-gray-100">
//       <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded bg-white">
//         <div className="messages p-20">
//           {messages.length === 0 && (
//             <div className="text-2xl text-center mb-4">
//             Welcome! How can I assist you today?
//           </div>
//           )}
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message mb-2 p-2 rounded max-w-lg ${
//                 msg.user === 'user' ? 'bg-gray-300 text-black ml-auto' : 'bg-white text-black mr-auto'
//               }`}
//               style={{ alignSelf: msg.user === 'user' ? 'flex-end' : 'flex-start' }}
//             >
//               {msg.text.split('\n').map((line, idx) => (
//                 <div key={idx}>{line}</div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex items-center mt-4 relative">
//         <Button color="gray" className="mr-2" onClick={handleAddDocument}>
//           <FaPlus className="w-3 h-5" />
//         </Button>
//         <textarea
//           ref={textareaRef}
//           className="search flex-1 form-control rounded border border-black p-2"
//           id="search"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="What can I help you with.."
//           onKeyPress={handleKeyPress}
//           style={{ maxHeight: '400px', resize: 'none', overflow: 'hidden' }}
//         />
//         <Button color="lightBlue" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={sendMessage}>
//           <FaPaperPlane className="w-5 h-5" />
//         </Button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: 'none' }}
//           onChange={handleFileChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default MainBody;


// import React, { useRef, useState, useEffect } from 'react';
// import { Button } from '@material-tailwind/react';
// import { FaPaperPlane, FaPlus } from 'react-icons/fa';
// import axios from 'axios';

// const MainBody = ({ user, addToHistory, initialMessages ,currentMessages, setCurrentMessages,setHistory}) => {
//   const [query, setQuery] = useState('');
//   const [messages, setMessages] = useState(initialMessages || []);
//   const [currentMessages, setCurrentMessages] = useState(messages);
//   const fileInputRef = useRef(null);
//   const textareaRef = useRef(null);

//   const handleKeyPress = async (event) => {
//     if (event.key === 'Enter' && !event.shiftKey && query.trim() !== '') {
//       event.preventDefault();
//       await sendMessage();
//     }
//   };

//   const sendMessage = async () => {
//     if (query.trim() === '') return;

//     const userMessage = { user: 'user', text: query.trim() };
//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setCurrentMessages(updatedMessages);

//     setQuery('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/chat', { message: query.trim() });
//       const botMessage = { user: 'bot', text: response.data.reply };
//       updatedMessages.push(botMessage);

//       setMessages(updatedMessages);
//       setCurrentMessages(updatedMessages);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage = { user: 'bot', text: "Sorry, something went wrong. Please try again later." };
//       updatedMessages.push(errorMessage);

//       setMessages(updatedMessages);
//       setCurrentMessages(updatedMessages);
//     }
//   };

//   const handleAddDocument = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//   };

//   const adjustTextareaHeight = () => {
//     const textarea = textareaRef.current;
//     textarea.style.height = 'auto';
//     textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
//   };

//   useEffect(() => {
//     setMessages(initialMessages || []);
//     setCurrentMessages(initialMessages || []);
//   }, [initialMessages]);

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [query]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const chatWindow = document.querySelector('.chat-window');
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//     setCurrentMessages(messages);
//     console.log(messages);
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col p-4 bg-gray-100">
//       <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded bg-white">
//         <div className="messages p-20">
//           {messages.length === 0 && (
//             <div className="text-2xl text-center mb-4">
//               Welcome! How can I assist you today?
//             </div>
//           )}
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message mb-2 p-2 rounded max-w-lg ${
//                 msg.user === 'user' ? 'bg-gray-300 text-black ml-auto' : 'bg-white text-black mr-auto'
//               }`}
//               style={{ alignSelf: msg.user === 'user' ? 'flex-end' : 'flex-start' }}
//             >
//               {msg.text.split('\n').map((line, idx) => (
//                 <div key={idx}>{line}</div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex items-center mt-4 relative">
//         <Button color="gray" className="mr-2" onClick={handleAddDocument}>
//           <FaPlus className="w-3 h-5" />
//         </Button>
//         <textarea
//           ref={textareaRef}
//           className="search flex-1 form-control rounded border border-black p-2"
//           id="search"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="What can I help you with.."
//           onKeyPress={handleKeyPress}
//           style={{ maxHeight: '400px', resize: 'none', overflow: 'hidden' }}
//         />
//         <Button color="lightBlue" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={sendMessage}>
//           <FaPaperPlane className="w-5 h-5" />
//         </Button>
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: 'none' }}
//           onChange={handleFileChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default MainBody;


import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@material-tailwind/react';
import { FaPaperPlane, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const MainBody = ({ user, addToHistory, initialMessages, currentMessages, setCurrentMessages, setHistory }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState(initialMessages || []);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && !event.shiftKey && query.trim() !== '') {
      event.preventDefault();
      await sendMessage();
    }
  };

  const sendMessage = async () => {
    if (query.trim() === '') return;

    const userMessage = { user: 'user', text: query.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setCurrentMessages(updatedMessages);

    setQuery('');

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: query.trim() });
      const botMessage = { user: 'bot', text: response.data.reply };
      updatedMessages.push(botMessage);

      setMessages(updatedMessages);
      setCurrentMessages(updatedMessages);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { user: 'bot', text: "Sorry, something went wrong. Please try again later." };
      updatedMessages.push(errorMessage);

      setMessages(updatedMessages);
      setCurrentMessages(updatedMessages);
    }
  };

  const handleAddDocument = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
  };

  useEffect(() => {
    setMessages(initialMessages || []);
    setCurrentMessages(initialMessages || []);
  }, [initialMessages, setCurrentMessages]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [query]);

  useEffect(() => {
    if (messages.length > 0) {
      const chatWindow = document.querySelector('.chat-window');
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
    console.log(messages);
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded bg-white">
        <div className="messages p-20">
          {messages.length === 0 && (
            <div className="text-3xl text-center mb-4">
              Welcome! How can I assist you today?
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message mb-2 p-2 rounded max-w-lg ${
                msg.user === 'user' ? 'bg-gray-300 text-black ml-auto' : 'bg-white text-black mr-auto'
              }`}
              style={{ alignSelf: msg.user === 'user' ? 'flex-end' : 'flex-start' }}
            >
              {msg.text.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center mt-4 relative">
        <Button color="gray" className="mr-2" onClick={handleAddDocument}>
          <FaPlus className="w-3 h-5" />
        </Button>
        <textarea
          ref={textareaRef}
          className="search flex-1 form-control rounded border border-black p-2"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What can I help you with.."
          onKeyPress={handleKeyPress}
          style={{ maxHeight: '400px', resize: 'none', overflow: 'hidden' }}
        />
        <Button color="lightBlue" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={sendMessage}>
          <FaPaperPlane className="w-5 h-5" />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default MainBody;
