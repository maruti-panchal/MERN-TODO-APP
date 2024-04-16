// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { css } from "@emotion/react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Container,
//   InputAdornment,
// } from "@mui/material";
// import {
//   Person as PersonIcon,
//   AccountCircle as AccountCircleIcon,
//   Email as EmailIcon,
//   Lock as LockIcon,
//   Phone as PhoneIcon,
// } from "@mui/icons-material";
// import { styled } from "@mui/system";

// const AddTaskContainer = styled(Container)({
//   backgroundColor: "#fff",
//   padding: "20px",
//   borderRadius: "8px",
//   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
//   textAlign: "center",
// });

// const SubmitButton = styled(Button)({
//   marginTop: "20px",
//   width: "100%", // Added to make the button full width
//   backgroundColor: "#03a9f4",
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#0288d1",
//   },
// });

// const AddTask = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     AppointmentId: "",
//     Title: "",
//     Description: "",
//     UserId: "",
//     Date: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post(`http://127.0.0.1:3001/add-appointment`, formData)
//       .then(() => {
//         alert("Appointment added successfully!");
//         navigate("/dashboard");
//       })
//       .catch((error) => console.error("Error adding appointment:", error));
//   };

//   return (
//     <AddTaskContainer maxWidth="sm">
//       <Typography variant="h5" gutterBottom>
//         Add Task
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           id="appointmentId"
//           name="AppointmentId"
//           label="Appointment ID"
//           value={formData.AppointmentId}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <PersonIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <TextField
//           id="userId"
//           name="UserId"
//           label="User ID"
//           value={formData.UserId}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <EmailIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <TextField
//           id="title"
//           name="Title"
//           label="Title"
//           value={formData.Title}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <AccountCircleIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <TextField
//           id="description"
//           name="Description"
//           label="Description"
//           value={formData.Description}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           multiline
//           rows={4}
//           margin="normal"
//         />

//         <TextField
//           id="date"
//           name="Date"
//           label="Date"
//           value={formData.Date}
//           onChange={handleChange}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           type="date"
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <SubmitButton type="submit" variant="contained">
//           Add Task
//         </SubmitButton>
//       </form>
//     </AddTaskContainer>
//   );
// };

// export default AddTask;
