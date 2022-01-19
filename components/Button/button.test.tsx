import { render } from '@testing-library/react'
import Button from '.'

it("should render", async () => {
    const mockTitle = "TestTitle"
    const mockLink = "/home"
    render(<Button title={mockTitle} link={mockLink} />)
})