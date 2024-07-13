// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Card,
//   CardHeader,
//   CardBody,
// } from "@material-tailwind/react";

// import { StatisticsCard } from "@/widgets/cards";

// import {
//   statisticsCardsData,

//   projectsTableData,

// } from "@/data";

// export function Home() {
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [overflowingRows, setOverflowingRows] = useState([]);
//   const [documents, setDocuments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState(null);

//   const toggleExpand = (index) => {
//     setExpandedRow(expandedRow === index ? null : index);
//   };

//   useEffect(() => {
//     const newOverflowingRows = [];

//     projectsTableData.forEach((_, index) => {
//       const textElement = document.getElementById(`query-text-${index}`);
//       const containerElement = document.getElementById(`query-container-${index}`);
//       if (textElement && containerElement) {
//         if (textElement.scrollWidth > containerElement.clientWidth) {
//           newOverflowingRows.push(index);
//         }
//       }
//     });

//     setOverflowingRows(newOverflowingRows);
//   }, [projectsTableData]);

//   // Fetch documents from Dropbox
//   async function fetchDocuments() {
//     const accessToken = 'sl.B485CHhuPgoGQGqN5_SBOrykA6BMGLSJ8l2s_enlAcIZSDNs1tfrXuZGxoX7JeKEouy5IPDyCK7BzA6NSbGC0fw3cy_c1OPIlTi8ILpu7TSDwqJ6Upk3nOzGfFHTJe7M4t8zz83Eu_PjMHFesNLUhpI'; 
//     const dbx = axios.create({
//       baseURL: 'https://api.dropboxapi.com/2',
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     const paths = ['/localgpt/levelA', '/localgpt/levelB', '/localgpt/levelC'];

//     try {
//       const promises = paths.map(async (path) => {
//         const response = await dbx.post('/files/list_folder', {
//           path: path
//         });

//         const documentsInFolder = response.data.entries.map(entry => ({
//           ...entry,
//           access_level: getAccessLevel(entry.name) // Assuming getAccessLevel is a function to retrieve access level
//         }));

//         return documentsInFolder;
//       });

//       const results = await Promise.all(promises);
//       const allDocuments = results.flat(); // Flatten the array of arrays

//       setDocuments(allDocuments);
//     } catch (error) {
//       console.error('Error fetching documents from Dropbox:', error);
//       setError('Failed to fetch documents. Please try again later.'); // Set error state
//     }
//   }

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   // Function to retrieve access level based on document name
//   const getAccessLevel = (documentName) => {
//     const matchedDocument = projectsTableData.find(doc => doc.name === documentName);
//     return matchedDocument ? matchedDocument.access_level : 'Unknown'; // Return access level or default value
//   };

//   // Format timestamp function
//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleString();
//   };

//   // Function to handle document click (download from Dropbox)
//   const handleDocumentClick = async (documentPath) => {
//     try {
//       const accessToken = 'sl.B485CHhuPgoGQGqN5_SBOrykA6BMGLSJ8l2s_enlAcIZSDNs1tfrXuZGxoX7JeKEouy5IPDyCK7BzA6NSbGC0fw3cy_c1OPIlTi8ILpu7TSDwqJ6Upk3nOzGfFHTJe7M4t8zz83Eu_PjMHFesNLUhpI'; // Replace with your actual access token
//       const response = await axios.post('https://content.dropboxapi.com/2/files/download', null, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Dropbox-API-Arg': JSON.stringify({
//             path: documentPath
//           }),
//           'Content-Type': 'application/octet-stream'
//         },
//         responseType: 'blob' // Ensure response is treated as a blob
//       });
  
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', documentPath.split('/').pop()); // Set filename for download
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading document:', error);
//       setError('Failed to download document. Please try again later.');
//     }
//   };
  

//   // Filtered table data based on search term
//   const filteredTableData = documents.filter((document) =>
//     document.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );




//   return (
//     <div className="mt-12">
//       <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
//         {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
//           <StatisticsCard
//             key={title}
//             {...rest}
//             title={title}
//             icon={React.createElement(icon, {
//               className: "w-6 h-6 text-white",
//             })}
//           />
//         ))}
//       </div>
//       <div className="mb-4 grid grid-cols-1 gap-5 xl:grid-cols-1">
//         <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
//           <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="m-0 flex items-center justify-between p-6"
//           >
//             <Typography variant="h6" color="blue-gray" className="mb-1 mr-4">
//               Documents
//             </Typography>
//             <div className="relative flex items-center">
//               <input
//                 type="text"
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </CardHeader>

//           <CardBody className="overflow-x-scroll max-h-[745px] overflow-y-scroll px-0 pt-0 pb-2">
//             {error && (
//               <Typography variant="body" color="red" className="mb-2 ml-6">
//                 {error}
//               </Typography>
//             )}
//             <table className="w-full min-w-[640px] table-auto">
//               <thead>
//                 <tr className="items-center">
//                   <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
//                     <Typography
//                       variant="small"
//                       className="text-[11px] font-medium uppercase text-blue-gray-400"
//                     >
//                       Document Name
//                     </Typography>
//                   </th>
//                   <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
//                     <Typography
//                       variant="small"
//                       className="text-[11px] font-medium uppercase text-blue-gray-400"
//                     >
//                       Uploaded On
//                     </Typography>
//                   </th>
//                   <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
//                     <Typography
//                       variant="small"
//                       className="text-[11px] font-medium uppercase text-blue-gray-400"
//                     >
//                       Access Level
//                     </Typography>
//                   </th>
//                   <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
//                     <Typography
//                       variant="small"
//                       className="text-[11px] font-medium uppercase text-blue-gray-400"
//                     >
//                       Keyword
//                     </Typography>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTableData.map((document, index) => (
//                   <tr key={index} className="border-b border-blue-gray-50 cursor-pointer" onClick={() => handleDocumentClick(document.path_lower)}>
//                     <td className="py-3 px-5">
//                       <Typography
//                         variant="small"
//                         className="text-xs font-medium text-blue-gray-600 cursor-pointer"
//                       >
//                         {document.name}
//                       </Typography>
//                     </td>
//                     <td className="py-3 px-5">
//                       <Typography
//                         variant="small"
//                         className="text-xs font-medium text-blue-gray-600"
//                       >
//                         {formatDate(document.server_modified)}
//                       </Typography>
//                     </td>
//                     <td className="py-3 px-5">
//                       <Typography
//                         variant="small"
//                         className="text-xs font-medium text-blue-gray-600"
//                       >
//                         {document.access_level}
//                       </Typography>
//                     </td>
//                     <td className="py-3 px-5">
//                       <Typography
//                         variant="small"
//                         className="text-xs font-medium text-blue-gray-600"
//                       >
//                         {document.keyword}
//                       </Typography>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </CardBody>
//         </Card>
//       </div>

//     </div>
//   );
// }

// export default Home;


import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for HTTP requests
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

import { StatisticsCard } from "@/widgets/cards";

import {
  statisticsCardsData,
  projectsTableData,
} from "@/data";

export function Home() {

  const [overflowingRows, setOverflowingRows] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchDocuments(); 
  }, []); 

  // Fetch documents from Dropbox
  async function fetchDocuments() {
    const accessToken = 'sl.B48Brt5GVyBjIpATU6JpIMt70oXk-zZXNomv3oMQDaFiN9yqJVieUq6hDXb9IvOz7LUEVKfJ_ObqCTnsJyrkISefVH6wxmf2w5UdWcWBj20qGU2BtKvUzhmFoDadX6mKrPdQIwjHWZW3JGogtbFq3b0'; 
    const dbx = axios.create({
      baseURL: 'https://api.dropboxapi.com/2',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const paths = ['/localgpt/levelA', '/localgpt/levelB', '/localgpt/levelC'];

    try {
      const promises = paths.map(async (path) => {
        const response = await dbx.post('/files/list_folder', {
          path: path
        });

        const documentsInFolder = response.data.entries.map(entry => ({
          ...entry,
          access_level: getAccessLevel(entry.name) // Assuming getAccessLevel is a function to retrieve access level
        }));

        return documentsInFolder;
      });

      const results = await Promise.all(promises);
      const allDocuments = results.flat(); // Flatten the array of arrays

      setDocuments(allDocuments);
    } catch (error) {
      console.error('Error fetching documents from Dropbox:', error);
      setError('Failed to fetch documents. Please try again later.'); // Set error state
    }
  }

  // Function to retrieve access level based on document name
  const getAccessLevel = (documentName) => {
    const matchedDocument = projectsTableData.find(doc => doc.name === documentName);
    return matchedDocument ? matchedDocument.access_level : 'Unknown'; // Return access level or default value
  };

  // Format timestamp function
  const formatDate = (timestamp) => {
    if (!timestamp) return ""; // Handle case where timestamp is undefined or null
    const date = new Date(timestamp);
    return date.toLocaleString();
  };



  // Filtered table data based on search term
  const filteredTableData = documents.filter((document) =>
    document.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-1 mr-4">
              Status
            </Typography>
            <div className="relative flex items-center">
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>

          <CardBody className="overflow-x-scroll max-h-[300px] overflow-y-scroll px-0 pt-0 pb-2">
            {error && (
              <Typography variant="body" color="red" className="mb-2 ml-6">
                {error}
              </Typography>
            )}
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr className="items-center">
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      Document Name
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      Uploaded On
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      Status
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      Keyword
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTableData.map((document, index) => (
                  <tr key={index} className="border-b border-blue-gray-50 cursor-pointer">
                    <td className="py-3 px-5">
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600 cursor-pointer"
                      >
                        {document.name}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {formatDate(document.server_modified)}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {document.access_level}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {document.keyword}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
