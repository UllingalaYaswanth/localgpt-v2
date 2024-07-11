// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Card,
//   CardHeader,
//   CardBody,
//   Button,
//   Input,
//   Select,
//   Option,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { projectsTableData } from "@/data"; // Import your access_level metadata

// export function Docs() {
//   const [documents, setDocuments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const [files, setFiles] = useState([]);
//   const [tags, setTags] = useState("");
//   const [level, setLevel] = useState("");
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(!open);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFiles([selectedFile]);
//   };

//   const handleRemoveFile = () => {
//     setFiles([]);
//   };

//   const handleDropboxUpload = async () => {
//     const accessToken = 'enter access token'; // Replace with your Dropbox access token
//     const dbx = new Dropbox.Dropbox({ accessToken });

//     for (const file of files) {
//       const fileName = file.name;
//       const selectedLevel = level;

//       let path = '/localgpt/';

//       switch (selectedLevel) {
//         case 'A':
//           path += 'levelA/';
//           break;
//         case 'B':
//           path += 'levelB/';
//           break;
//         case 'C':
//           path += 'levelC/';
//           break;
//         default:
//           path += 'unknown/';
//       }

//       path += fileName;

//       try {
//         const fileContents = await file.arrayBuffer();

//         const response = await dbx.filesUpload({
//           path: path,
//           contents: fileContents
//         });

//         console.log('File uploaded to Dropbox:', response);
//         setUploadSuccess(true);
//       } catch (error) {
//         console.error('Error uploading file to Dropbox:', error);
//       }
//     }

//     setTimeout(() => {
//       setUploadSuccess(false);
//     }, 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Handle Dropbox upload
//     handleDropboxUpload();
//   };

//   // Fetch documents from Dropbox
//   async function fetchDocuments() {
//     const accessToken = 'enter access token'; // Replace with your actual access token
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
//       // Optionally, show a user-friendly error message here
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

//   // Function to handle document click (open in new tab)
//   const handleDocumentClick = async (documentPath) => {
//     try {
//       const accessToken = 'enter access token'; // Replace with your actual access token
//       const dbx = axios.create({
//         baseURL: 'https://api.dropboxapi.com/2',
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       const response = await dbx.post('/files/get_temporary_link', {
//         path: documentPath
//       });

//       const documentUrl = response.data.link;

//       // Open the document in a new tab
//       window.open(documentUrl, '_blank');

//     } catch (error) {
//       console.error('Error opening document:', error);
//       // Optionally, show a user-friendly error message here
//     }
//   };

//   // Filtered table data based on search term
//   const filteredTableData = documents.filter((document) =>
//     document.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="mt-12">
//       <div className="mb-4 grid grid-cols-1 gap-5 xl:grid-cols-1">
//         <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
//         <CardHeader
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
//               <Button color="blue" onClick={handleOpen} className="ml-2 pl-5">
//                 Add
//               </Button>
//             </div>
//           </CardHeader>

//           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
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
//       <Dialog open={open} handler={handleOpen}>
//         <DialogHeader>
//           <Typography variant="h5" color="blue-gray">
//             Add Document
//           </Typography>
//         </DialogHeader>
//         <DialogBody divider>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <Input
//               type="file"
//               color="blue"
//               label="Document"
//               onChange={handleFileChange}
//               className="p-3"
//               required
//             />

//             {files.length > 0 && (
//               <div className="mb-4">
//                 <Typography variant="subtitle1" color="blue-gray">
//                   Selected File:
//                 </Typography>
//                 <div className="flex items-center gap-2">
//                   <Typography>{files[0].name}</Typography>
//                   <Button
//                     color="red"
//                     size="sm"
//                     onClick={handleRemoveFile}
//                     iconOnly
//                   >
//                     <FaTimes />
//                   </Button>
//                 </div>
//               </div>
//             )}

//             <Input
//               type="text"
//               color="blue"
//               label="Tags"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//               required
//             />

//             <Select
//               color="blue"
//               label="Level"
//               value={level}
//               onChange={(value) => setLevel(value)}
//               required
//             >
//               <Option value="">Select level</Option>
//               <Option value="A">A</Option>
//               <Option value="B">B</Option>
//               <Option value="C">C</Option>
//             </Select>

//             <Button type="submit" color="blue">
//               Upload
//             </Button>

//             {uploadSuccess && (
//               <Typography className="mt-4" color="green">
//                 Files uploaded successfully!
//               </Typography>
//             )}
//           </form>
//         </DialogBody>
//         <DialogFooter>
//           <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
//             Cancel
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// }

// export default Docs;


import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { projectsTableData } from "@/data"; // Import your access_level metadata

export function Docs() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState("");
  const [level, setLevel] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFiles([selectedFile]);
  };

  const handleRemoveFile = () => {
    setFiles([]);
  };

  const handleDropboxUpload = async () => {
    const accessToken = 'enter access token'; // Replace with your Dropbox access token
    const dbx = new Dropbox.Dropbox({ accessToken });

    for (const file of files) {
      const fileName = file.name;
      const selectedLevel = level;

      let path = '/localgpt/';

      switch (selectedLevel) {
        case 'A':
          path += 'levelA/';
          break;
        case 'B':
          path += 'levelB/';
          break;
        case 'C':
          path += 'levelC/';
          break;
        default:
          path += 'unknown/';
      }

      path += fileName;

      try {
        const fileContents = await file.arrayBuffer();

        const response = await dbx.filesUpload({
          path: path,
          contents: fileContents
        });

        console.log('File uploaded to Dropbox:', response);
        setUploadSuccess(true);
      } catch (error) {
        console.error('Error uploading file to Dropbox:', error);
      }
    }

    setTimeout(() => {
      setUploadSuccess(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle Dropbox upload
    handleDropboxUpload();
  };

  // Fetch documents from Dropbox
  async function fetchDocuments() {
    const accessToken = 'enter access token'; // Replace with your actual access token
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
      // Optionally, show a user-friendly error message here
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Function to retrieve access level based on document name
  const getAccessLevel = (documentName) => {
    const matchedDocument = projectsTableData.find(doc => doc.name === documentName);
    return matchedDocument ? matchedDocument.access_level : 'Unknown'; // Return access level or default value
  };

  // Format timestamp function
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Function to handle document click (download from Dropbox)
  const handleDocumentClick = async (documentPath) => {
    try {
      const response = await axios.post('http://localhost:5000/api/files/get_temp_link', {
        documentPath
      });

      const documentUrl = response.data.link;

      // Open the document in a new tab
      window.open(documentUrl, '_blank');
    } catch (error) {
      console.error('Error opening document:', error);
      // Optionally, show a user-friendly error message here
    }
  };

  // Filtered table data based on search term
  const filteredTableData = documents.filter((document) =>
    document.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-12">
      <div className="mb-4 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-1 mr-4">
              Documents
            </Typography>
            <div className="relative flex items-center">
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button color="blue" onClick={handleOpen} className="ml-2 pl-5">
                Add
              </Button>
            </div>
          </CardHeader>

          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
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
                      Access Level
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
                  <tr key={index} className="border-b border-blue-gray-50 cursor-pointer" onClick={() => handleDocumentClick(document.path_lower)}>
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
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Add Document
          </Typography>
        </DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="file"
              color="blue"
              label="Document"
              onChange={handleFileChange}
              className="p-3"
              required
            />

            {files.length > 0 && (
              <div className="mb-4">
                <Typography variant="subtitle1" color="blue-gray">
                  Selected File:
                </Typography>
                <div className="flex items-center gap-2">
                  <Typography>{files[0].name}</Typography>
                  <Button
                    color="red"
                    size="sm"
                    onClick={handleRemoveFile}
                    iconOnly
                  >
                    <FaTimes />
                  </Button>
                </div>
              </div>
            )}

            <Input
              type="text"
              color="blue"
              label="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />

            <Select
              color="blue"
              label="Level"
              value={level}
              onChange={(value) => setLevel(value)}
              required
            >
              <Option value="">Select level</Option>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
            </Select>

            <Button type="submit" color="blue">
              Upload
            </Button>

            {uploadSuccess && (
              <Typography className="mt-4" color="green">
                Files uploaded successfully!
              </Typography>
            )}
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default Docs;



// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Card,
//   CardHeader,
//   CardBody,
//   Button,
//   Input,
//   Select,
//   Option,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { projectsTableData } from "@/data"; // Import your access_level metadata

// export function Docs() {
//   const [documents, setDocuments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const [files, setFiles] = useState([]);
//   const [tags, setTags] = useState("");
//   const [level, setLevel] = useState("");
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(!open);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFiles([selectedFile]);
//   };

//   const handleRemoveFile = () => {
//     setFiles([]);
//   };

//   const handleDropboxUpload = async () => {
//     const accessToken = 'enter access token'; // Replace with your Dropbox access token
//     const dbx = new Dropbox.Dropbox({ accessToken });

//     for (const file of files) {
//       const fileName = file.name;
//       const selectedLevel = level;

//       let path = '/localgpt/';

//       switch (selectedLevel) {
//         case 'A':
//           path += 'levelA/';
//           break;
//         case 'B':
//           path += 'levelB/';
//           break;
//         case 'C':
//           path += 'levelC/';
//           break;
//         default:
//           path += 'unknown/';
//       }

//       path += fileName;

//       try {
//         const fileContents = await file.arrayBuffer();

//         const response = await dbx.filesUpload({
//           path: path,
//           contents: fileContents
//         });

//         console.log('File uploaded to Dropbox:', response);
//         setUploadSuccess(true);
//       } catch (error) {
//         console.error('Error uploading file to Dropbox:', error);
//       }
//     }

//     setTimeout(() => {
//       setUploadSuccess(false);
//     }, 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Handle Dropbox upload
//     handleDropboxUpload();
//   };

//   // Fetch documents from backend
//   async function fetchDocuments() {
//     try {
//       const response = await axios.get('http://localhost:5000/api/files');
//       setDocuments(response.data);
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//       // Optionally, show a user-friendly error message here
//     }
//   }

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   // Function to handle document click (download from Dropbox)
//   const handleDocumentClick = async (documentPath) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/files/get_temp_link', {
//         documentPath
//       });

//       const documentUrl = response.data.link;

//       // Open the document in a new tab
//       window.open(documentUrl, '_blank');
//     } catch (error) {
//       console.error('Error opening document:', error);
//       // Optionally, show a user-friendly error message here
//     }
//   };

//   // Filtered table data based on search term
//   const filteredTableData = documents.filter((document) =>
//     document.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="mt-12">
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
//               <Button color="blue" onClick={handleOpen} className="ml-2 pl-5">
//                 Add
//               </Button>
//             </div>
//           </CardHeader>

//           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
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
//       <Dialog open={open} handler={handleOpen}>
//         <DialogHeader>
//           <Typography variant="h5" color="blue-gray">
//             Add Document
//           </Typography>
//         </DialogHeader>
//         <DialogBody divider>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <Input
//               type="file"
//               color="blue"
//               label="Document"
//               onChange={handleFileChange}
//               className="p-3"
//               required
//             />

//             {files.length > 0 && (
//               <div className="mb-4">
//                 <Typography variant="subtitle1" color="blue-gray">
//                   Selected File:
//                 </Typography>
//                 <div className="flex items-center gap-2">
//                   <Typography>{files[0].name}</Typography>
//                   <Button
//                     color="red"
//                     size="sm"
//                     onClick={handleRemoveFile}
//                     iconOnly
//                   >
//                     <FaTimes />
//                   </Button>
//                 </div>
//               </div>
//             )}

//             <Input
//               type="text"
//               color="blue"
//               label="Tags"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//               required
//             />

//             <Select
//               color="blue"
//               label="Level"
//               value={level}
//               onChange={(value) => setLevel(value)}
//               required
//             >
//               <Option value="">Select level</Option>
//               <Option value="A">A</Option>
//               <Option value="B">B</Option>
//               <Option value="C">C</Option>
//             </Select>

//             <Button type="submit" color="blue">
//               Upload
//             </Button>

//             {uploadSuccess && (
//               <Typography className="mt-4" color="green">
//                 Files uploaded successfully!
//               </Typography>
//             )}
//           </form>
//         </DialogBody>
//         <DialogFooter>
//           <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
//             Cancel
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// }

// export default Docs;


// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Card,
//   CardHeader,
//   CardBody,
//   Button,
//   Input,
//   Select,
//   Option,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { projectsTableData } from "@/data"; // Import your access_level metadata

// export function Docs() {
//   const [documents, setDocuments] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const [files, setFiles] = useState([]);
//   const [tags, setTags] = useState("");
//   const [level, setLevel] = useState("");
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(!open);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFiles([selectedFile]);
//   };

//   const handleRemoveFile = () => {
//     setFiles([]);
//   };

//   const handleDropboxUpload = async () => {
//     const accessToken = 'enter access token'; // Replace with your Dropbox access token
//     const dbx = new Dropbox.Dropbox({ accessToken });

//     for (const file of files) {
//       const fileName = file.name;
//       const selectedLevel = level;

//       let path = '/localgpt/';

//       switch (selectedLevel) {
//         case 'A':
//           path += 'levelA/';
//           break;
//         case 'B':
//           path += 'levelB/';
//           break;
//         case 'C':
//           path += 'levelC/';
//           break;
//         default:
//           path += 'unknown/';
//       }

//       path += fileName;

//       try {
//         const fileContents = await file.arrayBuffer();

//         const response = await dbx.filesUpload({
//           path: path,
//           contents: fileContents
//         });

//         console.log('File uploaded to Dropbox:', response);
//         setUploadSuccess(true);
//       } catch (error) {
//         console.error('Error uploading file to Dropbox:', error);
//       }
//     }

//     setTimeout(() => {
//       setUploadSuccess(false);
//     }, 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Handle Dropbox upload
//     handleDropboxUpload();
//   };

//   // Fetch documents from backend
//   async function fetchDocuments() {
//     try {
//       const response = await axios.get('http://localhost:5000/api/files');
//       setDocuments(response.data);
//     } catch (error) {
//       console.error('Error fetching documents:', error);
//       // Optionally, show a user-friendly error message here
//     }
//   }

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   // Function to handle document click (download from Dropbox)
//   const handleDocumentClick = async (documentPath) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/files/get_temp_link', {
//         documentPath
//       });

//       const documentUrl = response.data.link;

//       // Open the document in a new tab
//       window.open(documentUrl, '_blank');
//     } catch (error) {
//       console.error('Error opening document:', error);
//       // Optionally, show a user-friendly error message here
//     }
//   };

//   // Filtered table data based on search term
//   const filteredTableData = documents.filter((document) =>
//     document.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="mt-12">
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
//               <Button color="blue" onClick={handleOpen} className="ml-2 pl-5">
//                 Add
//               </Button>
//             </div>
//           </CardHeader>

//           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
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
//       <Dialog open={open} handler={handleOpen}>
//         <DialogHeader>
//           <Typography variant="h5" color="blue-gray">
//             Add Document
//           </Typography>
//         </DialogHeader>
//         <DialogBody divider>
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <Input
//               type="file"
//               color="blue"
//               label="Document"
//               onChange={handleFileChange}
//               className="p-3"
//               required
//             />

//             {files.length > 0 && (
//               <div className="mb-4">
//                 <Typography variant="subtitle1" color="blue-gray">
//                   Selected File:
//                 </Typography>
//                 <div className="flex items-center gap-2">
//                   <Typography>{files[0].name}</Typography>
//                   <Button
//                     color="red"
//                     size="sm"
//                     onClick={handleRemoveFile}
//                     iconOnly
//                   >
//                     <FaTimes />
//                   </Button>
//                 </div>
//               </div>
//             )}

//             <Input
//               type="text"
//               color="blue"
//               label="Tags"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//               required
//             />

//             <Select
//               color="blue"
//               label="Level"
//               value={level}
//               onChange={(value) => setLevel(value)}
//               required
//             >
//               <Option value="">Select level</Option>
//               <Option value="A">A</Option>
//               <Option value="B">B</Option>
//               <Option value="C">C</Option>
//             </Select>

//             <Button type="submit" color="blue">
//               Upload
//             </Button>

//             {uploadSuccess && (
//               <Typography className="mt-4" color="green">
//                 Files uploaded successfully!
//               </Typography>
//             )}
//           </form>
//         </DialogBody>
//         <DialogFooter>
//           <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
//             Cancel
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// }

// export default Docs;
