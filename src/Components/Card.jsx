// This software was produced for the U.S.Government under Basic Contract No.W56KGU - 18 - D-0004,
//   and is subject to the Rights in Noncommercial Computer Software and Noncommercial Computer Software
//   Documentation Clause 252.227 - 7014(FEB 2014)

//   © 2023 The MITRE Corporation.

// Imports
import PropTypes from "prop-types";
import { Tooltip, Typography } from "@material-tailwind/react";

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
                <div className={(props.largeTitle ? "text-lg lg:text-xl 2xl:text-2xl text-secondary font-extrabold border-gray-400" : "text-[19px] text-base-100 font-semibold border-gray-100") + " w-full border-b-2 p-3 leading-tight flex justify-center items-center"}>
                    {props.cardTitle}
                    {
                        props.cardTitle === "PPs" ?
                            <div className="ml-1">
                                <Tooltip placement="bottom" className="border bg-white border-accent-content rounded-lg shadow-xl shadow-black/10"
                                    content={
                                        <div className="w-[300px] p-2">
                                            <Typography className="font-medium text-[#1FB2B0] text-center">
                                                Selecting Multiple PPs
                                            </Typography>
                                            <Typography variant="small" className="font-normal opacity-80 text-base-100">
                                                <span>To select multiple PPs simultaneously within the dropdown, </span>
                                                <span className="font-bold">hold ctrl+click </span>
                                                <span>and </span>
                                                <span className="font-bold">select multiple</span>
                                            </Typography>
                                        </div>
                                    }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        strokeWidth={2} className="h-5 w-5 cursor-pointer text-blue-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                        />
                                    </svg>
                                </Tooltip>
                            </div>
                            :
                            null
                    }
                </div>
                <div className={(props.largeTitle ? "bg-gray-200 px-2 py-1" : "p-3")}>
                    {props.cardContent}
                </div>
            </div>
        </div>
    )
}

// Export Class
export default Card;