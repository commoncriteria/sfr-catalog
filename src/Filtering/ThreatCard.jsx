// Imports
import { useState } from 'react';
import PropTypes from "prop-types";
import FilterCard from "../Components/FilterCard.jsx";
import React from 'react';

/**
 * The ThreatCard class that displays the ThreatCard filtering content
 * @returns {JSX.Element}   the tab content
 * @param props             the input props
 * @constructor             passes in props to the class
 */
function ThreatCard(props) {
    // Constants
    // state to keep track of query
    // const [getQuery, setQuery] = useState('');

    // Prop Validation
    ThreatCard.propTypes = {
        allThreats: PropTypes.array.isRequired,
        selections: PropTypes.array.isRequired,
        searchFunction: PropTypes.func.isRequired,
    };

    // Functions
    /**
     * Handles the query and stores the latest
     * @param value the tab name
     */
    const handleQuery = (query) => {
        // setQuery(query.toUpperCase());
        // props.searchFunction(props.allThreats, "Threats", getQuery);
        props.searchFunction(props.allThreats, "Threats", query.toUpperCase());
    };

    // Return Function
    return (
        <div>
            <FilterCard
                handleQuery={handleQuery}
                cardTitle={"Threats"}
                cardContent={
                    <React.Fragment>
                        <h5 className="text-gray-600 dark:text-gray-600 p-4">Threat Options: {props.selections.length} </h5>
                        <div className="form-control">
                            {props.selections.map((item) => {
                                return (
                                    <label key={item} className="cursor-pointer label justify-start">
                                        <input type="checkbox" defaultChecked value={item} className="checkbox" />
                                        <span className="flex justify-left label-text text-xs">{item}</span>
                                    </label>
                                )
                            })}
                        </div>
                    </React.Fragment>
                }
            />
        </div>
    )
}

// Export Class
export default ThreatCard;