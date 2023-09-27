// Imports
import FilterCard from "../Components/FilterCard.jsx";

/**
 * The SFRCard class that displays the SFRCard filtering content
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function SFRCard() {
    // Return Function
    return (
        <FilterCard
            cardTitle={"SFRs"}
            cardContent={ <h5 className="text-gray-600 dark:text-gray-600 p-4">SFR Selections</h5> }
        />
    )
}

// Export Class
export default SFRCard;