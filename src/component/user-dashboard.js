import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { css } from "@emotion/react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [cookies, , removeCookie] = useCookies(["userid"]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    Appointment_Id: "",
    Title: "",
    Description: "",
    UserId: cookies.userid,
    Date: "",
  });
  const [editAppointmentId, setEditAppointmentId] = useState(null);

  const [userDetails, setUserDetails] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    Appointment_Id: "",
    Title: "",
    Description: "",
    UserId: cookies.userid,
    Date: "",
  });
  let navigate = useNavigate();

  function getData() {
    axios
      .get(`http://127.0.0.1:3001/get-apopointments/${cookies.userid}`)
      .then((res) =>
        setUserDetails(
          res.data.map((appointment) => ({
            ...appointment,
            Date: new Date(appointment.Date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            }),
          }))
        )
      )
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    getData();
  }, [cookies.userid]);

  const handleEdit = (id) => {
    const appointmentToEdit = userDetails.find(
      (appointment) => appointment.Appointment_Id === id
    );
    if (appointmentToEdit) {
      setEditFormData(appointmentToEdit);
      setEditAppointmentId(id);
      setOpenEditModal(true);
    }
  };

  const handleDelete = (id) => {
    console.log("Delete appointment with ID:", id);
    axios.delete(`http://127.0.0.1:3001/remove-task/${id}`).then(() => {
      getData();
    });
  };

  const handleSignOut = () => {
    removeCookie("userid");
    navigate("/login");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddTask = () => {
    axios
      .post(`http://127.0.0.1:3001/add-task`, formData)
      .then(() => {
        getData();
        handleCloseModal();
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "AppointmentId" || name === "UserId" ? parseInt(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "Appointment_Id" || name === "UserId" ? parseInt(value) : value;
    setEditFormData({ ...editFormData, [name]: parsedValue });
  };

  const handleSaveChanges = () => {
    axios
      .put(`http://127.0.0.1:3001/edit-task/${editAppointmentId}`, editFormData)
      .then(() => {
        getData(); // Fetch updated data
        setOpenEditModal(false); // Close the modal
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <>
      <Button onClick={handleSignOut} variant="contained" color="primary">
        Sign Out
      </Button>
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Add Task
          </Typography>

          <TextField
            id="appointment-id"
            name="Appointment_Id"
            label="Appointment ID"
            variant="outlined"
            fullWidth
            onChange={handleEditFormChange}
            value={editFormData.Appointment_Id}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="title"
            name="Title"
            label="Title"
            variant="outlined"
            fullWidth
            onChange={handleEditFormChange}
            value={editFormData.Title}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="description"
            name="Description"
            label="Description"
            variant="outlined"
            fullWidth
            onChange={handleEditFormChange}
            value={editFormData.Description}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            disabled={true}
            id="user-id"
            name="UserId"
            label="User ID"
            value={editFormData.UserId}
            variant="outlined"
            fullWidth
            onChange={handleEditFormChange}
            sx={{ marginBottom: "20px" }}
          />

          <TextField
            id="date"
            name="Date"
            label="Date"
            value={editFormData.Date}
            onChange={handleEditFormChange}
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            onClick={handleSaveChanges}
            variant="contained"
            color="primary"
            sx={{ marginRight: "10px" }}
          >
            Save Changes
          </Button>
          <Button onClick={handleCloseModal} variant="outlined" color="error">
            Cancel
          </Button>
        </Box>
      </Modal>
      <Button
        onClick={handleOpenModal}
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
      >
        Add Task
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Add Task
          </Typography>

          <TextField
            id="appointment-id"
            name="Appointment_Id"
            label="Appointment ID"
            variant="outlined"
            fullWidth
            onChange={handleFormChange}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="title"
            name="Title"
            label="Title"
            variant="outlined"
            fullWidth
            onChange={handleFormChange}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="description"
            name="Description"
            label="Description"
            variant="outlined"
            fullWidth
            onChange={handleFormChange}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            disabled={true}
            id="user-id"
            name="UserId"
            label="User ID"
            value={formData.UserId}
            variant="outlined"
            fullWidth
            onChange={handleFormChange}
            sx={{ marginBottom: "20px" }}
          />

          <TextField
            id="date"
            name="Date"
            label="Date"
            value={formData.Date}
            onChange={handleFormChange}
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            type="submit"
            onClick={handleAddTask}
            variant="contained"
            color="primary"
            sx={{ marginRight: "10px" }}
          >
            Add Task
          </Button>
          <Button onClick={handleCloseModal} variant="outlined" color="error">
            Cancel
          </Button>
        </Box>
      </Modal>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        `}
      >
        {userDetails.map((currentUser, index) => (
          <Card
            key={index}
            css={css`
              margin-bottom: 20px;
              width: 200px;
            `}
          >
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {currentUser.Title}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {currentUser.Date}
              </Typography>
              <Typography variant="body2" component="p" paragraph>
                {currentUser.Description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => handleEdit(currentUser.Appointment_Id)}
                variant="contained"
                color="warning"
              >
                Edit
              </Button>

              <Button
                size="small"
                onClick={() => handleDelete(currentUser.Appointment_Id)}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
