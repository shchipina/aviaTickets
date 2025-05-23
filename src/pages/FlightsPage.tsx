import { Box, Button, Container, Typography } from "@mui/material";
import FlightCard from "../components/FlightCard";
import Loader from "../components/Loader";
import { useGetFlightsQuery } from "../services/flights/flightsApiSlice";
import { useEffect, useState } from "react";
import type { Flight } from "../types/flight";
import { filteredData } from "../utils/filteredData";

function FlightsPage() {
  const { data: flights, isLoading } = useGetFlightsQuery();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [visibleFlights, setVisibleFlights] = useState<Flight[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (flights) {
        const result = filteredData(flights, query, sortBy);
        setVisibleFlights(result);
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query, sortBy, flights]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isLoading || !flights) {
    return <Loader />;
  }

  const PAGE_SIZE = 10;

  const totalPages = Math.ceil(visibleFlights.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedFlights = visibleFlights.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search airline..."
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", width: "200px" }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="" disabled>--Choose an option--</option>
          <option value="ASC">Sort by Price: Low to High</option>
          <option value="DESC">Sort by Price: High to Low</option>
        </select>
      </Box>

      {paginatedFlights.length > 0 ? (
        paginatedFlights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))
      ) : (
        <Typography variant="body1">No flights found.</Typography>
      )}

      <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>
        <Typography variant="body1">
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Box>

    </Container>
  );
}

export default FlightsPage;
