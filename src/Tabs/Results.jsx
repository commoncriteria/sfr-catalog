// Imports
import {TETabsPane} from "tw-elements-react";
import PropTypes from 'prop-types';

/**
 * The Results class that displays the Results tab content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function Results(props) {
  // Prop Validation
    Results.propTypes = {
        activeTab: PropTypes.string.isRequired,
    };

    // Return Function
    return (
        <TETabsPane
            show={props.activeTab === "results_tab"}
            className="w-full"
            >Results content
        </TETabsPane>
    )
}

// Export Class
export default Results;