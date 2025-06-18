import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextField } from "@mui/material";

// Debounce function
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

const getAutocompleteOptions = async (term, tableName, columnName) => {
    if (!term || term.trim().length < 1) {
        return [];
    }
    try {
        const query = new URLSearchParams({
            term: term.trim(),
            table: tableName,
            column: columnName
        });

        const response = await fetch(
            `http://localhost:8000/v1/civitas_akademika/autocomplete?${query.toString()}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            console.error(`Error fetching autocomplete options: ${response.status} ${response.statusText}`);
            return [];
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Network or JSON error:', error);
        return [];
    }
};


    const AutoComplete = ({
        initialValue,
        value,
        onChange, 
        onSelection,
        textFieldLabel = "cth: ", 
        placeholder = "isi disini",
        name,
        suggestionDisplayField = "nama",
        suggestionValueField = "id", 
        tableName,
        columnName,
    }) => {
        const [inputValue, setInputValue] = useState(initialValue);
        const [suggestions, setSuggestions] = useState([]);
        const [showSuggestions, setShowSuggestions] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const autocompleteRef = useRef(null);
        const [ignoreNextEffect, setIgnoreNextEffect] = useState(false);
        const ignoreNextEffectRef = useRef(false);
        const [isFocused, setIsFocused] = useState(false);



        const handleFocus = () => {
            setIsFocused(true);
            if (inputValue && inputValue.trim().length >= 1 && suggestions.length > 0) {
                setShowSuggestions(true);
            }
        };
        
        const handleBlur = () => {
            setIsFocused(false);
            setShowSuggestions(false);
        };

        const debouncedFetchSuggestions = useCallback(
            debounce(async (term) => {
                if (term && term.trim().length >= 1) {
                    setIsLoading(true);
                    const fetchedOptions = await getAutocompleteOptions(term, tableName, columnName); // <- pass additional args
                    setSuggestions(fetchedOptions);
                    setIsLoading(false);
                    setShowSuggestions(fetchedOptions.length > 0);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                    setIsLoading(false);
                }
            }, 300),
            [tableName, columnName] 
        );


        useEffect(() => {
            if (ignoreNextEffectRef.current) {
                ignoreNextEffectRef.current = false;
                return;
            }
            debouncedFetchSuggestions(inputValue);
        }, [inputValue, debouncedFetchSuggestions]);

        useEffect(() => {
            if (value !== undefined && value !== inputValue) {
                setInputValue(value);
            }
        }, [value]);

        const handleInputChange = (event) => {
            const newValue = event.target.value;
            setInputValue(newValue);
            if (onChange) {
                const syntheticEvent = newValue
                onChange(syntheticEvent); 
            }
        };

        const handleSuggestionClick = (suggestion) => {
            // const valueToSetInInput = String(suggestion[suggestionValueField] || suggestion.label || suggestion.id);
            const valueToSetInInput = String(suggestion[suggestionValueField] || suggestion.label || suggestion.id);
            
            ignoreNextEffectRef.current = true;
            setInputValue(valueToSetInInput);

            if (onChange) {
                const syntheticEvent = suggestion;
                onChange(syntheticEvent);
            }

            if (onSelection) {
                onSelection(suggestion);
            }

            setSuggestions([]);
            setShowSuggestions(false);
        };


        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setShowSuggestions(false);
            }

            if (event.key === 'Enter') {
                setShowSuggestions(false);
                if (onChange) {
                    onChange(inputValue); 
                }
            }
        };

    return (
        <div className="autocomplete" ref={autocompleteRef} style={{ position: 'relative', width: '100%' }}>
            <TextField
                size="small"
                variant="outlined"
                label={textFieldLabel}
                sx={{ width: '100%' }}
                name={name}
                placeholder={placeholder}
                value={value !== undefined ? value : inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {/* {isLoading && (
                <div className="loading-indicator" style={{ padding: '8px 0', fontSize: '0.9em', color: '#555', textAlign: 'left' }}>
                    Loading...
                </div>
            )} */}
            {isFocused && showSuggestions && suggestions.length > 0 && (
                <ul
                    className="suggestions"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        listStyleType: 'none',
                        margin: '4px 0 0 0',
                        padding: 0,
                        zIndex: 1000,
                        maxHeight: '200px',
                        overflowY: 'auto',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={suggestion.nomor_induk || suggestion.nim || index}
                            onMouseDown={() => handleSuggestionClick(suggestion)} // <-- use onMouseDown
                            style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            role="option"
                            aria-selected={false}
                        >
                            {suggestion[suggestionDisplayField] || suggestion.nomor_induk || suggestion.nama}
                        </li>
                    ))}
                </ul>
            )}
            {showSuggestions && !isLoading && suggestions.length === 0 && inputValue && inputValue.trim().length >= 1 && (
                 <div
                    className="no-suggestions"
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        border: '1px solid #ccc',
                        borderTop: 'none',
                        backgroundColor: '#fafafa',
                        padding: '10px',
                        zIndex: 999,
                        color: '#777',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                 >
                    No suggestions found.
                </div>
            )}
        </div>
    );
};

export default AutoComplete;