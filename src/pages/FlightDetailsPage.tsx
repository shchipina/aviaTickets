import { useParams } from "react-router";
import { useGetFlightByIdQuery } from "../services/flights/flightsApiSlice";
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import Loader from "../components/Loader";
import type { Seat } from "../types/seat";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { generateSeats } from "../utils/generateSeat";

function FlightDetailsPage() {
  const { id } = useParams<string>();
  const { data: flight, isLoading } = useGetFlightByIdQuery(id!);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [seats, setSeats] = useState<Seat[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSeats(generateSeats());
  }, []);

  if (isLoading || !flight) {
    return <Loader />;
  }

  const {
    from,
    to,
    airline,
    departureTime,
    arrivalTime,
    terminal,
    gate,
    price,
    tickets,
  } = flight;

  const handleToggleSeat = (seat: Seat) => {
    const isExist = selectedSeats.find((s) => s.id === seat.id);
    if (isExist) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const handleCart = () => {
    if (selectedSeats.length === 0) return;
    dispatch(
      addToCart({
        flight,
        seats: selectedSeats,
      })
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h4" gutterBottom>
          {from} → {to}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Airline: <strong>{airline}</strong>
        </Typography>
        <Typography>
          Departure: {new Date(departureTime).toLocaleString()}
        </Typography>
        <Typography>
          Arrival: {new Date(arrivalTime).toLocaleString()}
        </Typography>
        <Typography>Terminal: {terminal}</Typography>
        <Typography>Gate: {gate}</Typography>
        <Typography>Price per seat: ${price}</Typography>
        <Typography sx={{ mt: 1 }}>
          Tickets Remaining: {tickets.remaining} / {tickets.total}
        </Typography>
      </Paper>

      <Box display="flex" gap={5} flexWrap="wrap">
        <Box
          display="grid"
          gridTemplateColumns="repeat(6, 1fr)"
          gap={2}
          maxWidth={600}
        >
          {seats?.map((seat) => {
            const isSelected = selectedSeats.some((s) => s.id === seat.id);
            return (
              <Button
                key={seat.id}
                variant="contained"
                disabled={seat.status === "occupied"}
                onClick={() => seat.status === "free" && handleToggleSeat(seat)}
                sx={{
                  height: 50,
                  borderRadius: 1,
                  bgcolor:
                    seat.status === "occupied"
                      ? "error.main"
                      : isSelected
                        ? "primary.main"
                        : "success.main",
                  color: "white",
                  cursor: seat.status === "free" ? "pointer" : "not-allowed",
                  '&:disabled': {
                    bgcolor: "error.main",
                    color: "white",
                  },
                }}
              >
                {seat.id}
              </Button>
            );
          })}
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">Selected Seats:</Typography>
          {selectedSeats.length > 0 ? (
            <>
              <List dense>
                {selectedSeats.map((seat) => (
                  <ListItem key={seat.id}>
                    Seat {seat.id}, Row {seat.row}
                    <Button onClick={() => handleToggleSeat(seat)}>❌</Button>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Total Price: ${price * selectedSeats.length}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCart}
                sx={{ mt: 1, alignSelf: "start" }}
              >
                Add to Cart
              </Button>
            </>
          ) : (
            <Typography>No seats selected</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default FlightDetailsPage;
