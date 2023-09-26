// Imports
import {TETabsPane} from "tw-elements-react";
import PropTypes from 'prop-types';

/**
 * The SFRs class that displays the SFRs tab content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function SFRs(props) {
    // Prop Validation
    SFRs.propTypes = {
        activeTab: PropTypes.string.isRequired,
    };

    // Return Function
    return (
        <TETabsPane
            show={props.activeTab === "sfr_tab"}
            >SFR content
        </TETabsPane>
    )
}

// Export Class
export default SFRs;