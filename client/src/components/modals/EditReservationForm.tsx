import { Alert, Button, Group, NativeSelect, NumberInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { reservationResponseData } from '../tables/TableCreator';

function refreshPage(){ 
    window.location.reload(); 
}

const handleSubmit = async (form, reservationEntry) => {

    try {
        const paymentStatus = (form.getValues().amountPaid === form.getValues().totalAmount && form.getValues().amountPaid !== 0) 
            ? 'Fully Paid' 
            : (form.getValues().amountPaid > form.getValues().totalAmount)
            ? 'Overpaid'
            : (form.getValues().amountPaid < form.getValues().totalAmount && form.getValues().amountPaid !== 0)
            ? 'Partially Paid'
            : 'No Payment';

        const response = await fetch(`/api/update-reservation/${reservationEntry.referenceNo}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                totalAmount: form.getValues().totalAmount,
                amountPaid: form.getValues().amountPaid,
                paymentStatus: paymentStatus,
                arrivalStatus: form.getValues().arrivalStatus,
                adminNotes: form.getValues().adminNotes,
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

export function EditReservationEntry({reservationEntry} : {reservationEntry: reservationResponseData}) {

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
        totalAmount: reservationEntry.totalAmount,
        amountPaid: reservationEntry.amountPaid,
        arrivalStatus: reservationEntry.arrivalStatus,
        adminNotes: reservationEntry.adminNotes,
        },
    });

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(form, reservationEntry);
    };

    return (
        <form onSubmit={onSubmit}>

            <NumberInput
                label="Total Amount"
                placeholder="Insert new total amount"
                key={form.key('totalAmount')}
                {...form.getInputProps('totalAmount')}
                />

            <NumberInput
                label="Amount Paid"
                placeholder="Insert new amount paid"
                key={form.key('amountPaid')}
                {...form.getInputProps('amountPaid')}
                allowNegative={false}
            />

            <NativeSelect
                label="Arrival Status"
                key={form.key('arrivalStatus')}
                {...form.getInputProps('arrivalStatus')}
                //value={reservationEntry.arrivalStatus}
                //onChange={(event) => setValue(event.currentTarget.value)}
                data={["Booked", "Checked-in", "Checked-out", "New Reservation", "Cancelled"]}
            />

            <Textarea
                label="Admin Notes"
                key={form.key('adminNotes')}
                {...form.getInputProps('adminNotes')}
            />

            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>

        </form>
    );
}

/*const handleSubmit = async (form: unknown, reservationEntry: reservationResponseData) => {
    
        try {

            const paymentStatus = (form.getValues().amountPaid === form.getValues().totalAmount) && (form.getValues().amountPaid != 0) 
                                    ? 'Fully Paid' 
                                    : (form.getValues().amountPaid > form.getValues().totalAmount)
                                    ? 'Overpaid'
                                    : (form.getValues().amountPaid < form.getValues().totalAmount) && (form.getValues().amountPaid !== 0)
                                    ? 'Partially Paid'
                                    : 'No Payment'

            
             const response = await fetch(`/api/update-reservation/${reservationEntry.referenceNo}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    totalAmount: form.getValues().totalAmount,
                    amountPaid: form.getValues().amountPaid,
                    paymentStatus: paymentStatus,
                    arrivalStatus: form.getValues().arrivalStatus,
                    adminNotes: form.getValues().adminNotes,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update reservation');
            } 
    
            const updatedData = await response.json();
            console.log('Reservation updated successfully:', updatedData);
            setIsUpdated('success')

        } catch (error) {
            console.error('Error updating reservation:', error);
            setIsUpdated('failed')
        } 

    };*/

/*
{isUpdated === 'success' ? 
                <Alert 
                    variant="light" 
                    color="green" 
                    title="Update Successful" 
                >
                </Alert> : isUpdated === 'failed' ?
                <Alert 
                variant="light" 
                color="red" 
                title="Update Unsuccessful" 
                >
                </Alert> : <></>
            }
*/