import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SignupForm from '.'

it("show the form detail input", () => {
    const mockSubmit = jest.fn()
    const mockError = jest.fn()
    const { getByLabelText, getByText } = render(<SignupForm addForm={mockSubmit} error={mockError}/>)
    const inputValue = "Test"

    fireEvent.change(getByLabelText(/message/i), {target: {value: inputValue}})
    fireEvent.click(getByText(/ok/i))

    expect(onSubmit).toBeCalled();
})