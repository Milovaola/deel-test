import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useFetchSuggestions } from './use-fetch-suggestions'
import { useDebounce } from '../utils'
import { getHighlightedText } from './highlighted-text'
import './style.css'

export const AutocompleteInput: React.FC = () => {
  // The state of the value of the input field.
  const [value, setValue] = React.useState<string>('')
  // The state of visibility of the dropdown.
  const [opened, setOpened] = React.useState<boolean>(false)
  // Refs for the input and dropdown elements.
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLUListElement>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)

      // If the input field is focused and the dropdown is not visible, we show the dropdown.
      if (document.activeElement === inputRef.current && !opened) {
        setOpened(true)
      }
    },
    [opened]
  )

  // Using useDebounce would help reduce the number of requests sent to the server.
  const debouncedValue = useDebounce(value, 300)

  const { isLoading, error, suggestions } = useFetchSuggestions(debouncedValue)

  const handleFocus = useCallback(() => {
    if (!opened) {
      setOpened(true)
    }
  }, [opened])

  const handleSelectOption = useCallback((value: string) => {
    setValue(value)
    setOpened(false)

    // After selecting an option, we return the focus to the input field.
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Check if the user pressed the Enter key, we select the option.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, name: string) => {
      if (opened) {
        switch (e.key) {
          case 'Enter':
            handleSelectOption(name)
            break
          case 'Escape':
            setOpened(false)
            break
          default:
            break
        }
      }
    },
    [opened, handleSelectOption]
  )

  // Check if there is a click outside the input or dropdown, we close the dropdown.
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(e.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpened(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const showDropdown = useMemo(
    () => opened && (isLoading || error || suggestions.length > 0),
    [opened, isLoading, error, suggestions]
  )

  return (
    <>
      <input
        value={value}
        onFocus={handleFocus}
        type="text"
        onChange={handleChange}
        className="input"
        ref={inputRef}
        role="input"
        placeholder="Enter country..."
      />
      {showDropdown && (
        <ul className="dropdown" ref={dropdownRef} role="listbox">
          {isLoading ? (
            <li className="dropdown-listItem">Loading...</li>
          ) : (
            <>
              {Boolean(error) && (
                <li className="dropdown-listItem error">{error?.message}</li>
              )}
              {suggestions.length > 0 && (
                <>
                  {suggestions.map(({ name }, index) => (
                    <li
                      className="dropdown-listItem"
                      key={index}
                      onClick={() => handleSelectOption(name)}
                      onKeyDown={(e) => handleKeyDown(e, name)}
                      tabIndex={0}
                      role="listitem"
                    >
                      {getHighlightedText(name, value)}
                    </li>
                  ))}
                </>
              )}
            </>
          )}
        </ul>
      )}
    </>
  )
}

AutocompleteInput.displayName = 'AutocompleteInput'
