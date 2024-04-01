import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import { useFetchSuggestions } from './autocomplete/use-fetch-suggestions'

jest.mock('./autocomplete/fetch', () => ({
  useFetchSuggestions: jest.fn(),
}))

describe('Test Autocomplete component', () => {
  beforeEach(() => {
    ;(useFetchSuggestions as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      suggestions: [{ name: 'Monaco', value: 'Monaco' }],
    })
  })

  it('renders input field', () => {
    render(<App />)
    const inputElement = screen.getByRole('input')
    expect(inputElement).toBeInTheDocument()
  })

  it('shows dropdown on input focus', async () => {
    render(<App />)
    const inputElement = screen.getByRole('input')
    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, { target: { value: 'mon' } })
    const listItemElement = await screen.findByRole('listitem')
    expect(listItemElement).toBeInTheDocument()
  })

  it('changes input value on option select', async () => {
    render(<App />)
    const inputElement: HTMLInputElement = screen.getByRole('input')
    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, { target: { value: 'mon' } })
    const listItemElement = await screen.findByRole('listitem')
    fireEvent.click(listItemElement)
    expect(inputElement.value).toBe('Monaco')
  })
})
