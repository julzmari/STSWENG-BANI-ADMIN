import { Box, Tabs } from "@mantine/core";
import { ReservationTableCreator, TodayReservationTableCreator, reservationResponseData } from "../components/tables/TableCreator.tsx";
import { useEffect, useState } from 'react';

export function AllReservations() {
    
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
        <Box  >
            <h1 className="text-3xl font-bold mb-4" style={{ paddingTop: '30px'}}>View Reservations</h1>
            <Tabs color="#052e16" variant="pills" defaultValue="view" >
                <Tabs.List style={{paddingTop: '10px' }}>
                    <Tabs.Tab value="today">Today's Reservations</Tabs.Tab>
                    <Tabs.Tab value="view">All Reservations</Tabs.Tab> 
                </Tabs.List>

                <Tabs.Panel value="view">
                    <ReservationTableCreator reservations={reservations}/>
                </Tabs.Panel>

                <Tabs.Panel value="today">
                    <TodayReservationTableCreator reservations={reservations}/>
                </Tabs.Panel>
            </Tabs>
        </Box>
    );
}
