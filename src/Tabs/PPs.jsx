// Imports
import {TETabsPane} from "tw-elements-react";
import PropTypes from 'prop-types';

/**
 * The PPs class that displays the PPs tab content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function PPs(props) {
      // Prop Validation
    PPs.propTypes = {
        activeTab: PropTypes.string.isRequired,
    };

    // Return Function
    return (
        <TETabsPane
            show={props.activeTab === "pp_tab"}
            >PP content
        </TETabsPane>
    )
}

// Export Class
export default PPs;