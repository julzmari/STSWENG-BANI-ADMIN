import './table.css';
import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { ActionModal } from '../modals/ActionModal';

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

export function ReservationTableCreator(props: { reservations: reservationResponseData[], page: string }) {
    let reservations = []

    if (props.page === 'today') {   
        reservations = props.reservations.filter((reservation: reservationResponseData) => {
            return new Date(reservation.checkInDate ?? '').toDateString() === new Date().toDateString();
        }) 
    } else {
        reservations = props.reservations;
    }

    return createTable(reservations);
}

// New function for past reservations
export function PastReservationTableCreator(props: { reservations: reservationResponseData[] }) {
    const reservations = props.reservations.filter((reservation: reservationResponseData) => {
        return new Date(reservation.checkOutDate ?? '') < new Date(); // Filter for past reservations
    });

    return createTable(reservations);
}

// Helper function to create a table
function createTable(reservations: reservationResponseData[]) {
    const remappedData = reservations.map((reservation: reservationResponseData) => {
        return {
            referenceNo: reservation.referenceNo,
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
        }
    });

    // Memorize the columns
    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            accessorKey: 'referenceNo',
            header: 'Reservation Ref No.',
        }, 
        {
            accessorKey: 'roomId',
            header: 'Room ID',
        },
        {
            accessorKey: 'checkInDate',
            header: 'Check-in Date',
        },
        {
            accessorKey: 'checkOutDate',
            header: 'Check-out Date',
        },
        {
            accessorKey: 'adults',
            header: '# of Adults',
        },
        {
            accessorKey: 'children',
            header: '# of Kids',
        },
        {
            accessorKey: 'totalGuests',
            header: 'Total Guests',
        },
        {
            accessorKey: 'pets',
            header: 'Pets Allowed',
            Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No'),
        },
        {
            accessorKey: 'totalAmount',
            header: 'Total Amount',
        },
        {
            accessorKey: 'amountPaid',
            header: 'Amount Paid',
        },
        {
            accessorKey: 'arrivalStatus',
            header: 'Arrival Status',
        },
        {
            accessorKey: 'paymentStatus',
            header: 'Payment Status',
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
        },
    ], []);

    const table = useMantineReactTable({
        columns: columns,
        data: remappedData ?? [],
        enablePagination: false,
        enableRowActions: true,
        enableRowVirtualization: true,
        state: { showSkeletons: !remappedData },
        positionActionsColumn: 'first',
        renderRowActions: ({ row }) => (
            <ActionModal reservation={remappedData[row.index]} />
        )
    });

    return (
        <div className="table-container">
            <MantineReactTable
                table={table}
            />
        </div>
    );
}


/*
export function TodayReservationTableCreator(props: {reservations: reservationResponseData[]}) {

    const remappedData = props.reservations.filter((reservation: reservationResponseData) => {
        return new Date(reservation.checkInDate ?? '').toDateString() === new Date().toDateString();
        }).map( (reservation: reservationResponseData) => {
            return {
                referenceNo: reservation.referenceNo,
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
            }
    })
    console.log(remappedData)
    // Memorize the columns
    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            accessorKey: 'referenceNo',
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
                data={remappedData}
                enablePagination={false}
                enableRowActions={true}
                positionActionsColumn='first'
            />
        </div>
    );
}
*/