// Imports
import {useState} from "react";
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
      <div className="w-full">
          <div className="p-1">
              {/* The Navigation Bar */}
              <div className="bg-base-300 w-full p-1 pt-0" >
                  <NavBar handleTabClick={handleTabClick.bind(this)} activeTab={activeTab}/>
              </div>
              <div className="grid grid-cols-4 w-full h-full p-1 bg-base-200">
                  {/* The Filter Pane Content */}
                  <div className="col-span-1 ... bg-base-200 border-2 border-gray-500 rounded-lg pb-4">
                      <FilterPane/>
                  </div>
                  {/* The Tab Content */}
                  <div className="col-span-3 ... bg-base-200 border-2 border-gray-500 rounded-lg pb-4 ml-1 h-full w-full">
                      <TabContent activeTab={activeTab}/>
                  </div>
              </div>
          </div>
      </div>
  )
}

// Export Class
export default App