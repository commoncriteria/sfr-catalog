import React from 'react';
import PropTypes from "prop-types";
import FilterCard from "../Components/FilterCard.jsx";

/**
 * The ObjectivesCard class that displays the ObjectivesCard filtering content
 * @returns {JSX.Element}   the tab content
 * @param props             the input props
 * @constructor             passes in props to the class
 */
function ObjectivesCard(props) {
    // Prop Validation
    ObjectivesCard.propTypes = {
        allSecurityObjectives: PropTypes.array.isRequired,
        selections: PropTypes.array.isRequired,
        searchFunction: PropTypes.func.isRequired,
    };

    // Functions
    /**
     * Handles the query and stores the latest
     * @param value the tab name
     */
    const handleQuery = (query) => {
        props.searchFunction(props.allSecurityObjectives, "SecurityObjectives", query.toUpperCase());
    };

    // Return Function
    return (
        <FilterCard
            handleQuery={handleQuery}
            cardTitle={"Objectives"}
            cardContent={
                <React.Fragment>
                    <h5 className="text-gray-600 dark:text-gray-600 p-4">Objective Selections: </h5>
                    <div className="form-control">
                        {
                            props.selections && Object.keys(props.selections).length !== 0 ?
                            props.selections.map((item) => {
                                return (
                                    <label key={item} className="cursor-pointer label justify-start">
                                        <input type="checkbox" defaultChecked value={item} className="checkbox"/>
                                        <span className="text-left break-all label-text text-xs">{item}</span>
                                    </label>
                                )
                            })
                            : null
                        }
                    </div>
                </React.Fragment>
            }
        />
    )
}

// Export Class
export default ObjectivesCard;