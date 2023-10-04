// Imports
import ThreatCard from "../Filtering/ThreatCard.jsx";
import ObjectivesCard from "../Filtering/ObjectivesCard.jsx";
import SFRCard from "../Filtering/SFRCard.jsx";
import PPCard from "../Filtering/PPCard.jsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import * as query from "../utils/query.js";
import SFRDatabase from "../assets/NIAPDocumentBundle.json";

/**
 * The FilterPane class that displays the filtering content sidebar
 * @param props             the input props
 * @returns {JSX.Element}   the tabs element
 * @constructor             passes in props to the class
 */
function FilterPane(props) {
    // Constants
    // Threats
    const [allThreats, setThreats] = useState(sessionStorage.getItem("allThreats") ? JSON.parse(sessionStorage.getItem("allThreats")) : null);
    // Security Objectives
    const [allSecurityObjectives, setSecurityObjectives] = useState(sessionStorage.getItem("allSecurityObjectives") ? JSON.parse(sessionStorage.getItem("allSecurityObjectives")) : null);
    // Filtered Threats
    const [filteredThreats, setFilteredThreats] = useState([]);
    // Filtered Security Objectives
    const [filteredSecurityObjectives, setFilteredSecurityObjectives] = useState([]);

    // Prop Validation
    FilterPane.propTypes = {
        selectedThreats: PropTypes.array.isRequired,
        selectedSecurityObjectives: PropTypes.array.isRequired,
        handleSetSelectedThreats: PropTypes.func.isRequired,
        handleSetSelectedSecurityObjectives: PropTypes.func.isRequired
    };

    // Use Effects
    /**
     * Use Effect to initialize the queries for the SFRDatabase
     */
    useEffect(() => {
        handleSetAllThreats(query.getThreats(SFRDatabase));
        handleSetAllSecurityObjectives(query.getSecurityObjectives(SFRDatabase));
        // set threats and objectives to show all possible options by default
        handleSetFilteredThreats(query.getThreats(SFRDatabase));
        handleSetFilteredSecurityObjectives(query.getSecurityObjectives(SFRDatabase))
    }, [SFRDatabase]);

    // Functions
    /**
     * Handles setting the threats
     * @param value The threat value
     */
    const handleSetAllThreats = (value) => {
        setThreats(value)
        sessionStorage.setItem("allThreats", JSON.stringify(value))
    }

    /**
     * Handles setting the security objectives
     * @param value The security objectives value
     */
    const handleSetAllSecurityObjectives = (value) => {
        setSecurityObjectives(value)
        sessionStorage.setItem("allSecurityObjectives", JSON.stringify(value))
    }

    /**
     * Handles setting the filtered threats
     * @param value The filtered threats value
     */
    const handleSetFilteredThreats = (value) => {
        setFilteredThreats(value)
    }

    /**
     * Handles setting the filtered security objectives
     * @param value The filtered security objectives value
     */
    const handleSetFilteredSecurityObjectives = (value) => {
        setFilteredSecurityObjectives(value)
    }

    /**
     * Handles the search for generic filter cards
     * @param items items to search
     * @param name name of FilterCard
     * @param query 'substring' to perform search on
     */
    const handleSearch = (items, name, query) => {
        let filteredItems = items;
        switch (name) {
            case "Threats":
                filteredItems = items.filter((threat) => threat.includes(query));
                handleSetFilteredThreats(filteredItems);
                break;
            case "SecurityObjectives":
                filteredItems = items.filter((securityObjective) => securityObjective.includes(query));
                handleSetFilteredSecurityObjectives(filteredItems);
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
                    allThreats != null ?
                        <ThreatCard
                            name={"Threats"}
                            allThreats={allThreats}
                            filters={filteredThreats}
                            selections={props.selectedThreats}
                            searchFunction={handleSearch}
                            handleSetFilteredThreats={handleSetFilteredThreats}
                            handleSelectedThreats={props.handleSetSelectedThreats}
                        />
                        : null
                }
            </div>
            {/* Objectives Filtering Card */}
            <div>
                {
                    allSecurityObjectives != null ?
                        <ObjectivesCard
                            name={"SecurityObjectives"}
                            allSecurityObjectives={allSecurityObjectives}
                            filters={filteredSecurityObjectives}
                            selections={props.selectedSecurityObjectives}
                            searchFunction={handleSearch}
                            handleSetFilteredSecurityObjectives={handleSetFilteredSecurityObjectives}
                            handleSetSelectedSecurityObjectives={props.handleSetSelectedSecurityObjectives}
                        />
                        : null
                }
            </div>
            {/* SFR Filtering Card */}
            <div>
                <SFRCard searchFunction={handleSearch} />
            </div>
            {/* PP Filtering Card */}
            <div>
                <PPCard searchFunction={handleSearch} />
            </div>
        </div>
    );
}

// Export Class
export default FilterPane;