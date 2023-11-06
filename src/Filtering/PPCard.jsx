// Imports
import Card from "../Components/Card.jsx";
import PropTypes from "prop-types";
import Dropdown from "../Components/Dropdown.jsx";

/**
 * The PPCard class that displays the PPCard tab content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function PPCard(props) {
    // Prop Validation
    PPCard.propTypes = {
        allPps: PropTypes.array.isRequired,
        selections: PropTypes.array,
        handleSetSelectedPps: PropTypes.func.isRequired,
        handleSetAllPps: PropTypes.func.isRequired
    };

    /**
     * Handles the dropdown select for pps
     * @param event the event handler
     */
    const handleDropdownSelect = (event, values) => {
        if (values.length != 0) { // if PP has been selected, remove from list of possible selections (all Pps)
            props.handleSetSelectedPps(values);
            // remove selected PPs from the list
            props.handleSetAllPps(props.allPps.filter((el) => !values.includes(el)));

            // if a selection has been removed, add it back to the list of possible selections (all Pps)
            if (props.selections) {
                if (values.length < props.selections.length) {
                    props.handleSetAllPps(props.allPps.concat(props.selections.filter(x => !values.includes(x))).sort());
                }
            }
        } else { // if selection is cleared out, set to null and set all Pps to the original list
            props.handleSetAllPps(props.allPps.concat(props.selections).sort());
            props.handleSetSelectedPps(null);
        }
    };

    // Return Function
    return (
        <div>
            <Card
                cardTitle={"PPs"}
                cardContent={
                    <Dropdown
                        label={"PP"}
                        multiselect={true}
                        options={props.allPps}
                        selections={props.selections}
                        handleDropdownSelect={handleDropdownSelect}
                    />
                }
            />
        </div>
    )
}

// Export Class
export default PPCard;