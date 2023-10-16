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
        handleSetSelectedPps: PropTypes.func.isRequired
    };

    /**
     * Handles the dropdown select for pps
     * @param event the event handler
     */
    const handleDropdownSelect = (event, values) => {
         if (typeof values == "string") {
             if (!props.selections.includes(values)) {
                 props.handleSetSelectedPps([values])
             }
         } else {
             if (values && Object.keys(values).length === 0) {
                 props.handleSetSelectedPps(null)
             } else {
                 if (values && Object.keys(values).length !== 0) {
                     let filtered = (values.filter((item, index) => values.indexOf(item) === index)).sort()
                     props.handleSetSelectedPps(filtered)
                 } else {
                     props.handleSetSelectedPps(values)
                 }
             }
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