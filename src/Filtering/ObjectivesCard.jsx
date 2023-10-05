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
        selections: PropTypes.string,
        handleSetSelectedSecurityObjectives: PropTypes.func.isRequired
    };

    /**
     * Handles the dropdown select for objectives
     * @param event the event handler
     */
    const handleDropdownSelect = (event, values) => {
        props.handleSetSelectedSecurityObjectives(values)
    };

    // Return Function
    return (
        <Card
            cardTitle={"Objectives"}
            cardContent={
                <Dropdown
                    label={"Objective"}
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