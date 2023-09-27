// Imports
import FilterCard from "../Components/FilterCard.jsx";

/**
 * The ThreatCard class that displays the ThreatCard filtering content
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function ThreatCard() {
    // Return Function
    return (
       <div>
           <FilterCard
               cardTitle={"Threats"}
               cardContent={ <h5 className="text-gray-600 dark:text-gray-600 p-4">Threat Selections</h5> }
           />
       </div>
    )
}

// Export Class
export default ThreatCard;