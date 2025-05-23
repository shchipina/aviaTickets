import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Badge,
} from "@mui/material";
import { ShoppingCart, Favorite } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectCart } from "../features/cart/cartSlice";
import { selectFavorites } from "../features/favorites/favoritesSlice";
import { formatBadgeCount } from "../utils/formatBadgeCount";
import { useState } from "react";
import FavoritesModal from "./FavoritesModal";

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const cart = useAppSelector(selectCart);
  const favorites = useAppSelector(selectFavorites);

  const handleToogleModal = () => setIsOpenModal(prev => !prev);

  return (
    <AppBar component="nav" position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          AviaTickets
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
          <Button sx={{ color: "#fff" }} component={NavLink} to="/">
            Home
          </Button>

          <IconButton
            color="inherit"
            onClick={handleToogleModal}
          >
            <Badge
              badgeContent={formatBadgeCount(favorites.length)}
              color="error"
            >
              <Favorite />
            </Badge>
          </IconButton>

          <IconButton color="inherit" component={NavLink} to="/cart">
            <Badge
              badgeContent={formatBadgeCount(cart.length)}
              color="error"
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {isOpenModal && <FavoritesModal onClose={handleToogleModal} open={isOpenModal} />}
    </AppBar>
  );
};

export default Header;
