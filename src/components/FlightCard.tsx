import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';
import type { Flight } from '../types/flight';
import FavoriteToggleButton from './FavoriteToggleButton';
import { Link } from 'react-router';

const FlightCard = ({ flight }: { flight: Flight }) => {
  const {
    id,
    airline,
    from,
    to,
    departureTime,
    arrivalTime,
    price,
    terminal,
    gate,
    tickets,
  } = flight;

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

  return (
    <Card sx={{ maxWidth: 1200, borderRadius: 4, boxShadow: 3, my: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6" color="primary" gutterBottom>
            {airline}
          </Typography>
          <FavoriteToggleButton flight={flight} />
        </Box>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="body2" color="textSecondary">
            {from} → {to}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ${price}
          </Typography>
        </Box>

        <Box mb={1}>
          <Typography variant="body2">
            <strong>Departure:</strong> {formatTime(departureTime)}
          </Typography>
        </Box>

        <Box mb={1}>
          <Typography variant="body2">
            <strong>Arrival:</strong> {formatTime(arrivalTime)}
          </Typography>
        </Box>

        <Box mb={1}>
          <Typography variant="body2">
            <strong>Terminal:</strong> {terminal} &nbsp;&nbsp;
            <strong>Gate:</strong> {gate}
          </Typography>
        </Box>

        <Typography variant="body2">
          <strong>Tickets:</strong> {tickets.remaining} / {tickets.total} remaining
        </Typography>

        <Box mt={2} display="flex" justifyContent="end" >
          <Button
            component={Link}
            to={`/flights/${id}`}
            variant="contained"
            color="primary"
          >
            Buy a Ticket
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
