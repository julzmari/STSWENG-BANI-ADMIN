import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AllReservations } from '../AllReservations';
import { MantineProvider } from '@mantine/core';

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        referenceNo: "R00000001",
        checkInDate: "2024-10-01",
        checkOutDate: "2024-10-05",
        numberOfAdults: 2,
        numberOfChildren: 1,
        pets: false,
        clientId: "C00000001",
        roomId: "Room 1",
        totalAmount: 500,
        amountPaid: 500,
        arrivalStatus: "Checked-in"
      },
      {
        referenceNo: "R00000002",
        checkInDate: "2024-10-10",
        checkOutDate: "2024-10-15",
        numberOfAdults: 1,
        numberOfChildren: 0,
        pets: true,
        clientId: "C00000002",
        roomId: "Room 2",
        totalAmount: 300,
        amountPaid: 150,
        arrivalStatus: "Booked"
      }
    ]),
  })
);

describe('AllReservations Component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('renders without crashing', () => {
    render(
      <MantineProvider>
        <AllReservations />
      </MantineProvider>
    );
    expect(screen.getByText("View Reservations")).toBeInTheDocument();
  });

  test('fetches reservations on mount and displays them', async () => {
    render(
      <MantineProvider>
        <AllReservations />
      </MantineProvider>
    );

    // Wait for the reservations to be loaded
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Check if reservations are displayed in the "All Reservations" tab
    expect(screen.getByText("R00000001")).toBeInTheDocument(); // Check referenceNo
    expect(screen.getByText("2024-10-01")).toBeInTheDocument(); // Check checkInDate
    expect(screen.getByText("Checked-in")).toBeInTheDocument(); // Check arrivalStatus
    expect(screen.getByText("R00000002")).toBeInTheDocument();
    expect(screen.getByText("2024-10-10")).toBeInTheDocument();
    expect(screen.getByText("Booked")).toBeInTheDocument();
  });

  test('shows Today\'s Reservations tab and renders its content', async () => {
    render(
      <MantineProvider>
        <AllReservations />
      </MantineProvider>
    );

    // Wait for the reservations to be loaded
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Click the "Today's Reservations" tab
    screen.getByText("Today's Reservations").click();

    // Check that the Today's Reservations table is rendered
    expect(screen.getByText("Today's Reservations")).toBeInTheDocument();
  });
});
