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
    const [selectedThreats, setSelectedThreats] = useState(sessionStorage.getItem("selectedThreats") ? JSON.parse(sessionStorage.getItem("selectedThreats")) : null);
    // Selected Security Objectives
    const [selectedSecurityObjectives, setSelectedSecurityObjectives] = useState(sessionStorage.getItem("selectedSecurityObjectives") ? JSON.parse(sessionStorage.getItem("selectedSecurityObjectives")) : null);
    // Selected SFRs
    const [selectedSfrs, setSelectedSfrs] = useState(sessionStorage.getItem("selectedSfrs") ? JSON.parse(sessionStorage.getItem("selectedSfrs")) : null);
    // Selected Security Objectives
    const [selectedPps, setSelectedPps] = useState(sessionStorage.getItem("selectedPps") ? JSON.parse(sessionStorage.getItem("selectedPps")) : null);
    // Filter Pane Visible Status
    const [filterStatus, setFilterStatus] = useState(sessionStorage.getItem("filterStatus") ? JSON.parse(sessionStorage.getItem("filterStatus")) : true);

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
        // If selected threats were updated, set state
        if (JSON.stringify(selectedThreats) !== JSON.stringify(value)) {
            setSelectedThreats(value)
            sessionStorage.setItem("selectedThreats", JSON.stringify(value))
        }
    }

    /**
     * Handles setting the selected security objectives
     * @param value The selected security objectives value
     */
    const handleSetSelectedSecurityObjectives = (value) => {
        // If selected objectives were updated, set state
        if (JSON.stringify(selectedSecurityObjectives) !== JSON.stringify(value)) {
            setSelectedSecurityObjectives(value)
            sessionStorage.setItem("selectedSecurityObjectives", JSON.stringify(value))
        }
    }

    /**
     * Handles setting the selected sfrs
     * @param value The selected sfrs value
     */
    const handleSetSelectedSfrs = (value) => {
        // If selected sfrs were updated, set state
        if (JSON.stringify(selectedSfrs) !== JSON.stringify(value)) {
            setSelectedSfrs(value)
            sessionStorage.setItem("selectedSfrs", JSON.stringify(value))
        }
    }

    /**
     * Handles setting the selected pps
     * @param value The selected pps value
     */
    const handleSetSelectedPps = (value) => {
        // If selected pps were updated, set state
        if (JSON.stringify(selectedPps) !== JSON.stringify(value)) {
            setSelectedPps(value)
            sessionStorage.setItem("selectedPps", JSON.stringify(value))
        }
    }

    /**
     * Handles setting the Filter Pane Status
     * @param value The filter status value
     */
    const handleSetFilterStatus = (value) => {
        // Toggle the Filter Pane Visibility
        setFilterStatus(value)
        sessionStorage.setItem("filterStatus", JSON.stringify(value))
    }




    // Return Function
    return (
        <div className="pb-5 min-w-full min-h-screen">
            <div className="p-1">
                {/* The Navigation Bar */}
                <div className="bg-base-300 w-full p-1 pt-2 sticky top-0 z-30 pb-2 rounded-sm">
                    <NavBar handleTabClick={handleTabClick.bind(this)} activeTab={activeTab} />
                </div>
                <div className={filterStatus ? "grid grid-cols-4 w-full h-full p-1 bg-base-200 rounded-xl z-10 min-h-screen" : "grid grid-cols-25 w-full h-full p-1 bg-base-200 rounded-xl z-10 min-h-screen"}>
                    {/* The Filter Pane Content */}
                    <div className={filterStatus ? "col-span-1 ... bg-neutral border-2 border-gray-500 rounded-lg p-4 pb-0 pr-0 h-full" : "col-start-1 ... bg-neutral border-2 border-gray-500 rounded-lg h-full"}>
                        <div className={filterStatus ? "flex flex-row justify-between" : "flex flex-col justify-evenly"}>
                            {filterStatus ? <FilterPane
                                selectedThreats={selectedThreats}
                                selectedSecurityObjectives={selectedSecurityObjectives}
                                selectedSfrs={selectedSfrs}
                                selectedPps={selectedPps}
                                handleSetSelectedThreats={handleSetSelectedThreats}
                                handleSetSelectedSecurityObjectives={handleSetSelectedSecurityObjectives}
                                handleSetSelectedSfrs={handleSetSelectedSfrs}
                                handleSetSelectedPps={handleSetSelectedPps}
                            /> : null
                            }
                            {filterStatus ?
                                <div className="self-center" onClick={() => { handleSetFilterStatus(!filterStatus) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                                    </svg>
                                </div>
                                :
                                <div className="self-center" onClick={() => { handleSetFilterStatus(!filterStatus) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mt-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            }



                        </div>

                    </div>
                    {/* The Tab Content */}
                    <div className={filterStatus ? "col-span-3 ... bg-neutral border-2 border-gray-500 rounded-lg p-4 ml-2 h-full" : "col-span-24 bg-neutral border-2 border-gray-500 rounded-lg p-4 ml-2 h-full"}>
                        <TabContent activeTab={activeTab}
                            selectedThreats={selectedThreats}
                            selectedSecurityObjectives={selectedSecurityObjectives}
                            selectedSfrs={selectedSfrs}
                            selectedPps={selectedPps}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Export Class
export default App