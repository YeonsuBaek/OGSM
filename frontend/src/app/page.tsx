"use client"
import { useState } from "react"
import { Add } from "@mui/icons-material"
import {
  Avatar,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
} from "@mui/material"
import ImageIcon from "@mui/icons-material/Image"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { DesktopDatePicker } from "@mui/x-date-pickers"

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [category, setCategory] = useState<string>("Category1")

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container maxWidth="sm">
        <main>
          <h1 style={{ fontSize: "24px", margin: "20px 0px" }}>
            You can do it!
          </h1>
          <Button
            onClick={() => setIsOpen(true)}
            variant="contained"
            startIcon={<Add />}
            style={{ textTransform: "none", marginBottom: "16px" }}
          >
            Add OGSM
          </Button>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="D-10" />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Work" secondary="D-20" />
            </ListItem>
          </List>
        </main>
      </Container>
      <Modal
        open={isOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          elevation={3}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "80%",
            height: "480px",
            padding: "16px",
            backgroundColor: "#fff",
            overflowY: "auto",
          }}
        >
          <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
            What is your OGSM?
          </h2>
          <ul style={{ marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px", listStyleType: "none" }}>
              <FormLabel
                id="select-category"
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Write your Object
              </FormLabel>
              <FormControl fullWidth>
                <InputLabel id="select-category-label">Category</InputLabel>
                <Select
                  labelId="select-category-label"
                  aria-labelledby="select-category"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                >
                  <MenuItem value="Category1">Category1</MenuItem>
                  <MenuItem value="Category2">Category2</MenuItem>
                  <MenuItem value="Category3">Category3</MenuItem>
                </Select>
              </FormControl>
            </li>
            <li style={{ marginBottom: "8px", listStyleType: "none" }}>
              <FormLabel
                id="add-object"
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Write your Object
              </FormLabel>
              <TextField
                aria-labelledby="add-object"
                label="Object"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            </li>
            <li style={{ marginBottom: "8px", listStyleType: "none" }}>
              <FormLabel
                id="add-goal"
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Write your Goal
              </FormLabel>
              <TextField
                aria-labelledby="add-goal"
                label="Goal"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            </li>
            <li style={{ marginBottom: "8px", listStyleType: "none" }}>
              <FormLabel
                id="add-strategy"
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Write your Strategy
              </FormLabel>
              <DesktopDatePicker label="Start Date" />
              <DesktopDatePicker label="End Date" />
              <TextField
                aria-labelledby="add-strategy"
                label="Strategy"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            </li>
            <li style={{ marginBottom: "8px", listStyleType: "none" }}>
              <FormLabel
                id="add-measure"
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                Write your Measure
              </FormLabel>
              <TextField
                aria-labelledby="add-measure"
                label="Measure"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            </li>
          </ul>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              gap: "8px",
            }}
          >
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => setIsOpen(false)}
            >
              Save
            </Button>
          </div>
        </Paper>
      </Modal>
    </LocalizationProvider>
  )
}

export default Home
