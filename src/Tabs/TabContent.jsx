// Imports
import {TETabsContent} from "tw-elements-react";
import Threats from "../Tabs/Threats.jsx";
import Objectives from "../Tabs/Objectives.jsx";
import SFRs from "../Tabs/SFRs.jsx";
import PPs from "../Tabs/PPs.jsx";
import Results from "../Tabs/Results.jsx";
import PropTypes from "prop-types";

/**
 * The Tabs class that displays the tab content on click
 * @param props             the input props
 * @returns {JSX.Element}   the tabs element
 * @constructor             passes in props to the class
 */
function TabContent(props) {
    // Prop Validation
    TabContent.propTypes = {
        activeTab: PropTypes.string.isRequired,
    };

    // Return Function
    return (
        <div>
            {/* Tab Content */}
            <TETabsContent className={"pl-3"}>
                {/* All Results Tab Content */}
                <Results activeTab={props.activeTab}/>
                {/* Threats Tab Content */}
                <Threats activeTab={props.activeTab}/>
                {/* Objectives Tab Content */}
                <Objectives activeTab={props.activeTab}/>
                {/* SFRs Tab Content */}
                <SFRs activeTab={props.activeTab}/>
                {/* PPs Tab Content */}
                <PPs activeTab={props.activeTab}/>
            </TETabsContent>
        </div>
    );
}

// Export Class
export default TabContent;