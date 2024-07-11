// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Card,
//   CardHeader,
//   CardBody,
//   Avatar,
//   Tooltip,
//   Chip,
// } from "@material-tailwind/react";
// import { BanknotesIcon ,UserGroupIcon, DocumentTextIcon , FlagIcon} from "@heroicons/react/24/outline";
// import { StatisticsCard } from "@/widgets/cards";

// import {
//   projectsTableData,
//   authorsTableData,
// } from "@/data";

// export function Home() {
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [overflowingRows, setOverflowingRows] = useState([]);

//   const toggleExpand = (index) => {
//     setExpandedRow(expandedRow === index ? null : index);
//   };

//   const formatDate = (timestamp) => {
//     const date = new Date();
//     date.setMinutes(date.getMinutes() - parseInt(timestamp, 10));
//     return date.toLocaleString();
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

//   return (
//     <div className="mt-12">
//       <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
//         <StatisticsCard
//           title="Accounts"
//           icon={<BanknotesIcon className="w-6 h-6 text-white" />}
//           value="53"
//           color="gray"
//         />
//         <StatisticsCard
//           title="Groups"
//           icon={<UserGroupIcon className="w-6 h-6 text-white" />}
//           value="53"
//           color="gray"
//         />
//         <StatisticsCard
//           title="Docs"
//           icon={<DocumentTextIcon className="w-6 h-6 text-white" />}
//           value="53"
//           color="gray"
//         />
//         <StatisticsCard
//           title="Flags"
//           icon={<FlagIcon className="w-6 h-6 text-white" />}
//           value="53"
//           color="gray"
//         />
//       </div>
//       <div className="mb-4 grid grid-cols-1 gap-5 xl:grid-cols-1">
//         <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
//           <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="m-0 flex items-center justify-between p-6"
//           >
//             <div>
//               <Typography variant="h6" color="blue-gray" className="mb-1">
//                 Flags
//               </Typography>
//             </div>
//           </CardHeader>
//           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//             <table className="w-full min-w-[640px] table-auto">
//               <thead>
//                 <tr className="items-center">
//                   {["name", "Document", "time stamp", "query"].map((el) => (
//                     <th
//                       key={el}
//                       className="border-b border-blue-gray-50 py-3 px-6 text-left"
//                     >
//                       <Typography
//                         variant="small"
//                         className="text-[11px] font-medium uppercase text-blue-gray-400"
//                       >
//                         {el}
//                       </Typography>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {projectsTableData.map(
//                   ({ img, name, timestamp, document, query }, key) => {
//                     const className = `py-3 px-5 ${
//                       key === projectsTableData.length - 1
//                         ? ""
//                         : "border-b border-blue-gray-50"
//                     }`;
//                     const isExpanded = expandedRow === key;
//                     const isOverflowing = overflowingRows.includes(key);

//                     return (
//                       <tr key={name}>
//                         <td className={className}>
//                           <div className="flex items-center gap-3">
//                             <Avatar src={img} alt={name} size="sm" />
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="font-bold"
//                             >
//                               {name}
//                             </Typography>
//                           </div>
//                         </td>
//                         <td className={className}>
//                           <Typography
//                             variant="small"
//                             className="text-xs font-medium text-blue-gray-600"
//                           >
//                             {document}
//                           </Typography>
//                         </td>
//                         <td className={className}>
//                           <Typography
//                             variant="small"
//                             className="text-xs font-medium text-blue-gray-600"
//                           >
//                             {formatDate(timestamp)}
//                           </Typography>
//                         </td>
//                         <td className={className}>
//                           <div
//                             className="flex items-center w-full max-w-[300px]"
//                             id={`query-container-${key}`}
//                             style={{ cursor: "pointer" }}
//                             onClick={() => toggleExpand(key)}
//                           >
//                             <Typography
//                               variant="small"
//                               className={`text-xs font-medium text-blue-gray-600 ${isExpanded ? "" : "truncate"}`}
//                               id={`query-text-${key}`}
//                               style={{
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                                 whiteSpace: isExpanded ? "normal" : "nowrap",
//                               }}
//                             >
//                               {query}
//                             </Typography>
//                             {isOverflowing && !isExpanded && (
//                               <Tooltip content="Show more">
//                                 <span className="text-blue-gray-400 ml-1"></span>
//                               </Tooltip>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   }
//                 )}
//               </tbody>
//             </table>
//           </CardBody>
//         </Card>
//       </div>
//       <div className="mb-4 mt-12 grid grid-cols-1 gap-5 xl:grid-cols-1">
//         <Card>
//         <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="m-0 flex items-center justify-between p-6"
//           >
//             <div>
//               <Typography variant="h6" color="blue-gray" className="mb-1">
//                 Accounts
//               </Typography>
//             </div>
//           </CardHeader>
//         <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//           <table className="w-full min-w-[640px] table-auto">
//             <thead>
//               <tr>
//                 {["author", "function", "status", "employed", ""].map((el) => (
//                   <th
//                     key={el}
//                     className="border-b border-blue-gray-50 py-3 px-5 text-left"
//                   >
//                     <Typography
//                       variant="small"
//                       className="text-[11px] font-bold uppercase text-blue-gray-400"
//                     >
//                       {el}
//                     </Typography>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {authorsTableData.map(
//                 ({ img, name, email, job, online, date }, key) => {
//                   const className = `py-3 px-5 ${
//                     key === authorsTableData.length - 1
//                       ? ""
//                       : "border-b border-blue-gray-50"
//                   }`;

//                   return (
//                     <tr key={name}>
//                       <td className={className}>
//                         <div className="flex items-center gap-4">
//                           <Avatar src={img} alt={name} size="sm" variant="rounded" />
//                           <div>
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="font-semibold"
//                             >
//                               {name}
//                             </Typography>
//                             <Typography className="text-xs font-normal text-blue-gray-500">
//                               {email}
//                             </Typography>
//                           </div>
//                         </div>
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {job[0]}
//                         </Typography>
//                         <Typography className="text-xs font-normal text-blue-gray-500">
//                           {job[1]}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                         <Chip
//                           variant="gradient"
//                           color={online ? "green" : "blue-gray"}
//                           value={online ? "online" : "offline"}
//                           className="py-0.5 px-2 text-[11px] font-medium w-fit"
//                         />
//                       </td>
//                       <td className={className}>
//                         <Typography className="text-xs font-semibold text-blue-gray-600">
//                           {date}
//                         </Typography>
//                       </td>
//                       <td className={className}>
//                       </td>
//                     </tr>
//                   );
//                 }
//               )}
//             </tbody>
//           </table>
//         </CardBody>
//       </Card>

//       </div>
//       <div className="mb-4 grid grid-cols-1 gap-5 xl:grid-cols-1">
//         <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
//           <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="m-0 flex items-center justify-between p-6"
//           >
//             <div>
//               <Typography variant="h6" color="blue-gray" className="mb-1">
//                 Documents
//               </Typography>
//             </div>
//           </CardHeader>
//           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
//             <table className="w-full min-w-[640px] table-auto">
//               <thead>
//                 <tr className="items-center">
//                   {["name", "uploaded On", "access level", "keyword",].map((el) => (
//                     <th
//                       key={el}
//                       className="border-b border-blue-gray-50 py-3 px-6 text-left"
//                     >
//                       <Typography
//                         variant="small"
//                         className="text-[11px] font-medium uppercase text-blue-gray-400"
//                       >
//                         {el}
//                       </Typography>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {projectsTableData.map(
//                   ({name, timestamp, document,access_level }, key) => {
//                     const className = `py-3 px-5 ${
//                       key === projectsTableData.length - 1
//                         ? ""
//                         : "border-b border-blue-gray-50"
//                     }`;
//                     const isExpanded = expandedRow === key;
//                     const isOverflowing = overflowingRows.includes(key);

//                     return (
//                       <tr key={name}>
                      
//                         <td className={className}>
//                           <Typography
//                             variant="small"
//                             className="text-xs font-medium text-blue-gray-600"
//                           >
//                             {document}
//                           </Typography>
//                         </td>
//                         <td className={className}>
//                           <Typography
//                             variant="small"
//                             className="text-xs font-medium text-blue-gray-600"
//                           >
//                             {formatDate(timestamp)}
//                           </Typography>
//                         </td>
//                         <td className={className}>
//                         <Typography
//                             variant="small"
//                             className="text-xs font-medium text-blue-gray-600"
//                           >
//                             {access_level}
//                           </Typography>
                        
//                         </td>
//                         <td className={className}>
//                         <Typography
//                             variant="small"
//                             className="text-xs font-medium text-blue-gray-600"
//                           >
//                             {access_level}
//                           </Typography>
                        
//                         </td>
//                       </tr>
//                     );
//                   }
//                 )}
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
import axios from 'axios'; // Import axios for API calls
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Tooltip,
  Chip
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  UserGroupIcon,
  DocumentTextIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards"; // Assuming this import is correct
import {
  projectsTableData,
  authorsTableData,
} from "@/data";


export function Home() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [overflowingRows, setOverflowingRows] = useState([]);
  const [users, setUsers] = useState([]); // State to hold users data

  const toggleExpand = (index) => {
    setExpandedRow((prevIndex) => (prevIndex === index ? null : index));
  };

  const formatDate = (timestamp) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - parseInt(timestamp, 10));
    return date.toLocaleString();
  };

  useEffect(() => {
    // Function to fetch users data
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data); // Update users state with fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call fetchUsers function on component mount
  }, []);

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
  }, [projectsTableData]); // Assuming projectsTableData is defined somewhere

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          title="Accounts"
          icon={<BanknotesIcon className="w-6 h-6 text-white" />}
          value={users.length} // Use users state to get the count of users
          color="gray"
        />
        <StatisticsCard
          title="Groups"
          icon={<UserGroupIcon className="w-6 h-6 text-white" />}
          value="53"
          color="gray"
        />
        <StatisticsCard
          title="Docs"
          icon={<DocumentTextIcon className="w-6 h-6 text-white" />}
          value="53"
          color="gray"
        />
        <StatisticsCard
          title="Flags"
          icon={<FlagIcon className="w-6 h-6 text-white" />}
          value="53"
          color="gray"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Flags
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr className="items-center">
                  {["name", "Document", "time stamp", "query"].map((el) => (
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
                {projectsTableData.map(
                  ({ img, name, timestamp, document, query }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    const isExpanded = expandedRow === key;
                    const isOverflowing = overflowingRows.includes(key);

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-3">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {document}
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
                          <div
                            className="flex items-center w-full max-w-[300px]"
                            id={`query-container-${key}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleExpand(key)}
                          >
                            <Typography
                              variant="small"
                              className={`text-xs font-medium text-blue-gray-600 ${isExpanded ? "" : "truncate"}`}
                              id={`query-text-${key}`}
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: isExpanded ? "normal" : "nowrap",
                              }}
                            >
                              {query}
                            </Typography>
                            {isOverflowing && !isExpanded && (
                              <Tooltip content="Show more">
                                <span className="text-blue-gray-400 ml-1"></span>
                              </Tooltip>
                            )}
                          </div>
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
      <div className="mb-4 mt-12 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Accounts
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["author", "function", "status", "employed", ""].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {authorsTableData.map(
                  ({ img, name, email, job, online, date }, key) => {
                    const className = `py-3 px-5 ${
                      key === authorsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" variant="rounded" />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {job[0]}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {job[1]}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={online ? "green" : "blue-gray"}
                            value={online ? "online" : "offline"}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {date}
                          </Typography>
                        </td>
                        <td className={className}>
                          {/* Empty cell */}
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
      <div className="mb-4 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Documents
              </Typography>
            </div>
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
                {projectsTableData.map(
                  ({ name, timestamp, document, access_level }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;
                    const isExpanded = expandedRow === key;
                    const isOverflowing = overflowingRows.includes(key);

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {document}
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
                          {/* Placeholder for the fourth column */}
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
    </div>
  );
}

export default Home;
