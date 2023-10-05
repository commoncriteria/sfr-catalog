// Imports
import Card from "../Components/Card.jsx";
import PropTypes from "prop-types";
import Dropdown from "../Components/Dropdown.jsx";

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
        selections: PropTypes.string,
        handleSetSelectedSfrs: PropTypes.func.isRequired
    };

    /**
     * Handles the dropdown select for sfrs
     * @param event the event handler
     */
    const handleDropdownSelect = (event, values) => {
        props.handleSetSelectedSfrs(values)
    };

    // Return Function
    return (
        <div>
            <Card
                cardTitle={"SFRs"}
                cardContent={
                    <Dropdown
                        label={"SFR"}
                        options={props.allSfrs}
                        selections={props.selections}
                        handleDropdownSelect={handleDropdownSelect}
                    />
                }
            />
        </div>
    )
}

// Export Class
export default SFRCard;