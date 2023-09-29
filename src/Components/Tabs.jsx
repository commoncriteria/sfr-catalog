// Imports
import {TETabs, TETabsItem} from "tw-elements-react";
import PropTypes from "prop-types";

/**
 * The Tabs class that displays the tabs and handles/updates clicks
 * @param props             the input props
 * @returns {JSX.Element}   the tabs element
 * @constructor             passes in props to the class
 */
function Tabs(props) {
    // Prop Validation
    Tabs.propTypes = {
        activeTab: PropTypes.string.isRequired,
        handleTabClick: PropTypes.func.isRequired,
    };

    // Functions
    /**
     * The tab style based on which tab is selected
     * @param tabType       The tab type
     * @returns {string}    The current tab style for the selected tab
     */
    const tabStyle = (tabType) => {
        let style = "text-[18px] font-bold h-[65px] flex justify-center items-center"
        if (props.activeTab === tabType) {
            style += " bg-base-100"
        }
        return style;
    }
    /**
     * The tab item to be displayed upon tab click
     * @param title             The tab title
     * @param tabType           The active tab type
     * @param disabled          The tab disabled value
     * @returns {JSX.Element}   The tab item element to be displayed
     */
    const tabItem = (title, tabType, disabled) => {
        return (
            <TETabsItem
                onClick={() => props.handleTabClick(tabType)}
                active={props.activeTab === tabType}
                color={"secondary"}
                className={tabStyle(tabType)}
                disabled={disabled}
                >{title}
            </TETabsItem>
        )
    }

    // Return Function
    return (
        <div className="max-h-full -mb-[25px] -mt-[9px]">
            {/* Tabs */}
            <TETabs>
                {/* All Results Tab */}
                { tabItem("Results", "results_tab", false) }
                {/* Threats Tab */}
                { tabItem("Threats", "threat_tab", false) }
                {/* Objectives Tab */}
                { tabItem("Objectives", "objective_tab", false) }
                {/* SFRs Tab */}
                { tabItem("SFRs", "sfr_tab", false) }
                {/* PPs Tab */}
                { tabItem("PPs", "pp_tab", false) }
            </TETabs>
        </div>
    );
}

// Export Class
export default Tabs;