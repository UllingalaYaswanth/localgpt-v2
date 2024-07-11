
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


import React from 'react';
import PropTypes from 'prop-types';
import './user.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FaEdit, FaArchive, FaTrash } from 'react-icons/fa';

const Sidebar = ({ history, user, loadChat, handleNewChat, handleRename, handleDelete, handleArchive }) => {
  return (
    <div className="sidebar " style={{ width: '300px' }}>
      <div className="user-details p-3">
        <img src="../src/assets/react.svg" className="user-image mb-2" alt="User" />
        <div className="user-info">
          <p><strong>{user.name}</strong></p>
        </div>
      </div>

      <button onClick={handleNewChat} className="btn border border-black newchat mt-5 mb-3">New Chat</button>
      <h2 className="px-3"><strong>History</strong></h2>
      <div className="history">
        <ul className="history-list list-unstyled px-3">
          {history.map((chatHistory, index) => (
            <li className="history-item d-flex justify-content-between align-items-center mb-2" key={index} onClick={() => loadChat(chatHistory)}>
              <span>{chatHistory.name || `Chat ${index + 1}`}</span>
              <DropdownButton
                id={`dropdown-${index}`}
                drop="end"
                variant="secondary"
                size="sm"
                title=""
                onClick={(event) => event.stopPropagation()}
              >
                <Dropdown.Item onClick={(event) => { event.stopPropagation(); handleRename(index); }}>
                  <FaEdit /> Rename
                </Dropdown.Item>
                <Dropdown.Item onClick={(event) => { event.stopPropagation(); handleDelete(index); }}>
                  <FaTrash className="text-danger" /> Delete
                </Dropdown.Item>
                <Dropdown.Item onClick={(event) => { event.stopPropagation(); handleArchive(index); }}>
                  <FaArchive /> Archive
                </Dropdown.Item>
              </DropdownButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  history: PropTypes.array,
  user: PropTypes.object,
  loadChat: PropTypes.func,
  handleNewChat: PropTypes.func,
  handleRename: PropTypes.func,
  handleDelete: PropTypes.func,
  handleArchive: PropTypes.func
};

Sidebar.defaultProps = {
  history: [],
  user: {},
  loadChat: () => {},
  handleNewChat: () => {},
  handleRename: () => {},
  handleDelete: () => {},
  handleArchive: () => {}
};

export default Sidebar;
