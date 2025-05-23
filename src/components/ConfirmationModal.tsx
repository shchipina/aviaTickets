import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useAppDispatch } from "../app/hooks";
import { resetCart } from "../features/cart/cartSlice";

function ConfirmationModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
      dispatch(resetCart());
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  const handleClose = () => {
    onClose();
    dispatch(resetCart());
    navigate("/");
  }

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>

      <Box display="flex" alignItems="center" justifyContent="center" my={5} gap={1} mb={2}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
        <Typography variant="h4" fontWeight={600}>
          Booking Confirmed
        </Typography>
      </Box>
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Thank you for your booking!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          All details will be sent to your email
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Close Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationModal;
