// import React, { useRef, useState, useEffect } from 'react';
// import { Button } from '@material-tailwind/react';
// import { FaPaperPlane, FaPlus } from 'react-icons/fa';
// import axios from 'axios';

// const MainBody = ({ user, addToHistory, initialMessages, currentMessages, setCurrentMessages, setHistory }) => {
//   const [query, setQuery] = useState('');
//   const [messages, setMessages] = useState(initialMessages || []);
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
//   }, [initialMessages, setCurrentMessages]);

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [query]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const chatWindow = document.querySelector('.chat-window');
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//     console.log(messages);
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col p-4 bg-gray-100">
//       <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded bg-white">
//         <div className="messages p-20">
//           {messages.length === 0 && (
//             <div className="text-3xl text-center mb-4">
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
//         <Button color="lightBlue" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={sendMessage}>
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

// const MainBody = ({ user, addToHistory, initialMessages, currentMessages, setCurrentMessages, setHistory}) => {
//   const [query, setQuery] = useState('');
//   const [messages, setMessages] = useState(initialMessages || []);
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
//       const response = await axios.post('http://localhost:8000/response_test', { prompt: query.trim() });
//       const botMessage = { user: 'bot', text: response.data || "No response text provided" }; // Ensure response.data.text is a string
//       setMessages([...updatedMessages, botMessage]);
//       setCurrentMessages([...updatedMessages, botMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage = { user: 'bot', text: "Sorry, something went wrong. Please try again later." };
//       setMessages([...updatedMessages, errorMessage]);
//       setCurrentMessages([...updatedMessages, errorMessage]);
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
//   }, [initialMessages, setCurrentMessages]);

//   useEffect(() => {
//     adjustTextareaHeight();
//   }, [query]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const chatWindow = document.querySelector('.chat-window');
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//     console.log(messages);
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col p-4 bg-gray-100">
//       <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded bg-white">
//         <div className="messages p-20">
//           {messages.length === 0 && (
//             <div className="text-3xl text-center mb-4">
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
//               {typeof msg.text === 'string' ? (
//                 msg.text.split('\n').map((line, idx) => (
//                   <div key={idx}>{line}</div>
//                 ))
//               ) : (
//                 <div>Invalid message content</div>
//               )}
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
//           className="search flex-1 form-control rounded border border-black p-2 w-50"
//           id="search"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="What can I help you with.."
//           onKeyPress={handleKeyPress}
//           style={{ maxHeight: '400px', resize: 'none', overflow: 'auto' }} 
//         />
//         <Button color="lightBlue" className="absolute right-5 top-1/2 transform -translate-y-1/2" onClick={sendMessage}>
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
// import { FaPaperclip, FaImage, FaMicrophone } from 'react-icons/fa';
// import axios from 'axios';

// const MainBody = ({ user, addToHistory, initialMessages, currentMessages, setCurrentMessages, setHistory }) => {
//   const [messages, setMessages] = useState(initialMessages || []);
//   const [query, setQuery] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleAddDocument = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//   };

//   const handleSendMessage = () => {
//     if (query.trim()) {
//       setMessages([...messages, { user: 'user', text: query }]);
//       setCurrentMessages([...currentMessages, { user: 'user', text: query }]);
//       setQuery('');
//     }
//   };

//   useEffect(() => {
//     setMessages(initialMessages || []);
//     setCurrentMessages(initialMessages || []);
//   }, [initialMessages, setCurrentMessages]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const chatWindow = document.querySelector('.chat-window');
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//     console.log(messages);
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col p-4 bg-gray-100">
//       <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded ">
//         <div className="messages p-20">
//           {messages.length === 0 && (
//             <div className="text-3xl text-center mb-4">
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
//               {typeof msg.text === 'string' ? (
//                 msg.text.split('\n').map((line, idx) => (
//                   <div key={idx}>{line}</div>
//                 ))
//               ) : (
//                 <div>Invalid message content</div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="border-t border-gray-300 mt-4 pt-2 flex flex-col h-32 relative">
//         <div className="flex items-center space-x-4 mb-2">
//           <FaImage className="w-5 h-5 text-gray-500" onClick={handleAddDocument} />
//           <FaPaperclip className="w-5 h-5 text-gray-500" />
//           <FaMicrophone className="w-5 h-5 text-gray-500" />
//         </div>
//         <div
//           className="w-full text-gray-500 mb-2"
//           style={{ outline: 'none', cursor: 'text', padding: '8px 0' }}
//           contentEditable
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => !query && setIsFocused(false)}
//           onInput={(e) => setQuery(e.currentTarget.textContent)}
//         >
//           {!isFocused && !query && "Type your message here..."}
//         </div>
//         <button
//           className="absolute bottom-2 right-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//           onClick={handleSendMessage}
//         >
//           Send
//         </button>
//       </div>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// };

// export default MainBody;



// import React, { useRef, useState, useEffect } from "react";
// import { FaPaperclip, FaImage, FaMicrophone, FaBars } from "react-icons/fa";

// const MainBody = ({ user, addToHistory, initialMessages, currentMessages, setCurrentMessages, setHistory }) => {
//   const [messages, setMessages] = useState(initialMessages || []);
//   const [query, setQuery] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar visibility
//   const fileInputRef = useRef(null);

//   const handleAddDocument = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//   };

//   const handleSendMessage = () => {
//     if (query.trim()) {
//       setMessages([...messages, { user: 'user', text: query }]);
//       setCurrentMessages([...currentMessages, { user: 'user', text: query }]);
//       setQuery('');
//     }
//   };

//   const handleSidebarToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
//   };

//   useEffect(() => {
//     setMessages(initialMessages || []);
//     setCurrentMessages(initialMessages || []);
//   }, [initialMessages, setCurrentMessages]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const chatWindow = document.querySelector('.chat-window');
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//     console.log(messages);
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col p-4 bg-gray-100 relative">
//       {/* Header Section */}
//       <div className="border-b border-gray-300 pb-2 mb-4 flex items-center justify-between relative">
//         <h2 className="text-xl font-semibold">Chat</h2>
//         <FaBars className="w-5 h-5 text-gray-500 cursor-pointer" onClick={handleSidebarToggle} />
//       </div>

//       {/* Sidebar */}
//       {isSidebarOpen && (
//         <div className="fixed top-14 right-0 h-[100%] w-64 bg-white shadow-lg border-l border-gray-300 p-4 z-50">
//           <h2 className="text-xl font-semibold mb-4">Topic List</h2>
//           {/* List of topics */}
//           <ul>
//             <li className="mb-2">Topic 1</li>
//             <li className="mb-2">Topic 2</li>
//             <li className="mb-2">Topic 3</li>
//             {/* Add more topics as needed */}
//           </ul>
//         </div>
//       )}

//       <div className={`flex flex-1 relative ${isSidebarOpen ? 'mr-64' : ''}`}>
//         {/* Main Chat Section */}
//         <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded">
//           <div className="messages p-20">
//             {messages.length === 0 && (
//               <div className="text-3xl text-center mb-4">
//                 Welcome! How can I assist you today?
//               </div>
//             )}
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`message mb-2 p-2 rounded max-w-lg ${
//                   msg.user === 'user' ? 'bg-gray-300 text-black ml-auto' : 'bg-white text-black mr-auto'
//                 }`}
//                 style={{ alignSelf: msg.user === 'user' ? 'flex-end' : 'flex-start' }}
//               >
//                 {typeof msg.text === 'string' ? (
//                   msg.text.split('\n').map((line, idx) => (
//                     <div key={idx}>{line}</div>
//                   ))
//                 ) : (
//                   <div>Invalid message content</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className={`border-t border-gray-300 mt-4 pt-4 flex flex-col relative ${isSidebarOpen ? 'mr-64' : ''}`} style={{height: '20%'}}>
//         <div className="flex items-center space-x-4 mb-2">
//           <FaImage className="w-5 h-5 text-gray-500" onClick={handleAddDocument} />
//           <FaPaperclip className="w-5 h-5 text-gray-500" />
//           <FaMicrophone className="w-5 h-5 text-gray-500" />
//         </div>
//         <textarea
//           className="w-full text-gray-500 mb-2 p-2 pt-4 resize-none bg-gray-100  focus:outline-none pe-24"
//           placeholder="Type your message here..."
//           rows="3"
//           value={query}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => !query && setIsFocused(false)}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button
//           className="absolute bottom-1 right-5 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//           onClick={handleSendMessage}
//         >
//           Send
//         </button>
//       </div>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// };

// export default MainBody;


// import React, { useRef, useState, useEffect } from "react";
// import { FaImage, FaPaperclip, FaMicrophone, FaBars } from "react-icons/fa";
// import { RectangleStackIcon } from "@heroicons/react/24/outline"; // Import the RectangleStackIcon

// const MainBody = ({ user, addToHistory, initialMessages, currentMessages, setCurrentMessages, setHistory }) => {
//   const [messages, setMessages] = useState(initialMessages || []);
//   const [query, setQuery] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar visibility
//   const [faqQuestions, setFaqQuestions] = useState([
//     "How can I reset my password?",
//     "Where can I find the user manual?",
//     "How do I contact customer support?",
//     // Add more questions as needed
//   ]);
//   const fileInputRef = useRef(null);

//   const handleAddDocument = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//   };

//   const handleSendMessage = () => {
//     if (query.trim()) {
//       setMessages([...messages, { user: 'user', text: query }]);
//       setCurrentMessages([...currentMessages, { user: 'user', text: query }]);
//       setQuery('');
//     }
//   };

//   const handleSaveSession = () => {
//     // Logic to save the current session as a topic
//     const topicName = prompt("Enter a name for this topic:");
//     if (topicName) {
//       addToHistory({ name: topicName, messages });
//       alert(`Session saved as "${topicName}"`);
//     }
//   };

//   const handleSidebarToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
//   };

//   useEffect(() => {
//     setMessages(initialMessages || []);
//     setCurrentMessages(initialMessages || []);
//   }, [initialMessages, setCurrentMessages]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const chatWindow = document.querySelector('.chat-window');
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//     console.log(messages);
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col p-4 bg-gray-100 relative">
//       {/* Header Section */}
//       <div className="border-b border-gray-300 pb-2 mb-4 flex items-center justify-between relative">
//         <h2 className="text-xl font-semibold">Chat</h2>
//         <FaBars className="w-5 h-5 text-gray-500 cursor-pointer" onClick={handleSidebarToggle} />
//       </div>

//       {/* Sidebar */}
//       {isSidebarOpen && (
//         <div className="fixed top-14 right-0 h-[calc(100%-3.5rem)] w-64 bg-white shadow-lg border-l border-gray-300 p-4 z-50">
//           <h2 className="text-xl font-semibold mb-4">Topic List</h2>
//           {/* List of topics */}
//           <ul>
//             <li className="mb-2">Topic 1</li>
//             <li className="mb-2">Topic 2</li>
//             <li className="mb-2">Topic 3</li>
//             {/* Add more topics as needed */}
//           </ul>
//         </div>
//       )}

//       <div className={`flex flex-1 relative transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:mr-64' : ''}`}>
//         {/* Main Chat Section */}
//         <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded">
//           <div className="messages p-20">
//             {messages.length === 0 && (
//               <div className="text-3xl text-center mb-4">
//                 Welcome! How can I assist you today?
//               </div>
//             )}
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`message mb-2 p-2 rounded max-w-lg ${
//                   msg.user === 'user' ? 'bg-gray-300 text-black ml-auto' : 'bg-white text-black mr-auto'
//                 }`}
//                 style={{ alignSelf: msg.user === 'user' ? 'flex-end' : 'flex-start' }}
//               >
//                 {typeof msg.text === 'string' ? (
//                   msg.text.split('\n').map((line, idx) => (
//                     <div key={idx}>{line}</div>
//                   ))
//                 ) : (
//                   <div>Invalid message content</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Frequently Asked Questions Section */}
//       {/* <div className="flex justify-center">
//   <div className={`flex items-center flex-col mt-4 bg-white w-[50%] ${isSidebarOpen ? 'lg:mr-64' : ''}`}>
//     <h3 className="text-lg font-semibold mb-2 text-left">Frequently Asked Questions:</h3>
//     <div className="space-y-2 w-full max-w-lg px-4">
//       {faqQuestions.map((question, index) => (
//         <div key={index} className="bg-white p-2 flex rounded-md shadow-sm text-black w-auto inline-block">
//           {question}
//         </div>
//       ))}
//     </div>
//   </div>
// </div> */}
//       {/* <div className="flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-5 rounded-lg flex flex-col w-[50%] max-w-3xl">
//           <h1 className="text-xl font-semibold mb-4">Frequently Asked Questions:</h1>
//           <div className="flex flex-col gap-3">
//             {faqQuestions.map((question, index) => (
//               <div
//                 key={index}
//                 className="p-3 rounded-lg bg-gray-200 w-auto shadow-sm"
//               >
//                 {question}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div> */}

// <div class="flex flex-col gap-4 justify-center items-center">
//   <h2 class="text-lg font-bold">Frequently Asked Questions:</h2>
//   <div class="flex flex-col gap-4 md:flex-row md:gap-8">
//     <div class="bg-white rounded-md p-4 shadow">
//       <p class="text-gray-800 font-medium">What is LobeChat?</p>
//     </div>
//     <div class="bg-white rounded-md p-4 shadow">
//       <p class="text-gray-800 font-medium">Does LobeChat support speech synthesis and speech recognition?</p>
//     </div>
//   </div>
//   <div class="bg-white rounded-md p-4 shadow w-fit"> <p class="text-gray-800 font-medium">Does LobeChat support image recognition and generation?</p>
//   </div>
//   <div class="flex flex-col gap-4 md:flex-row md:gap-8">
//     <div class="bg-white rounded-md p-4 shadow">
//       <p class="text-gray-800 font-medium">Does LobeChat support multiple AI service providers?</p>
//     </div>
//     <div class="bg-white rounded-md p-4 shadow">
//       <p class="text-gray-800 font-medium">What should I do if I encounter problems while using it?</p>
//     </div>
//   </div>
// </div>

//       <div className={`border-t border-gray-300 mt-4 pt-4 flex flex-col relative transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:mr-64' : ''}`} style={{ height: '20%' }}>
//         <div className="flex items-center space-x-4 mb-2">
//           <FaImage className="w-5 h-5 text-gray-500" onClick={handleAddDocument} />
//           <FaPaperclip className="w-5 h-5 text-gray-500" />
//           <FaMicrophone className="w-5 h-5 text-gray-500" />
//         </div>
//         <textarea
//           className="w-full text-black mb-2 p-2 pt-4 resize-none bg-gray-100 focus:outline-none pe-24"
//           placeholder="Type your message here..."
//           rows="3"
//           value={query}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => !query && setIsFocused(false)}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <div className="flex items-center justify-end space-x-2 absolute bottom-1 right-5">
//           <div
//             className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition-colors duration-300"
//             onClick={handleSaveSession}
//           >
//             <RectangleStackIcon className="w-6 h-6 text-black" />
//           </div>
//           <button
//             className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//             onClick={handleSendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// };

// export default MainBody;

// import React, { useRef, useState, useEffect } from "react";
// import { FaImage, FaPaperclip, FaMicrophone, FaBars } from "react-icons/fa";
// import { RectangleStackIcon } from "@heroicons/react/24/outline"; // Import the RectangleStackIcon

// const fetchFaqQuestions = () => {
//   // Replace this with your actual data-fetching logic
//   return [
//     "How can I reset my password?",
//     "Where can I find the user manual?",
//     "How do I contact customer support?",
// // Add more questions as needed
//   ];
// };

// const MainBody = ({ user, addToHistory, initialMessages, currentMessages, setCurrentMessages, setHistory }) => {
//   const [messages, setMessages] = useState(initialMessages || []);
//   const [query, setQuery] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar visibility
//   const [faqQuestions, setFaqQuestions] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleAddDocument = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     console.log(files);
//   };

//   const handleSendMessage = () => {
//     if (query.trim()) {
//       setMessages([...messages, { user: 'user', text: query }]);
//       setCurrentMessages([...currentMessages, { user: 'user', text: query }]);
//       setQuery('');
//     }
//   };

//   const handleSaveSession = () => {
//     // Logic to save the current session as a topic
//     const topicName = prompt("Enter a name for this topic:");
//     if (topicName) {
//       addToHistory({ name: topicName, messages });
//       alert(`Session saved as "${topicName}"`);
//     }
//   };

//   const handleSidebarToggle = () => {
//     setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
//   };

//   useEffect(() => {
//     setMessages(initialMessages || []);
//     setCurrentMessages(initialMessages || []);
//   }, [initialMessages, setCurrentMessages]);

//   useEffect(() => {
//     setFaqQuestions(fetchFaqQuestions()); // Fetch FAQ questions when component mounts
//   }, []);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const chatWindow = document.querySelector('.chat-window');
//       chatWindow.scrollTop = chatWindow.scrollHeight;
//     }
//     console.log(messages);
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col p-4 bg-gray-100 relative">
//       {/* Header Section */}
//       <div className="border-b border-gray-300 pb-2 mb-4 flex items-center justify-between relative">
//         <h2 className="text-xl font-semibold">Chat Name</h2>
//         <FaBars className="w-5 h-5 text-gray-500 cursor-pointer" onClick={handleSidebarToggle} />
//       </div>

//       {/* Sidebar */}
//       {isSidebarOpen && (
//         <div className="fixed top-14 right-0 h-[calc(100%-3.5rem)]  w-64 bg-white shadow-lg border-l border-gray-300 p-4 z-50">
//           <h2 className="text-xl font-semibold mb-4">Topic List</h2>
//           {/* List of topics */}
//           <ul>
//             <li className="mb-2">Topic 1</li>
//             <li className="mb-2">Topic 2</li>
//             <li className="mb-2">Topic 3</li>
//             {/* Add more topics as needed */}
//           </ul>
//         </div>
//       )}

//       <div className={`flex flex-1 relative transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:mr-64' : ''}`}>
//         {/* Main Chat Section */}
//         <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded">
//           <div className="messages p-20">
//             {messages.length === 0 && (
//                <div className={`flex flex-wrap gap-4 justify-start items-start  text-3xl max-w-3xl mx-auto p-4`}>
//                 Welcome! How can I assist you today?
//               </div>
//             )}
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`message mb-2 p-2 rounded max-w-lg ${
//                   msg.user === 'user' ? 'bg-white text-black ml-auto rounded-lg w-fit' : 'bg-white text-black mr-auto'
//                 }`}
//                 style={{ alignSelf: msg.user === 'user' ? 'flex-end' : 'flex-start' }}
//               >
//                 {typeof msg.text === 'string' ? (
//                   msg.text.split('\n').map((line, idx) => (
//                     <div key={idx}>{line}</div>
//                   ))
//                 ) : (
//                   <div>Invalid message content</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//    {/* Frequently Asked Questions Section */}
//    <div className={` transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:mr-64' : ''}`}>
// {messages.length === 0 && (
//   <div className={`flex flex-wrap gap-4 justify-start items-start   max-w-3xl mx-auto p-4  `}>
//     <h2 className="w-full text-lg text-gray-500 font-bold">Frequently Asked Questions:</h2>
//     {faqQuestions.map((question, index) => (
//       <div key={index} className="bg-white rounded-full p-2 shadow flex-shrink-0">
//         <p className="text-gray-600 font-medium">{question}</p>
//       </div>
//     ))}
//   </div>
// )}
// </div>

//       <div className={`border-t border-gray-300 mt-4 pt-4 flex flex-col relative transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:mr-64' : ''}`} style={{ height: '20%' }}>
//         <div className="flex items-center space-x-4 mb-2">
//           <FaImage className="w-5 h-5 text-gray-500" onClick={handleAddDocument} />
//           <FaPaperclip className="w-5 h-5 text-gray-500" />
//           <FaMicrophone className="w-5 h-5 text-gray-500" />
//         </div>
//         <textarea
//           className="w-full text-black mb-2 p-2 pt-4 resize-none bg-gray-100 focus:outline-none pe-24"
//           placeholder="Type your message here..."
//           rows="3"
//           value={query}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => !query && setIsFocused(false)}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <div className="flex items-center justify-end space-x-2 absolute bottom-1 right-5">
//           <div
//             className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition-colors duration-300"
//             onClick={handleSaveSession}
//           >
//             <RectangleStackIcon className="w-6 h-6 text-black" />
//           </div>
//           <button
//             className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
//             onClick={handleSendMessage}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// };

// export default MainBody;


import React, { useRef, useState, useEffect } from "react";
import { FaImage, FaPaperclip, FaMicrophone, FaBars } from "react-icons/fa";
import { RectangleStackIcon } from "@heroicons/react/24/outline"; // Import the RectangleStackIcon

const fetchFaqQuestions = () => {
  // Replace this with your actual data-fetching logic
  return [
    "How can I reset my password?",
    "Where can I find the user manual?",
    "How do I contact customer support?",
    // Add more questions as needed
  ];
};

const MainBody = ({ user, addToHistory, initialMessages, currentMessages, setCurrentMessages, setHistory }) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar visibility
  const [faqQuestions, setFaqQuestions] = useState([]);
  const fileInputRef = useRef(null);

  const handleAddDocument = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
    // Handle file upload logic here
  };

  const handleSendMessage = () => {
    if (query.trim()) {
      setMessages([...messages, { user: 'user', text: query }]);
      setCurrentMessages([...currentMessages, { user: 'user', text: query }]);
      setQuery('');
    }
  };

  const handleSaveSession = () => {
    // Logic to save the current session as a topic
    const topicName = prompt("Enter a name for this topic:");
    if (topicName) {
      addToHistory({ name: topicName, messages });
      alert(`Session saved as "${topicName}"`);
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const handleStartRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (event) => {
            const audioBlob = event.data;
            const reader = new FileReader();
            reader.onloadend = () => {
              const audioData = reader.result;
              // Here you would process the audioData to convert it to text
              // This usually requires a speech-to-text service
              console.log("Audio Data:", audioData);
              setQuery("Sample transcribed text from audio"); // Placeholder text
            };
            reader.readAsDataURL(audioBlob);
          };
          mediaRecorder.start();
          setTimeout(() => mediaRecorder.stop(), 5000); // Record for 5 seconds
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    } else {
      console.error("Microphone not supported");
    }
  };

  useEffect(() => {
    setMessages(initialMessages || []);
    setCurrentMessages(initialMessages || []);
  }, [initialMessages, setCurrentMessages]);

  useEffect(() => {
    setFaqQuestions(fetchFaqQuestions()); // Fetch FAQ questions when component mounts
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const chatWindow = document.querySelector('.chat-window');
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
    console.log(messages);
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col p-4 bg-gray-100 relative">
      {/* Header Section */}
      <div className="border-b border-gray-300 pb-2 mb-4 flex items-center justify-between relative">
        <h2 className="text-xl font-semibold">Chat Name</h2>
        <FaBars className="w-5 h-5 text-gray-500 cursor-pointer" onClick={handleSidebarToggle} />
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-14 right-0 h-[calc(100%-3.5rem)]  w-64 bg-white shadow-lg border-l border-gray-300 p-4 z-50">
          <h2 className="text-xl font-semibold mb-4">Topic List</h2>
          {/* List of topics */}
          <ul>
            <li className="mb-2">Topic 1</li>
            <li className="mb-2">Topic 2</li>
            <li className="mb-2">Topic 3</li>
            {/* Add more topics as needed */}
          </ul>
        </div>
      )}

      <div className={`flex flex-1 relative transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:mr-64' : ''}`}>
        {/* Main Chat Section */}
        <div className="flex-1 overflow-y-auto chat-window mb-2 p-3 rounded">
          <div className="messages p-20">
            {messages.length === 0 && (
               <div className={`flex flex-wrap gap-4 justify-start items-start  text-3xl max-w-3xl mx-auto p-4`}>
                Welcome! How can I assist you today?
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message mb-2 p-2 rounded max-w-lg ${
                  msg.user === 'user' ? 'bg-white text-black ml-auto rounded-lg w-fit' : 'bg-white text-black mr-auto'
                }`}
                style={{ alignSelf: msg.user === 'user' ? 'flex-end' : 'flex-start' }}
              >
                {typeof msg.text === 'string' ? (
                  msg.text.split('\n').map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))
                ) : (
                  <div>Invalid message content</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

   {/* Frequently Asked Questions Section */}
   <div className={` transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:mr-64' : ''}`}>
{messages.length === 0 && (
  <div className={`flex flex-wrap gap-4 justify-start items-start   max-w-3xl mx-auto p-4  `}>
    <h2 className="w-full text-lg text-gray-500 font-bold">Frequently Asked Questions:</h2>
    {faqQuestions.map((question, index) => (
      <div key={index} className="bg-white rounded-full p-2 shadow flex-shrink-0">
        <p className="text-gray-600 font-medium">{question}</p>
      </div>
    ))}
  </div>
)}
</div>

      <div className={`border-t border-gray-300 mt-4 pt-4 flex flex-col relative transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:mr-64' : ''}`} style={{ height: '20%' }}>
        <div className="flex items-center space-x-4 mb-2">
          <FaImage className="w-5 h-5 text-gray-500 cursor-pointer" onClick={handleAddDocument} />
          <FaPaperclip className="w-5 h-5 text-gray-500 cursor-pointer" onClick={handleAddDocument} />
          <FaMicrophone className="w-5 h-5 text-gray-500 cursor-pointer" onClick={handleStartRecording} />
        </div>
        <textarea
          className="w-full text-black mb-2 p-2 pt-4 resize-none bg-gray-100 focus:outline-none pe-24"
          placeholder="Type your message here..."
          rows="3"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !query && setIsFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex items-center justify-end space-x-2 absolute bottom-1 right-5">
          <div
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition-colors duration-300"
            onClick={handleSaveSession}
          >
            <RectangleStackIcon className="w-6 h-6 text-black" />
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default MainBody;
