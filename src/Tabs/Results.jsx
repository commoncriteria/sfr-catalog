// import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as query from "../utils/query.js";
import SFRDatabase from "../assets/NIAPDocumentBundle.json";
import XMLViewer from "react-xml-viewer";
import { useState } from "react";


/**
 * The Results class that displays the Results tab content
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function Results(props) {
    Results.propTypes = {
        selectedThreats: PropTypes.array,
        selectedSecurityObjectives: PropTypes.array,
        selectedSfrs: PropTypes.array,
    }

    const [formatString, setformatString] = useState(true);

    // initialize to empty object by default
    var sfr_content = {};
    var threat_content = {};
    var objective_content = {};
    // populate content based on selections
    if (props.selectedSfrs) {
        sfr_content = query.getSfrContent(SFRDatabase, props.selectedSfrs[0])[0];
    }

    if (props.selectedThreats) {
        threat_content = query.getThreatContent(SFRDatabase, props.selectedThreats[0])[0];
        console.log(threat_content);
    }

    if (props.selectedSecurityObjectives) {
        objective_content = query.getSecurityObjectiveContent(SFRDatabase, props.selectedSecurityObjectives[0])[0];
    }


    function toggleFormat() {
        setformatString(!formatString);
    }

    const customTheme = {
        attributeKeyColor: "#0074D9",
        attributeValueColor: "#2ECC40"
    };


    // Return Function
    return (
        <div>
            <h2>Results Content</h2>
            <div className="flex">
                <input id="default-radio-1" type="radio" onChange={toggleFormat} defaultChecked value="string" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                <label className="ml-2 text-sm font-medium text-white-900 dark:text-white-300">String</label>
                <input id="default-radio-2" type="radio" onChange={toggleFormat} value="xml" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                <label className="ml-2 text-sm font-medium text-white-900 dark:text-white-300">XML</label>
            </div>
            <h2 className="font-bold">Selected Threat: {props.selectedThreats} </h2>
            <h2>Threat Content:
                {threat_content != null ?
                    formatString ?
                        Object.keys(threat_content).map(key => (
                            <div key={key}>
                                <h1>{key}</h1>
                                <p>{threat_content[key]}</p>
                            </div>
                        )) :
                        Object.keys(threat_content).map(key => (
                            <div key={key}>
                                <h1>{key}</h1>
                                <XMLViewer key={key} xml={JSON.stringify(threat_content[key])} theme={customTheme} collapsible />
                            </div>
                        ))
                    : null
                }
            </h2>
            <br></br>

            <h2 className="font-bold">Selected Objective: {props.selectedSecurityObjectives} </h2>
            <h2>Objective Content:
                {objective_content != null ?
                    formatString ?
                        Object.keys(objective_content).map(key => (
                            <div key={key}>
                                <h1>{key}</h1>
                                <p>{objective_content[key]}</p>
                            </div>
                        )) :
                        Object.keys(objective_content).map(key => (
                            <div key={key}>
                                <h1>{key}</h1>
                                <XMLViewer key={key} xml={JSON.stringify(objective_content[key])} theme={customTheme} collapsible />
                            </div>
                        ))
                    : null
                }
            </h2>
            <br></br>

            <h2 className="font-bold">Selected SFR: {props.selectedSfrs} </h2>
            <h2>SFR Content:
                {sfr_content != null ?
                    formatString ?
                        Object.keys(sfr_content).map(key => (
                            <div key={key}>
                                <h1>{key}</h1>
                                <p>{sfr_content[key]}</p>
                            </div>
                        )) :
                        Object.keys(sfr_content).map(key => (
                            <div key={key}>
                                <h1>{key}</h1>
                                <XMLViewer key={key} xml={JSON.stringify(sfr_content[key])} theme={customTheme} collapsible />
                            </div>
                        ))
                    : null
                }
            </h2>
        </div>
    )
}


// Export Class
export default Results;