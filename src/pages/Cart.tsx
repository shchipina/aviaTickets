import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectCart, removeFromCart } from "../features/cart/cartSlice";
import { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

function Cart() {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const cartItems = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const handleRemove = (flightId: string, seatId: string) => {
    dispatch(removeFromCart({ flightId, seatId }));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.flight.price * item.seats.length;
  }, 0);

  return (
    <Container maxWidth={"lg"} sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Booking Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No booked flights yet.
        </Typography>
      ) : (
        cartItems.map((item) => (
          <Paper key={item.flight.id} elevation={3} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Direction: {item.flight.from} — {item.flight.to}
            </Typography>

            <Typography variant="overline">
              Terminal: {item.flight.terminal} Gate: {item.flight.gate}
            </Typography>

            <Typography variant="subtitle2">
              Booked Seats:
            </Typography>

            <List dense>
              {item.seats.map((seat) => (
                <ListItem
                  key={seat.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => handleRemove(item.flight.id, seat.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`Seat ${seat.id}`}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ mt: 2 }} />

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body1" fontWeight={600}>
                Total price: ${totalPrice}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsOpenConfirmModal(true)}
              >
                Confirm Booking
              </Button>
            </Box>
          </Paper>
        ))
      )}

      {isOpenConfirmModal && (
        <ConfirmationModal onClose={() => setIsOpenConfirmModal(false)} />
      )}
    </Container>
  );
}

export default Cart;
