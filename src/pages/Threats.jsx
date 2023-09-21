// Imports
import {useEffect, useState} from "react";
import {TETabsPane} from "tw-elements-react";
import PropTypes from 'prop-types';

/**
 * The Threats class that displays the Threats tab content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function Threats(props) {
    // Constants
    // The currently active tab string value
    const [activeTab, setActiveTab] = useState(props.activeTab);

    // Prop Validation
    Threats.propTypes = {
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
                show={activeTab === "threat_tab"}
                >Threat content
            </TETabsPane>
        </div>
    )
}

// Export Class
export default Threats;