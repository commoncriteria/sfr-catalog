// This software was produced for the U.S.Government under Basic Contract No.W56KGU - 18 - D-0004,
//   and is subject to the Rights in Noncommercial Computer Software and Noncommercial Computer Software
//   Documentation Clause 252.227 - 7014(FEB 2014)

//   © 2023 The MITRE Corporation.

import PropTypes from "prop-types";
import Card from "../Components/Card.jsx";
import Dropdown from "../Components/Dropdown.jsx";

/**
 * The ObjectivesCard class that displays the ObjectivesCard filtering content
 * @returns {JSX.Element}   the tab content
 * @param props             the input props
 * @constructor             passes in props to the class
 */
function ObjectivesCard(props) {
    // Prop Validation
    ObjectivesCard.propTypes = {
        allSecurityObjectives: PropTypes.array.isRequired,
        selections: PropTypes.array,
        handleSetSelectedSecurityObjectives: PropTypes.func.isRequired
    };

    /**
     * Handles the dropdown select for objectives
     * @param event the event handler
     */
    const handleDropdownSelect = (event, values) => {
        if (typeof values == "string") {
            props.handleSetSelectedSecurityObjectives([values])
        } else {
            props.handleSetSelectedSecurityObjectives(values)
        }
    };

    // Return Function
    return (
        <Card
            cardTitle={"Objectives"}
            cardContent={
                <Dropdown
                    label={"Objective"}
                    multiselect={false}
                    options={props.allSecurityObjectives}
                    selections={props.selections}
                    handleDropdownSelect={handleDropdownSelect}
                />
            }
        />
    )
}

// Export Class
export default ObjectivesCard;