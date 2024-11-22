import './table.css';
import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { ImgActionModal } from '../modals/ImgActionModal';    

export interface RoomData {
    roomId: string;
    floor: number;
    bedType: string;
    maxPax: number;
    price: number;
    images: string;
}

interface RoomTableCreatorProps {
    rooms: RoomData[]; 
}

export function RoomTableCreator({ rooms }: RoomTableCreatorProps) {
    console.log("Rooms passed to RoomTableCreator:", rooms); 

    const remappedData = Array.isArray(rooms) ? rooms.map((room: RoomData) => ({
        roomId: room.roomId,
        floor: room.floor,
        bedType: room.bedType,
        maxPax: room.maxPax,
        price: room.price,
        images: room.images,
    })) : [];

    const columns = useMemo<MRT_ColumnDef<RoomData>[]>(() => [
        {
            accessorKey: 'roomId',
            header: 'Room ID',
        },
        {
            accessorKey: 'floor',
            header: 'Floor',
        },
        {
            accessorKey: 'bedType',
            header: 'Bed Type',
        },
        {
            accessorKey: 'maxPax',
            header: 'Max # of People',
        },
        {
            accessorKey: 'price',
            header: 'Price',
            Cell: ({ cell }) => {
                const value = cell.getValue();
                // Check if value is a number before calling toFixed
                return typeof value === 'number' ? `₱${value.toFixed(2)}` : '₱0.00';
            },
        },
    ], []);

    const table = useMantineReactTable({
        columns: columns,
        data: remappedData,
        enableRowActions: true,
        enablePagination: false, 
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
            <ImgActionModal room={remappedData[row.index]} />
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
