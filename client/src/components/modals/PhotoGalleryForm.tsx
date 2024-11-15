import { Button, Group, FileInput } from '@mantine/core';//Alert,
import { useForm, UseFormReturnType } from '@mantine/form';
import { RoomData } from '../tables/RoomTableCreator';

function refreshPage(){ 
    window.location.reload(); 
}

const handleSubmit = async (form: UseFormReturnType<{roomImg: any }>, roomEntry: RoomData) => {
    
    try {

        console.log(roomEntry.roomId) //test
        const response = await fetch(`/api/updateimage-room`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            }),
        });

        console.log(roomEntry.roomId) //test
        if (!response.ok) {
            throw new Error('Failed to update reservation');
        }

        const updatedData = await response.json();
        console.log('Reservation updated successfully:', updatedData);
        refreshPage()

    } catch (error) {
        console.error('Error updating reservation:', error);
    }
};

export function EditGalleryForm({roomEntry} : {roomEntry: RoomData}) {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            roomImg: ""
        },
    });

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(form, roomEntry);
    };

    return (
        <form onSubmit={onSubmit}> 
           
            <FileInput
            label="Upload Images To Add"
            description="Select image"
            placeholder="Image"
            accept="image/png,image/jpeg"
            key={form.key('roomImg')}
            {...form.getInputProps('roomImg')}
            clearable/>

            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>

        </form>
    );
}
