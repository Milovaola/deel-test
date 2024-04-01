import React from 'react'
import './style.css'

/**
 * A function that returns the highlighted text in case of a match, otherwise just the value.
 * @param text - Value of the list item.
 * @param inputValue - Value of the input field.
 */
export const getHighlightedText = (text: string, inputValue: string) => {
  //Find the index of the beginning of the matching text (case-insensitive)
  const index = text.toLowerCase().indexOf(inputValue.toLowerCase())

  // If no matches are found, return the text
  if (index === -1) {
    return text
  }

  // Split the text into three parts: before the match, the match, and after the match
  const beforeMatch = text.substring(0, index)
  const match = text.substring(index, index + inputValue.length)
  const afterMatch = text.substring(index + inputValue.length)

  return (
    <span>
      {beforeMatch}
      <span className="highlightText">{match}</span>
      {afterMatch}
    </span>
  )
}
