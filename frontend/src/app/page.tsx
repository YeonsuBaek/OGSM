import { Add } from "@mui/icons-material"
import {
  Avatar,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material"
import ImageIcon from "@mui/icons-material/Image"

const Home = () => {
  return (
    <Container maxWidth="sm">
      <main>
        <h1 style={{ fontSize: "24px", margin: "20px 0px" }}>You can do it!</h1>
        <Button
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
  )
}

export default Home
