// Imports
import PropTypes from "prop-types";
import Tabs from "../Tabs/Tabs.jsx";

/**
 * The NavBar class that displays the navigation bar and search capability
 * @param props             the input props
 * @returns {JSX.Element}   the navigation bar content
 * @constructor             passes in props to the class
 */
function NavBar(props) {
    // Prop Validation
    NavBar.propTypes = {
        activeTab: PropTypes.string.isRequired,
        handleTabClick: PropTypes.func.isRequired,
    };

    // Return Function
    return (
        <nav className="navbar flex text-neutral-content sticky top-0 z-30 w-screen">
            <div className="grid grid-cols-7 gap-4">
                <div className="font-title flex font-bold text-lg md:text-4xl text-accent pl-4 col-span-3 ...">Catalog</div>
                <div className="col-span-4 ...">
                    <Tabs activeTab={props.activeTab} handleTabClick={props.handleTabClick.bind(this)}/>
                </div>
            </div>
        </nav>
    )
}

// Export Class
export default NavBar;