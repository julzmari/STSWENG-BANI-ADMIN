import { Button, Group, FileInput, Checkbox } from '@mantine/core';//Alert,
import { useForm, UseFormReturnType } from '@mantine/form';
import { RoomData } from '../tables/RoomTableCreator';

function refreshPage(){ 
    window.location.reload(); 
}

interface imageData{
    label: string;
    checked: boolean,
    key: string
}

const handleSubmit = async (form: UseFormReturnType<{images: imageData[], roomImg: any }>, roomEntry: RoomData) => {
    
    try {

        const formData = new FormData();
        formData.append('file',form.getValues().roomImg)
        formData.append("upload_preset","u0vks5zu")

        let newImagesUrlString = ""

        const checkedImages = form.getValues().images.filter((image) => image.checked);

        console.log(checkedImages)

        const imagesUrlString = checkedImages.map((x)=>x.key).join(',')    
        console.log(checkedImages)

        //send photo to cloudinary, returns a link to the photo
        const upload = await fetch( `https://api.cloudinary.com/v1_1/dof7fh2cj/image/upload`,{
            method: 'POST',
            mode: 'cors',
            body: formData
        });
        
        if (!upload.ok) {
            // Images to keep
            newImagesUrlString = imagesUrlString;
        }
        else{
            const uploadData = await upload.json();
            console.log('image has been uploaded successfully: ', uploadData);
            //new image + images to keep
            newImagesUrlString = uploadData.secure_url+","+roomEntry.images;
        }
        
        console.log(newImagesUrlString)

        //send the Url String to the backend server
        const response = await fetch(`/api/updateimage-room/${roomEntry.roomId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imgUrl: newImagesUrlString
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update room');
        }

        const updatedData = await response.json();
        console.log('Room updated successfully:', updatedData);
        refreshPage() 

    } catch (error) {
        console.error('Error updating room:', error);
    }
};

export function EditGalleryForm({roomEntry} : {roomEntry: RoomData}) {
    
    const imageUrls = roomEntry.images.split(',')
        
    const imageArray = imageUrls.map((value) => (
        {label: value.split("/")[7], checked:true, key: value}
    ));

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: 
        {images: imageArray,
        roomImg: ""},
    });

    const imageDisplay = imageArray.map((value,index) =>(
        <Checkbox
        mt="xs"
        ml={33}
        label={value.label}
        key={value.key}
        {...form.getInputProps(`images.${index}.checked`, { type: 'checkbox' })}
        />
    ));

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(form, roomEntry);
    };

    return (
        <form onSubmit={onSubmit}> 
           
            <FileInput
            label="Upload Image To Add"
            description="Select image"
            placeholder="Image"
            accept="image/png,image/jpeg"
            key={form.key('roomImg')}
            {...form.getInputProps('roomImg')}
            clearable/>
            <br></br>
            <p><b>Current Photo/s To Keep</b></p>

            {imageDisplay}
            
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>

        </form>
    );
}
