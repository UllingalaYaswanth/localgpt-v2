
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import '../index.css';

// const Sidebar = ({ history, user, loadChat, handleNewChat, handleRename, handleDelete, handleArchive }) => {
//   const [showDropdown, setShowDropdown] = useState({});

//   const toggleDropdown = (index) => {
//     setShowDropdown((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   return (
//     <div className="sidebar">
//       <div className="user-details">
//         <img src="../src/assets/react.svg" className="user-image mb-2" alt="User" />
//         <div className="user-info">
//           <p><strong>{user.name}</strong></p>
//         </div>
//       </div>

//       <div className='history'>
//         <button onClick={handleNewChat} className="btn border border-black newchat">New Chat</button>
//         <h2><strong>History</strong></h2>
//         <ul className="history-list">
//           {history.map((chatHistory, index) => (
//             <li className="history-item" key={index} onClick={() => loadChat(chatHistory)}>
//               <span>Chat {index + 1}</span>
//               <div className="dropdown-container">
//                 <span className="three-dots" onClick={() => toggleDropdown(index)}>⋯</span>
//                 {showDropdown[index] && (
//                   <div className="dropdown">
//                     <p onClick={() => handleRename(index)}>Rename</p>
//                     <p onClick={() => handleDelete(index)}>Delete</p>
//                     <p onClick={() => handleArchive(index)}>Archive</p>
//                   </div>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// Sidebar.propTypes = {
//   history: PropTypes.array,
//   user: PropTypes.object,
//   loadChat: PropTypes.func,
//   handleNewChat: PropTypes.func,
//   handleRename: PropTypes.func,
//   handleDelete: PropTypes.func,
//   handleArchive: PropTypes.func
// };

// Sidebar.defaultProps = {
//   history: [],
//   user: {},
//   loadChat: () => {},
//   handleNewChat: () => {},
//   handleRename: () => {},
//   handleDelete: () => {},
//   handleArchive: () => {}
// };

// export default Sidebar;

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import '../index.css';

// const Sidebar = ({ history, user, loadChat, handleNewChat, handleRename, handleDelete, handleArchive }) => {
//   const [showDropdown, setShowDropdown] = useState({});

//   const toggleDropdown = (index, event) => {
//     event.stopPropagation();
//     setShowDropdown((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   return (
//     <div className="sidebar">
//       <div className="user-details">
//         <img src="../src/assets/react.svg" className="user-image mb-2" alt="User" />
//         <div className="user-info">
//           <p><strong>{user.name}</strong></p>
//         </div>
//       </div>

//       <button onClick={handleNewChat} className="btn border border-black newchat">New Chat</button>
//       <h2><strong>History</strong></h2>
//       <div className="history">
//         <ul className="history-list">
//           {history.map((chatHistory, index) => (
//             <li className="history-item" key={index} onClick={() => loadChat(chatHistory)}>
//               <span>{chatHistory.name || `Chat ${index + 1}`}</span>
//               <div className="dropdown-container">
//                 <span className="three-dots" onClick={(event) => toggleDropdown(index, event)}>⋯</span>
//                 {showDropdown[index] && (
//                   <div className="dropdown">
//                     <p onClick={(event) => { event.stopPropagation(); handleRename(index); }}>Rename</p>
//                     <p onClick={(event) => { event.stopPropagation(); handleDelete(index); }}>Delete</p>
//                     <p onClick={(event) => { event.stopPropagation(); handleArchive(index); }}>Archive</p>
//                   </div>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// Sidebar.propTypes = {
//   history: PropTypes.array,
//   user: PropTypes.object,
//   loadChat: PropTypes.func,
//   handleNewChat: PropTypes.func,
//   handleRename: PropTypes.func,
//   handleDelete: PropTypes.func,
//   handleArchive: PropTypes.func
// };

// Sidebar.defaultProps = {
//   history: [],
//   user: {},
//   loadChat: () => {},
//   handleNewChat: () => {},
//   handleRename: () => {},
//   handleDelete: () => {},
//   handleArchive: () => {}
// };

// export default Sidebar;


// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dropdown, DropdownButton, ListGroup } from 'react-bootstrap';
// import { FaShare, FaEdit, FaArchive, FaTrash } from 'react-icons/fa';

// const Sidebar = () => {
//   const items = [
//     'Resolve Vite import errvbcbxcvbxcvbor',
//     'API Key Logic Simplification',
//     'Convert React to HTML',
//     'Adjust Chat Window Styles',
//     'Adjustable Dynamic Textarea',
//     'Adjust UI Styles',
//     'Free AI Chat Templates',
//     'Path element horizontal line',
//     'Create Bootstrap React Sidebar',
//     'Create Bootstrap Sidebar Components',
//   ];

//   return (
//     <div className="d-flex">
//       <div className="bg-dark text-white" style={{ width: '300px' }}>
//         <div className="p-3">
//           <h5>ChatGPT</h5>
//           <ListGroup variant="flush">
//             <ListGroup.Item className="bg-dark text-white border-0">
//               <span>ChatGPT</span>
//             </ListGroup.Item>
//             <ListGroup.Item className="bg-dark text-white border-0">
//               <span>Explore GPTs</span>
//             </ListGroup.Item>
//             <hr className="bg-secondary" />
//             <div>Today</div>
//             {items.map((item, index) => (
//               <ListGroup.Item key={index} className="bg-dark text-white d-flex justify-content-between align-items-center border-0">
//                 <span>{item}</span>
//                 <DropdownButton id={`dropdown-${index}`} drop="end" variant="secondary" size="sm" title="">
//                   <Dropdown.Item href="#"><FaShare /> Share</Dropdown.Item>
//                   <Dropdown.Item href="#"><FaEdit /> Rename</Dropdown.Item>
//                   <Dropdown.Item href="#"><FaArchive /> Archive</Dropdown.Item>
//                   <Dropdown.Item href="#" className="text-danger"><FaTrash /> Delete</Dropdown.Item>
//                 </DropdownButton>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         </div>
//       </div>
//       <div className="flex-grow-1 bg-light">
//         {/* Main content goes here */}
//         <div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// import React from 'react';
// import PropTypes from 'prop-types';
// import '../index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
// import { FaEdit, FaArchive, FaTrash } from 'react-icons/fa';

// const Sidebar = ({ history, user, loadChat, handleNewChat, handleRename, handleDelete, handleArchive }) => {
//   return (
//     <div className="sidebar " style={{ width: '300px' }}>
//       <div className="user-details p-3">
//         <img src="../src/assets/react.svg" className="user-image mb-2" alt="User" />
//         <div className="user-info">
//           <p><strong>{user.name}</strong></p>
//         </div>
//       </div>

//       <button onClick={handleNewChat} className="btn border border-black newchat mt-5 mb-3">New Chat</button>
//       <h2 className="px-3"><strong>History</strong></h2>
//       <div className="history">
//         <ul className="history-list list-unstyled px-3">
//           {history.map((chatHistory, index) => (
//             <li className="history-item d-flex justify-content-between align-items-center mb-2" key={index} onClick={() => loadChat(chatHistory)}>
//               <span>{chatHistory.name || `Chat ${index + 1}`}</span>
//               <DropdownButton
//                 id={`dropdown-${index}`}
//                 drop="end"
//                 variant="secondary"
//                 size="sm"
//                 title=""
//                 onClick={(event) => event.stopPropagation()}
//               >
//                 <Dropdown.Item onClick={(event) => { event.stopPropagation(); handleRename(index); }}>
//                   <FaEdit /> Rename
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={(event) => { event.stopPropagation(); handleDelete(index); }}>
//                   <FaTrash className="text-danger" /> Delete
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={(event) => { event.stopPropagation(); handleArchive(index); }}>
//                   <FaArchive /> Archive
//                 </Dropdown.Item>
//               </DropdownButton>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// Sidebar.propTypes = {
//   history: PropTypes.array,
//   user: PropTypes.object,
//   loadChat: PropTypes.func,
//   handleNewChat: PropTypes.func,
//   handleRename: PropTypes.func,
//   handleDelete: PropTypes.func,
//   handleArchive: PropTypes.func
// };

// Sidebar.defaultProps = {
//   history: [],
//   user: {},
//   loadChat: () => {},
//   handleNewChat: () => {},
//   handleRename: () => {},
//   handleDelete: () => {},
//   handleArchive: () => {}
// };

// export default Sidebar;


// import React from 'react';
// import PropTypes from 'prop-types';
// import { Menu, MenuHandler, MenuList, MenuItem, Button } from '@material-tailwind/react';

// const Sidebar = ({ history, user, loadChat, handleNewChat, handleRename, handleDelete, handleArchive }) => {
//   return (
//     <div className="bg-gray-200 w-64 h-full flex flex-col p-4">
//       <div className="flex flex-col items-center space-x-4">
//         <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="Logo" className="w-12 h-12 mb-3 ps-1" />
//         <h2 className="text-xl font-semibold">{user.name}</h2>
//       </div>
//       <Button className="mt-6 mb-4" color="lightBlue" onClick={handleNewChat}>New Chat</Button>
//       <h3 className="text-xl font-semibold">History</h3>
//       <div className="flex-1 overflow-y-auto mt-2">
//         {history.map((chatHistory, index) => (
//           <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-300" onClick={() => loadChat(chatHistory)}>
//             <span>{chatHistory.name || `Chat ${index + 1}`}</span>
//             <Menu>
//               <MenuHandler>
//                 <Button className="bg-transparent shadow-none px-2">
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 </Button>
//               </MenuHandler>
//               <MenuList>
//                 <MenuItem onClick={(event) => { event.stopPropagation(); handleRename(index); }}>Rename</MenuItem>
//                 <MenuItem onClick={(event) => { event.stopPropagation(); handleDelete(index); }}>Delete</MenuItem>
//                 <MenuItem onClick={(event) => { event.stopPropagation(); handleArchive(index); }}>Archive</MenuItem>
//               </MenuList>
//             </Menu>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// Sidebar.propTypes = {
//   history: PropTypes.array.isRequired,
//   user: PropTypes.object.isRequired,
//   loadChat: PropTypes.func.isRequired,
//   handleNewChat: PropTypes.func.isRequired,
//   handleRename: PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired,
//   handleArchive: PropTypes.func.isRequired
// };

// export default Sidebar;


// import React from 'react';
// import PropTypes from 'prop-types';
// import { Menu, MenuHandler, MenuList, MenuItem, Button , Typography,} from '@material-tailwind/react';
// import { XMarkIcon, PowerIcon } from "@heroicons/react/24/outline";
// import { useAuth } from '../../AuthContext';
// import { NavLink, useNavigate } from "react-router-dom";

// const Sidebar = ({ history, user, loadChat, handleNewChat, handleRename, handleDelete, handleArchive }) => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/logout');
//       if (response.status === 200) {
//         // Clear any necessary data from local storage
//         localStorage.removeItem("userEmail");
//         logout()
//         // Navigate to the login page
//         navigate("/");
//       } else {
//         console.error('Failed to log out:', response.data.error);
//       }
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };


//   return (
//     <div className="bg-gray-200 w-64 h-full flex flex-col p-4">
//       <div className="flex mt-3 flex-col items-center space-x-4">
//         {/* <img src={user.image} alt="Logo" className="w-12 h-12 mb-3 ps-1 rounded" /> */}
//         <h2 className="text-xl font-semibold">Hello! {`${user.name}`}</h2>
//       </div>
//       <Button className="mt-6 mb-4" color="lightBlue" onClick={handleNewChat}>New Chat</Button>
//       <h3 className="text-xl font-semibold">History</h3>
//       <div className="flex-1 overflow-y-auto mt-2">
//         {history.map((chatHistory, index) => (
//           <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-300" onClick={() => loadChat(chatHistory)}>
//             <span>{chatHistory.name || `Chat ${index + 1}`}</span>
//             <Menu>
//               <MenuHandler>
//                 <Button className="bg-transparent shadow-none px-2">
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" className="w-5 h-4">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 </Button>
//               </MenuHandler>
//               <MenuList>
//                 <MenuItem onClick={(event) => { event.stopPropagation(); handleRename(index); }}>Rename</MenuItem>
//                 <MenuItem onClick={(event) => { event.stopPropagation(); handleDelete(index); }}>Delete</MenuItem>
//                 <MenuItem onClick={(event) => { event.stopPropagation(); handleArchive(index); }}>Archive</MenuItem>
//               </MenuList>
//             </Menu>
//           </div>
//         ))}
//       </div>
//       <div className="m-4">
//         <Button
//           variant="gradient"
//           color="white"
//           className="flex items-center gap-4 px-10 capitalize"
//           fullWidth
//           onClick={handleLogout}
//         >
//           <PowerIcon className="h-5 w-5" />
//           <Typography
//             color="inherit"
//             className="font-medium text-center capitalize"
//           >
//             Logout
//           </Typography>
//         </Button>
//       </div>
//     </div>
//   );
// };

// Sidebar.propTypes = {
//   history: PropTypes.array.isRequired,
//   user: PropTypes.object.isRequired,
//   loadChat: PropTypes.func.isRequired,
//   handleNewChat: PropTypes.func.isRequired,
//   handleRename: PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired,
//   handleArchive: PropTypes.func.isRequired
// };

// export default Sidebar;


import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuHandler, MenuList, MenuItem, Button, Typography } from '@material-tailwind/react';
import { XMarkIcon, PowerIcon, SquaresPlusIcon } from "@heroicons/react/24/outline"; // Importing SquaresPlusIcon here
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ history, user, loadChat, handleNewChat, handleRename, handleDelete, handleArchive }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/logout');
      if (response.status === 200) {
        // Clear any necessary data from local storage
        localStorage.removeItem("userEmail");
        logout();
        // Navigate to the login page
        navigate("/");  // Ensure you navigate to the login route
      } else {
        console.error('Failed to log out:', response.data.error);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="bg-white w-80 h-full flex flex-col p-4">
      <div className="flex mt-3  items-center space-x-4 justify-between">
        {/* <img src={user.image} alt="Logo" className="w-12 h-12 mb-3 ps-1 rounded" /> */}
        <h2 className="text-xl font-semibold">Hello! {`${user.name}`}</h2>
        <button onClick={handleNewChat} className="focus:outline-none">
          <SquaresPlusIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="flex justify-center items-center h-24">
        <h3 className="text-xl font-semibold">History</h3>
      </div>

      <div className="flex-1 overflow-y-auto mt-2">
        {history.map((chatHistory, index) => (
          <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-300" onClick={() => loadChat(chatHistory)}>
            <span>{chatHistory.name || `Chat ${index + 1}`}</span>
            <Menu>
              <MenuHandler>
                <Button className="bg-transparent shadow-none px-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" className="w-5 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={(event) => { event.stopPropagation(); handleRename(index); }}>Rename</MenuItem>
                <MenuItem onClick={(event) => { event.stopPropagation(); handleDelete(index); }}>Delete</MenuItem>
                <MenuItem onClick={(event) => { event.stopPropagation(); handleArchive(index); }}>Archive</MenuItem>
              </MenuList>
            </Menu>
          </div>
        ))}
      </div>
      <div className="m-2">
        <Button
          variant="gradient"
          color="black"
          className="flex items-center gap-4 px-10 capitalize"
          fullWidth
          onClick={handleLogout}
        >
          <PowerIcon className="h-5 w-5" />
          <Typography
            color="inherit"
            className="font-medium text-center capitalize"
          >
            Logout
          </Typography>
        </Button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  history: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  loadChat: PropTypes.func.isRequired,
  handleNewChat: PropTypes.func.isRequired,
  handleRename: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleArchive: PropTypes.func.isRequired
};

export default Sidebar;

