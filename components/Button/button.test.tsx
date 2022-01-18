import { render, screen } from '@testing-library/react'
import Button from '.'

it("should render", () => {
    const mockTitle = "TestTitle"
    const mockLink = "/home"
    render(<Button title={mockTitle} link={mockLink} />)
})