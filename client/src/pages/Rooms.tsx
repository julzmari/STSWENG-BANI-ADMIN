import { Box } from "@mantine/core";
import { RoomTableCreator, RoomData } from "../components/tables/RoomTableCreator"; 
import { useEffect, useState } from 'react';

export function Rooms() {
    const [rooms, setRooms] = useState<RoomData[]>([]);
    //const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        fetch('/api/get-rooms')
            .then(response => response.json())
            .then(data => {
                console.log("Data fetched from API:", data);
                setRooms(data.data); // Set state with the correct data property
            })
            //.then(() => setInitialized(true))
            .catch(error => console.error("Error fetching rooms:", error));
    }, []); // Updated dependency array to avoid multiple fetches

    return (
        <Box>
            <h1 className="text-3xl font-bold mb-4" style={{ paddingTop: '30px' }}>Room Information</h1>
            <RoomTableCreator 
                rooms={Array.isArray(rooms) ? rooms : []} // Handle empty or invalid state
            />
        </Box>
    );
}
