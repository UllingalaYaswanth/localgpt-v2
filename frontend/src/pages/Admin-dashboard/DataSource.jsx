// import React, { useState } from "react";
// import {
//   Typography,
//   Card,
//   CardHeader,
//   CardBody,
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
//         const fileContents = await readFileContents(file);

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

//     // Handle Dropbox upload
//     handleDropboxUpload();
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
} from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import * as Dropbox from 'dropbox';

export function DataSource() {
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

  const handleDropboxUpload = async (file, filePath) => {
    const accessToken = 'enter access token'; // Replace with your Dropbox access token
    const dbx = new Dropbox.Dropbox({ accessToken });

    try {
      const fileContents = await readFileContents(file);

      const response = await dbx.filesUpload({
        path: filePath,
        contents: fileContents
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
        body: JSON.stringify({ name: fileName, path_lower: path, location: tags }),
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

  return (
    <div className="mx-0 my-20 max-w-screen-lg flex justify-start">
      <Button color="blue" onClick={handleOpen}>
        Create
      </Button>

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

export default DataSource;
