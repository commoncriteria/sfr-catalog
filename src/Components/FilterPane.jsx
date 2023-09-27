// Imports
import ThreatCard from "../Filtering/ThreatCard.jsx";
import ObjectivesCard from "../Filtering/ObjectivesCard.jsx";
import SFRCard from "../Filtering/SFRCard.jsx";
import PPCard from "../Filtering/PPCard.jsx";

/**
 * The FilterPane class that displays the filtering content sidebar
 * @returns {JSX.Element}   the tabs element
 * @constructor             passes in props to the class
 */
function FilterPane() {
    // Return Function
    return (
        <div className="m-2 bg-neutral border-2 border-gray-500 rounded-lg h-full">
            <div className="m-2.5 border-2 border-gray-400 rounded-xl p-3 bg-base-200 h-16">
                <h1 className="text-3xl font-bold text-accent">Filter</h1>
            </div>
            {/* Threat Filtering Card */}
            <div className="m-3">
                <ThreatCard/>
            </div>
            {/* Objectives Filtering Card */}
            <div className="m-3">
                <ObjectivesCard/>
            </div>
            {/* SFR Filtering Card */}
            <div className="m-3">
                <SFRCard/>
            </div>
            {/* PP Filtering Card */}
            <div className="m-3 -mb-1">
                <PPCard/>
            </div>
        </div>
    );
}

// Export Class
export default FilterPane;