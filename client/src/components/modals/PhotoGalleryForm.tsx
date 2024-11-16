import { Button, Group, FileInput } from '@mantine/core';//Alert,
import { useForm, UseFormReturnType } from '@mantine/form';
import { RoomData } from '../tables/RoomTableCreator';

function refreshPage(){ 
    window.location.reload(); 
}

const handleSubmit = async (form: UseFormReturnType<{roomImg: any }>, roomEntry: RoomData) => {
    
    try {

        const formData = new FormData();
        formData.append('roomImg',form.getValues().roomImg)
        
        const response = await fetch(`/api/updateimage-room/${roomEntry.roomId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        });

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        if (!response.ok) {
            throw new Error('Failed to update room');
        }

        const updatedData = await response.json();
        console.log('Room updated successfully:', updatedData);
        // refreshPage()

    } catch (error) {
        console.error('Error updating room:', error);
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
