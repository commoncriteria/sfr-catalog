// Imports
import Card from "../Components/Card.jsx";
import PropTypes from "prop-types";
import Dropdown from "../Components/Dropdown.jsx";
import { useState } from "react";

/**
 * The SFRCard class that displays the SFRCard filtering content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function SFRCard(props) {
    // Prop Validation
    SFRCard.propTypes = {
        allSfrs: PropTypes.array.isRequired,
        selections: PropTypes.array,
        handleSetSelectedSfrs: PropTypes.func.isRequired,
        handleSetSfrSearch: PropTypes.func
    };

    /**
     * Handles the dropdown select for sfrs
     * @param event the event handler
     */
    const handleDropdownSelect = (event, values) => {
        if (typeof values == "string") {
            props.handleSetSelectedSfrs([values])
        } else {
            props.handleSetSelectedSfrs(values)
        }
    };

    const handleTextInput = (event, newinputvalue, reason) => {
        // console.log(event);
        // console.log(newinputvalue);
        // console.log(reason);

        // event sometimes coming as null which clears out textfield
        // if (event) {
            if (reason === 'reset') {
                props.handleSetSfrSearch(null);
                return;
            } else {
                props.handleSetSfrSearch(newinputvalue);
            }

        // }

        


        // if (event) {
        //     let string = event.target.value;
        //     if (string != undefined) {
        //         // props.handleSetSfrSearch(string);
        //         setinp(string);
        //     }

        // }

    }

    // Return Function
    return (
        <div>
            <Card
                cardTitle={"SFRs"}
                cardContent={
                    <Dropdown
                        label={"SFR"}
                        multiselect={false}
                        options={props.allSfrs}
                        selections={props.selections}
                        handleDropdownSelect={handleDropdownSelect}
                        handleTextInput={handleTextInput}
                    />
                }
            />
        </div>
    )
}

// Export Class
export default SFRCard;