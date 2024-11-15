import { ActionIcon, Modal } from "@mantine/core"
import { RoomData } from "../tables/RoomTableCreator"
import { useDisclosure } from "@mantine/hooks";
import { MdEdit } from "react-icons/md";
import { EditGalleryForm } from "./PhotoGalleryForm";

export function ImgActionModal ({reservation} : {reservation: RoomData}) {

    const [opened, { open, close }] = useDisclosure(false);
    
    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={`Add photos for ${reservation.roomId}`}
                centered
            >
                <EditGalleryForm reservationEntry={reservation} />
            </Modal>

            <ActionIcon 
                onClick={open}
            >
                <MdEdit />
            </ActionIcon>
        </>
        
    )
}