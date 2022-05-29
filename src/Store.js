import React, { useState, useContext, useEffect } from 'react';
const StoreContext = React.createContext();
export const useStore = () => useContext(StoreContext);

function StoreProvider({ children }) {

    const [user, setUser] = useState({});
    const [ride, setRide] = useState([]);
    const [filters, setFilters] = useState({ state: "", city: "" });
    const [status, setStatus] = useState(""); // upcoming, past

    // Fetching Data
    useEffect(() => {
        (async function () {
            await fetch('/Data.json')
                .then(response => response.json())
                .then(res => {
                    setUser(res.user);
                    setRide(res.ride);
                });
        })()
    }, [setUser, setRide]);


    // Upcoming Rides
    function selectUpcomingRides() {
        const date = new Date();
        const now = date.getTime();

        // Upcoming Rides : Filter - State | City     
        return ride.filter(obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity = filters.city ? obj.city === filters.city : !filters.city;

            return (obj.date * 1000 >= now) && filterState && filterCity
        });
    }


    // Past Rides
    function selectPastRides() {
        const date = new Date();
        const now = date.getTime();

        // Past Rides : Filter - State | City 
        return ride.filter(obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity = filters.city ? obj.city === filters.city : !filters.city;

            return (obj.date * 1000 < now) && filterState && filterCity
        });
    }



    // All Rides
    function selectAllRides() {

        // All Rides : Filter - State | City 
        return ride.filter(obj => {
            const filterState = filters.state ? obj.state === filters.state : !filters.state;
            const filterCity = filters.city ? obj.city === filters.city : !filters.city;

            return filterState && filterCity
        });
    }

    // Ride
    const getRides = () => {

        // Select - Upcoming | Past | All
        switch (status) {
            case "upcoming":
                return selectUpcomingRides();

            case "past":
                return selectPastRides();

            default:
                return selectAllRides();
        }
    }


    // Status State 
    const handleStatus = (state) => {
        setStatus(state);
    }

    // Filter State
    const handleFilters = (obj) => {
        setFilters(obj);
    }


    const value = {
        handleStatus,
        handleFilters,
        selectUpcomingRides,
        selectPastRides,
        getRides,
        filters,
        status,
        ride,
        user,
    };


    return (
        <StoreContext.Provider value={value} >
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;