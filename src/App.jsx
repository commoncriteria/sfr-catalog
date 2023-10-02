// Imports
import {useEffect, useState} from "react";
import FilterPane from "./Components/FilterPane.jsx";
import NavBar from "./Components/NavBar.jsx";
import TabContent from "./Components/TabContent.jsx";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import "./index.css"
import * as query from "./utils/query.js";
import SFRDatabase from "./assets/NIAPDocumentBundle.json";

/**
 * The App class that runs the Catalog project
 * @returns {JSX.Element}   the app element
 * @constructor             the App constructor
 */
function App() {
    // Constants
    // The currently active tab string value
    const [activeTab, setActiveTab] = useState(sessionStorage.getItem("activeTab") ? sessionStorage.getItem("activeTab") : "results_tab");
    // Threats
    const [allThreats, setThreats] = useState(sessionStorage.getItem("allThreats") ? JSON.parse(sessionStorage.getItem("allThreats")) : null);
    // Security Objectives
    const [allSecurityObjectives, setSecurityObjectives] = useState(sessionStorage.getItem("allSecurityObjectives") ?  JSON.parse(sessionStorage.getItem("allSecurityObjectives")) : null);
    // Filtered Threats
    const [filteredThreats, setFilteredThreats] = useState(sessionStorage.getItem("filteredThreats") ?  JSON.parse(sessionStorage.getItem("filteredThreats")) : []);
    // Filtered Security Objectives
    const [filteredSecurityObjectives, setFilteredSecurityObjectives] = useState(sessionStorage.getItem("filteredSecurityObjectives") ?  JSON.parse(sessionStorage.getItem("filteredSecurityObjectives")) : []);
    // Selected Threats
    const [selectedThreats, setSelectedThreats] = useState(sessionStorage.getItem("selectedThreats") ?  JSON.parse(sessionStorage.getItem("selectedThreats")) : []);
    // Selected Security Objectives
    const [selectedSecurityObjectives, setSelectedSecurityObjectives] = useState(sessionStorage.getItem("selectedSecurityObjectives") ?  JSON.parse(sessionStorage.getItem("selectedSecurityObjectives")) : []);

    // Use Effects
    /**
     * Use Effect to initialize the queries for the SFRDatabase
     */
    useEffect(() =>  {
        handleSetAllThreats(query.getThreats(SFRDatabase));
        handleSetAllSecurityObjectives(query.getSecurityObjectives(SFRDatabase));
        console.log(allThreats);
        console.log(allSecurityObjectives);
    }, [SFRDatabase]);

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
     * Handles setting the threats
     * @param value The threat value
     */
    const handleSetAllThreats = (value) => {
        setThreats(value)
        sessionStorage.setItem("allThreats", JSON.stringify(value))
    }

    /**
     * Handles setting the security objectives
     * @param value The security objectives value
     */
    const handleSetAllSecurityObjectives = (value) => {
        setSecurityObjectives(value)
        sessionStorage.setItem("allSecurityObjectives", JSON.stringify(value))
    }

    /**
     * Handles setting the filtered threats
     * @param value The filtered threats value
     */
    const handleSetFilteredThreats = (value) => {
        setFilteredThreats(value)
        sessionStorage.setItem("filteredThreats", JSON.stringify(value))
    }

    /**
     * Handles setting the filtered security objectives
     * @param value The filtered security objectives value
     */
    const handleSetFilteredSecurityObjectives = (value) => {
        setFilteredSecurityObjectives(value)
        sessionStorage.setItem("filteredSecurityObjectives", JSON.stringify(value))
    }

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

  // Return Function
  return (
      <div className="pb-5">
          <div className="p-1">
              {/* The Navigation Bar */}
              <div className="bg-base-300 w-full p-1 pt-2 sticky top-0 z-30 pb-2 rounded-sm">
                  <NavBar handleTabClick={handleTabClick.bind(this)} activeTab={activeTab}/>
              </div>
              <div className="grid grid-cols-4 w-full h-full p-1 bg-base-200 rounded-xl z-10">
                  {/* The Filter Pane Content */}
                  <div className="col-span-1 ... bg-neutral border-2 border-gray-500 rounded-lg p-4 pb-0 h-full">
                      <FilterPane
                          allThreats={allThreats}
                          allSecurityObjectives={allSecurityObjectives}
                          filteredThreats={filteredThreats}
                          filteredSecurityObjectives={filteredSecurityObjectives}
                          selectedThreats={selectedThreats}
                          selectedSecurityObjectives={selectedSecurityObjectives}
                          handleSetAllThreats={handleSetAllThreats}
                          handleSetAllSecurityObjectives={handleSetAllSecurityObjectives}
                          handleSetFilteredThreats={handleSetFilteredThreats}
                          handleSetFilteredSecurityObjectives={handleSetFilteredSecurityObjectives}
                          handleSetSelectedThreats={handleSetSelectedThreats}
                          handleSetSelectedSecurityObjectives={handleSetSelectedSecurityObjectives}
                      />
                  </div>
                  {/* The Tab Content */}
                  <div className="col-span-3 ... bg-neutral border-2 border-gray-500 rounded-lg p-4 ml-2 h-full">
                      <TabContent activeTab={activeTab}/>
                  </div>
              </div>
          </div>
      </div>
  )
}

// Export Class
export default App