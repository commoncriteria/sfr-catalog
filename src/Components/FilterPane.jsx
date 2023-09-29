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
        <div className="h-full w-full rounded-lg">
            <div className="border-2 border-gray-400 rounded-xl p-3 bg-base-200 h-16 flex justify-center items-center">
                <h1 className="text-3xl font-bold text-accent">Filter</h1>
            </div>
            {/* Threat Filtering Card */}
            <div className="py-4">
                <ThreatCard/>
            </div>
            {/* Objectives Filtering Card */}
            <div className="pb-4">
                <ObjectivesCard/>
            </div>
            {/* SFR Filtering Card */}
            <div className="pb-4">
                <SFRCard/>
            </div>
            {/* PP Filtering Card */}
            <div>
                <PPCard/>
            </div>
        </div>
    );
}

// Export Class
export default FilterPane;