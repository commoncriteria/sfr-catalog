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
    // SFRs
    const [allSfrs, setSfrs] = useState(sessionStorage.getItem("allSfrs") ? JSON.parse(sessionStorage.getItem("allSfrs")) : null);
    // PPs
    const [allPps, setPps] = useState(sessionStorage.getItem("allPps") ? JSON.parse(sessionStorage.getItem("allPps")) : null);

    // Prop Validation
    FilterPane.propTypes = {
        selectedThreats: PropTypes.array,
        selectedSecurityObjectives: PropTypes.array,
        selectedSfrs: PropTypes.array,
        selectedPps: PropTypes.array,
        handleSetSelectedThreats: PropTypes.func.isRequired,
        handleSetSelectedSecurityObjectives: PropTypes.func.isRequired,
        handleSetSelectedSfrs: PropTypes.func.isRequired,
        handleSetSelectedPps: PropTypes.func.isRequired,
    };

    // Use Effects
    /**
     * Use Effect to initialize the queries for the SFRDatabase
     */
    useEffect(() => {
        try {
            // Load in all data for filters if nothing has been selected
            if (!props.selectedThreats && !props.selectedSecurityObjectives && !props.selectedSfrs && !props.selectedPps) {
                handleSetAllThreats(query.getThreats(SFRDatabase).sort());
                handleSetAllSecurityObjectives(query.getSecurityObjectives(SFRDatabase).sort());
                handleSetAllSfrs(query.getSfrs(SFRDatabase).sort())
                handleSetAllPps(null)
            }
        } catch (e) {
            console.log(e)
        }
    }, [SFRDatabase]);

    /**
     * Use Effect for updating other filter types based on selected threat update
     */
    useEffect(() => {
        // Update threats to select value automatically if the allThreats array has one entry
        isOnlyOneOptionAvailable("Threats", allThreats, props.selectedThreats)

        // Update objectives when threats are updated
        updatedObjectivesForThreatSelection(props.selectedThreats)
    }, [props.selectedThreats])

    /**
     * Use Effect for updating other filter types based on selected objective update
     */
    useEffect(() => {
        // Update objectives to select value automatically if the allSecurityObjectives array has one entry
        isOnlyOneOptionAvailable("Objective", allSecurityObjectives, props.selectedSecurityObjectives)
    }, [props.selectedSecurityObjectives])

    /**
     * Use Effect for updating other filter types based on selected sfr update
     */
    useEffect(() => {
        // Update sfrs to select value automatically if the allSfrs array has one entry
        isOnlyOneOptionAvailable("SFR", allSfrs, props.selectedSfrs)
    }, [props.selectedSfrs])

    // Functions
    /**
     * Handles filtering the objectives based on the threat selected
     * @param threats   The selected threats value
     */
    const updatedObjectivesForThreatSelection = (threats) => {
        // If threats are not empty, update query to be threat specific
        // Otherwise, get all security objectives
        let updatedObjectives = threats ? query.ThreatToSecurityObjective(SFRDatabase, threats[0]) : query.getSecurityObjectives(SFRDatabase).sort();
        // Initialize updated selections to null
        let updatedSelections = null

        // Set security objectives to the newly updated objectives
        handleSetAllSecurityObjectives(updatedObjectives);

        // If the previously selected security objectives are not empty, adjust the selected objective if it is
        // still in the updated objectives array
        if (threats && updatedObjectives && props.selectedSecurityObjectives) {
            // Work through the selected objectives array and add selections if they are still in the array
            if (Object.keys(props.selectedSecurityObjectives).length !== 0) {
                props.selectedSecurityObjectives.map((objective) => {
                    // If the updatedObjectives includes the previously selected objective, add to array
                    if (updatedObjectives.includes(objective)) {
                        // If the updated selections was previously null, initialize new empty array to add to
                        if (!updatedSelections) {
                            updatedSelections = []
                        }
                        // Push objective to updated selections array
                        updatedSelections.push(objective)
                    }
                })
            }
        }

        // If the security objectives array only has one item and the selected objectives is null, automatically select item
        if (!isOnlyOneOptionAvailable("Objective", updatedObjectives, updatedSelections)) {
            props.handleSetSelectedSecurityObjectives(updatedSelections)
        }
    }

    // Helper Functions
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
     * Handles setting the sfrs
     * @param value The sfr value
     */
    const handleSetAllSfrs = (value) => {
        setSfrs(value)
        sessionStorage.setItem("allSfrs", JSON.stringify(value))
    }

    /**
     * Handles setting the pps
     * @param value The pp value
     */
    const handleSetAllPps = (value) => {
        setPps(value)
        sessionStorage.setItem("allPps", JSON.stringify(value))
    }

    /**
     * Update selected drop down to automatically select option if there is only one available in the array
     * @param type              The type of array to update ("Threat", "Objective", "SFR")
     * @param currentOptions    Current list of all options
     * @param selected          The currently selected options
     */
    const isOnlyOneOptionAvailable = (type, currentOptions, selected) => {
        // If current array only has one item, automatically select that item in the array
        if (currentOptions && Object.keys(currentOptions).length === 1 && !selected) {
            switch(type) {
                case "Threat":
                    props.handleSetSelectedThreats(currentOptions.valueOf())
                    break;
                case "Objective":
                    props.handleSetSelectedSecurityObjectives(currentOptions.valueOf())
                    break;
                case "SFR":
                    props.handleSetSelectedSfrs(currentOptions.valueOf())
                    break;
                default:
                    break;
            }
            // Return true if the array was updated with one selection
            return true
        } else {
            // Return false if the array was not updated
            return false
        }
    }

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
                            selections={props.selectedThreats}
                            handleSetSelectedThreats={props.handleSetSelectedThreats}
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
                            selections={props.selectedSecurityObjectives}
                            handleSetSelectedSecurityObjectives={props.handleSetSelectedSecurityObjectives}
                        />
                        : null
                }
            </div>
            {/* SFR Filtering Card */}
            <div>
                {
                    allSfrs != null ?
                        <SFRCard
                            name={"SFRs"}
                            allSfrs={allSfrs}
                            selections={props.selectedSfrs}
                            handleSetSelectedSfrs={props.handleSetSelectedSfrs}
                        />
                        : null
                }
            </div>
            {/* PP Filtering Card */}
            <div>
                {
                    allPps != null ?
                        <PPCard
                            name={"PPs"}
                            allSfrs={allPps}
                            selections={props.selectedPps}
                            handleSetSelectedPps={props.handleSetSelectedPps}
                        />
                        : null
                }
            </div>
        </div>
    );
}

// Export Class
export default FilterPane;