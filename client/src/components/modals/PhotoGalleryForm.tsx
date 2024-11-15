import { Button, Group, FileInput } from '@mantine/core';//Alert,
import { useForm, UseFormReturnType } from '@mantine/form';
import { reservationResponseData } from '../tables/TableCreator';

function refreshPage(){ 
    window.location.reload(); 
}

const handleSubmit = async (form: UseFormReturnType<{roomImg: any }>, reservationEntry: reservationResponseData) => {

    try {

        const response = await fetch(`/api/update-image-reservation/${reservationEntry.referenceNo}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
            }),
        });

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

export function EditGalleryForm({reservationEntry} : {reservationEntry: reservationResponseData}) {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            roomImg: ""
        },
    });

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(form, reservationEntry);
    };

    return (
        <form onSubmit={onSubmit}> 
           
            <FileInput
            label="Upload Images To Add"
            description="Select image/s"
            placeholder="Image"
            accept="image/png,image/jpeg"
            key={form.key('roomImg')}
            {...form.getInputProps('roomImg')}
            clearable
            multiple/>

            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>

        </form>
    );
}
