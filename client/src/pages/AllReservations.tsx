import { Box, Tabs } from "@mantine/core";
import { ReservationTableCreator } from "../components/tables/TableCreator.tsx";

interface reservationInterface {
    reservationRefNumber: string;
    checkInDate: Date;
    checkOutDate: Date;
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfGuests: number;
    pets: boolean;
    clientID: string;
    roomID: string;
    otherNotes?: string;
    totalAmount: number;
    amountPayment: number;
    arrivalStatus: string;
}

// Sample data for reservations
const sampleReservations: reservationInterface[] = [
    {
        reservationRefNumber: "REF001",
        checkInDate: new Date("2024-10-10"),
        checkOutDate: new Date("2024-10-12"),
        numberOfAdults: 2,
        numberOfChildren: 1,
        numberOfGuests: 3,
        pets: false,
        clientID: "CLIENT001",
        roomID: "ROOM101",
        otherNotes: "Late arrival",
        totalAmount: 5000,
        amountPayment: 2000,
        arrivalStatus: "Pending",
    },
    {
        reservationRefNumber: "REF002",
        checkInDate: new Date("2024-11-01"),
        checkOutDate: new Date("2024-11-05"),
        numberOfAdults: 4,
        numberOfChildren: 2,
        numberOfGuests: 6,
        pets: true,
        clientID: "CLIENT002",
        roomID: "ROOM202",
        otherNotes: "Need extra pillows",
        totalAmount: 10000,
        amountPayment: 8000,
        arrivalStatus: "Confirmed",
    },
    {
        reservationRefNumber: "REF003",
        checkInDate: new Date("2024-12-20"),
        checkOutDate: new Date("2024-12-25"),
        numberOfAdults: 1,
        numberOfChildren: 0,
        numberOfGuests: 1,
        pets: false,
        clientID: "CLIENT003",
        roomID: "ROOM303",
        otherNotes: "Quiet room requested",
        totalAmount: 3000,
        amountPayment: 3000,
        arrivalStatus: "Completed",
    },
];

// Reservation data format (optional for data structure reference)
const reservationDataFormat: reservationInterface = {
    reservationRefNumber: "REF000",
    checkInDate: new Date(),
    checkOutDate: new Date(),
    numberOfAdults: 2,
    numberOfChildren: 0,
    numberOfGuests: 2,
    pets: false,
    clientID: "CLIENT000",
    roomID: "ROOM000",
    otherNotes: "",
    totalAmount: 0,
    amountPayment: 0,
    arrivalStatus: "Pending",
};

export function AllReservations() {
    return (
        <Box p={80}>
            <h1 className="text-3xl font-bold mb-4">View Reservations</h1>
            <Tabs color="#052e16" variant="pills" defaultValue="view">
                <Tabs.List>
                    <Tabs.Tab value="view">View Reservations</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="view">
                    <ReservationTableCreator
                        config={{
                            format: reservationDataFormat, // Format structure for the table
                            page: 'all_reservations',      // Page identifier, if needed
                        }}
                        data={sampleReservations}        // Pass sample reservations data
                    />
                </Tabs.Panel>
            </Tabs>
        </Box>
    );
}
