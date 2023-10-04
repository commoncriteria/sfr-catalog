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
        cardTitle: PropTypes.string.isRequired,
        cardContent: PropTypes.node.isRequired,
    };

    // Return Function
    return (
        <div className="w-full mt-4">
            <div className="block rounded-lg bg-gray-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 border-accent-content border-2">
                <div className="w-full border-b-2 border-gray-100 p-3 text-[19px] font-semibold leading-tight text-base-100 flex justify-center items-center">
                    {props.cardTitle}
                </div>
                <div className="p-3">
                    {props.cardContent}
                </div>
            </div>
        </div>
    )
}

// Export Class
export default Card;