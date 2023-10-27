// Imports
import PropTypes from "prop-types";

/**
 * The Card class that displays a card type
 * @param props             the input props
 * @returns {JSX.Element}   the card content
 * @constructor             passes in props to the class
 */
function Card(props) {
    // Prop Validation
    Card.propTypes = {
        largeTitle: PropTypes.bool,
        cardTitle: PropTypes.string.isRequired,
        cardContent: PropTypes.node.isRequired,
    };

    // Return Function
    return (
        <div className={(props.largeTitle ? "w-full" : "w-full mt-4")}>
            <div className={(props.largeTitle ? "bg-gray-100 border-gray-400 rounded-md" : "bg-gray-300 border-accent-content rounded-lg") + " block shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 border-2"}>
                <div className={ (props.largeTitle ? "text-2xl text-secondary font-extrabold border-gray-400" : "text-[19px] text-base-100 font-semibold border-gray-100") + " w-full border-b-2 p-3 leading-tight flex justify-center items-center"}>
                    {props.cardTitle}
                </div>
                <div className={(props.largeTitle ? "bg-gray-200 px-2 py-1" : "p-3" )}>
                    {props.cardContent}
                </div>
            </div>
        </div>
    )
}

// Export Class
export default Card;