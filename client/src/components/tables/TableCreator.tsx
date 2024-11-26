import './table.css';
import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { ActionModal } from '../modals/ActionModal';
import { Button } from '@mantine/core';
import * as XLSX from 'xlsx';

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
        const today = new Date();
        reservations = props.reservations.filter((reservation: reservationResponseData) => {
            const checkInDate = reservation.checkInDate ? new Date(reservation.checkInDate) : null;
            const checkOutDate = reservation.checkOutDate ? new Date(reservation.checkOutDate) : null;

            return (
                checkInDate &&
                checkOutDate &&
                today >= checkInDate &&
                today <= checkOutDate
            );
        });
    } else {
        reservations = props.reservations;
    }

    return createTable(reservations, props.page);
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
function createTable(reservations: reservationResponseData[], page: string) {
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

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(remappedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Reservations');

        // Summary: Calculate total amount, total guests, and number of reservations
        const totalamountPaid = remappedData.reduce((sum, reservation) => sum + (reservation.amountPaid || 0), 0);
        const totalGuests = remappedData.reduce((sum, reservation) => sum + (reservation.totalGuests || 0), 0);
        const totalReservations = remappedData.length;

        // Summary data
        const summaryData = [
            { label: 'Total Reservations', value: totalReservations },
            { label: 'Total Payment Received', value: totalamountPaid },
            { label: 'Total Guests', value: totalGuests }
        ];

        const summarySheet = XLSX.utils.json_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');


        const fileName = page === 'today' ? 'today_reservations.xlsx' : 'all_reservations.xlsx';
        XLSX.writeFile(wb, fileName);
    };

    return (
        <div>
            <div className="table-container">
                <MantineReactTable table={table} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <Button onClick={handleExport}>Export to Excel</Button>
            </div>
            
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

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(remappedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Reservations');

        // Summary: Calculate total amount, total guests, and number of reservations
        const totalamountPaid = remappedData.reduce((sum, reservation) => sum + (reservation.amountPaid || 0), 0);
        const totalGuests = remappedData.reduce((sum, reservation) => sum + (reservation.totalGuests || 0), 0);
        const totalReservations = remappedData.length;

        // Summary data
        const summaryData = [
            { label: 'Total Reservations', value: totalReservations },
            { label: 'Total Payment Received', value: totalamountPaid },
            { label: 'Total Guests', value: totalGuests }
        ];

        const summarySheet = XLSX.utils.json_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

        XLSX.writeFile(wb, 'past_reservations.xlsx');
    };

    return (
        <div>
            <div className="table-container">
                <MantineReactTable table={table} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <Button onClick={exportToExcel}>Export to Excel</Button>
            </div>
            
        </div>
    );
}