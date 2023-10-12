import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import PropTypes from "prop-types";

/**
 * The Accordion class that displays the accordion
 * @param props             the input props
 * @returns {JSX.Element}   the accordion content
 * @constructor             passes in props to the class
 */
function AccordionContent(props) {
    // Prop Validation
    AccordionContent.propTypes = {
        id: PropTypes.string.isRequired,
        parent_id: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        accordionHeader: PropTypes.string.isRequired,
        accordionContent: PropTypes.node.isRequired,
        ppContent: PropTypes.array.isRequired,
        handleSetPPContent: PropTypes.func.isRequired,
    };

    /**
     * Handles the updates to the accordion and sets the related data in the parent
     */
    const handleUpdates = () => {
        try {
            // Get selection value
            let id = props.id
            let parent_id = props.parent_id
            let isOpen = props.isOpen
            let pps = props.ppContent.valueOf()
            let ppIndex = pps.findIndex(x => x.name === parent_id);
            if (ppIndex !== -1) {
                let values = pps[ppIndex].values.valueOf()
                let valueIndex = values.findIndex(x => x.name === id);
                if (valueIndex !== -1) {
                    pps[ppIndex].values[valueIndex].isOpen = !isOpen
                }
            }

            // Update ppContent
            props.handleSetPPContent(pps.valueOf())
        } catch (e) {
            console.log(e)
        }
    }


    // Return Function
    return (
        <div>
            <Accordion
                id={props.id}
                className={"bg-gray-300 rounded-md border-2 border-gray-400"}
                open={props.isOpen}
                icon={
                    <div>
                        {
                            !props.isOpen ?
                                // Show down arrow icon
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
                                </svg>
                                :
                                // Show up arrow icon
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
                                </svg>
                        }
                    </div>
                }
            >
                <AccordionHeader
                    className={(props.isOpen ? " border-b-2 bg-gray-100" : " border-b-0") + " px-6 text-lg font-extrabold text-accent border-gray-400"}
                    onClick={() => handleUpdates()}
                >
                    {props.accordionHeader}
                </AccordionHeader>
                <AccordionBody className={"px-4 bg-gray-200 flex justify-center items-center"}>
                    {props.accordionContent}
                </AccordionBody>
            </Accordion>
        </div>
    );
}

// Export Class
export default AccordionContent;