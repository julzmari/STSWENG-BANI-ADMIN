import { Box, Tabs } from "@mantine/core";
import { ReservationTableCreator } from "../components/tables/TableCreator.tsx";

export function AllReservations() {
    
    return (
        <Box  >
            <h1 className="text-3xl font-bold mb-4" style={{ paddingLeft: '20px'}}>View Reservations</h1>
            <Tabs color="#052e16" variant="pills" defaultValue="view" >
                <Tabs.List style={{ paddingLeft: '20px', paddingTop: '20px' }}>
                    <Tabs.Tab value="today">Today's Reservations</Tabs.Tab>
                    <Tabs.Tab value="view">All Reservations</Tabs.Tab> 
                </Tabs.List>

                <Tabs.Panel value="view">
                    <ReservationTableCreator/>
                </Tabs.Panel>

                <Tabs.Panel value="today">
                    <ReservationTableCreator/>
                </Tabs.Panel>
            </Tabs>
        </Box>
    );
}
