import { render } from '@testing-library/react'
import LoginForm from '.'

it("should render", async () => {
    const mockLoginDetails = jest.fn()
    render(<LoginForm loginDetails={mockLoginDetails} />)
})