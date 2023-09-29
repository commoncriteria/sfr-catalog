// Imports
import FilterCard from "../Components/FilterCard.jsx";

/**
 * The PPCard class that displays the PPCard tab content
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function PPCard() {
    // Return Function
    return (
        <FilterCard
            cardTitle={"PPs"}
            cardContent={ <h5 className="text-gray-600 dark:text-gray-600 p-4">PP Selections</h5> }
        />
    )
}

// Export Class
export default PPCard;