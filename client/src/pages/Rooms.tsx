import { Box } from "@mantine/core";
import { RoomTableCreator } from "../components/tables/RoomTableCreator"; 
import { useEffect, useState } from 'react';

export function Rooms() {
    const [rooms, setRooms] = useState<any[]>([]); 

    useEffect(() => {
        // Sample room data
        const sampleRooms = [
            { roomId: '101', bedType: 'King', maxNumberOfPeople: 2, roomPrice: 150 },
            { roomId: '102', bedType: 'Queen', maxNumberOfPeople: 3, roomPrice: 120 },
            { roomId: '103', bedType: 'Double', maxNumberOfPeople: 4, roomPrice: 180 },
            { roomId: '104', bedType: 'Single', maxNumberOfPeople: 1, roomPrice: 90 },
            { roomId: '105', bedType: 'Suite', maxNumberOfPeople: 5, roomPrice: 250 },
        ];
        setRooms(sampleRooms); 
    }, []); 

    return (
        <Box>
            <h1 className="text-3xl font-bold mb-4" style={{ paddingTop: '30px' }}>Room Information</h1>

            <RoomTableCreator 
                rooms={rooms} 
            />
        </Box>
    );
}
