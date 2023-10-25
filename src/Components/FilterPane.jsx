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
        updateDropdowns("Threat")
    }, [props.selectedThreats])

    /**
     * Use Effect for updating other filter types based on selected objective update
     */
    useEffect(() => {
        // Update dropdowns according to security objective selections
        updateDropdowns("Objective")
    }, [props.selectedSecurityObjectives])

    /**
     * Use Effect for updating other filter types based on selected sfr update
     */
    useEffect(() => {
        // Update dropdowns according to sfr selections
        updateDropdowns("SFR")
    }, [props.selectedSfrs])

    /**
     * Use Effect for updating other filter types based on selected sfr update
     */
    useEffect(() => {
        // Update pp selections if it is only one option
        // let isOnlyOneSelection = isOnlyOneOptionAvailable(allPps, props.selectedPps)
        // if (isOnlyOneSelection) {
        //     props.handleSetSelectedPps(isOnlyOneSelection)
        // }
    }, [props.selectedPps])

    // Functions
    /**
     * Update dropdowns based on the updated value
     * @param type          The initial type to filter from
     * @param newSelections The new selections from the initial type
     * @param allValues     The full dropdown list from the initial type
     */
    const updateDropdowns = (type) => {
        // Filter down associated lists based on types
        try {
            switch (type) {
                case "Threat": {
                    fromThreats();
                    break;
                }
                case "Objective": {
                    fromObjectives();
                    break;
                }
                case "SFR": {
                    fromSFRs()
                    break;
                }
                default:
                    break;
            }
            // if (!props.selectedThreats && !props.selectedSecurityObjectives && !props.selectedSfrs) {
            //     handleClearAllFilters()
            // }
        } catch (e) {
            console.log(e)
        } finally {
            // clear out selected PPs before rendering new set of PP options
            props.handleSetSelectedPps(null)
            // Update PP Filter
            updatePPFilter()

            if (!props.selectedThreats && !props.selectedSecurityObjectives && !props.selectedSfrs) {
                handleClearAllFilters()
            }
        }
    }

    /**
     * The update pp filter method that updates pp dropdown and pp selections, based on all other selections
     */
    const updatePPFilter = () => {
        // Get all of the current values
        let selectedThreats = props.selectedThreats ? props.selectedThreats.valueOf() : null;
        let selectedObjectives = props.selectedSecurityObjectives ? props.selectedSecurityObjectives.valueOf() : null;
        let selectedSfrs = props.selectedSfrs ? props.selectedSfrs.valueOf() : null;

        // Query PPs based on user selections
        let newPPs = query.PPFilter(SFRDatabase, selectedThreats, selectedObjectives, selectedSfrs)
        // Set new PP dropdown and updated selections
        handleSetAllPps(newPPs);

        // Update pps, and set to one element if there is only one option available
        // let isOnlyOneSelection = isOnlyOneOptionAvailable(newPPs, newSelectedPPs)
        // if (isOnlyOneSelection) {
        //     props.handleSetSelectedPps(isOnlyOneSelection)
        // } else {
        //     props.handleSetSelectedPps(newSelectedPPs)
        //     props.handleSetSelectedPps(newPPs)
        // }
        // props.handleSetSelectedPps(newSelectedPPs)
    }

    /**
     * Filtering down based on threats
     * @param newThreats    The threat selections
     * @param fullThreats   The full threat dropdown list
     */
    const fromThreats = () => {
        if (props.selectedThreats) { // if there is a selected threat
            let objectives = query.ThreatToSecurityObjective(SFRDatabase, props.selectedThreats[0]).sort();

            // set to remove duplicates
            let sfrs = [...new Set(query.ThreatToSFRs(SFRDatabase, props.selectedThreats[0]).sort())];

            // check if objectives or sfrs have been selected
            if (props.selectedSecurityObjectives || props.selectedSfrs) {
                if (props.selectedSfrs && !props.selectedSecurityObjectives) { // if sfr is selected and objective is not
                    // set objective list to intersection of objectives for selected threat and sfr
                    handleSetAllSecurityObjectives(query.SFRToSecurityObjectives(SFRDatabase, props.selectedSfrs[0]).sort().filter(x => objectives.includes(x)));

                }
                if (!props.selectedSfrs && props.selectedSecurityObjectives) { // if sfr is not selected and objective is
                    // set sfr list to intersection of sfrs for selected threat and objective
                    handleSetAllSfrs(query.SecurityObjectiveToSFR(SFRDatabase, props.selectedSecurityObjectives[0]).sort().filter(x => sfrs.includes(x)));
                }

            } else { // set objectives and sfrs based on threat selected
                handleSetAllSecurityObjectives(objectives);
                handleSetAllSfrs(sfrs);
            }
        } else { // if no threat is selected/cleared out 
            // only update if there is at least one other selection made
            if (props.selectedThreats || props.selectedSecurityObjectives || props.selectedSfrs) {
                // update objectives
                fromObjectives();
            }
        }
    }

    /**
     * Filtering down based on objectives
     * @param newObjectives    The objective selections
     * @param fullObjectives   The full objective dropdown list
     */
    // const fromObjectives = (newObjectives, fullObjectives) => {
    const fromObjectives = () => {
        if (props.selectedSecurityObjectives) { // if there is a selected security objective
            let sfrs = query.SecurityObjectiveToSFR(SFRDatabase, props.selectedSecurityObjectives[0]).sort();
            let threats = query.SecurityObjectiveToThreats(SFRDatabase, props.selectedSecurityObjectives[0]).sort();

            // check if sfrs or threats have been selected
            if (props.selectedSfrs || props.selectedThreats) {
                if (props.selectedSfrs && !props.selectedThreats) { // if objective is selected and threat isn't
                    // set threat list to intersection of threats for selected objective and sfr
                    query.SFRToThreats(SFRDatabase, props.selectedSfrs[0]) ? handleSetAllThreats(query.SFRToThreats(SFRDatabase, props.selectedSfrs[0]).sort().filter(x => threats.includes(x))) : handleSetAllThreats(threats);

                }
                if (!props.selectedSfrs && props.selectedThreats) { // if threat is selected and objective isn't
                    // set sfr list to intersection of sfrs for selected objective and sfr
                    handleSetAllSfrs([...new Set(query.ThreatToSFRs(SFRDatabase, props.selectedThreats[0]))].filter(x => sfrs.includes(x)))
                }
            } else { // set sfrs and threats based on threat selected
                handleSetAllSfrs(sfrs);
                handleSetAllThreats(threats);
            }
        } else { // if no security objective is selected/cleared out 
            // update sfrs
            fromSFRs();
        }
    }

    /**
     * Filtering down based on SFRs
     * @param newSFRs    The SFRs selections
     * @param fullSFRs   The full SFRs dropdown list
     */
    // const fromSFRs = (newSFRs, fullSFRs) => {
    const fromSFRs = () => {
        if (props.selectedSfrs) { // if there is a selected sfr
            let objectives = query.SFRToSecurityObjectives(SFRDatabase, props.selectedSfrs[0]).sort();
            let threats = query.SFRToThreats(SFRDatabase, props.selectedSfrs[0]) ? query.SFRToThreats(SFRDatabase, props.selectedSfrs[0]).sort() : [];

            // check if objectives or threats have been selected
            if (props.selectedSecurityObjectives || props.selectedThreats) {
                if (props.selectedSecurityObjectives && !props.selectedThreats) { // if objective is selected and threat isn't
                    handleSetAllThreats(query.SecurityObjectiveToThreats(SFRDatabase, props.selectedSecurityObjectives[0]).sort().filter(x => threats.includes(x)));
                }
                if (!props.selectedSecurityObjectives && props.selectedThreats) { // if threat is selected and objective isn't
                    // set objective list to intersection of objectives for selected threat and sfr
                    handleSetAllSecurityObjectives(query.ThreatToSecurityObjective(SFRDatabase, props.selectedThreats[0]).sort().filter(x => objectives.includes(x)));
                }
            } else { // set objectives and sfrs based on threat selected
                // Update objective dropdown options
                handleSetAllSecurityObjectives(objectives);
                handleSetAllThreats(threats);
            }
        } else { // if no sfr is selected/cleared out 
            // update threats
            fromThreats();
        }
    }


    /**
     * Update selected drop down to automatically select option if there is only one available in the array
     * @param currentOptions    Current list of all options
     * @param selected          The currently selected options
     */
    // const isOnlyOneOptionAvailable = (currentOptions, selected) => {
    //     // If current array only has one item, return item based on type
    //     if (currentOptions && Object.keys(currentOptions).length === 1 && (!selected || (selected && Object.keys(selected).length === 0))) {
    //         return currentOptions.valueOf();
    //     }
    //     // Return null if the array options are greater than one
    //     return null;
    // }


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