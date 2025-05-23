import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToFavorites, removeFromFavorites, selectFavorites } from '../features/favorites/favoritesSlice';
import type { Flight } from '../types/flight';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const FavoriteToggleButton = (
  { flight }: { flight: Flight }
) => {
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();
  const isFavorite = favorites.some(favorite => favorite.id === flight.id);

  const handleToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(flight.id));
    } else {
      dispatch(addToFavorites(flight));
    }
  };

  return (
    <IconButton onClick={handleToggle} color={isFavorite ? 'error' : 'default'}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteToggleButton;
