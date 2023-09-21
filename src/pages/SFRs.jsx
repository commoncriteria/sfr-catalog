// Imports
import {useEffect, useState} from "react";
import {TETabsPane} from "tw-elements-react";
import PropTypes from 'prop-types';

/**
 * The SFRs class that displays the SFRs tab content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function SFRs(props) {
    // Constants
    // The currently active tab string value
    const [activeTab, setActiveTab] = useState(props.activeTab);

    // Prop Validation
    SFRs.propTypes = {
        activeTab: PropTypes.string.isRequired,
    };

    // Use Effects
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props])

    // Return Function
    return (
        <TETabsPane
            show={activeTab === "sfr_tab"}
            >SFR content
        </TETabsPane>
    )
}

// Export Class
export default SFRs;