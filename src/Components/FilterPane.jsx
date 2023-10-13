// Imports
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import ThreatCard from "../Filtering/ThreatCard.jsx";
import ObjectivesCard from "../Filtering/ObjectivesCard.jsx";
import SFRCard from "../Filtering/SFRCard.jsx";
import PPCard from "../Filtering/PPCard.jsx";
import PropTypes from "prop-types";
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
                handleClearAllFilters();
            }
        } catch (e) {
            console.log(e)
        }
    }, [SFRDatabase]);

    /**
     * Use Effect for updating other filter types based on selected threat update
     */
    useEffect(() => {
        // Update dropdowns according to threat selections
        updateDropdowns("Threat", props.selectedThreats, allThreats)
    }, [props.selectedThreats])

    /**
     * Use Effect for updating other filter types based on selected objective update
     */
    useEffect(() => {
        // Update dropdowns according to security objective selections
        updateDropdowns("Objective", props.selectedSecurityObjectives, allSecurityObjectives)
    }, [props.selectedSecurityObjectives])

    /**
     * Use Effect for updating other filter types based on selected sfr update
     */
    useEffect(() => {
        // Update dropdowns according to sfr selections
        updateDropdowns("SFR", props.selectedSfrs, allSfrs)
    }, [props.selectedSfrs])

    /**
     * Use Effect for updating other filter types based on allPPs update
     */
    useEffect(() => {
        // Update pp selections if it is only one option
        let isOnlyOneSelection = isOnlyOneOptionAvailable(allPps, props.selectedPps)
        if (isOnlyOneSelection) {
            props.handleSetSelectedPps(isOnlyOneSelection)
        }
    }, [props.selectedPps])

    // Functions
    /**
     * Update dropdowns based on the updated value
     * @param type          The initial type to filter from
     * @param newSelections The new selections from the initial type
     * @param allValues     The full dropdown list from the initial type
     */
    const updateDropdowns = (type, newSelections, allValues) => {
        // Filter down associated lists based on types
        try {
            switch(type) {
                case "Threat":
                    {
                        let oneSelected = isOnlyOneOptionAvailable(allValues, newSelections)
                        if (oneSelected) {
                            props.handleSetSelectedThreats(oneSelected)
                        } else {
                            fromThreats(newSelections, allValues)
                        }
                    }
                    break;
                case "Objective":
                    {
                        let oneSelected = isOnlyOneOptionAvailable(allValues, newSelections)
                        if (oneSelected) {
                            props.handleSetSelectedSecurityObjectives(oneSelected)
                        } else {
                            fromObjectives(newSelections, allValues)
                        }
                    }
                    break;
                case "SFR":
                    {
                        let oneSelected = isOnlyOneOptionAvailable(allValues, newSelections)
                        if (oneSelected) {
                            props.handleSetSelectedSfrs(oneSelected)
                        } else {
                            fromSFRs(newSelections, allValues)
                        }
                    }
                    break;
                default:
                    break;
            }
            if (!props.selectedThreats && !props.selectedSecurityObjectives && !props.selectedSfrs) {
                handleClearAllFilters()
            }
        } catch (e) {
            console.log(e)
        } finally {
            // Update PP Filter
            updatePPFilter()
        }
    }

    /**
     * The update pp filter method that updates pp dropdown and pp selections, based on all other selections
     */
    const updatePPFilter = () => {
        // Get all of the current values
        let selectedThreats = props.selectedThreats? props.selectedThreats.valueOf() : null;
        let selectedObjectives = props.selectedSecurityObjectives? props.selectedSecurityObjectives.valueOf() : null;
        let selectedSfrs = props.selectedSfrs? props.selectedSfrs.valueOf() : null;
        let selectedPPs = props.selectedPps ? props.selectedPps.valueOf() : null;

        // Initialize pp values and query new pps
        let newSelectedPPs = null;
        let newPPs = query.PPFilter(SFRDatabase, selectedThreats, selectedObjectives, selectedSfrs)
        // If the new pps contain values, check for previous pp selections
        if (newPPs && Object.keys(newPPs).length !== 0) {
            // Sort the new pp list
            newPPs.sort()
            // If previous pp selections exist, check to see if they are in the new dropdown list options
            if (selectedPPs && Object.keys(selectedPPs).length !== 0) {
                selectedPPs.map((selectedPP) => {
                    // Initialize new selections to an array, if it was previously null
                    if (!newSelectedPPs) {
                        newSelectedPPs = []
                    }
                    // Add previously selected PP to new pp selections if it exists in the new dropdown and doesn't
                    // already exist in the selections array
                    if (newPPs.includes(selectedPP) && !newSelectedPPs.includes(selectedPP)) {
                        newSelectedPPs.push(selectedPP)
                    }
                })
            }
        }

        // Sort the new pp dropdown options if it is not null/empty
        if (newSelectedPPs) {
            newSelectedPPs.sort()
        }

        // Update pps, and set to one element if there is only one option available
        let isOnlyOneSelection = isOnlyOneOptionAvailable(newPPs, newSelectedPPs)
        if (isOnlyOneSelection) {
            props.handleSetSelectedPps(isOnlyOneSelection)
        } else {
            props.handleSetSelectedPps(newSelectedPPs)
        }

        // Set new PP dropdown and updated selections
        props.handleSetSelectedPps(newSelectedPPs)
        handleSetAllPps(newPPs)
    }

    /**
     * Filtering down based on threats
     * @param newThreats    The threat selections
     * @param fullThreats   The full threat dropdown list
     */
    const fromThreats = (newThreats, fullThreats) => {
        // Filter down objectives
        let threatToObjective = genericFilter("Threat", "Objective", newThreats, fullThreats)
        let selectedObjectives = threatToObjective[0]
        let newObjectives = threatToObjective[1]

        // Filter down SFRs
        let objectiveToSfr = genericFilter("Objective", "SFR", selectedObjectives, newObjectives)
        let selectedSfrs = objectiveToSfr[0]
        let newSfrs = objectiveToSfr[1]

        // Update objective dropdowns
        props.handleSetSelectedSecurityObjectives(selectedObjectives)
        handleSetAllSecurityObjectives(newObjectives)

        // Update sfr dropdowns
        props.handleSetSelectedSfrs(selectedSfrs)
        handleSetAllSfrs(newSfrs)
    }

    /**
     * Filtering down based on objectives
     * @param newObjectives    The objective selections
     * @param fullObjectives   The full objective dropdown list
     */
    const fromObjectives = (newObjectives, fullObjectives) => {
        // Filter down SFRs
        let objectiveToSfr = genericFilter("Objective", "SFR", newObjectives, fullObjectives)
        let selectedSfrs = objectiveToSfr[0]
        let newSfrs = objectiveToSfr[1]

        // Filter down threats
        let objectiveToThreat = genericFilter("Objective", "Threat", newObjectives, fullObjectives)
        let selectedThreats = objectiveToThreat[0]
        let newThreats = objectiveToThreat[1]

        // Update sfr dropdowns
        props.handleSetSelectedSfrs(selectedSfrs)
        handleSetAllSfrs(newSfrs)

        // Update threat dropdowns
        props.handleSetSelectedThreats(selectedThreats)
        handleSetAllThreats(newThreats)
    }

    /**
     * Filtering down based on SFRs
     * @param newSFRs    The SFRs selections
     * @param fullSFRs   The full SFRs dropdown list
     */
    const fromSFRs = (newSFRs, fullSFRs) => {
        // Filter down objectives
        let sfrToObjective = genericFilter("SFR", "Objective", newSFRs, fullSFRs)
        let selectedObjectives = sfrToObjective[0]
        let newObjectives = sfrToObjective[1]

        // Filter down threats
        let objectiveToThreat = genericFilter("Objective", "Threat", selectedObjectives, newObjectives)
        let selectedThreats = objectiveToThreat[0]
        let newThreats = objectiveToThreat[1]

        // Update objective dropdowns
        props.handleSetSelectedSecurityObjectives(selectedObjectives)
        handleSetAllSecurityObjectives(newObjectives)

        // Update threat dropdowns
        props.handleSetSelectedThreats(selectedThreats)
        handleSetAllThreats(newThreats)
    }

    // Helper Functions
    /**
     * The generic filter class that can filter down any original list to its associated list
     * @param originalType              The original type to be filtered from
     * @param updateType                The type to be filtered to
     * @param originalSelections        The original selections
     * @param originalFullOptionsList   The original full dropdown list
     * @returns {[null,null]}           An array with indexes:
     *                                      0: The new selections for the update type
     *                                      1: The full dropdown list for the update type
     */
    const genericFilter = (originalType, updateType, originalSelections, originalFullOptionsList) => {
        // Initialize values to null
        let newFullOptionsList = null;
        let newSelections = null;

        // Get full queried list based on new type
        let queriedList = null;
        let originalSelectionsForNewType = null
        switch (updateType) {
            case "Threat":
                queriedList = query.getThreats(SFRDatabase).sort()
                originalSelectionsForNewType = props.selectedThreats
                break;
            case "Objective":
                queriedList = query.getSecurityObjectives(SFRDatabase).sort()
                originalSelectionsForNewType = props.selectedSecurityObjectives
                break;
            case "SFR":
                queriedList = query.getSfrs(SFRDatabase).sort()
                originalSelectionsForNewType = props.selectedSfrs
                break;
        }

        // Update dropdown
        if (originalSelections && Object.keys(originalSelections).length !== 0) {
            // If type is objectiveToThreat or sfrToObjective, pass in full queriedList
            if ((originalType === "Objective" && updateType === "Threat")
                || (originalType === "SFR" && updateType === "Objective")) {
                newFullOptionsList = runFilterByType(originalType, updateType, originalSelections, queriedList)
            } else {
                newFullOptionsList = runFilterByType(originalType, updateType, originalSelections, newFullOptionsList)
            }
        } else {
            if (originalFullOptionsList && Object.keys(originalFullOptionsList).length !== 0) {
                // If type is objectiveToThreat or sfrToObjective, pass in full queriedList
                if ((originalType === "Objective" && updateType === "Threat")
                    || (originalType === "SFR" && updateType === "Objective")) {
                    newFullOptionsList = runFilterByType(originalType, updateType, originalFullOptionsList, queriedList)
                } else {
                    newFullOptionsList = runFilterByType(originalType, updateType, originalFullOptionsList, newFullOptionsList)
                }
            } else {
                newFullOptionsList = queriedList
            }
        }

        // Update selections based on type
        let isOnlyOneSelection = isOnlyOneOptionAvailable(newFullOptionsList, originalSelectionsForNewType)
        if (isOnlyOneSelection) {
            newSelections = isOnlyOneSelection
        } else {
            if (originalSelectionsForNewType && Object.keys(originalSelectionsForNewType).length !== 0) {
                originalSelectionsForNewType.map((selected) => {
                    if (newFullOptionsList && newFullOptionsList.includes(originalSelectionsForNewType.toString())) {
                        if (!newSelections) {
                            newSelections = []
                        }
                        if (!newSelections.includes(selected)) {
                            newSelections.push(selected.valueOf())
                        }
                    }
                })
            } else {
                newSelections = null;
            }
        }

        // Sort arrays if they are not null
        if (newSelections) {
            newSelections.sort()
        }
        if (newFullOptionsList) {
            newFullOptionsList.sort()
        }

        // return the values for new selections and the new full options list
        return [newSelections, newFullOptionsList]
    }

    /**
     * Update selected drop down to automatically select option if there is only one available in the array
     * @param currentOptions    Current list of all options
     * @param selected          The currently selected options
     */
    const isOnlyOneOptionAvailable = (currentOptions, selected) => {
        // If current array only has one item, return item based on type
        if (currentOptions && Object.keys(currentOptions).length === 1 && !selected) {
            return currentOptions.valueOf();
        }
        // Return null if the array options are greater than one
        return null;
    }

    /**
     * Runs the filter by input type
     * @param originalType  The original input type
     * @param updateType    The updated input type
     * @param oldValue      The old value to filter from
     * @param newValue      The new value to filter to
     * @returns {*|null}    The updated filter for the inputted inputType
     */
    const runFilterByType = (originalType, updateType, oldValue, newValue) => {
        if (originalType === "Threat" && updateType === "Objective") {
            return threatToObjectiveFilter(oldValue, newValue)
        } else if (originalType === "Objective" && updateType === "SFR") {
            return objectiveToSfrFilter(oldValue, newValue)
        } else if (originalType === "Objective" && updateType === "Threat") {
            return objectiveToThreatFilter(oldValue, newValue)
        } else if (originalType === "SFR" && updateType === "Objective") {
            return sfrToObjectiveFilter(oldValue, newValue)
        } else {
            return null;
        }
    }

    /**
     * The threat to objective filter
     * @param threats       The input threats
     * @param newObjectives The new objectives to be updated
     * @returns {*}         The new objectives array
     */
    const threatToObjectiveFilter = (threats, newObjectives) => {
        if (threats && Object.keys(threats) !== 0) {
            threats.map((threat) => {
                let objectives = query.ThreatToSecurityObjective(SFRDatabase, threat).sort()
                if (objectives && Object.keys(objectives).length !== 0) {
                    objectives.map((objective) => {
                        if (!newObjectives) {
                            newObjectives = []
                        }
                        if (!newObjectives.includes(objective.toString())) {
                            newObjectives.push(objective.valueOf())
                        }
                    })
                }
            })
        }
        return newObjectives;
    }

    /**
     * The objective to threat filter
     * @param objectives    The input objectives
     * @param threatList    The original queried threats list
     * @returns {*}         The new threats array
     */
    const objectiveToThreatFilter = (objectives, threatList) => {
        let newThreats = null
        if (threatList && Object.keys(threatList) !== 0) {
            threatList.map((threat) => {
                if (objectives && Object.keys(objectives).length !== 0) {
                    objectives.map((objective) => {
                        let objectivesExist = query.SecurityObjectiveToThreat(SFRDatabase, objective, threat)
                        if (objectivesExist !== false) {
                            if (!newThreats) {
                                newThreats = []
                            }
                            if (!newThreats.includes(threat.toString())) {
                                newThreats.push(threat.valueOf())
                            }
                        }
                    })
                }
            })
        }
        return newThreats;
    }

    /**
     * The objective to sfr filter
     * @param objectives    The input objectives
     * @param newSFRs       The new SFRs to be updated
     * @returns {*}         The new SFRs array
     */
    const objectiveToSfrFilter = (objectives, newSFRs) => {
        if (objectives && Object.keys(objectives) !== 0) {
            objectives.map((objective) => {
                let sfrs = query.SecurityObjectiveToSFR(SFRDatabase, objective).sort()
                if (sfrs && Object.keys(sfrs).length !== 0) {
                    sfrs.map((sfr) => {
                        if (!newSFRs) {
                            newSFRs = []
                        }
                        if (!newSFRs.includes(sfr.toString())) {
                            newSFRs.push(sfr.valueOf())
                        }
                    })
                }
            })
        }
        return newSFRs;
    }

    /**
     * The sfr to objective filter
     * @param sfrs          The input sfrs
     * @param objectiveList The original queried objectives list
     * @returns {*}         The new objectives array
     */
    const sfrToObjectiveFilter = (sfrs, objectiveList) => {
        let newObjectives = null
        if (objectiveList && Object.keys(objectiveList) !== 0) {
            objectiveList.map((objective) => {
                if (sfrs && Object.keys(sfrs).length !== 0) {
                    sfrs.map((sfr) => {
                        let objectivesExist = query.SFRToSecurityObjective(SFRDatabase, sfr, objective)
                        if (objectivesExist !== false) {
                            if (!newObjectives) {
                                newObjectives = []
                            }
                            if (!newObjectives.includes(objective.toString())) {
                                newObjectives.push(objective.valueOf())
                            }
                        }
                    })
                }
            })
        }
        return newObjectives;
    }

    // Handler Functions
    /**
     * Handles clearing all filters
     */
    const handleClearAllFilters = () => {
        // Reset filters to default values for dropdowns
        handleSetAllThreats(query.getThreats(SFRDatabase).sort());
        handleSetAllSecurityObjectives(query.getSecurityObjectives(SFRDatabase).sort());
        handleSetAllSfrs(query.getSfrs(SFRDatabase).sort());
        handleSetAllPps(null)

        // Reset selections to default
        props.handleSetSelectedThreats(null)
        props.handleSetSelectedSecurityObjectives(null)
        props.handleSetSelectedSfrs(null)
        props.handleSetSelectedPps(null)
    }

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

    // Return Function
    return (
        <div className="h-full w-full rounded-lg mb-4">
            <div className="border-2 border-gray-400 rounded-xl p-3 bg-base-200 h-16 flex justify-center items-center">
                <h1 className="text-3xl font-bold text-accent">Filter</h1>
            </div>
            {/* Threat Filtering Card */}
            <div>
                {
                    allThreats !== null ?
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
                    allSecurityObjectives !== null ?
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
                    allSfrs !== null ?
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
                    allPps !== null ?
                        <PPCard
                            name={"PPs"}
                            allPps={allPps}
                            selections={props.selectedPps}
                            handleSetSelectedPps={props.handleSetSelectedPps}
                        />
                        : null
                }
            </div>
            {/* Clear all filters button */}
            <div className={"flex justify-center items-center pb-2 mt-6"}>
                <Button
                    ripple={true}
                    className={"bg-accent text-sm rounded-xl"}
                    onClick={handleClearAllFilters}>
                    Clear All Filters
                </Button>
            </div>
        </div>
    );
}

// Export Class
export default FilterPane;