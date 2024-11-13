import { Box } from "@mantine/core"; //  Tabs
import { reservationResponseData, PastReservationTableCreator } from "../components/tables/TableCreator.tsx"; //ReservationTableCreator, TodayReservationTableCreator,
import { useEffect, useState } from 'react';

export function PastReservations() {
    
    const [reservations, setReservations] = useState<reservationResponseData[]>([]);
    const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        if (!initialized){
            fetch('/api/get-reservations')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setReservations(data); 
            })
            .then(() => setInitialized(true))
        }
    }, [reservations,initialized]);

    return (
        <Box>
            <h1 className="text-3xl font-bold mb-4" style={{ paddingTop: '30px' }}>Reservation History</h1>

            <PastReservationTableCreator 
                reservations={reservations} 
                //page={'past'}
            />
        </Box>

    );
}
