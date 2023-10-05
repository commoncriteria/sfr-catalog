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
            handleSetAllThreats(query.getThreats(SFRDatabase).sort());
            handleSetAllSecurityObjectives(query.getSecurityObjectives(SFRDatabase).sort());
            handleSetAllSfrs(query.getSfrs(SFRDatabase).sort())
            handleSetAllPps(null)
        } catch (e) {
            console.log(e)
        }
    }, [SFRDatabase]);


    /**
    * Handles setting the selected threats
    * @param value The selected threats value
    */
    const updatedObjectives = () => {
        console.log(props.selectedThreats);
        if (props.selectedThreats) {
            return query.ThreatToSecurityObjective(SFRDatabase, props.selectedThreats[0]);
        } else {
            return null;
        }
    }


    useEffect(() => {
        if (props.selectedThreats) {
            let updated_Objectives = updatedObjectives()
            if (updated_Objectives) {
                handleSetAllSecurityObjectives(updated_Objectives);
            }
            
        }
    }, [props.selectedThreats])



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