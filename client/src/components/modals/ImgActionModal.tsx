import { ActionIcon, Modal } from "@mantine/core"
import { RoomData } from "../tables/RoomTableCreator"
import { useDisclosure } from "@mantine/hooks";
import { MdEdit } from "react-icons/md";
import { EditGalleryForm } from "./PhotoGalleryForm";

export function ImgActionModal ({room} : {room: RoomData}) {

    const [opened, { open, close }] = useDisclosure(false);
    
    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={`Add photos for ${room.roomId}`}
                centered
            >
                <EditGalleryForm roomEntry={room} />
            </Modal>

            <ActionIcon 
                onClick={open}
            >
                <MdEdit />
            </ActionIcon>
        </>
        
    )
}