import React from "react";

import { render, cleanup, fireEvent, getByText, queryByText } from "@testing-library/react";

import Form from "components/Appointment/Form";

// Cleanup after each test to remove any leftover state
afterEach(cleanup);

describe("Form", () => {

  // Define a list of interviewers to be used in the tests
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
    // Assert that the input field for student name is empty
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    // Assert that the input field has the initial student name value
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    // Create the mock onSave function
    const onSave = jest.fn();

    // Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    // Simulate a click on the save button
    fireEvent.click(getByText("Save"));

    // Assert that an error message is displayed and onSave was not called
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();

    // Render the Form with a student name but no interviewer selected
    const { getByText } = render(
      <Form name="Sylvia Palmer" onSave={onSave} interviewers={interviewers} interviewer={null} />
    );
    
    // Simulate a click on the save button
    fireEvent.click(getByText("Save"));

    // Assert that an error message is displayed and onSave was not called
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();

    // Render the Form with interviewers and an interviewer selected
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );

    fireEvent.click(getByText("Save"));
    
    // Assert that an error message is displayed and onSave was not called
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    // Simulate entering a student name
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));
  
    // Assert that the error message is no longer displayed
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    // Assert that onSave was called once with the correct arguments
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();

    // Render the Form with an initial student name
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText("Save"));

    // Simulate changing the student name
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // Simulate a click on the cancel button
    fireEvent.click(getByText("Cancel"));

    // Assert that the error message is no longer displayed
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    // Assert that the input field is reset to empty
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    // Assert that onCancel was called once
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});