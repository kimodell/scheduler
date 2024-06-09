import React from "react";

import { render, cleanup, fireEvent, getByText, prettyDOM, getAllByTestId, findByText, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

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
    const { container, debug } = render(<Application />);

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
});

