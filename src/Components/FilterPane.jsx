// Imports
import ThreatCard from "../Filtering/ThreatCard.jsx";
import ObjectivesCard from "../Filtering/ObjectivesCard.jsx";
import SFRCard from "../Filtering/SFRCard.jsx";
import PPCard from "../Filtering/PPCard.jsx";
import PropTypes from "prop-types";

/**
 * The FilterPane class that displays the filtering content sidebar
 * @param props             the input props
 * @returns {JSX.Element}   the tabs element
 * @constructor             passes in props to the class
 */
function FilterPane(props) {
    // Prop Validation
    FilterPane.propTypes = {
        allThreats: PropTypes.array.isRequired,
        allSecurityObjectives: PropTypes.array.isRequired,
        selectedThreats: PropTypes.array.isRequired,
        selectedSecurityObjectives: PropTypes.array.isRequired,
        handleSetAllThreats: PropTypes.func.isRequired,
        handleSetAllSecurityObjectives: PropTypes.func.isRequired,
        handleSetSelectedThreats: PropTypes.func.isRequired,
        handleSetSelectedSecurityObjectives: PropTypes.func.isRequired
    };

    // Functions
    /**
     * Handles the search for generic filter cards
     * @param items items to search
     * @param name name of FilterCard
     * @param query 'substring' to perform search on
     */
    const handleSearch = (items, name, query) => {
        console.log(items);
        console.log(query);
        let filteredItems = items;
        switch(name) {
            case "Threats":
                filteredItems = items.filter((threat)=>threat.includes(query));
                props.handleSetSelectedThreats(filteredItems);
                break;
            case "SecurityObjectives":
                filteredItems = items.filter((securityObjective)=>securityObjective.includes(query));
                props.handleSetSelectedSecurityObjectives(filteredItems);
                break;
            default:
                break;
        }

    };

    // Return Function
    return (
        <div className="h-full w-full rounded-lg mb-4">
            <div className="border-2 border-gray-400 rounded-xl p-3 bg-base-200 h-16 flex justify-center items-center">
                <h1 className="text-3xl font-bold text-accent">Filter</h1>
            </div>
            {/* Threat Filtering Card */}
            <div>
                {
                    props.allThreats != null ?
                    <ThreatCard
                        name={"Threats"}
                        allThreats={props.allThreats}
                        selections={props.selectedThreats}
                        searchFunction={handleSearch}
                        handleSelectedThreats={props.handleSetSelectedThreats}
                    />
                    : null
                }
            </div>
            {/* Objectives Filtering Card */}
            <div>
                {
                    props.allSecurityObjectives != null ?
                        <ObjectivesCard
                            name={"SecurityObjectives"}
                            allSecurityObjectives={props.allSecurityObjectives}
                            selections={props.selectedSecurityObjectives}
                            handleSelectedThreats={props.handleSetSelectedSecurityObjectives}
                            searchFunction={handleSearch}
                        />
                        : null
                }
            </div>
            {/* SFR Filtering Card */}
            <div>
                <SFRCard searchFunction={handleSearch}/>
            </div>
            {/* PP Filtering Card */}
            <div>
                <PPCard searchFunction={handleSearch}/>
            </div>
        </div>
    );
}

// Export Class
export default FilterPane;