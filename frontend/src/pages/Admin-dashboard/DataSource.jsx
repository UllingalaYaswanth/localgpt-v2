// import React, { useState } from "react";
// import {
//   Typography,
//   Input,
//   Button,
//   Select,
//   Option,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
// } from "@material-tailwind/react";
// import { FaTimes } from "react-icons/fa";
// import * as Dropbox from 'dropbox';

// export function DataSource() {
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

//   const handleDropboxUpload = async (file, filePath) => {
//     const accessToken = 'sl.B5DLTaa-dijAKak0bbej2J5fV8y6d8JcYpgtqNyFu99itN21TmnclV-S8_C626INRE_7g3Hvt9Rp8eNl903KZq0CgCgB6oar4FgL4rYxI3-D2jZ5QKK2r9jjNRRbSQemcT6VK4Fxaz-ZFcMOr5-OU7o'; // Replace with your Dropbox access token
//     const dbx = new Dropbox.Dropbox({ accessToken });

//     try {
//       const fileContents = await readFileContents(file);

//       const response = await dbx.filesUpload({
//         path: filePath,
//         contents: fileContents
//       });

//       console.log('File uploaded to Dropbox:', response);
//       return response;
//     } catch (error) {
//       console.error('Error uploading file to Dropbox:', error);
//       throw error;
//     }
//   };

//   const readFileContents = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         resolve(event.target.result);
//       };
//       reader.onerror = (error) => {
//         reject(error);
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const file = files[0];
//     const fileName = file.name;
//     const selectedLevel = level;

//     let path = '/localgpt/';

//     switch (selectedLevel) {
//       case 'A':
//         path += 'levelA/';
//         break;
//       case 'B':
//         path += 'levelB/';
//         break;
//       case 'C':
//         path += 'levelC/';
//         break;
//       default:
//         path += 'unknown/';
//     }

//     path += fileName;

//     try {
//       // Upload file to Dropbox
//       await handleDropboxUpload(file, path);

//       // Send file details to backend to store in DB
//       const response = await fetch('http://localhost:5000/api/files', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: fileName, path_lower: path, location: tags, level: selectedLevel }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save file details to the database');
//       }

//       setUploadSuccess(true);
//       setTimeout(() => {
//         setUploadSuccess(false);
//       }, 3000);
//     } catch (error) {
//       console.error('Error during file upload and save process:', error);
//     }
//   };

//   return (
//     <div className="mx-0 my-20 max-w-screen-lg flex justify-start">
//       <Button color="blue" onClick={handleOpen}>
//         Create
//       </Button>
      

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
//               onChange={(value) => setLevel(value)} // Ensure this correctly sets the state
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

// export default DataSource;


// import React, { useState } from "react";
// import {
//   Typography,
//   Input,
//   Button,
//   Select,
//   Option,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Card,
//   CardImage
// } from "@material-tailwind/react";
// import { FaTimes, FaJira } from "react-icons/fa";
// import * as Dropbox from 'dropbox';
// import localDriveImage from './img/localdrive.jpeg';
// import AWSImage from './img/aws.webp' ;
// import confluenceImage from './img/confluence.jpeg';
// import GCPImage from './img/GCP.png';
// import googledriveImage from './img/googledrive.png';
// import jiraImage from './img/jira.jpeg' ;
// import mediafireImage from './img/mediafire.png';
// import slackImage from './img/slack.png';
// import sourceforgImage from './img/sourceforg.png';
// import onedriveImage from './img/onedrive.png';


// export function DataSource() {
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

//   const handleDropboxUpload = async (file, filePath) => {
//     const accessToken = 'sl.B5EQVBMQx2r6n6E5BdIH6FQ5LqnWZFcYEUFCRZZK6NR2y46DEVamKzxocjMgke15OI_3yy1Olj6lJjzpLzKqfUkqqa2OhI0GU5ChHfPhC5eeH-K7F-os3iCNLBTz6xKLvgmBbnE6TD9WmCSqzJEFVdo'; // Replace with your Dropbox access token
//     const dbx = new Dropbox.Dropbox({ accessToken });

//     try {
//       const fileContents = await readFileContents(file);

//       const response = await dbx.filesUpload({
//         path: filePath,
//         contents: fileContents
//       });

//       console.log('File uploaded to Dropbox:', response);
//       return response;
//     } catch (error) {
//       console.error('Error uploading file to Dropbox:', error);
//       throw error;
//     }
//   };

//   const readFileContents = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         resolve(event.target.result);
//       };
//       reader.onerror = (error) => {
//         reject(error);
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const file = files[0];
//     const fileName = file.name;
//     const selectedLevel = level;

//     let path = '/localgpt/';

//     switch (selectedLevel) {
//       case 'A':
//         path += 'levelA/';
//         break;
//       case 'B':
//         path += 'levelB/';
//         break;
//       case 'C':
//         path += 'levelC/';
//         break;
//       default:
//         path += 'unknown/';
//     }

//     path += fileName;

//     try {
//       // Upload file to Dropbox
//       await handleDropboxUpload(file, path);

//       // Send file details to backend to store in DB
//       const response = await fetch('http://localhost:5000/api/files', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: fileName, path_lower: path, location: tags, level: selectedLevel }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save file details to the database');
//       }

//       setUploadSuccess(true);
//       setTimeout(() => {
//         setUploadSuccess(false);
//       }, 3000);
//     } catch (error) {
//       console.error('Error during file upload and save process:', error);
//     }
//   };

//   return (
//     <div className="my-20 mx-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-5">
//       <Card>
//         <Card.Body color="blue" className="flex items-center"> 
//           <img
//             src={localDriveImage}
//             alt="Jira Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray" onClick={handleOpen} fullWidth>       
//               Local drive
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center">
//           <img
//             src={jiraImage}
//             alt="Jira Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Jira
//           </Typography>
//       </Card.Body>
//     </Card>
//       <Card>
//       <Card.Body className="flex items-center">
//         <img
//          src={slackImage}
//          alt="Jira Image"
//           className="w-8 h-8 mr-2 rounded-full"
//         />
//         <Typography variant="h6" color="blue-gray">
//           Slack
//         </Typography>
//       </Card.Body>
//       </Card>
//       <Card>
//       <Card.Body className="flex items-center">
//         <img
//           src={AWSImage}
//           alt="Jira Image"
//           className="w-8 h-8 mr-2 rounded-full"
//         />
//         <Typography variant="h6" color="blue-gray">
//           AWS
//         </Typography>
//       </Card.Body>
//       </Card>
//       <Card>
//       <Card.Body className="flex items-center">
//         <img
//           src={GCPImage}
//           alt="Jira Image"
//           className="w-8 h-8 mr-2 rounded-full"
//         />
//         <Typography variant="h6" color="blue-gray">
//           GCP
//         </Typography>
//       </Card.Body>
//       </Card>
//       <Card>
//       <Card.Body className="flex items-center">
//         <img
//         src={onedriveImage}
//           alt="Jira Image"
//           className="w-8 h-8 mr-2 rounded-full"
//         />
//         <Typography variant="h6" color="blue-gray">
//           OneDrive
//         </Typography>
//       </Card.Body>
//       </Card>
//       <Card>
//       <Card.Body className="flex items-center">
//         <img
//           src={confluenceImage}
//           alt="Jira Image"
//           className="w-8 h-8 mr-2 rounded-full"
//         />
//         <Typography variant="h6" color="blue-gray">
//          Confluence
//         </Typography>
//       </Card.Body>
//       </Card>
//       <Card>
//       <Card.Body className="flex items-center">
//         <img
//           src={googledriveImage}
//           alt="Jira Image"
//           className="w-8 h-8 mr-2 rounded-full"
//         />
//         <Typography variant="h6" color="blue-gray">
//          Google Drive
//         </Typography>
//       </Card.Body>
//       </Card>
//       <Card>
//       <Card.Body className="flex items-center">
//         <img
//           src={sourceforgImage}
//           alt="Jira Image"
//           className="w-8 h-8 mr-2 rounded-full"
//         />
//         <Typography variant="h6" color="blue-gray">
//          Source Forge
//         </Typography>
//       </Card.Body>
//       </Card>
//       <Card>
//       <Card.Body className="flex items-center">
//         <img
//           src={mediafireImage}
//           alt="Jira Image"
//           className="w-8 h-8 mr-2 rounded-full"
//         />
//         <Typography variant="h6" color="blue-gray">
//          MediaFire
//         </Typography>
//       </Card.Body>
//       </Card>

//       {/* Add more cards as needed */}
      
//       {/* Dialog for form */}
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
//               onChange={(value) => setLevel(value)} // Ensure this correctly sets the state
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

// export default DataSource;


// import React, { useState } from "react";
// import {
//   Typography,
//   Input,
//   Button,
//   Select,
//   Option,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Card,
// } from "@material-tailwind/react";
// import { FaTimes } from "react-icons/fa";
// import * as Dropbox from 'dropbox';
// import localDriveImage from './img/localdrive.jpeg';
// import AWSImage from './img/aws.webp';
// import confluenceImage from './img/confluence.jpeg';
// import GCPImage from './img/GCP.png';
// import googledriveImage from './img/googledrive.png';
// import jiraImage from './img/jira.jpeg';
// import mediafireImage from './img/mediafire.png';
// import slackImage from './img/slack.png';
// import sourceforgImage from './img/sourceforg.png';
// import onedriveImage from './img/onedrive.png';

// export function DataSource() {
//   const [files, setFiles] = useState([]);
//   const [tags, setTags] = useState("");
//   const [level, setLevel] = useState("");
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [open, setOpen] = useState({
//     localDrive: false,
//     jira: false,
//     slack: false,
//     AWS: false,
//     GCP: false,
//     onedrive: false,
//     confluence: false,
//     googleDrive: false,
//     sourceForge: false,
//     mediaFire: false,
//   });

//   const handleOpen = (source) => {
//     setOpen((prevState) => ({ ...prevState, [source]: !prevState[source] }));
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFiles([selectedFile]);
//   };

//   const handleRemoveFile = () => {
//     setFiles([]);
//   };

//   const handleDropboxUpload = async (file, filePath) => {
//     const accessToken = 'sl.B5EQVBMQx2r6n6E5BdIH6FQ5LqnWZFcYEUFCRZZK6NR2y46DEVamKzxocjMgke15OI_3yy1Olj6lJjzpLzKqfUkqqa2OhI0GU5ChHfPhC5eeH-K7F-os3iCNLBTz6xKLvgmBbnE6TD9WmCSqzJEFVdo'; // Replace with your Dropbox access token
//     const dbx = new Dropbox.Dropbox({ accessToken });

//     try {
//       const fileContents = await readFileContents(file);

//       const response = await dbx.filesUpload({
//         path: filePath,
//         contents: fileContents,
//       });

//       console.log('File uploaded to Dropbox:', response);
//       return response;
//     } catch (error) {
//       console.error('Error uploading file to Dropbox:', error);
//       throw error;
//     }
//   };

//   const readFileContents = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         resolve(event.target.result);
//       };
//       reader.onerror = (error) => {
//         reject(error);
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const file = files[0];
//     const fileName = file.name;
//     const selectedLevel = level;

//     let path = '/localgpt/';

//     switch (selectedLevel) {
//       case 'A':
//         path += 'levelA/';
//         break;
//       case 'B':
//         path += 'levelB/';
//         break;
//       case 'C':
//         path += 'levelC/';
//         break;
//       default:
//         path += 'unknown/';
//     }

//     path += fileName;

//     try {
//       // Upload file to Dropbox
//       await handleDropboxUpload(file, path);

//       // Send file details to backend to store in DB
//       const response = await fetch('http://localhost:5000/api/files', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: fileName,
//           path_lower: path,
//           location: tags,
//           level: selectedLevel,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save file details to the database');
//       }

//       setUploadSuccess(true);
//       setTimeout(() => {
//         setUploadSuccess(false);
//       }, 3000);
//     } catch (error) {
//       console.error('Error during file upload and save process:', error);
//     }
//   };

//   return (
//     <div className="mx-0 my-20 max-w-screen-lg grid grid-cols-1 md:grid-cols-4 gap-6">
//       {[
//         { name: 'Local drive', img: localDriveImage, key: 'localDrive' },
//         { name: 'Jira', img: jiraImage, key: 'jira' },
//         { name: 'Slack', img: slackImage, key: 'slack' },
//         { name: 'AWS', img: AWSImage, key: 'AWS' },
//         { name: 'GCP', img: GCPImage, key: 'GCP' },
//         { name: 'OneDrive', img: onedriveImage, key: 'onedrive' },
//         { name: 'Confluence', img: confluenceImage, key: 'confluence' },
//         { name: 'Google Drive', img: googledriveImage, key: 'googleDrive' },
//         { name: 'Source Forge', img: sourceforgImage, key: 'sourceForge' },
//         { name: 'Media Fire', img: mediafireImage, key: 'mediaFire' },
//       ].map((source) => (
//         <Card key={source.key}>
//           <Card.Body className="flex items-center" onClick={() => handleOpen(source.key)}>
//             <img src={source.img} alt={source.name} className="w-8 h-8 mr-2 rounded-full" />
//             <Typography variant="h6" color="blue-gray">
//               {source.name}
//             </Typography>
//           </Card.Body>
//           <Dialog open={open[source.key]} handler={() => handleOpen(source.key)}>
//             <DialogHeader>
//               <Typography variant="h5" color="blue-gray">
//                 Add Document for {source.name}
//               </Typography>
//             </DialogHeader>
//             <DialogBody divider>
//               <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 <Input
//                   type="file"
//                   color="blue"
//                   label="Document"
//                   onChange={handleFileChange}
//                   className="p-3"
//                   required
//                 />

//                 {files.length > 0 && (
//                   <div className="mb-4">
//                     <Typography variant="subtitle1" color="blue-gray">
//                       Selected File:
//                     </Typography>
//                     <div className="flex items-center gap-2">
//                       <Typography>{files[0].name}</Typography>
//                       <Button color="red" size="sm" onClick={handleRemoveFile} iconOnly>
//                         <FaTimes />
//                       </Button>
//                     </div>
//                   </div>
//                 )}

//                 <Input
//                   type="text"
//                   color="blue"
//                   label="Tags"
//                   value={tags}
//                   onChange={(e) => setTags(e.target.value)}
//                   required
//                 />

//                 <Select
//                   color="blue"
//                   label="Level"
//                   value={level}
//                   onChange={(value) => setLevel(value)}
//                   required
//                 >
//                   <Option value="">Select level</Option>
//                   <Option value="A">A</Option>
//                   <Option value="B">B</Option>
//                   <Option value="C">C</Option>
//                 </Select>

//                 <Button type="submit" color="blue">
//                   Upload
//                 </Button>

//                 {uploadSuccess && (
//                   <Typography className="mt-4" color="green">
//                     Files uploaded successfully!
//                   </Typography>
//                 )}
//               </form>
//             </DialogBody>
//             <DialogFooter>
//               <Button variant="text" color="red" onClick={() => handleOpen(source.key)} className="mr-1">
//                 Cancel
//               </Button>
//             </DialogFooter>
//           </Dialog>
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default DataSource;



// import React, { useState } from "react";
// import {
//   Typography,
//   Input,
//   Button,
//   Select,
//   Option,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Card,
// } from "@material-tailwind/react";
// import { FaTimes } from "react-icons/fa";
// import * as Dropbox from 'dropbox';
// import localDriveImage from './img/localdrive.jpeg';
// import AWSImage from './img/aws.webp' ;
// import confluenceImage from './img/confluence.jpeg';
// import GCPImage from './img/GCP.png';
// import googledriveImage from './img/googledrive.png';
// import jiraImage from './img/jira.jpeg' ;
// import mediafireImage from './img/mediafire.png';
// import slackImage from './img/slack.png';
// import sourceforgImage from './img/sourceforg.png';
// import onedriveImage from './img/onedrive.png';
// import mega from './img/mega.png';
// import azure from './img/azure.webp' ;
// import mongo from './img/mongodb.png';
// import facebook from './img/facebook.png';
// import mysql from './img/mysql.png';
// import Jumpshare from './img/jump.jpeg' ;
// import iCloud from './img/icloud.webp';
// import Hightail from './img/hightail.jpeg';
// import Sharefiles from './img/sharefiles.webp';
// import box from './img/box.png';
// import ss from './img/ss.png';
// import GitHub from './img/github.png' ;
// import MixCloud from './img/mix.png';
// import zip from './img/zip.png';
// import idrive from './img/idrive.png';
// import copy from './img/copy.png' ;
// import bitcasa from './img/bitcasa.webp';
// import TeraBox from './img/terabox.png';
// import icedrive from './img/icedrive.webp';
// import gitlab from './img/gitlab.png';


// export function DataSource() {
//   const [files, setFiles] = useState([]);
//   const [tags, setTags] = useState("");
//   const [level, setLevel] = useState("");
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [selectedField, setSelectedField] = useState("");

//   const handleOpen = (field) => {
//     setSelectedField(field);

//     if (field === "Local Drive") {
//       setOpen(true);
//     } else if (field === "Jira") {
//       window.open("https://www.atlassian.com/software/jira", "_blank");
//     } else if (field === "Slack") {
//       window.open("https://slack.com/", "_blank");
//     } else if (field === "AWS") {
//       window.open("https://aws.amazon.com/", "_blank");
//     } else if (field === "GCP") {
//       window.open("https://cloud.google.com/", "_blank");
//     } else if (field === "OneDrive") {
//       window.open("https://onedrive.live.com/", "_blank");
//     } else if (field === "Confluence") {
//       window.open("https://www.atlassian.com/software/confluence", "_blank");
//     } else if (field === "Google Drive") {
//       window.open("https://drive.google.com/", "_blank");
//     } else if (field === "Source Forge") {
//       window.open("https://sourceforge.net/", "_blank");
//     } else if (field === "Media Fire") {
//       window.open("https://www.mediafire.com/", "_blank");
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFiles([selectedFile]);
//   };

//   const handleRemoveFile = () => {
//     setFiles([]);
//   };

//   const handleDropboxUpload = async (file, filePath) => {
//     const accessToken = 'sl.B5EQVBMQx2r6n6E5BdIH6FQ5LqnWZFcYEUFCRZZK6NR2y46DEVamKzxocjMgke15OI_3yy1Olj6lJjzpLzKqfUkqqa2OhI0GU5ChHfPhC5eeH-K7F-os3iCNLBTz6xKLvgmBbnE6TD9WmCSqzJEFVdo'; // Replace with your Dropbox access token
//     const dbx = new Dropbox.Dropbox({ accessToken });

//     try {
//       const fileContents = await readFileContents(file);

//       const response = await dbx.filesUpload({
//         path: filePath,
//         contents: fileContents
//       });

//       console.log('File uploaded to Dropbox:', response);
//       return response;
//     } catch (error) {
//       console.error('Error uploading file to Dropbox:', error);
//       throw error;
//     }
//   };

//   const readFileContents = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         resolve(event.target.result);
//       };
//       reader.onerror = (error) => {
//         reject(error);
//       };
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const file = files[0];
//     const fileName = file.name;
//     const selectedLevel = level;

//     let path = '/localgpt/';

//     switch (selectedLevel) {
//       case 'A':
//         path += 'levelA/';
//         break;
//       case 'B':
//         path += 'levelB/';
//         break;
//       case 'C':
//         path += 'levelC/';
//         break;
//       default:
//         path += 'unknown/';
//     }

//     path += fileName;

//     try {
//       // Upload file to Dropbox
//       await handleDropboxUpload(file, path);

//       // Send file details to backend to store in DB
//       const response = await fetch('http://localhost:5000/api/files', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: fileName, path_lower: path, location: tags, level: selectedLevel }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save file details to the database');
//       }

//       setUploadSuccess(true);
//       setTimeout(() => {
//         setUploadSuccess(false);
//       }, 3000);
//     } catch (error) {
//       console.error('Error during file upload and save process:', error);
//     }
//   };

//   return (
//     <div className="my-20 mx-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-5">
//       <Card>
//         <Card.Body color="blue" className="flex items-center" onClick={() => handleOpen("Local Drive")}> 
//           <img
//             src={localDriveImage}
//             alt="Local Drive Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray" fullWidth>       
//               Local drive
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" onClick={() => handleOpen("Jira")}>
//           <img
//             src={jiraImage}
//             alt="Jira Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Jira
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" onClick={() => handleOpen("Slack")}>
//           <img
//             src={slackImage}
//             alt="Slack Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Slack
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" onClick={() => handleOpen("AWS")}>
//           <img
//             src={AWSImage}
//             alt="AWS Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             AWS
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" onClick={() => handleOpen("GCP")}>
//           <img
//             src={GCPImage}
//             alt="GCP Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             GCP
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" onClick={() => handleOpen("OneDrive")}>
//           <img
//             src={onedriveImage}
//             alt="OneDrive Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             OneDrive
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" onClick={() => handleOpen("Confluence")}>
//           <img
//             src={confluenceImage}
//             alt="Confluence Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Confluence
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" onClick={() => handleOpen("Google Drive")}>
//           <img
//             src={googledriveImage}
//             alt="Google Drive Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Google Drive
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" onClick={() => handleOpen("Source Forge")}>
//           <img
//             src={sourceforgImage}
//             alt="Source Forge Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Source Forge
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" onClick={() => handleOpen("Media Fire")}>
//           <img
//             src={mediafireImage}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             MediaFire
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={mega}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             MEGA
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={azure}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Azure
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={mongo}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Mongodb
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={mysql}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Mysql
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={facebook}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Facebook
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={Jumpshare}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Jumpshare
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={iCloud}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             iCloud
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={Hightail}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Hightail
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={Sharefiles}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Sharefiles
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={gitlab}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             GitLab
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={box}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             Box
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={ss}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             SmartSheets
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={GitHub}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             GitHub
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={MixCloud}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             MixCloud
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={zip}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             ZipCloud
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={idrive}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             IDrive
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={copy}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//            Copy
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={bitcasa}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             bitcasa
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={TeraBox}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             TeraBox
//           </Typography>
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body className="flex items-center" >
//           <img
//             src={icedrive}
//             alt="Media Fire Image"
//             className="w-8 h-8 mr-2 rounded-full"
//           />
//           <Typography variant="h6" color="blue-gray">
//             icedrive
//           </Typography>
//         </Card.Body>
//       </Card>

//       <Dialog open={open} handler={handleOpen}>
//         <DialogHeader className="flex justify-between items-center">
//           <Typography variant="h6" color="blue-gray">
//             Upload File
//           </Typography>
//           <Button
//             color="red"
//             buttonType="link"
//             size="small"
//             onClick={() => setOpen(false)}
//           >
//             <FaTimes />
//           </Button>
//         </DialogHeader>
//         <DialogBody divider>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <Input
//                 type="file"
//                 onChange={handleFileChange}
//                 required
//                 className="mt-1 block w-full"
//               />
//               {files.length > 0 && (
//                 <div className="mt-2 flex items-center justify-between">
//                   <Typography variant="small" className="mr-2">
//                     {files[0].name}
//                   </Typography>
//                   <Button
//                     color="red"
//                     buttonType="link"
//                     size="small"
//                     onClick={handleRemoveFile}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//               )}
//             </div>
//             <div className="mb-4">
//               <Input
//                 type="text"
//                 label="Tags"
//                 value={tags}
//                 onChange={(e) => setTags(e.target.value)}
//                 required
//                 className="mt-1 block w-full"
//               />
//             </div>
//             <div className="mb-4">
//               <Select
//                 label="Select Level"
//                 value={level}
//                 onChange={(value) => setLevel(value)}
//                 required
//                 className="mt-1 block w-full"
//               >
//                 <Option value="A">Level A</Option>
//                 <Option value="B">Level B</Option>
//                 <Option value="C">Level C</Option>
//               </Select>
//             </div>
//             <DialogFooter>
//               <Button type="submit" color="blue">
//                 Upload
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogBody>
//       </Dialog>

//       {uploadSuccess && (
//         <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
//           File uploaded and saved successfully!
//         </div>
//       )}
//     </div>
//   );
// }

// export default DataSource;


import React, { useState } from "react";
import {
  Typography,
  Input,
  Button,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
} from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import * as Dropbox from 'dropbox';
import localDriveImage from './img/localdrive.jpeg';
import AWSImage from './img/aws.webp';
import confluenceImage from './img/confluence.jpeg';
import GCPImage from './img/GCP.png';
import googledriveImage from './img/googledrive.png';
import jiraImage from './img/jira.jpeg';
import mediafireImage from './img/mediafire.png';
import slackImage from './img/slack.png';
import sourceforgImage from './img/sourceforg.png';
import onedriveImage from './img/onedrive.png';
import mega from './img/mega.png';
import azure from './img/azure.webp';
import mongo from './img/mongodb.png';
import facebook from './img/fb.webp';
import mysql from './img/mysql.png';
import Jumpshare from './img/jump.jpeg';
import iCloud from './img/icloud.png';
import Hightail from './img/hightail.jpeg';
import Sharefiles from './img/sharefiles.webp';
import box from './img/box.png';
import ss from './img/ss.png';
import GitHub from './img/git.jpg';
import MixCloud from './img/mix.png';
import zip from './img/zip.png';
import idrive from './img/idrive.png';
import copy from './img/copy.png';
import bitcasa from './img/bitcasa.webp';
import TeraBox from './img/terabox.png';
import icedrive from './img/icedrive.webp';
import gitlab from './img/git.jpg';

export function DataSource() {
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState("");
  const [level, setLevel] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");

  const handleOpen = (field) => {
    setSelectedField(field);

    if (field === "Local Drive") {
      setOpen(true);
    } else {
      const urls = {
        Jira: "https://www.atlassian.com/software/jira",
        Slack: "https://slack.com/",
        AWS: "https://aws.amazon.com/",
        GCP: "https://cloud.google.com/",
        OneDrive: "",
        Confluence: "https://www.atlassian.com/software/confluence",
        "Google Drive": "https://drive.google.com/",
        "Source Forge": "https://sourceforge.net/",
        "Media Fire": "https://www.mediafire.com/",
        Mega: "https://mega.nz/",
        Azure: "https://azure.microsoft.com/",
        MongoDB: "https://www.mongodb.com/",
        Facebook: "https://www.facebook.com/",
        MySQL: "https://www.mysql.com/",
        Jumpshare: "https://jumpshare.com/",
        iCloud: "https://www.icloud.com/",
        Hightail: "https://www.hightail.com/",
        Sharefiles: "https://www.sharefile.com/",
        Box: "https://www.box.com/",
        Scribd: "https://www.scribd.com/",
        GitHub: "https://github.com/",
        MixCloud: "https://www.mixcloud.com/",
        Zip: "https://www.winzip.com/",
        iDrive: "https://www.idrive.com/",
        Copy: "https://www.copy.com/",
        Bitcasa: "https://www.bitcasa.com/",
        TeraBox: "https://www.terabox.com/",
        Icedrive: "https://www.icedrive.net/",
        GitLab: "https://gitlab.com/",
      };

      if (urls[field]) {
        window.open(urls[field], "_blank");
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFiles([selectedFile]);
  };
  const handleRemoveFile = () => {
    setFiles([]);
  };

    const handleDropboxUpload = async (file, filePath) => {
    const accessToken = 'sl.B5EQVBMQx2r6n6E5BdIH6FQ5LqnWZFcYEUFCRZZK6NR2y46DEVamKzxocjMgke15OI_3yy1Olj6lJjzpLzKqfUkqqa2OhI0GU5ChHfPhC5eeH-K7F-os3iCNLBTz6xKLvgmBbnE6TD9WmCSqzJEFVdo'; // Replace with your Dropbox access token
    const dbx = new Dropbox.Dropbox({ accessToken });

    try {
      const fileContents = await readFileContents(file);

      const response = await dbx.filesUpload({
        path: filePath,
        contents: fileContents,
      });

      console.log('File uploaded to Dropbox:', response);
      return response;
    } catch (error) {
      console.error('Error uploading file to Dropbox:', error);
      throw error;
    }
  };

  const readFileContents = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = files[0];
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
      // Upload file to Dropbox
      await handleDropboxUpload(file, path);

      // Send file details to backend to store in DB
      const response = await fetch('http://localhost:5000/api/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fileName,
          path_lower: path,
          location: tags,
          level: selectedLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save file details to the database');
      }

      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error during file upload and save process:', error);
    }
  };



  const cardData = [
    { name: "Local Drive", img: localDriveImage },
    { name: "Jira", img: jiraImage },
    { name: "Slack", img: slackImage },
    { name: "AWS", img: AWSImage },
    { name: "GCP", img: GCPImage },
    { name: "OneDrive", img: onedriveImage },
    { name: "Confluence", img: confluenceImage },
    { name: "Google Drive", img: googledriveImage },
    { name: "Source Forge", img: sourceforgImage },
    { name: "Media Fire", img: mediafireImage },
    { name: "Mega", img: mega },
    { name: "Azure", img: azure },
    { name: "MongoDB", img: mongo },
    { name: "Facebook", img: facebook },
    { name: "MySQL", img: mysql },
    { name: "Jumpshare", img: Jumpshare },
    { name: "iCloud", img: iCloud },
    { name: "Hightail", img: Hightail },
    { name: "Sharefiles", img: Sharefiles },
    { name: "Box", img: box },
    { name: "Scribd", img: ss },
    { name: "GitHub", img: GitHub },
    { name: "MixCloud", img: MixCloud },
    { name: "Zip", img: zip },
    { name: "iDrive", img: idrive },
    { name: "Copy", img: copy },
    { name: "Bitcasa", img: bitcasa },
    { name: "TeraBox", img: TeraBox },
    { name: "Icedrive", img: icedrive },
    { name: "GitLab", img: gitlab }
  ];

  return (
    <div className="my-20 mx-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-5">
      {cardData.map((card) => (
        <Card key={card.name}>
          <Card.Body className="flex items-center" onClick={() => handleOpen(card.name)}>
            <img src={card.img} alt={`${card.name} Image`} className="w-8 h-8 mr-2 rounded-full" />
            <Typography variant="h6" color="blue-gray">
              {card.name}
            </Typography>
          </Card.Body>
        </Card>
      ))}

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
        <Button variant="text" color="red" onClick={() => setOpen(false)} className="mr-1">
          Cancel
        </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DataSource;
