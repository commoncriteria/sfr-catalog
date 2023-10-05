// Imports
import { useState } from "react";
import FilterPane from "./Components/FilterPane.jsx";
import NavBar from "./Components/NavBar.jsx";
import TabContent from "./Components/TabContent.jsx";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import "./index.css"

/**
 * The App class that runs the Catalog project
 * @returns {JSX.Element}   the app element
 * @constructor             the App constructor
 */
function App() {
    // Constants
    // The currently active tab string value
    const [activeTab, setActiveTab] = useState(sessionStorage.getItem("activeTab") ? sessionStorage.getItem("activeTab") : "results_tab");
    // Selected Threats
    const [selectedThreats, setSelectedThreats] = useState(sessionStorage.getItem("selectedThreats") ?  JSON.parse(sessionStorage.getItem("selectedThreats")) : null);
    // Selected Security Objectives
    const [selectedSecurityObjectives, setSelectedSecurityObjectives] = useState(sessionStorage.getItem("selectedSecurityObjectives") ? JSON.parse(sessionStorage.getItem("selectedSecurityObjectives")) : null);
    // Selected SFRs
    const [selectedSfrs, setSelectedSfrs] = useState(sessionStorage.getItem("selectedSfrs") ?  JSON.parse(sessionStorage.getItem("selectedSfrs")) : null);
    // Selected Security Objectives
    const [selectedPps, setSelectedPps] = useState(sessionStorage.getItem("selectedPps") ?  JSON.parse(sessionStorage.getItem("selectedPps")) : null);


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
        sessionStorage.setItem("activeTab", value)
    };


    /**
     * Handles setting the selected threats
     * @param value The selected threats value
     */
    const handleSetSelectedThreats = (value) => {
        setSelectedThreats(value)
        sessionStorage.setItem("selectedThreats", JSON.stringify(value))
    }

    /**
     * Handles setting the selected security objectives
     * @param value The selected security objectives value
     */
    const handleSetSelectedSecurityObjectives = (value) => {
        setSelectedSecurityObjectives(value)
        sessionStorage.setItem("selectedSecurityObjectives", JSON.stringify(value))
    }

    /**
     * Handles setting the selected sfrs
     * @param value The selected sfrs value
     */
    const handleSetSelectedSfrs = (value) => {
        setSelectedSfrs(value)
        sessionStorage.setItem("selectedSfrs", JSON.stringify(value))
    }

    /**
     * Handles setting the selected pps
     * @param value The selected pps value
     */
    const handleSetSelectedPps = (value) => {
        setSelectedPps(value)
        sessionStorage.setItem("selectedPps", JSON.stringify(value))
    }

    // Return Function
    return (
        <div className="pb-5 min-w-full min-h-screen">
            <div className="p-1">
                {/* The Navigation Bar */}
                <div className="bg-base-300 w-full p-1 pt-2 sticky top-0 z-30 pb-2 rounded-sm">
                    <NavBar handleTabClick={handleTabClick.bind(this)} activeTab={activeTab} />
                </div>
                <div className="grid grid-cols-4 w-full h-full p-1 bg-base-200 rounded-xl z-10 min-h-screen">
                    {/* The Filter Pane Content */}
                    <div className="col-span-1 ... bg-neutral border-2 border-gray-500 rounded-lg p-4 pb-0 h-full">
                        <FilterPane
                            selectedThreats={selectedThreats}
                            selectedSecurityObjectives={selectedSecurityObjectives}
                            selectedSfrs={selectedSfrs}
                            selectedPps={selectedPps}
                            handleSetSelectedThreats={handleSetSelectedThreats}
                            handleSetSelectedSecurityObjectives={handleSetSelectedSecurityObjectives}
                            handleSetSelectedSfrs={handleSetSelectedSfrs}
                            handleSetSelectedPps={handleSetSelectedPps}
                        />
                    </div>
                    {/* The Tab Content */}
                    <div className="col-span-3 ... bg-neutral border-2 border-gray-500 rounded-lg p-4 ml-2 h-full">
                        <TabContent activeTab={activeTab} />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Export Class
export default App