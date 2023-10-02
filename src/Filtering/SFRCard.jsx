// Imports
import FilterCard from "../Components/FilterCard.jsx";
import PropTypes from "prop-types";

/**
 * The SFRCard class that displays the SFRCard filtering content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function SFRCard(props) {
    // Prop Validation
    SFRCard.propTypes = {
        searchFunction: PropTypes.func.isRequired,
    };

    // Return Function
    return (
        <FilterCard
            cardTitle={"SFRs"}
            cardContent={ <h5 className="text-gray-600 dark:text-gray-600 p-4">SFR Selections</h5> }
            handleQuery={props.searchFunction}
        />
    )
}

// Export Class
export default SFRCard;