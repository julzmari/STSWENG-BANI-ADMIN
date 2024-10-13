import { Button, Checkbox, Group, NativeSelect, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { reservationResponseData } from '../tables/TableCreator';
import { useDisclosure } from '@mantine/hooks';

export function EditReservationEntry({reservationEntry} : {reservationEntry: reservationResponseData}) {

    const [loading, { open, close }] = useDisclosure();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
        totalAmount: reservationEntry.totalAmount,
        amountPaid: reservationEntry.amountPaid,
        arrivalStatus: reservationEntry.arrivalStatus
        },
    });


    const handleSubmit = () => {
        open()

        try {
            form.getValues()
        } catch (error) {
            console.error(error)
        }

        close()
    }


    return (
        <form onSubmit={handleSubmit}>

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
                data={['Booked', 'Checked-in', 'Checked-out']}
            />

            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>

        </form>
    );
}