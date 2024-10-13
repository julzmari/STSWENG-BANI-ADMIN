import { ActionIcon, Modal } from "@mantine/core"
import { reservationResponseData } from "../tables/TableCreator"
import { useDisclosure } from "@mantine/hooks";
import { MdEdit } from "react-icons/md";
import { EditReservationEntry } from "./EditReservationForm";

export function ActionModal ({reservation} : {reservation: reservationResponseData}) {

    const [opened, { open, close }] = useDisclosure(false);
    
    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={`Edit Reservation ${reservation.referenceNo}`}
                centered
            >
                <EditReservationEntry reservationEntry={reservation} />
            </Modal>

            <ActionIcon 
                onClick={open}
            >
                <MdEdit />
            </ActionIcon>
        </>
        
    )
}