import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

import "./index.css";

interface ISearchFormProps {
  onSelect: (address: string) => void;
}

const SearchForm = ({ onSelect }: ISearchFormProps) => {
  const [address, setAddress] = useState("");

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(address) => setAddress(address)}
      onSelect={onSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Search for a city",
              className: "location-search-input",
            })}
          />
          
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => (
              <div
                {...getSuggestionItemProps(suggestion)} 
                className={suggestion.active ? "suggestion-item--active" : "suggestion-item"}
                key={suggestion.placeId}
              >
                <span>{suggestion.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default SearchForm;
