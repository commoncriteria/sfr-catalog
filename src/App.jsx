// Imports
import {useState} from "react";
import FilterPane from "./Filtering/FilterPane.jsx";
import NavBar from "./Navigation/NavBar.jsx";
import TabContent from "./Tabs/TabContent.jsx";
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
    const [activeTab, setActiveTab] = useState(sessionStorage.getItem("activeTab") ? sessionStorage.getItem("activeTab") : "results_tab")

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

  // Return Function
  return (
      <div className="w-screen">
          {/* The Navigation Bar */}
          <div className="bg-base-300">
              <NavBar handleTabClick={handleTabClick.bind(this)} activeTab={activeTab}/>
          </div>
          <div className="grid grid-cols-4">
              {/* The Filer Pane Content*/}
              <div className="col-span-1 ... bg-base-100 h-screen">
                  <FilterPane/>
              </div>
              {/* The Tab Content */}
              <div className="col-span-3 ... h-screen">
                  <TabContent activeTab={activeTab}/>
              </div>
          </div>
      </div>
  )
}

// Export Class
export default App