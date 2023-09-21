// Imports
import { useState } from "react";
import { TETabs, TETabsContent, TETabsItem } from "tw-elements-react";
import Threats from "../pages/Threats.jsx";
import Objectives from "../pages/Objectives.jsx";
import SFRs from "../pages/SFRs.jsx";
import PPs from "../pages/PPs.jsx";

/**
 * The Tabs class that displays the tab content on click
 * @returns {JSX.Element}   the tabs element
 * @constructor             passes in props to the class
 */
function Tabs() {
    // Constants
    // The currently active tab string value
    const [activeTab, setActiveTab] = useState("threat_tab");

    // Functions
    /**
     * Handles the tab click and switches the tab to the appropriate pane
     * @param value the tab name
     */
    const handleTabClick = (value) => {
        if (value === activeTab) {
            return;
        }
        setActiveTab(value);
    };

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
                onClick={() => handleTabClick(tabType)}
                active={activeTab === tabType}
                color={"secondary"}
                className={"text-lg lg:text-lg"}
                disabled={disabled}
                >{title}
            </TETabsItem>
        )
    }

    // Return Function
    return (
        <div className="mb-3 w-full">
            {/* Tabs */}
            <TETabs>
                {/* Threats Tab */}
                { tabItem("Threats", "threat_tab", false) }
                {/* Objectives Tab */}
                { tabItem("Objectives", "objective_tab", false) }
                {/* SFRs Tab */}
                { tabItem("SFRs", "sfr_tab", false) }
                {/* PPs Tab */}
                { tabItem("PPs", "pp_tab", false) }
            </TETabs>
            {/* Tab Content */}
            <div className={"flex justify-center items-center mx-3 text-lg"}>
                <TETabsContent>
                    {/* Threats Tab Content */}
                    <Threats activeTab={activeTab}/>
                    {/* Objectives Tab Content */}
                    <Objectives activeTab={activeTab}/>
                    {/* SFRs Tab Content */}
                    <SFRs activeTab={activeTab}/>
                    {/* PPs Tab Content */}
                    <PPs activeTab={activeTab}/>
                </TETabsContent>
            </div>
        </div>
    );
}

// Export Class
export default Tabs;