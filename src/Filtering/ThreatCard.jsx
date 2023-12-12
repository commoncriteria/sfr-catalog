// This software was produced for the U.S.Government under Basic Contract No.W56KGU - 18 - D-0004,
//   and is subject to the Rights in Noncommercial Computer Software and Noncommercial Computer Software
//   Documentation Clause 252.227 - 7014(FEB 2014)

//   © 2023 The MITRE Corporation.

// Imports
import PropTypes from "prop-types";
import Card from "../Components/Card.jsx";
import Dropdown from "../Components/Dropdown.jsx";

/**
 * The ThreatCard class that displays the ThreatCard filtering content
 * @returns {JSX.Element}   the tab content
 * @param props             the input props
 * @constructor             passes in props to the class
 */
function ThreatCard(props) {
    // Prop Validation
    ThreatCard.propTypes = {
        allThreats: PropTypes.array.isRequired,
        selections: PropTypes.array,
        handleSetSelectedThreats: PropTypes.func.isRequired
    };

    /**
     * Handles the dropdown select for threats
     * @param event the event handler
     */
    const handleDropdownSelect = (event, values) => {
        if (typeof values == "string") {
            props.handleSetSelectedThreats([values])
        } else {
            props.handleSetSelectedThreats(values)
        }
    };

    // Return Function
    return (
        <div>
            <Card
                cardTitle={"Threats & Assumptions"}
                cardContent={
                    <Dropdown
                        label={"Threat/Assumption"}
                        multiselect={false}
                        options={props.allThreats}
                        selections={props.selections}
                        handleDropdownSelect={handleDropdownSelect}
                    />
                }
            />
        </div>
    )
}

// Export Class
export default ThreatCard;