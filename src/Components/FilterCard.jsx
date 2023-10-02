// Imports
import PropTypes from "prop-types";
import Search from "../Components/Search.jsx";

/**
 * The FilterCard class that displays the FilterCard for filtering content
 * @param props             the input props
 * @returns {JSX.Element}   the card content
 * @constructor             passes in props to the class
 */
function FilterCard(props) {
    // Prop Validation
    FilterCard.propTypes = {
        cardTitle: PropTypes.string.isRequired,
        cardContent: PropTypes.node.isRequired,
        handleQuery: PropTypes.func.isRequired
    };

    // Return Function
    return (
        <div className="w-full mt-4">
            <div className="block rounded-lg bg-gray-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 border-accent-content border-2">
                <div className="w-full border-b-2 border-gray-100 p-3 text-lg font-semibold leading-tight text-base-200 flex justify-center items-center">
                    {props.cardTitle}
                </div>
                <div className="p-3">
                    <div className="p-2 pb-0">
                        <Search handleQuery={props.handleQuery}/>
                    </div>
                    <div className="my-4 mx-1.5 bg-gray-200 border-2 border-white rounded-xl min-h-[100px]">
                        {props.cardContent}
                    </div>
                    <div className="flex justify-center items-center mb-2">
                        <button
                            type="button"
                            href="#"
                            className="inline-block rounded bg-accent px-6 pb-2 pt-2.5 text-xs font-medium uppercase
                               leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150
                               ease-in-out hover:bg-secondary
                               hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                               focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                               focus:outline-none focus:ring-0 active:bg-secondary focus:bg-secondary
                               active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                               dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                               dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                               dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
                               dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Export Class
export default FilterCard;