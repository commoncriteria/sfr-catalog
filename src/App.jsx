// Imports
import Tabs from "./components/Tabs.jsx";
import NavBar from "./components/NavBar.jsx";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import "./index.css"

/**
 * The App class that runs the Catalog project
 * @returns {JSX.Element}   the app element
 * @constructor             the App constructor
 */
function App() {
  // Return Function
  return (
      <div>
          <div>
              {/* The Navigation Bar */}
              <NavBar/>
          </div>

          {/* The Tabs */}
          <div className="tabs flex-1 flex mt-3 ml-3">
              <Tabs/>
          </div>
      </div>
  )
}

// Export Class
export default App