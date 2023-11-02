// Imports
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import * as query from "../utils/query.js";
import SFRDatabase from "../assets/NIAPDocumentBundle.json";

/**
 * The Dropdown class that displays a card type
 * @param props             the input props
 * @returns {JSX.Element}   the card content
 * @constructor             passes in props to the class
 */
function SearchDropdown(props) {
    // Prop Validation
    SearchDropdown.propTypes = {
        label: PropTypes.string.isRequired,
        selections: PropTypes.array,
        filteredSfrs: PropTypes.array.isRequired,
        inputValue: PropTypes.string.isRequired,
        sfrQuery: PropTypes.string,
        handleInputValue: PropTypes.func.isRequired,
        handleSetSelectedSfrs: PropTypes.func.isRequired,
        handleSetSfrQuery: PropTypes.func.isRequired,
        allSfrs: PropTypes.array.isRequired,
    };

    /**
     * Adds ability for options to be filtered on search and sfr keys, in order to search and have dropdown be sfr options
     * @type {(options: unknown[], state: FilterOptionsState<unknown>) => unknown[]}
     */
    const filterOptions = createFilterOptions({
        stringify: (option) => option.search + option.sfr
    });

    /**
     * Handles setting the sfrs
     * @param value The sfr value
     */
    const handleSearchResults = (value) => {
        let sfrToPP = query.stringToSFR(SFRDatabase, value);
        if (sfrToPP) {
            props.handleSetSfrQuery(value, sfrToPP)
        } else {
            props.handleSetSfrQuery(value, [])
        }
    }

    /**
     * Handles the dropdown select for sfrs
     * @param event the event handler
     * @param values the values selected from the dropdown
     */
    const handleDropdownSelect = (event, values) => {
        if (typeof values == "string") {
            props.handleSetSelectedSfrs([values])
        } else if (typeof values == "object") {
            // when cleared out, becomes null, which is an object; only want to set when there is an actual value
            if (values) {
                props.handleSetSelectedSfrs([values.sfr])
            } else {
                props.handleSetSelectedSfrs(null)
            }
        } else {
            props.handleSetSelectedSfrs(values)
        }
    };

    /**
     * Handles the text input for the search dropdown
     * @param event             The current event
     * @param newInputValue     The new input value
     * @param reason            The reason for the input (clear, reset or input)
     */
    const handleTextInput = (event, newInputValue, reason) => {
        props.handleInputValue(newInputValue)
        if (newInputValue) {
            if (reason === 'reset') {
                handleSearchResults(props.sfrQuery.valueOf());
            } else if (reason === 'input') {
                handleSearchResults(newInputValue);
            }
        } else {
            handleSearchResults(null);
        }
    }

    // Return Function
    return (
        <div className="form-control">
            {/*Remove After testing*/}
            {/*{<div style={{color: "black"}}>{`value: ${props.selections !== null ? `'${props.selections}'` : 'null'}`}</div>}*/}
            {/*{<div style={{color: "black"}}>{`inputValue: '${props.inputValue !== null ? props.inputValue : ''}'`}</div>}*/}
            <Autocomplete
                multiple={false}
                id={props.label}
                getOptionLabel={(option) => option.sfr || props.inputValue}
                // Remove after testing
                // isOptionEqualToValue={(option, value) => option.search === value.search}
                value={props.selections ? props.selections : []}
                onChange={(event, newValue) => {
                    handleDropdownSelect(event, newValue);
                }}
                inputValue={props.inputValue}
                onInputChange={(event, newInputValue, reason) => {
                    handleTextInput(event, newInputValue, reason);
                }}
                options={props.filteredSfrs ? props.filteredSfrs : []}
                filterOptions={filterOptions}
                className={"m-2"}
                sx={{
                    "root": {
                        margin: 2,
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                        borderWidth: "2px !important",
                        borderColor: "#1FB2A6 !important",
                        borderRadius: "6px",
                        fontSize: "18px",
                    },
                    ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E051BA !important",
                        borderWidth: "3px !important",
                        fontSize: "19px",
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.label}
                        variant="outlined"
                        size={"medium"}
                        InputLabelProps={{
                            sx: {
                                "color": "#17877D",
                                "fontSize": "18px",
                                "fontWeight": "normal",
                                "&.Mui-focused": {
                                    color: "#E051BA",
                                    "fontWeight": "bold",
                                },
                            },
                            type: 'search',
                        }}
                    />
                )}
            />
            <h5 className="text-gray-600 dark:text-gray-600 text-[14px] p-2 flex justify-center"> {props.label} Options: {props.filteredSfrs.length}</h5>
        </div>
    )
}

// Export Class
export default SearchDropdown;