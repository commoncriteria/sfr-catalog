// Imports
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
                            {
                                (props.selections && Object.keys(props.selections).length !== 0) ?
                                props.selections.map((item) => {
                                    return (
                                        <label key={item} className="cursor-pointer label justify-start p-4">
                                            <input type="checkbox" defaultChecked value={item} className="checkbox checkbox-accent checkbox-xs"/>
                                            <span className="flex justify-left text-gray-600 text-xs pl-2 break-all">{item}</span>
                                        </label>
                                    )
                                })
                                : null
                            }
                        </div>
                    </React.Fragment>
                }
            />
        </div>
    )
}

// Export Class
export default ThreatCard;