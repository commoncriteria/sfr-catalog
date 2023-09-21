// Imports
import {useEffect, useState} from "react";
import {TETabsPane} from "tw-elements-react";
import PropTypes from 'prop-types';

/**
 * The Objectives class that displays the Objectives tab content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function Objectives(props) {
    // Constants
    // The currently active tab string value
    const [activeTab, setActiveTab] = useState(props.activeTab);

    // Prop Validation
    Objectives.propTypes = {
        activeTab: PropTypes.string.isRequired,
    };

    // Use Effects
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props])

    // Return Function
    return (
        <div className="mb-3">
            <TETabsPane
                show={activeTab === "objective_tab"}
                >Objective content
            </TETabsPane>
        </div>
    )
}

// Export Class
export default Objectives;