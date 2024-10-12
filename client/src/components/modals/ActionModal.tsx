import { ActionIcon, Button, Modal } from "@mantine/core"
import { reservationResponseData } from "../tables/TableCreator"
import { useDisclosure } from "@mantine/hooks";

export function ActionModal ({reservation} : {reservation: reservationResponseData}) {
    console.log(reservation)

    const [opened, { open, close }] = useDisclosure(false);
    
    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={`Edit Reservation ${reservation.referenceNo}`}
                centered
            >
                
            </Modal>

            <ActionIcon 
                onClick={open}
            >

            </ActionIcon>
        </>
        
    )
}