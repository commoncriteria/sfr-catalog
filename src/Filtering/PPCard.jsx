// Imports
import FilterCard from "../Components/FilterCard.jsx";
import PropTypes from "prop-types";

/**
 * The PPCard class that displays the PPCard tab content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function PPCard(props) {
    // Prop Validation
    PPCard.propTypes = {
        searchFunction: PropTypes.func.isRequired,
    };

    // Return Function
    return (
        <FilterCard
            cardTitle={"PPs"}
            cardContent={ <h5 className="text-gray-600 dark:text-gray-600 p-4">PP Selections</h5> }
            handleQuery={props.searchFunction}
        />
    )
}

// Export Class
export default PPCard;