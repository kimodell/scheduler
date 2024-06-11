import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  fireEvent,
  prettyDOM,
  getByText,
  findByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  findByAltText
} from "@testing-library/react";

import Application from "components/Application";

// Cleanup after each test to remove any leftover state
afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    // Render the Application component and extract necessary query functions
    const { queryByText, getByText, findByText } = render(<Application />);

    // Promise chain hidden using await to wait for "Monday" to appear
    await findByText("Monday");

    // Simulate a click on the "Tuesday" button and assert that "Leopold Silvers" is present after clicking "Tuesday"
    fireEvent.click(getByText("Tuesday"));
    expect(queryByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    // Promise chain hidden using await to wait for "Archie Cohen" to appear
    await findByText(container, "Archie Cohen");

    // Get all appointment elements in the container
    const appointments = getAllByTestId(container, "appointment");
    // Select the first appointment
    const appointment = appointments[0];

    // Simulate a click on the "Add" button in the first appointment
    fireEvent.click(getByAltText(appointment, "Add"));

    // Simulate typing a student's name in the input field
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // Simulate selecting an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Simulate clicking the "Save" button
    fireEvent.click(getByText(appointment, "Save"));

    // Assert that the "Saving" indicator is displayed    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait for the newly added student's name to appear in the appointment 
    await findByText(appointment, "Lydia Miller-Jones");

    // Find the "Monday" day element in the container
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

    // Assert that there are "no spots remaining" for Monday
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await findByAltText(appointment, "Add");

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

    debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");

    // 3. Click the "Add" button on the first empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Frodo Baggins" },
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Wait for the newly added student's name to appear in the appointment 
    await findByText(appointment, "Frodo Baggins");

    // 9. Click the "Edit" button
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 10. Change the student name from "Frodo Baggins" to "Bilbo Baggins"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Bilbo Baggins" },
    });

    // 11. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 12. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 13. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    debug();

  });

  it("shows the save error when failing to save an appointment", async () => {
    // Mock display error message
    axios.put.mockRejectedValueOnce(new Error("Could not save appointment"));

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");

    // 3. Click the "Add" button on the first empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check that the saving error message is displayed.
    await findByText(appointment, "Could not save appointment");

    debug();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce(new Error("Could not delete appointment"));

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await findByText(container, "Archie Cohen");

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the saving error message is displayed.
    await findByText(appointment, "Could not delete appointment");

    debug();
  });


});

