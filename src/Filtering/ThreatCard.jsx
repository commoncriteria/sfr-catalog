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
        selections: PropTypes.string,
        handleSetSelectedThreats: PropTypes.func.isRequired
    };

    /**
     * Handles the dropdown select for threats
     * @param event the event handler
     */
    const handleDropdownSelect = (event, values) => {
        props.handleSetSelectedThreats(values)
    };

    // Return Function
    return (
        <div>
            <Card
                cardTitle={"Threats"}
                cardContent={
                    <Dropdown
                        label={"Threat"}
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