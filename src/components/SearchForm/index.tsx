import React, { type ReactNode, useState, useEffect } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

import './index.css'

interface ISearchFormProps {
    selectedCity: string | null
    onSelect: (address: string) => void
}

const SearchForm = ({
    selectedCity,
    onSelect,
}: ISearchFormProps): ReactNode => {
    const [address, setAddress] = useState('')

    useEffect(() => {
        if (selectedCity !== null) {
            setAddress('')
        }
    }, [selectedCity])

    return (
        <div
            className={
                selectedCity !== null ? 'searchFormResult' : 'searchForm'
            }
        >
            <PlacesAutocomplete
                value={address}
                onChange={(address) => {
                    setAddress(address)
                }}
                onSelect={onSelect}
            >
                {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search for a city',
                                className: 'locationSearchInput',
                            })}
                            // value={address}
                        />

                        <div className="autocompleteDropdownContainer">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => (
                                <div
                                    {...getSuggestionItemProps(suggestion)}
                                    className={
                                        suggestion.active
                                            ? 'suggestionItem--active'
                                            : 'suggestionItem'
                                    }
                                    key={suggestion.placeId}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    )
}

export default SearchForm
