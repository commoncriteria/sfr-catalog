// Imports
import { useState } from "react";
import FilterPane from "./Components/FilterPane.jsx";
import NavBar from "./Components/NavBar.jsx";
import TabContent from "./Components/TabContent.jsx";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import "./index.css"
import {TERipple} from "tw-elements-react";
import {Box} from "@mui/material";

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
        <div className="pb-5 min-w-full min-h-screen p-1">
            {/* The Navigation Bar */}
            <div className="bg-base-300 w-full p-1 pt-2 sticky top-0 z-30 pb-2 rounded-sm min-w-[853px]">
                <NavBar handleTabClick={handleTabClick.bind(this)} activeTab={activeTab} />
            </div>
            <div className="w-full h-full rounded-xl min-h-screen">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        m: "5px",
                        bgcolor: 'bg-base-200',
                    }}
                >
                    <div className="bg-neutral border-2 border-gray-500 rounded-lg p-4 min-h-full">
                        {/* The Filter Content Pane */}
                        {
                            !filterStatus ?
                                <div className="border-2 border-gray-400 rounded-xl p-3 bg-base-200 h-16 pt-4">
                                    <TERipple rippleColor="light">
                                        <svg onClick={() => {handleSetFilterStatus(!filterStatus)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1FB2A6" className="w-7 h-7">
                                            <path fillRule="evenodd" d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </TERipple>
                                </div>
                                :
                                <div className="min-w-[325px] max-w-[325px]">
                                    <FilterPane
                                        filterStatus={filterStatus}
                                        selectedThreats={selectedThreats}
                                        selectedSecurityObjectives={selectedSecurityObjectives}
                                        selectedSfrs={selectedSfrs}
                                        selectedPps={selectedPps}
                                        handleSetSelectedThreats={handleSetSelectedThreats}
                                        handleSetSelectedSecurityObjectives={handleSetSelectedSecurityObjectives}
                                        handleSetSelectedSfrs={handleSetSelectedSfrs}
                                        handleSetSelectedPps={handleSetSelectedPps}
                                        handleSetFilterStatus={handleSetFilterStatus}
                                    />
                                </div>
                        }
                    </div>
                    {/* The Tab Content Pane */}
                    <div className={"bg-neutral border-2 border-gray-500 rounded-lg p-4 ml-2 w-full overflow-x-hidden min-h-full min-w-[475px]"}>
                        <TabContent activeTab={activeTab}
                                    selectedThreats={selectedThreats}
                                    selectedSecurityObjectives={selectedSecurityObjectives}
                                    selectedSfrs={selectedSfrs}
                                    selectedPps={selectedPps}
                        />
                    </div>
                </Box>
            </div>
        </div>
    )
}

// Export Class
export default App