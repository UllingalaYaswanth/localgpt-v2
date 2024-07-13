// import React, { useState } from 'react';
// import Sidebar from './pages/User/Sidebar';
// import MainBody from './pages/User/MainBody';

// const App = () => {
//   const [history, setHistory] = useState([]);
//   const [currentMessages, setCurrentMessages] = useState([]);
//   const [user, setUser] = useState({ name: 'User' });

//   // Function to add current chat messages to history temporarily
//   const addToHistory = (messages) => {
//     const tempHistory = [...history, { name: `Chat ${history.length + 1}`, messages }];
//     setCurrentMessages([]); // Clear current chat messages
//     return tempHistory; // Return temporary history
//   };

//   // Function to start a new chat session
//   const handleNewChat = () => {
//     const updatedHistory = addToHistory(currentMessages); // Add current messages to history
//     setHistory(updatedHistory); // Update history with temporary data
//     setCurrentMessages([]); // Clear current chat messages
//   };

//   // Function to load a chat history
//   const loadChat = (chatHistory) => {
//     setCurrentMessages(chatHistory.messages);
//   };

//   // Function to rename a chat
//   const handleRename = (index) => {
//     const newName = prompt('Enter new chat name:');
//     if (newName) {
//       const updatedHistory = [...history];
//       updatedHistory[index].name = newName;
//       setHistory(updatedHistory);
//     }
//   };

//   // Function to delete a chat
//   const handleDelete = (index) => {
//     const updatedHistory = history.filter((_, i) => i !== index);
//     setHistory(updatedHistory);
//   };

//   // Function to archive a chat
//   const handleArchive = (index) => {
//     alert(`Archiving chat ${index + 1}`);
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar
//         history={history}
//         user={user}
//         loadChat={loadChat}
//         handleNewChat={handleNewChat}
//         handleRename={handleRename}
//         handleDelete={handleDelete}
//         handleArchive={handleArchive}
//       />
//       <MainBody
//         user={user}
//         addToHistory={addToHistory}
//         initialMessages={currentMessages}
//       />
//     </div>
//   );
// };

// export default App;

// import React, { useState , useEffect } from 'react';
// import Sidebar from './pages/User/Sidebar';
// import MainBody from './pages/User/MainBody';
// import axios from 'axios';

// const App = () => {
//   const [history, setHistory] = useState([]);
//   const [currentMessages, setCurrentMessages] = useState([]);
//   const [user, setUser] = useState({ name: 'User', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' });

//   // Function to add current chat messages to history temporarily
//   const addToHistory = (messages) => {
//     const tempHistory = [...history, { name: `Chat ${history.length + 1}`, messages }];
//     setCurrentMessages([]); // Clear current chat messages
//     return tempHistory; // Return temporary history
//   };

//   // Function to start a new chat session
//   const handleNewChat = () => {
//     const updatedHistory = addToHistory(currentMessages); // Add current messages to history
//     setHistory(updatedHistory); // Update history with temporary data
//     setCurrentMessages([]); // Clear current chat messages
//   };

//   // Function to load a chat history
//   const loadChat = (chatHistory) => {
//     setCurrentMessages(chatHistory.messages);
//   };

//   // Function to rename a chat
//   const handleRename = (index) => {
//     const newName = prompt('Enter new chat name:');
//     if (newName) {
//       const updatedHistory = [...history];
//       updatedHistory[index].name = newName;
//       setHistory(updatedHistory);
//     }
//   };

//   // Function to delete a chat
//   const handleDelete = (index) => {
//     const updatedHistory = history.filter((_, i) => i !== index);
//     setHistory(updatedHistory);
//   };

//   // Function to archive a chat
//   const handleArchive = (index) => {
//     alert(`Archiving chat ${index + 1}`);
//   };

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get('/api/users');
//         const userData = response.data;
//         setUser({
//           name: `${userData.firstName} ${userData.lastName}`,
//           image: userData.profileImageUrl
//         });
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };
  
//     fetchUserDetails();
//   }, []);
  

//   return (
//     <div className="flex h-screen">
//       <Sidebar
//         history={history}
//         user={user}
//         loadChat={loadChat}
//         handleNewChat={handleNewChat}
//         handleRename={handleRename}
//         handleDelete={handleDelete}
//         handleArchive={handleArchive}
//       />
//       <MainBody
//         user={user}
//         addToHistory={addToHistory}
//         initialMessages={currentMessages}
//       />
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect } from 'react';
// import Sidebar from './pages/User/Sidebar';
// import MainBody from './pages/User/MainBody';
// import axios from 'axios';

// const App = () => {
//   const [history, setHistory] = useState([]);
//   const [currentMessages, setCurrentMessages] = useState([]);
//   const [user, setUser] = useState({ name: 'User', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' });

//   // Function to add current chat messages to history temporarily
//   const addToHistory = (messages) => {
//     const tempHistory = [...history, { name: `Chat ${history.length + 1}`, messages }];
//     setCurrentMessages([]); // Clear current chat messages
//     return tempHistory; // Return temporary history
//   };

//   // Function to start a new chat session
//   const handleNewChat = () => {
//     const updatedHistory = addToHistory(currentMessages); // Add current messages to history
//     setHistory(updatedHistory); // Update history with temporary data
//     setCurrentMessages([]); // Clear current chat messages
//   };

//   // Function to load a chat history
//   const loadChat = (chatHistory) => {
//     setCurrentMessages(chatHistory.messages);
//   };

//   // Function to rename a chat
//   const handleRename = (index) => {
//     const newName = prompt('Enter new chat name:');
//     if (newName) {
//       const updatedHistory = [...history];
//       updatedHistory[index].name = newName;
//       setHistory(updatedHistory);
//     }
//   };

//   // Function to delete a chat
//   const handleDelete = (index) => {
//     const updatedHistory = history.filter((_, i) => i !== index);
//     setHistory(updatedHistory);
//   };

//   // Function to archive a chat
//   const handleArchive = (index) => {
//     alert(`Archiving chat ${index + 1}`);
//   };

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const email = localStorage.getItem('userEmail'); // Get the email from local storage
//       if (!email) return;

//       try {
//         const response = await axios.get(`http://localhost:5000/api/users?email=${email}`);
//         const userData = response.data;
//         setUser({
//           name: `${userData.firstName} ${userData.lastName}`,
//           image: userData.profileImageUrl
//         });
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   return (
//     <div className="flex h-screen">
//       <Sidebar
//         history={history}
//         user={user}
//         loadChat={loadChat}
//         handleNewChat={handleNewChat}
//         handleRename={handleRename}
//         handleDelete={handleDelete}
//         handleArchive={handleArchive}
//       />
//       <MainBody
//         user={user}
//         addToHistory={addToHistory}
//         initialMessages={currentMessages}
//       />
//     </div>
//   );
// };

// export default App;


// import React, { useState, useEffect } from 'react';
// import Sidebar from './pages/User/Sidebar';
// import MainBody from './pages/User/MainBody';
// import axios from 'axios';

// const App = () => {
//   const [history, setHistory] = useState([]);
//   const [currentMessages, setCurrentMessages] = useState([]);
//   const [user, setUser] = useState({ name: '', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' });

//   const addToHistory = (messages) => {
//     const tempHistory = [...history, { name: `Chat ${history.length + 1}`, messages }];
//     setCurrentMessages([]); // Clear current chat messages
//     return tempHistory; // Return temporary history
//   };

//   const handleNewChat = () => {
//     const updatedHistory = addToHistory(currentMessages); // Add current messages to history
//     setHistory(updatedHistory); // Update history with temporary data
//     setCurrentMessages([]); // Clear current chat messages
//   };

//   const loadChat = (chatHistory) => {
//     setCurrentMessages(chatHistory.messages);
//   };

//   const handleRename = (index) => {
//     const newName = prompt('Enter new chat name:');
//     if (newName) {
//       const updatedHistory = [...history];
//       updatedHistory[index].name = newName;
//       setHistory(updatedHistory);
//     }
//   };

//   const handleDelete = (index) => {
//     const updatedHistory = history.filter((_, i) => i !== index);
//     setHistory(updatedHistory);
//   };

//   const handleArchive = (index) => {
//     alert(`Archiving chat ${index + 1}`);
//   };

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const email = localStorage.getItem('userEmail');
//         if (email) {
//           const response = await axios.get(`http://localhost:5000/api/users?email=${email}`);
//           const usersArray = response.data;

//           console.log('Fetched user data:', usersArray);

//           const userData = usersArray.find(user => user.emailAddress === email);

//           if (userData) {
//             setUser({
//               name: `${userData.firstName} ${userData.lastName}`,
//               image: `http://localhost:5000/uploads/${userData.profileImage}`
//             });
//             console.log(userData.firstName);
//           } else {
//             console.error('User not found');
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };
  

//     fetchUserDetails();
//   }, []); 




//   return (
//     <div className="flex h-screen">
//       <Sidebar
//         history={history}
//         user={user}
//         loadChat={loadChat}
//         handleNewChat={handleNewChat}
//         handleRename={handleRename}
//         handleDelete={handleDelete}
//         handleArchive={handleArchive}
//       />
//       <MainBody
//         user={user}
//         addToHistory={addToHistory}
//         initialMessages={currentMessages}
//       />
//     </div>
//   );
// };

// export default App;


// import React, { useState, useEffect } from 'react';
// import Sidebar from './pages/User/Sidebar';
// import MainBody from './pages/User/MainBody';
// import axios from 'axios';

// const App = () => {
//   const [history, setHistory] = useState([]);
//   const [currentMessages, setCurrentMessages] = useState([]);
//   const [user, setUser] = useState({ name: '', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' });

//   const addToHistory = (messages) => {
//     const tempHistory = [...history, { name: `Chat ${history.length + 1}`, messages }];
//     setCurrentMessages([]); // Clear current chat messages
//     return tempHistory; // Return temporary history
//   };

//   const handleNewChat = () => {
//     if (currentMessages.length > 0) {
//       const updatedHistory = addToHistory(currentMessages); // Add current messages to history
//       setHistory(updatedHistory); // Update history with temporary data
//       setCurrentMessages([]); // Clear current chat messages
//     }
//   };

//   const loadChat = (chatHistory) => {
//     setCurrentMessages(chatHistory.messages);
//   };

//   const handleRename = (index) => {
//     const newName = prompt('Enter new chat name:');
//     if (newName) {
//       const updatedHistory = [...history];
//       updatedHistory[index].name = newName;
//       setHistory(updatedHistory);
//     }
//   };

//   const handleDelete = (index) => {
//     const updatedHistory = history.filter((_, i) => i !== index);
//     setHistory(updatedHistory);
//   };

//   const handleArchive = (index) => {
//     alert(`Archiving chat ${index + 1}`);
//   };

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const email = localStorage.getItem('userEmail');
//         if (email) {
//           const response = await axios.get(`http://localhost:5000/api/users?email=${email}`);
//           const usersArray = response.data;

//           console.log('Fetched user data:', usersArray);

//           const userData = usersArray.find(user => user.emailAddress === email);

//           if (userData) {
//             setUser({
//               name: `${userData.firstName} ${userData.lastName}`,
//               image: `http://localhost:5000/uploads/${userData.profileImage}`
//             });
//             console.log(userData.firstName);
//           } else {
//             console.error('User not found');
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };
//     fetchUserDetails();
//   }, []);

//   return (
//     <div className="flex h-screen">
//       <Sidebar
//         history={history}
//         user={user}
//         loadChat={loadChat}
//         handleNewChat={handleNewChat}
//         handleRename={handleRename}
//         handleDelete={handleDelete}
//         handleArchive={handleArchive}
//       />
//       <MainBody
//         user={user}
//         addToHistory={addToHistory}
//         initialMessages={currentMessages}
//       />
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import Sidebar from './pages/User/Sidebar';
import MainBody from './pages/User/MainBody';
import axios from 'axios';

const App = () => {
  const [history, setHistory] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [user, setUser] = useState({ name: '', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' });

  const addToHistory = (messages) => {
    const tempHistory = [...history, { name: `Chat ${history.length + 1}`, messages }];
    setCurrentMessages([]); // Clear current chat messages
    return tempHistory; // Return temporary history
  };

  const handleNewChat = () => {
    if (currentMessages.length > 0) {
      const updatedHistory = addToHistory(currentMessages); // Add current messages to history
      setHistory(updatedHistory); // Update history with temporary data
      setCurrentMessages([]); // Clear current chat messages
    }
  };

  const loadChat = (chatHistory) => {
    setCurrentMessages(chatHistory.messages);
  };

  const handleRename = (index) => {
    const newName = prompt('Enter new chat name:');
    if (newName) {
      const updatedHistory = [...history];
      updatedHistory[index].name = newName;
      setHistory(updatedHistory);
    }
  };

  const handleDelete = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
  };

  const handleArchive = (index) => {
    alert(`Archiving chat ${index + 1}`);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem('userEmail');
        if (email) {
          const response = await axios.get(`http://localhost:5000/api/users?email=${email}`);
          const usersArray = response.data;

          console.log('Fetched user data:', usersArray);

          const userData = usersArray.find(user => user.emailAddress === email);

          if (userData) {
            setUser({
              name: `${userData.firstName} ${userData.lastName}`,
              image: `http://localhost:5000/uploads/${userData.profileImage}`
            });
          } else {
            console.error('User not found');
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar
        history={history}
        user={user}
        loadChat={loadChat}
        handleNewChat={handleNewChat}
        handleRename={handleRename}
        handleDelete={handleDelete}
        handleArchive={handleArchive}
      />
      <MainBody
        user={user}
        addToHistory={addToHistory}
        initialMessages={currentMessages} 
        currentMessages={currentMessages}
        setCurrentMessages={setCurrentMessages}
        setHistory={setHistory}
      />
    </div>
  );
};

export default App;
