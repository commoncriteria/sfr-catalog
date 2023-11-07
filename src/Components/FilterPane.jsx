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
import { TERipple } from "tw-elements-react";

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
    // SFR Query
    const [sfrQuery, setSfrQuery] = useState(sessionStorage.getItem("sfrQuery") ? JSON.parse(sessionStorage.getItem("sfrQuery")) : null);
    // Filtered SFRs
    const [filteredSfrs, setFilteredSfrs] = useState(sessionStorage.getItem("filteredSfrs") ? JSON.parse(sessionStorage.getItem("filteredSfrs")) : []);
    // SFR Input Value
    const [sfrInputValue, setSfrInputValue] = useState(sessionStorage.getItem("searchInput") ? JSON.parse(sessionStorage.getItem("searchInput")) : "");
    // PPs
    const [allPps, setPps] = useState(sessionStorage.getItem("allPps") ? JSON.parse(sessionStorage.getItem("allPps")) : null);
    // All PP options (using this since allPps gets altered when PPs are selected and need a variable with all the PPs to be used in the useEffect)
    const [masterPPList] = allPps ? allPps.concat(props.selectedPps) : [];

    // Prop Validation
    FilterPane.propTypes = {
        filterStatus: PropTypes.bool.isRequired,
        selectedThreats: PropTypes.array,
        selectedSecurityObjectives: PropTypes.array,
        selectedSfrs: PropTypes.array,
        selectedPps: PropTypes.array,
        handleSetSelectedThreats: PropTypes.func.isRequired,
        handleSetSelectedSecurityObjectives: PropTypes.func.isRequired,
        handleSetSelectedSfrs: PropTypes.func.isRequired,
        handleSetSelectedPps: PropTypes.func.isRequired,
        handleSetFilterStatus: PropTypes.func.isRequired,
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
            console.log(e);
        }
    }, [SFRDatabase]);

    /**
     * Use Effect for updating other filter types based on selected threat update
     */
    useEffect(() => {
        // Update dropdowns according to threat selections
        updateDropdowns("Threat");
    }, [props.selectedThreats])

    /**
     * Use Effect for updating other filter types based on selected objective update
     */
    useEffect(() => {
        // Update dropdowns according to security objective selections
        updateDropdowns("Objective");
    }, [props.selectedSecurityObjectives])

    /**
     * Use Effect for updating other filter types based on selected sfr update
     */
    useEffect(() => {
        // Update dropdowns according to sfr selections
        updateDropdowns("SFR");
    }, [props.selectedSfrs])


    /**
    * Use Effect for updating other filter types based on selected sfr + PP update
    */
    useEffect(() => {
        // Update dropdowns according to sfr selections and PP options
        updateDropdowns("SFR");
    }, [masterPPList])

    // Functions
    /**
     * Update dropdowns based on the updated value
     * @param type  The initial type to filter from
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
                    fromSFRs();
                    break;
                }
                default:
                    break;
            }
        } catch (e) {
            console.log(e);
        } finally {
            // Update PP Filter based on selections made
            updatePPFilter();

            // update pp selections on re-render to only include those that are part of the available list of PPs, else clear out and set to null
            let ppOptions = query.PPFilter(SFRDatabase, props.selectedThreats, props.selectedSecurityObjectives, props.selectedSfrs);
            ppOptions && ppOptions.length && props.selectedPps && props.selectedPps.length > 0 ? props.handleSetSelectedPps(props.selectedPps.filter(x => ppOptions.includes(x))) : props.handleSetSelectedPps(null);

            if (!props.selectedThreats && !props.selectedSecurityObjectives && !props.selectedSfrs) {
                handleClearAllFilters();
            }
        }
    }

    /**
     * The update pp filter method that updates pp dropdown and pp selections, based on all other selections
     */
    const updatePPFilter = () => {
        // check if user has selected sfr from a search query (by content), since then the PP list will need to be set from that list
        if (sfrQuery) {
            if (props.selectedSfrs) {
                // pps associated with sfr that has been identified to contain text that user entered in the query
                let pps = filteredSfrs.find(o => o.sfr === props.selectedSfrs[0])["pp_list"];
                // set to intersection of PPs returned from other selections (threat/objective) and pp list above
                props.selectedPps ? handleSetAllPps(query.PPFilter(SFRDatabase, props.selectedThreats, props.selectedSecurityObjectives, props.selectedSfrs).filter((el) => !props.selectedPps.includes(el)).sort()) : handleSetAllPps(query.PPFilter(SFRDatabase, props.selectedThreats, props.selectedSecurityObjectives, props.selectedSfrs).filter(x => pps.includes(x)));
            }
        } else {
            // Set PP dropdown options based on selected threat, sfr, and/or objective; check if PP selections have been made, if so remove from the list before setting allPps
            if (props.selectedThreats || props.selectedSecurityObjectives || props.selectedSfrs) {
                props.selectedPps ? handleSetAllPps(query.PPFilter(SFRDatabase, props.selectedThreats, props.selectedSecurityObjectives, props.selectedSfrs).filter((el) => !props.selectedPps.includes(el)).sort()) : handleSetAllPps(query.PPFilter(SFRDatabase, props.selectedThreats, props.selectedSecurityObjectives, props.selectedSfrs));
            }
        }
    }

    /**
     * Filtering down based on threats
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
                    // update sfr list to intersection of previous sfr options and sfrs for the selected threat
                    handleSetAllSfrs(allSfrs.sort().filter(x => sfrs.includes(x)));
                }
                else if (!props.selectedSfrs && props.selectedSecurityObjectives) { // if sfr is not selected and objective is
                    // set sfr list to intersection of sfrs for selected threat and objective
                    handleSetAllSfrs(query.SecurityObjectiveToSFR(SFRDatabase, props.selectedSecurityObjectives[0]).sort().filter(x => sfrs.includes(x)));
                    // update objective list to the objectives mapped to the threat selected
                    handleSetAllSecurityObjectives(objectives);
                } else { // all 3 selections are made
                    // set objective list to intersection of objectives for selected threat and sfr
                    handleSetAllSecurityObjectives(query.SFRToSecurityObjectives(SFRDatabase, props.selectedSfrs[0]).sort().filter(x => objectives.includes(x)));
                    //  set sfr list to intersection of sfrs for selected threat and objective
                    handleSetAllSfrs(query.SecurityObjectiveToSFR(SFRDatabase, props.selectedSecurityObjectives[0]).sort().filter(x => sfrs.includes(x)));
                }
            } else { // set objectives and sfrs based on threat selected
                handleSetAllSecurityObjectives(objectives);
                handleSetAllSfrs(sfrs);
                handleSetAllThreats(query.getThreats(SFRDatabase).sort());
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
     */
    const fromObjectives = () => {
        if (props.selectedSecurityObjectives) { // if there is a selected security objective
            let sfrs = query.SecurityObjectiveToSFR(SFRDatabase, props.selectedSecurityObjectives[0]).sort();
            let threats = query.SecurityObjectiveToThreats(SFRDatabase, props.selectedSecurityObjectives[0]).sort();

            // check if sfrs or threats have been selected
            if (props.selectedSfrs || props.selectedThreats) {
                if (props.selectedSfrs && !props.selectedThreats) { // if objective is selected and threat isn't
                    // set threat list to intersection of threats for selected objective and sfr
                    query.SFRToThreats(SFRDatabase, props.selectedSfrs[0]) ? handleSetAllThreats(query.SFRToThreats(SFRDatabase, props.selectedSfrs[0]).filter(x => threats.includes(x))) : handleSetAllThreats(threats);
                    // update sfr list to intersection of previous sfr options and sfrs for the selected objective
                    handleSetAllSfrs(allSfrs.filter(x => sfrs.includes(x)));
                } else if (!props.selectedSfrs && props.selectedThreats) { // if threat is selected and objective isn't
                    // set sfr list to intersection of sfrs for selected objective and sfr
                    handleSetAllSfrs([...new Set(query.ThreatToSFRs(SFRDatabase, props.selectedThreats[0]))].filter(x => sfrs.includes(x)));
                    // update threat list to the threats mapped to the objective selected
                    handleSetAllThreats(threats);
                } else { // all 3 selections are made
                    // set threat list to intersection of threats for selected objective and sfr
                    query.SFRToThreats(SFRDatabase, props.selectedSfrs[0]) ? handleSetAllThreats(query.SFRToThreats(SFRDatabase, props.selectedSfrs[0]).filter(x => threats.includes(x))) : handleSetAllThreats(threats);
                    // set sfr list to intersection of sfrs for selected objective and sfr
                    handleSetAllSfrs([...new Set(query.ThreatToSFRs(SFRDatabase, props.selectedThreats[0]))].filter(x => sfrs.includes(x)));
                }
            } else { // set sfrs and threats based on objective selected
                handleSetAllSfrs(sfrs);
                handleSetAllThreats(threats);
                handleSetAllSecurityObjectives(query.getSecurityObjectives(SFRDatabase).sort());
            }
        } else { // if no security objective is selected/cleared out 
            // update sfrs
            fromSFRs();
        }
    }

    /**
     * Filtering down based on SFRs
     */
    const fromSFRs = () => {
        let objectives = [];
        let threats = [];

        if (props.selectedSfrs) { // if there is a selected sfr
            // if sfr has been selected from a content search, need to update PP filter then update the threats and objectives
            if (sfrQuery) {
                if (allPps && !props.selectedPps) {
                    // set threats/objectives to the ones only for the PP options available
                    objectives = query.SFRToSecurityObjectives(SFRDatabase, props.selectedSfrs[0], allPps);
                    threats = query.SFRToThreats(SFRDatabase, props.selectedSfrs[0], allPps) ? query.SFRToThreats(SFRDatabase, props.selectedSfrs[0], allPps) : [];
                }

            } else {
                objectives = query.SFRToSecurityObjectives(SFRDatabase, props.selectedSfrs[0]);
                threats = query.SFRToThreats(SFRDatabase, props.selectedSfrs[0]) ? query.SFRToThreats(SFRDatabase, props.selectedSfrs[0]) : [];
            }


            // check if objectives or threats have been selected
            if (props.selectedSecurityObjectives || props.selectedThreats) {
                if (props.selectedSecurityObjectives && !props.selectedThreats) { // if objective is selected and threat isn't
                    // set threat list to intersection of threats for selected objective and sfr
                    handleSetAllThreats(query.SecurityObjectiveToThreats(SFRDatabase, props.selectedSecurityObjectives[0]).sort().filter(x => threats.includes(x)));
                    // update objective list to intersection of previous objectives options and objectives for the selected sfr
                    handleSetAllSecurityObjectives(allSecurityObjectives.filter(x => objectives.includes(x)));
                } else if (!props.selectedSecurityObjectives && props.selectedThreats) { // if threat is selected and objective isn't
                    // set objective list to intersection of objectives for selected threat and sfr
                    handleSetAllSecurityObjectives(query.ThreatToSecurityObjective(SFRDatabase, props.selectedThreats[0]).sort().filter(x => objectives.includes(x)));
                    // update threat list to threats mapped to the sfr selected
                    handleSetAllThreats(threats);
                }
                else { // all 3 selections are made
                    // set threat list to intersection of threats for selected objective and sfr
                    handleSetAllThreats(query.SecurityObjectiveToThreats(SFRDatabase, props.selectedSecurityObjectives[0]).sort().filter(x => threats.includes(x)));
                    // set objective list to intersection of objectives for selected threat and sfr
                    handleSetAllSecurityObjectives(query.ThreatToSecurityObjective(SFRDatabase, props.selectedThreats[0]).sort().filter(x => objectives.includes(x)));
                }
            }
            else { // set objectives and threats based on sfr selected
                // Update objective dropdown options
                handleSetAllSecurityObjectives(objectives);
                handleSetAllThreats(threats);
                handleSetAllSfrs(query.getSfrs(SFRDatabase).sort());
            }
        } else { // if no sfr is selected/cleared out
            // update threats
            fromThreats();
        }
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
        handleSetAllPps(null);

        // Reset selections to default
        props.handleSetSelectedThreats(null);
        props.handleSetSelectedSecurityObjectives(null);
        props.handleSetSelectedSfrs(null);
        props.handleSetSelectedPps(null);
        handleSetSfrQuery(null, []);
        handleSetSfrInputValue("");
    }

    /**
     * Handles setting the threats
     * @param value The threat value
     */
    const handleSetAllThreats = (value) => {
        // If threats were updated, set state
        if (JSON.stringify(allThreats) !== JSON.stringify(value)) {
            setThreats(value);
            sessionStorage.setItem("allThreats", JSON.stringify(value));
        }
    }

    /**
     * Handles setting the security objectives
     * @param value The security objectives value
     */
    const handleSetAllSecurityObjectives = (value) => {
        // If objectives were updated, set state
        if (JSON.stringify(allSecurityObjectives) !== JSON.stringify(value)) {
            setSecurityObjectives(value);
            sessionStorage.setItem("allSecurityObjectives", JSON.stringify(value));
        }
    }

    /**
     * Handles setting the sfrs
     * @param value The sfr value
     */
    const handleSetAllSfrs = (value) => {
        // If sfrs were updated, set state
        if (JSON.stringify(allSfrs) !== JSON.stringify(value)) {
            setSfrs(value);
            sessionStorage.setItem("allSfrs", JSON.stringify(value));

            // if there is an objective or threat selected, set the filtered sfrs to the ones that match the sfrs related to those fields
            if (props.selectedSecurityObjectives || props.selectedThreats) {
                // possible race condition where allSfrs is not getting updated in time to use, so using value instead
                let intersection = filteredSfrs.filter(x => value.includes(x.sfr));

                setFilteredSfrs(intersection);
                sessionStorage.setItem("filteredSfrs", JSON.stringify(intersection));
            } else {
                // if only sfr is selected, set to the original filtered sfr list
                let sfrToPP = query.stringToSFR(SFRDatabase, sfrQuery);
                setFilteredSfrs(sfrToPP);
            }
        }
    }

    /**
    * Handles setting the sfrs based on sfr content
    * @param selectedSFR The sfr value
    * @param filteredSFRs The filtered sfr values
    */
    const handleSetSfrQuery = (selectedSFR, filteredSFRs) => {
        // Sets the sfr query
        setSfrQuery(selectedSFR);
        sessionStorage.setItem("sfrQuery", JSON.stringify(selectedSFR));

        // Sets the filtered sfrs
        setFilteredSfrs(filteredSFRs);
        sessionStorage.setItem("filteredSfrs", JSON.stringify(filteredSFRs));
    }

    /**
     * Handles the input value
     */
    const handleSetSfrInputValue = (newInputValue) => {
        setSfrInputValue(newInputValue)
        sessionStorage.setItem("searchInput", JSON.stringify(newInputValue))
    }

    /**
     * Handles setting the pps
     * @param value The pp value
     */
    const handleSetAllPps = (value) => {
        // If pps were updated, set state
        if (JSON.stringify(allPps) !== JSON.stringify(value)) {
            setPps(value);
            sessionStorage.setItem("allPps", JSON.stringify(value));
        }
    }

    // Return Function
    return (
        <div className="h-full w-full rounded-lg">
            <div className="border-2 border-gray-400 rounded-xl p-3 bg-base-200 h-16 grid grid-cols-11">
                <h1 className="text-3xl font-bold text-accent flex justify-center items-center ml-5 col-span-10 ...">Filter</h1>
                <div className="... flex justify-end items-end mb-[4px] pr-1">
                    <TERipple rippleColor="light">
                        {props.filterStatus ?
                            <svg onClick={() => {props.handleSetFilterStatus(!props.filterStatus)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1FB2A6" className="w-7 h-7">
                                <path fillRule="evenodd" d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                            </svg>
                            :
                            null
                        }
                    </TERipple>
                </div>
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
                            filteredSfrs={filteredSfrs}
                            inputValue={sfrInputValue}
                            sfrQuery={sfrQuery}
                            selections={props.selectedSfrs}
                            handleSetSfrInputValue={handleSetSfrInputValue}
                            handleSetSelectedSfrs={props.handleSetSelectedSfrs}
                            handleSetSfrQuery={handleSetSfrQuery}
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
                            handleSetAllPps={handleSetAllPps}
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