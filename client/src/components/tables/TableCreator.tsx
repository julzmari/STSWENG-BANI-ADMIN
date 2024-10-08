import './table.css';
import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef } from "mantine-react-table";
import { Box, Tabs } from "@mantine/core";

// Sample Data for Reservations
const sampleData = [
    {
        reservationRefNum: "ABC123",
        checkInDate: "2024-10-10",
        checkOutDate: "2024-10-15",
        adults: 2,
        children: 1,
        totalGuests: 3,
        pets: true,
        clientId: "C001",
        roomId: "Room 10",
        notes: "High floor requested",
        totalAmount: 6000,
        amountPaid: 6000,
        arrivalStatus: "Checked Out",
    },{
        reservationRefNum: "123123",
        checkInDate: "2024-10-10",
        checkOutDate: "2024-10-12",
        adults: 2,
        children: 1,
        totalGuests: 3,
        pets: true,
        clientId: "C003",
        roomId: "Room 5",
        notes: "",
        totalAmount: 7000,
        amountPaid: 5000,
        arrivalStatus: "Checked In",
    },{
        reservationRefNum: "ABC124",
        checkInDate: "2024-10-11",
        checkOutDate: "2024-10-12",
        adults: 2,
        children: 2,
        totalGuests: 4,
        pets: false,
        clientId: "C004",
        roomId: "Room 3",
        notes: "More pillows requested",
        totalAmount: 4500,
        amountPaid: 3000,
        arrivalStatus: "Pending",
    },{
        reservationRefNum: "ABC125",
        checkInDate: "2024-11-10",
        checkOutDate: "2024-11-12",
        adults: 6,
        children: 0,
        totalGuests: 6,
        pets: true,
        clientId: "C005",
        roomId: "Room 1",
        notes: "",
        totalAmount: 10000,
        amountPaid: 4500,
        arrivalStatus: "Pending",
    },{
        reservationRefNum: "ABC126",
        checkInDate: "2024-10-3",
        checkOutDate: "2024-10-5",
        adults: 6,
        children: 0,
        totalGuests: 6,
        pets: true,
        clientId: "C010",
        roomId: "Room 9",
        notes: "",
        totalAmount: 10000,
        amountPaid: 10000,
        arrivalStatus: "Checked-In",
    },{
        reservationRefNum: "ABC127",
        checkInDate: "2024-10-4",
        checkOutDate: "2024-10-12",
        adults: 6,
        children: 0,
        totalGuests: 6,
        pets: true,
        clientId: "C015",
        roomId: "Room 8",
        notes: "",
        totalAmount: 10000,
        amountPaid: 1000,
        arrivalStatus: "Pending",
    },
    // More sample reservations can be added here
];

// export interface remappedReservations {
//     reservationRefNum: string,
//     checkInDate: string,
//     checkOutDate: string,
//     adults: number,
//     children: number,
//     totalGuests: number,
//     pets: boolean,
//     clientId: string,
//     roomId: string,
//     notes: string,
//     totalAmount: number,
//     amountPaid: number,
//     arrivalStatus: string,
// }

export interface reservationResponseData {
    referenceNo?: string;
    checkInDate?: string;
    checkOutDate?: string;
    numberOfAdults?: number;
    numberOfChildren?: number;
    numberOfGuests?: number;
    pets?: boolean;
    clientId?: string;
    roomId?: string;
    adminNotes?: string;
    totalAmount?: number;
    amountPaid?: number;
    arrivalStatus?: string;
}

export function ReservationTableCreator(props: {reservations: reservationResponseData[]}) {
    // Memoize the columns

    const remapped = props.reservations.map( (reservation: reservationResponseData) => {
        return {
            reservationRefNum: reservation.referenceNo,
            checkInDate: (new Date(reservation.checkInDate ?? '')).toDateString(),
            checkOutDate: (new Date(reservation.checkOutDate ?? '')).toDateString(),
            adults: reservation.numberOfAdults,
            children: reservation.numberOfChildren,
            totalGuests: reservation.numberOfGuests,
            pets: reservation.pets,
            clientId: reservation.clientId,
            roomId: reservation.roomId,
            notes: reservation.adminNotes,
            totalAmount: reservation.totalAmount,
            amountPaid: reservation.amountPaid,
            arrivalStatus: reservation.arrivalStatus
    }})
    
    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            accessorKey: 'reservationRefNum',
            header: 'Reservation Ref No.',
            //size: 200,
        }, 
        {
            accessorKey: 'roomId',
            header: 'Room ID',
            //size: 200,
        },
        {
            accessorKey: 'checkInDate',
            header: 'Check-in Date',
            //size: 200,
        },
        {
            accessorKey: 'checkOutDate',
            header: 'Check-out Date',
            //size: 200,
        },
        {
            accessorKey: 'adults',
            header: '# of Adults',
            //size: 150,
        },
        {
            accessorKey: 'children',
            header: '# of Kids',
            //size: 150,
        },
        {
            accessorKey: 'totalGuests',
            header: 'Total Guests',
            //size: 150,
        },
        {
            accessorKey: 'pets',
            header: 'Pets Allowed',
            //size: 150,
            Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
        },
        {
            accessorKey: 'totalAmount',
            header: 'Total Amount',
            //size: 150,
        },
        {
            accessorKey: 'amountPaid',
            header: 'Amount Paid',
            //size: 150,
        },
        {
            accessorKey: 'arrivalStatus',
            header: 'Arrival Status',
            //size: 150,
        },
        {
            accessorKey: 'paymentStatus',
            header: 'Payment Status',
            //size: 150,
            Cell: ({ row }) => {
                const totalAmount = row.original.totalAmount;
                const amountPaid = row.original.amountPaid;

                if (amountPaid === 0) {
                    return 'No Payment';
                } else if (amountPaid > 0 && amountPaid < totalAmount) {
                    return 'Partially Paid';
                } else if (amountPaid === totalAmount) {
                    return 'Fully Paid';
                } else {
                    return 'Unknown Status';
                }
            },
        },
        {
            accessorKey: 'notes',
            header: 'Notes',
            //size: 150,
        },
    ], []);

    return (
        <div className="table-container">
            <MantineReactTable
                columns={columns}
                data={remapped}
                enablePagination={false}
                enableRowActions={false}
                positionActionsColumn='first'
            />
        </div>
    );
}