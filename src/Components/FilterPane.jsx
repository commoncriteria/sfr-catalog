// Imports
import {useState, useEffect} from 'react';
import ThreatCard from "../Filtering/ThreatCard.jsx";
import ObjectivesCard from "../Filtering/ObjectivesCard.jsx";
import SFRCard from "../Filtering/SFRCard.jsx";
import PPCard from "../Filtering/PPCard.jsx";
import SFRDatabase from '../assets/NIAPDocumentBundle.json';
import * as query from '../utils/query';
import React from 'react';

/**
 * The FilterPane class that displays the filtering content sidebar
 * @returns {JSX.Element}   the tabs element
 * @constructor             passes in props to the class
 */
function FilterPane() {
    // Threats
    const [allThreats, setThreats] = useState(null);

    // Security Objectives
    const [allSecurityObjectives, setSecurityObjectives] = useState(null);

    // Selected Threats
    const [selectedThreats, setSelectedThreats] = useState([]);

    // Selected Security Objectives
    const [selectedSecurityObjectives, setSelectedSecurityObjectives] = useState([]);



    useEffect(() =>  {
        // console.log(query.getThreats(SFRDatabase));
        // console.log(query.getSecurityObjectives(SFRDatabase));
        setThreats(query.getThreats(SFRDatabase));
        setSecurityObjectives(query.getSecurityObjectives(SFRDatabase));
        console.log(allThreats);
        console.log(allSecurityObjectives);
      }, [SFRDatabase]);

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
        var filteredItems = items;
        switch(name) {
            case "Threats":
                filteredItems = items.filter((threat)=>threat.includes(query));
                setSelectedThreats(filteredItems);
                break;
            case "SecurityObjectives":
                filteredItems = items.filter((securityObjective)=>securityObjective.includes(query));
                setSelectedSecurityObjectives(filteredItems);
                break;
        }

    };

    // Return Function
    return (
        <div className="h-full w-full rounded-lg">
            <div className="border-2 border-gray-400 rounded-xl p-3 bg-base-200 h-16 flex justify-center items-center">
                <h1 className="text-3xl font-bold text-accent">Filter</h1>
            </div>
            {/* Threat Filtering Card */}
            <div className="py-4">
                {allThreats != null ? <ThreatCard searchFunction={handleSearch} allThreats={allThreats} name={"Threats"} selections={selectedThreats}/> : null}
            </div>
            {/* Objectives Filtering Card */}
            <div className="pb-4">
                {allSecurityObjectives != null ? <ObjectivesCard searchFunction={handleSearch} allSecurityObjectives={allSecurityObjectives} name={"SecurityObjectives"} selections={selectedSecurityObjectives}/> : null}
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