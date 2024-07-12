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
} from "@material-tailwind/react";
import { projectsTableData } from "@/data";
import { FaTimes } from "react-icons/fa";
import * as Dropbox from 'dropbox';

export function Acc() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [overflowingRows, setOverflowingRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addDocumentOpen, setAddDocumentOpen] = useState(false); // State for managing popup visibility

  // State for add document form
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState("");
  const [level, setLevel] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Function to toggle the popup visibility
  const toggleAddDocumentPopup = () => {
    setAddDocumentOpen(!addDocumentOpen);
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFiles([selectedFile]);
  };

  // Function to handle file removal
  const handleRemoveFile = () => {
    setFiles([]);
  };

  // Function to handle Dropbox file upload
  const handleDropboxUpload = async () => {
    const accessToken = 'sl.B47xV-zNbI5GO9qGUPfud6s-9-w7flgmGF3bKtpZhw-mqAGKyfw0bdWiYLq5sU6iDu4yEhS62JGckOthzl7Ixt46aSeKJ02Na4ZQQ_2BrNOt7YFFTLjLuYBvl7W_rQTDLo-lo2xUrhNP-_2DDbsNbC8'; // Replace with your Dropbox access token
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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle Dropbox upload
    handleDropboxUpload();
  };

  // Format timestamp function
  const formatDate = (timestamp) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - parseInt(timestamp, 10));
    return date.toLocaleString();
  };

  // Calculate overflowing rows
  useEffect(() => {
    const newOverflowingRows = [];

    projectsTableData.forEach((_, index) => {
      const textElement = document.getElementById(`query-text-${index}`);
      const containerElement = document.getElementById(`query-container-${index}`);
      if (textElement && containerElement) {
        if (textElement.scrollWidth > containerElement.clientWidth) {
          newOverflowingRows.push(index);
        }
      }
    });

    setOverflowingRows(newOverflowingRows);
  }, [projectsTableData]);

  // Filtered table data based on search term
  const filteredTableData = projectsTableData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className="flex items-center">
              <Typography variant="h6" color="blue-gray" className="mb-1 mr-4">
                Documents
              </Typography>
              <div className="relative">
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.293 14.707a1 1 0 001.414-1.414l-2.022-2.022a5.5 5.5 0 10-1.414 1.414l2.022 2.022zm-1.717.293a7.5 7.5 0 111.414-1.414l-2.022-2.022a3.5 3.5 0 10-1.414 1.414l2.022 2.022z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              <Button onClick={toggleAddDocumentPopup} className="p-2 rounded-md">Add +</Button>
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr className="items-center">
                  {["name", "uploaded On", "access level", "keyword"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTableData.map(
                  ({ name, timestamp, access_level, keyword }, key) => {
                    const className = `py-3 px-5 ${
                      key === filteredTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {formatDate(timestamp)}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {access_level}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {keyword}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
      {addDocumentOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-medium mb-4">Add Document</h2>
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

              <div className="flex justify-end">
                <Button
                  variant="text"
                  color="red"
                  onClick={toggleAddDocumentPopup}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button type="submit" color="blue">
                  Upload
                </Button>
              </div>

              {uploadSuccess && (
                <Typography className="mt-4" color="green">
                  Files uploaded successfully!
                </Typography>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Acc;
