import './table.css';
import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { ActionModal } from '../modals/ActionModal';

export interface ClientData {
    clientId: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
    address?: string;
}

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
    otherNotes?: string;
    totalAmount?: number;
    amountPaid?: number;
    paymentStatus?: string;
    arrivalStatus?: string;
    client?: ClientData;
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

    return CreateTable(reservations);
}

// New function for past reservations
export function PastReservationTableCreator(props: { reservations: reservationResponseData[] }) {
    const reservations = props.reservations.filter((reservation: reservationResponseData) => {
        // Filter for past reservations where the arrival status is "Checked-out"
        //const isPastReservation = new Date(reservation.checkOutDate ?? '') < new Date();
        const isCheckedOut = reservation.arrivalStatus === "Checked-out";
        const isCancelled = reservation.arrivalStatus === "Cancelled";
        //return isPastReservation && isCheckedOut;
        return isCheckedOut || isCancelled;
    });

    return CreatePastReservationTable(reservations);
}

// Helper function to create a table
function CreateTable(reservations: reservationResponseData[]) {
    const remappedData = reservations.map((reservation: reservationResponseData) => {
        return {
            firstName: reservation.client?.firstName,
            lastName: reservation.client?.lastName,
            contactNumber: reservation.client?.contactNumber,
            otherNotes: reservation.otherNotes,
            referenceNo: reservation.referenceNo,
            checkInDate: (new Date(reservation.checkInDate ?? '')).toDateString(),
            checkOutDate: (new Date(reservation.checkOutDate ?? '')).toDateString(),
            adults: reservation.numberOfAdults,
            children: reservation.numberOfChildren,
            totalGuests: reservation.numberOfGuests,
            pets: reservation.pets,
            clientId: reservation.clientId,
            roomId: reservation.roomId,
            adminNotes: reservation.adminNotes,
            totalAmount: reservation.totalAmount,
            amountPaid: reservation.amountPaid,
            arrivalStatus: reservation.arrivalStatus,
            client: reservation.client
        }
    });

    // Memorize the columns
    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            accessorKey: 'adminNotes',
            header: 'Admin Notes',
        },      
        {
            accessorKey: 'arrivalStatus',
            header: 'Status',
        }, 
        {
            accessorKey: 'totalAmount',
            header: 'Total Amount',
            hidden: true, 
        },
        {
            accessorKey: 'amountPaid',
            header: 'Amount Paid',
            hidden: true, 
        },
        {
            accessorFn: (row) => `${row.amountPaid} / ${row.totalAmount}`, 
            id: 'paymentInfo',
            header: 'Payment Info', 
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
            accessorFn: (row) => `${row.client?.firstName || ''} ${row.client?.lastName || ''}`, 
            id: 'fullName', 
            header: 'Client Name', 
        },
        {
            accessorFn: (row) => row.client?.contactNumber, 
            id: 'contactNumber',
            header: 'Contact Number',
        },
        {
            accessorKey: 'otherNotes',
            header: 'Client Notes',
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
            accessorKey: 'referenceNo',
            header: 'Reservation Ref No.',
        }, 
    ], []);

    const table = useMantineReactTable({
        columns: columns,
        data: remappedData ?? [],
        enablePagination: false,
        enableRowActions: true,
        enableRowVirtualization: true,
        state: { 
            showSkeletons: !remappedData ,
            columnVisibility: {
                totalAmount: false, 
                amountPaid: false,  
            },
        },
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


// Helper function to create the past reservations table
function CreatePastReservationTable(reservations: reservationResponseData[]) {
    const remappedData = reservations.map((reservation: reservationResponseData) => {
        return {
            contactNumber: reservation.client?.contactNumber,
            otherNotes: reservation.otherNotes,
            referenceNo: reservation.referenceNo,
            checkInDate: (new Date(reservation.checkInDate ?? '')).toDateString(),
            checkOutDate: (new Date(reservation.checkOutDate ?? '')).toDateString(),
            adults: reservation.numberOfAdults,
            children: reservation.numberOfChildren,
            totalGuests: reservation.numberOfGuests,
            pets: reservation.pets,
            clientId: reservation.clientId,
            roomId: reservation.roomId,
            adminNotes: reservation.adminNotes,
            totalAmount: reservation.totalAmount,
            amountPaid: reservation.amountPaid,
            arrivalStatus: reservation.arrivalStatus,
            client: reservation.client
        }
    });

    // Memorize the columns
    const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
        {
            accessorKey: 'adminNotes',
            header: 'Admin Notes',
        },      
        {
            accessorKey: 'arrivalStatus',
            header: 'Status',
        }, 
        {
            accessorKey: 'totalAmount',
            header: 'Total Amount',
            hidden: true, 
        },
        {
            accessorKey: 'amountPaid',
            header: 'Amount Paid',
            hidden: true, 
        },
        {
            accessorFn: (row) => `${row.amountPaid} / ${row.totalAmount}`, 
            id: 'paymentInfo',
            header: 'Payment Info', 
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
            accessorFn: (row) => `${row.client?.firstName || ''} ${row.client?.lastName || ''}`, 
            id: 'fullName', 
            header: 'Client Name', 
        },
        {
            accessorKey: 'contactNumber',
            header: 'Contact Number',
        },
        {
            accessorKey: 'otherNotes',
            header: 'Client Notes',
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
            accessorKey: 'referenceNo',
            header: 'Reservation Ref No.',
        }, 
    ], []);

    const table = useMantineReactTable({
        columns: columns,
        data: remappedData ?? [],
        enablePagination: false,
        enableRowActions: false, // Disable row actions for past reservations
        enableRowVirtualization: true,
        state: { 
            showSkeletons: !remappedData ,
            columnVisibility: {
                totalAmount: false, 
                amountPaid: false,  
            },
        },
    });

    return (
        <div className="table-container">
            <MantineReactTable table={table} />
        </div>
    );
}