import FilterCard from "../Components/FilterCard.jsx";

/**
 * The ObjectivesCard class that displays the ObjectivesCard filtering content
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function ObjectivesCard() {
    // Return Function
    return (
        <FilterCard
            cardTitle={"Objectives"}
            cardContent={ <h5 className="text-gray-600 dark:text-gray-600 p-4">Objective Selections</h5> }
        />
    )
}

// Export Class
export default ObjectivesCard;