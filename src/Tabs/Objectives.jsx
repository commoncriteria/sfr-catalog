// Imports
import {TETabsPane} from "tw-elements-react";
import PropTypes from 'prop-types';

/**
 * The Objectives class that displays the Objectives tab content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function Objectives(props) {
   // Prop Validation
    Objectives.propTypes = {
        activeTab: PropTypes.string.isRequired,
    };

    // Return Function
    return (
        <TETabsPane
            show={props.activeTab === "objective_tab"}
            >Objective content
        </TETabsPane>
    )
}

// Export Class
export default Objectives;