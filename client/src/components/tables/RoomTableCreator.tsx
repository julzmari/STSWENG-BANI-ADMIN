import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";

export interface RoomData {
    roomId: string;
    bedType: string;
    maxNumberOfPeople: number;
    roomPrice: number;
}

interface RoomTableCreatorProps {
    rooms: RoomData[]; 
}

export function RoomTableCreator({ rooms }: RoomTableCreatorProps) {
    console.log("Rooms passed to RoomTableCreator:", rooms); 

    const remappedData = rooms.map((room: RoomData) => ({
        roomId: room.roomId,
        bedType: room.bedType,
        maxNumberOfPeople: room.maxNumberOfPeople,
        roomPrice: room.roomPrice,
    }));

    const columns = useMemo<MRT_ColumnDef<RoomData>[]>(() => [
        {
            accessorKey: 'roomId',
            header: 'Room ID',
        },
        {
            accessorKey: 'bedType',
            header: 'Bed Type',
        },
        {
            accessorKey: 'maxNumberOfPeople',
            header: 'Max Number of People',
        },
        {
            accessorKey: 'roomPrice',
            header: 'Room Price',
            Cell: ({ cell }) => `₱${cell.getValue().toFixed(2)}`, 
        },
    ], []);

    const table = useMantineReactTable({
        columns: columns,
        data: remappedData ?? [],
        enablePagination: false, 
    });

    return (
        <div className="table-container">
            <MantineReactTable
                table={table}
            />
        </div>
    );
}
