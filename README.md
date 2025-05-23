#✈️ Flight Booking SPA
##Project Overview
This is a single-page application (SPA) for browsing airline tickets. The app allows users to:

- View a list of available flights as cards.
- Navigate to a detailed view of a specific flight with seat selection.
- Add selected tickets to a cart managed by Redux and persisted in localStorage.

## 🛠️ API Used:
https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights

https://679d13f487618946e6544ccc.mockapi.io/testove/v1/flights/${id}


## 🎯 Project Objectives
- Display flights with filter/sort functionality.
- Enable users to select available seats on a flight.
- Store chosen tickets in a Redux-managed cart.
- Persist cart data via localStorage.
- Demonstrate good UI/UX design with MUI and icon libraries.

## Tech Stack
- Vite
- React + TypeScript
- Material UI (MUI)
- Redux Toolkit & RTK Query – State management and API handling
- React Router

##  Why RTK Query Instead of Axios? 
RTK Query (instead of Axios) – Efficient and modern data fetching
- Built-in caching and re-fetching logic.
- Auto-generated hooks simplify data fetching and reduce boilerplate code.
- Seamless Redux integration for consistent global state handling.
- Improved developer experience with clear error/loading state management out of the box.
- Better scalability for large-scale apps with frequent API interactions.

## 🔧 Functional Requirements
### 🏠 Homepage – FlightsPage
- Fetch all flights via GET request.
- Display flights as MUI Cards.
- Include sorting/filtering options.
- Show loading spinner and handle API errors.
- Clicking a card navigates to FlightDetailsPage.
- Add to Favorites

### ✈️ Flight Details – FlightDetailsPage
- Fetch flight details via id from route.
- Generate a seat layout (10 rows x 6 seats).
- Randomly mark some seats as occupied, rest as free.
- The user can select the free seats and add them to the cart

###🛒 Cart – Cart
- Display list of selected tickets.
- Fully managed via Redux.
- Persisted in localStorage.
- Allow removal of tickets.


##  Getting Started
1. Clone the repo
```
git clone https://github.com/shchipina/aviaTickets.git
cd aviaTickets
```
2. Install dependencies
```
npm install
```
3. Run the app
```
npm run dev
