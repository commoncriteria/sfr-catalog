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
            if (!props.selectedThreats && !props.selectedSecurityObjectives && !props.selectedSfrs) {
                handleSetAllThreats(query.getThreats(SFRDatabase).sort());
                handleSetAllSecurityObjectives(query.getSecurityObjectives(SFRDatabase).sort());
                handleSetAllSfrs(query.getSfrs(SFRDatabase).sort());
                // Set PPs to null if no threats, objectives or sfrs are selected
                handleSetAllPps(null)
                props.handleSetSelectedPps(null)
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
        let updatedObjectives = updatedObjectivesForThreatSelection(props.selectedThreats)

        // Update sfrs after threats/objectives are updated
        updatedSfrsForObjectiveSelection(updatedObjectives)
    }, [props.selectedThreats])

    /**
     * Use Effect for updating other filter types based on selected objective update
     */
    useEffect(() => {
        // Update objectives to select value automatically if the allSecurityObjectives array has one entry
        isOnlyOneOptionAvailable("Objective", allSecurityObjectives, props.selectedSecurityObjectives)

        // Update sfrs after objectives are updated
        updatedSfrsForObjectiveSelection(allSecurityObjectives)
    }, [props.selectedSecurityObjectives])

    /**
     * Use Effect for updating other filter types based on selected sfr update
     */
    useEffect(() => {
        // Update sfrs to select value automatically if the allSfrs array has one entry
        isOnlyOneOptionAvailable("SFR", allSfrs, props.selectedSfrs)

        // Update objectives after sfrs are updated
        let objectives = updatedObjectivesForSFRSelection(props.selectedSfrs)
    }, [props.selectedSfrs])

    // Functions
    /**
     * Handles filtering the objectives based on the threat selected
     * @param threats   The selected threats value
     */
    const updatedObjectivesForThreatSelection = (threats) => {
        // If threats are not empty, update query to be threat specific
        // Otherwise, get all security objectives
        let updatedObjectives = threats ? query.ThreatToSecurityObjective(SFRDatabase, threats[0]).sort() : query.getSecurityObjectives(SFRDatabase).sort();
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

        // Sort lists if they are not empty
        if (updatedObjectives) {
            updatedObjectives.sort()
        }
        if (updatedSelections) {
            updatedSelections.sort()
        }

        // If the security objectives array only has one item and the selected objectives is null, automatically select item
        if (!isOnlyOneOptionAvailable("Objective", updatedObjectives, updatedSelections)) {
            props.handleSetSelectedSecurityObjectives(updatedSelections)
        }

        // Return updated objectives to pass on to sfrs later
        return updatedObjectives;
    }

    /**
     * Handles filtering the sfrs based on the objectives
     * @param objectives    The objectives full dropdown list
     */
    const updatedSfrsForObjectiveSelection = (objectives) => {
        // Initialize values as null
        let updatedSfrs = null
        let updatedSelections = null

        // Update SFRs based on objectives dropdown list if the no objectives are selected
        if (props.selectedSecurityObjectives) {
            // If objectives are empty, query all sfrs
            if (!objectives) {
                updatedSfrs = query.getSfrs(SFRDatabase).sort()
            }
            // Otherwise update sfr based on the selected objective only
            else {
                updatedSfrs = query.ObjectiveToSFR(SFRDatabase, props.selectedSecurityObjectives).sort()
            }
        }
        // Otherwise update sfrs based on the objective options available in the dropdown
        else {
            // If the objectives exist and are not empty
            if (objectives && Object.keys(objectives).length !== 0) {
                // Map through the objectives to get the appropriate sfrs
                objectives.map((objective) => {
                    // Query sfrs based on current objective
                    let sfrs = query.ObjectiveToSFR(SFRDatabase, objective.toString())
                    // if the sfrs are not empty add to updatedSfrs array
                    if (sfrs && Object.keys(sfrs).length !== 0) {
                        // If the updated sfrs are empty, intialize new array
                        if (!updatedSfrs) {
                            updatedSfrs = []
                        }
                        // Map through sfrs
                        sfrs.map((sfr) => {
                            // If the sfr does not already exist in the updatedSfrs array, add to array
                            if (!updatedSfrs.includes(sfr)) {
                                updatedSfrs.push(sfr)
                            }
                        })
                    }
                })
            }
            // Otherwise query all sfrs
            else {
                updatedSfrs = query.getSfrs(SFRDatabase).sort()
            }
        }

        // If the previously selected sfrs are not empty, adjust the selected sfr if it is
        // still in the updated sfrs array
        if (updatedSfrs && props.selectedSfrs) {
            // Work through the selected sfrs array and add selections if they are still in the array
            if (Object.keys(props.selectedSfrs).length !== 0) {
                props.selectedSfrs.map((sfr) => {
                    // If the updatedObjectives includes the previously selected objective, add to array
                    if (updatedSfrs.includes(sfr)) {
                        // If the updated selections was previously null, initialize new empty array to add to
                        if (!updatedSelections) {
                            updatedSelections = []
                        }
                        // Push sfr to updated selections array
                        updatedSelections.push(sfr)
                    }
                })
            }
        }

        // Sort lists if they are not empty
        if (updatedSfrs) {
            updatedSfrs.sort()
        }
        if (updatedSelections) {
            updatedSelections.sort()
        }

        // Update Sfrs
        if (updatedSfrs && Object.keys(updatedSfrs).length !== 0) {
            handleSetAllSfrs(updatedSfrs)

            // If the sfr array only has one item and the selected sfrs is null, automatically select item
            if (!isOnlyOneOptionAvailable("SFR", updatedSfrs, updatedSelections)) {
                props.handleSetSelectedSfrs(updatedSelections)
            }

            // Return updated sfrs to pass on to threats later
            return updatedSfrs;
        }

        // Set all sfrs to null if none were generated, this will allow the pane to not be visible and no selections for
        // sfrs will be available as expected
        else {
            if (updatedSfrs) {
                handleSetAllSfrs(null)
            }
            if (updatedSelections) {
                props.handleSetSelectedSfrs(null)
            }
            return null;
        }
    }

    /**
     * Handles filtering the objectives based on the sfr selected
     * @param sfrs  The selected sfrs value
     */
    const updatedObjectivesForSFRSelection = (sfrs) => {
        // Initialize values as null
        let updatedObjectives = null
        let updatedSelections = null

        // Query all objectives
        let queriedObjectives = query.getSecurityObjectives(SFRDatabase)

        // If sfrs are selected
        if (!sfrs) {
            // If objective is selected, keep it selected
            // Otherwise, set selected objective to null
            updatedSelections = props.selectedSecurityObjectives ? props.selectedSecurityObjectives : null;

            // Set objectives to all objectives
            updatedObjectives = queriedObjectives
        }
        // Otherwise, if sfrs are selected
        else {
            // Filter down objectives
            if (sfrs && Object.keys(sfrs).length !== 0) {
                sfrs.map((sfr) => {
                    if (queriedObjectives && Object.keys(queriedObjectives).length !== 0) {
                        queriedObjectives.map((objective) => {
                            let selectionExists = query.SFRToObjective(SFRDatabase, sfr, objective)
                            if (selectionExists) {
                                // Initialize array for filteredObjectives if it is null
                                if (!updatedObjectives) {
                                    updatedObjectives = []
                                }
                                // Add to filtered objective
                                updatedObjectives.push(objective)
                                // If the previously selected security objective is not null and contains the objective add to updatedSelections
                                if (props.selectedSecurityObjectives && props.selectedSecurityObjectives.includes(objective)) {
                                    // Initialize array for updatedSelections if it is null
                                    if (!updatedSelections) {
                                        updatedSelections = []
                                    }
                                    // Add objective to selected objectives
                                    updatedSelections.push(objective)
                                }
                            }
                        })
                    }
                })
            }

            // If objective is not selected, set objective selection to null
            if (!props.selectedSecurityObjectives) {
                updatedSelections = null
            }
        }

        // Sort lists if they are not empty
        if (updatedObjectives) {
            updatedObjectives.sort()
        }
        if (updatedSelections) {
            updatedSelections.sort()
        }

        // Update Objectives if they have changed
        if (updatedObjectives && Object.keys(updatedObjectives).length !== 0) {
            handleSetAllSecurityObjectives(updatedObjectives)

            // If the objective array only has one item and the selected objectives is null, automatically select item
            if (!isOnlyOneOptionAvailable("Objective", updatedObjectives, updatedSelections)) {
                props.handleSetSelectedSecurityObjectives(updatedSelections)
            }

            // Return updated objectives to pass on to threats later
            return updatedObjectives;
        }

        // Set all objectives to null if none were generated, this will allow the pane to not be visible and no selections for
        // objectives will be available as expected
        else {
            if (updatedSelections) {
                props.handleSetSelectedSecurityObjectives(null)
            }
            if (updatedObjectives) {
                handleSetAllSecurityObjectives(null)
            }
            return null;
        }
    }

    // Helper Functions
    /**
     * Handles setting the threats
     * @param value The threat value
     */
    const handleSetAllThreats = (value) => {
        // If threats were updated, set state
        if (JSON.stringify(allThreats) !== JSON.stringify(value)) {
            setThreats(value)
            sessionStorage.setItem("allThreats", JSON.stringify(value))
        }
    }

    /**
     * Handles setting the security objectives
     * @param value The security objectives value
     */
    const handleSetAllSecurityObjectives = (value) => {
        // If objectives were updated, set state
        if (JSON.stringify(allSecurityObjectives) !== JSON.stringify(value)) {
            setSecurityObjectives(value)
            sessionStorage.setItem("allSecurityObjectives", JSON.stringify(value))
        }
    }

    /**
     * Handles setting the sfrs
     * @param value The sfr value
     */
    const handleSetAllSfrs = (value) => {
        // If sfrs were updated, set state
        if (JSON.stringify(allSfrs) !== JSON.stringify(value)) {
            setSfrs(value)
            sessionStorage.setItem("allSfrs", JSON.stringify(value))
        }
    }

    /**
     * Handles setting the pps
     * @param value The pp value
     */
    const handleSetAllPps = (value) => {
        // If pps were updated, set state
        if (JSON.stringify(allPps) !== JSON.stringify(value)) {
            setPps(value)
            sessionStorage.setItem("allPps", JSON.stringify(value))
        }
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