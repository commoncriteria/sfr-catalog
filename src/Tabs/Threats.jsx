// Imports
import {TETabsPane} from "tw-elements-react";
import PropTypes from 'prop-types';

/**
 * The Threats class that displays the Threats tab content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function Threats(props) {
   // Prop Validation
    Threats.propTypes = {
        activeTab: PropTypes.string.isRequired,
    };

    // Return Function
    return (
        <TETabsPane
            show={props.activeTab === "threat_tab"}
            className="w-full"
        >Threats content
        </TETabsPane>
    )
}

// Export Class
export default Threats;