import { useEffect, useState } from 'react'
import axios from 'axios'

export interface Option {
  value: string
  name: string
}

/**
 * Interface of the country object.
 */
export interface CountryEntity {
  name: {
    common: string
    nativeName: {
      eng: {
        common: string
        official: string
      }
    }
    official: string
  }
}

// Hook to request a list of suggestions.
export const useFetchSuggestions = (
  query: string
): {
  isLoading: boolean
  error: Error | null
  suggestions: Option[]
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [suggestions, setSuggestions] = useState<Option[]>([])

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          'https://restcountries.com/v3.1/all?fields=name'
        )

        const newSuggestions = response.data.reduce(
          (acc: Option[], { name }: CountryEntity) => {
            if (name.common.toLowerCase().includes(query.toLowerCase())) {
              acc.push({ name: name.common, value: name.common })
            }
            return acc
          },
          []
        )

        // In case there are suggestions, we fill an array
        setSuggestions(newSuggestions)
      } catch (error: any) {
        // In case of an error, throw it away
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (query.trim() !== '') {
      setIsLoading(true)
      fetchSuggestions()
    } else {
      setSuggestions([])
      setError(null)
      setIsLoading(false)
    }
  }, [query])

  return {
    isLoading,
    error,
    suggestions,
  }
}
