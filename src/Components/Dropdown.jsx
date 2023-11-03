// Imports
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";

/**
 * The Dropdown class that displays a card type
 * @param props             the input props
 * @returns {JSX.Element}   the card content
 * @constructor             passes in props to the class
 */
function Dropdown(props) {
    // Prop Validation
    Dropdown.propTypes = {
        label: PropTypes.string.isRequired,
        multiselect: PropTypes.bool.isRequired,
        options: PropTypes.array.isRequired,
        selections: PropTypes.array,
        handleDropdownSelect: PropTypes.func.isRequired
    };

    // Return Function
    return (
        <div className="form-control">
            <Autocomplete
                multiple={props.multiselect}
                id={props.label}
                options={props.options}
                value={props.selections ? props.selections : []}
                getOptionLabel={(option) => option.toString()}
                isOptionEqualToValue={(option, value) => option == value[0]}
                onChange={props.handleDropdownSelect}
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
                        label={"Select " + props.label}
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
            <h5 className="text-gray-600 dark:text-gray-600 text-[14px] p-2 flex justify-center"> {props.label} Options: {props.options.length}</h5>
        </div>
    )
}

// Export Class
export default Dropdown;