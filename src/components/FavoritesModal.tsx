import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeFromFavorites, selectFavorites } from "../features/favorites/favoritesSlice";
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Backdrop,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

type FavoritesModalProps = {
  open: boolean;
  onClose: () => void;
}

function FavoritesModal({ open, onClose }: FavoritesModalProps) {
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/flights/${id}`);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" mb={2}>
            Favorite Flights
          </Typography>

          {favorites.length === 0 ? (
            <Typography color="text.secondary">No favorites yet.</Typography>
          ) : (
            <List>
              {favorites.map((flight) => (
                <ListItem
                  key={flight.id}
                  divider
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        edge="end"
                        aria-label="details"
                        onClick={() => handleClick(flight.id)}
                        color="primary"
                      >
                        <InfoIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => dispatch(removeFromFavorites(flight.id))}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={`${flight.from} → ${flight.to}`}
                    secondary={`Airline: ${flight.airline}`}
                  />
                </ListItem>
              ))}
            </List>
          )}

          <Box mt={3} textAlign="right">
            <Button onClick={onClose} variant="outlined">
              Close
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default FavoritesModal;
