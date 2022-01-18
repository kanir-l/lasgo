import { render, screen } from '@testing-library/react'
import { ProfileInterface } from '../../interfaces/User'
import Header from '.'

it("should render", () => {
    const mockCurrentUser = {
        id: 123,
        userName: "Test"
    }

    render(<Header currentUser={mockCurrentUser} />)
    /* const component = screen.getByTestId("header")
    expect(component).toBeInTheDocument() */

})