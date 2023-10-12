import AccordionContent from "../Components/AccordionContent.jsx";
import {useMemo, useState} from "react";
import Card from "../Components/Card.jsx";

/**
 * The Threats class that displays the Threats tab content
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function Threats() {
    // Constants
    const [ppContent, setPPContent] =
        useState(sessionStorage.getItem("ppContent") ? JSON.parse(sessionStorage.getItem("ppContent")) :
            // Remove dummy data
            [
                {
                    name: "Application Software",
                    values: [
                        {name: "T.NETWORK_ATTACK", isOpen: true, content: "Content"},
                        {name: "O.INTEGRITY", isOpen: true, content: "Content"},
                        {name: "fdp_dec_ext.1.1", isOpen: true, content: "Content"},
                    ]
                },
                {
                    name: "Mobile Device",
                    values: [
                        {name: "T.NETWORK_EAVESDROP", isOpen: true, content: "Content"},
                    ]
                },
                {
                    name: "General-Purpose Computing Platforms",
                    values: [
                        {name: "fau_stg.4.1", isOpen: true, content: "Content"},
                    ]
                },
                {
                    name: "General Purpose Operating System",
                    values: [
                        {name: "O.PROTECTED_COMMS", isOpen: true, content: "Content"},
                        {name: "fcs_cop.1.1/ENCRYPT", isOpen: true, content: "Content"},
                    ]
                },
                {
                    name: "Virtualization System",
                    values: [
                        {name: "T.WEAK_CRYPTO", isOpen: true, content: "Content"},
                        {name: "O.VM_ENTROPY", isOpen: true, content: "Content"},
                    ]
                },
            ]);

    // Functions
    /**
     * Gets the Card/Accordion content according to the newly updated ppContent value
     * @param currentPPContent  The updated ppContent value
     * @returns {null}          Returns the pp Cards
     */
    const getContent = (currentPPContent) => {
        let cards = null
        if (currentPPContent && Object.keys(currentPPContent).length !== 0) {
            cards = []
            currentPPContent.map((pp) => {
                let ppName = pp.name
                let values = pp.values.valueOf()
                cards.push(
                    <div className="my-4 mr-2 ml-2" key={ppName + "_Card"}>
                        <Card
                            largeTitle={true}
                            cardTitle={ppName}
                            cardContent={(
                                <div key={ppName}>
                                    {
                                        (values && Object.keys(values) !== 0) ?
                                            values.map((item) => {
                                                return (
                                                    <div className={"my-2"} key={item.name}>
                                                        <AccordionContent id={item.name}
                                                                          parent_id={ppName}
                                                                          isOpen={item.isOpen}
                                                                          accordionHeader={item.name}
                                                                          accordionContent={item.content}
                                                                          ppContent={currentPPContent}
                                                                          handleSetPPContent={handleSetPPContent}
                                                        />
                                                    </div>
                                                )
                                            })
                                        : null
                                    }
                                </div>
                            )}
                        />
                    </div>
                )
            })
        }
        return cards
    }

    // Handler Functions
    /**
     * The handle method to set the ppContent
     * @param content
     */
    const handleSetPPContent = (content) => {
        sessionStorage.setItem("ppContent", JSON.stringify(content))
        setPPContent(JSON.parse(sessionStorage.getItem("ppContent")))
    }

    // Use Memos
    /**
     * The use memo to update the content data only when the ppContent updates
     * @type {unknown}
     */
    const contentData = useMemo(() => {
        if (ppContent && Object.keys(ppContent).length !== 0) {
            let nodes = getContent(ppContent.valueOf())
            return (
                (nodes && Object.keys(nodes).length !== 0) ?
                    <div>
                        {nodes.map(node => {
                            return node;
                        })}
                    </div>
                    : null
            )
        }
        return null;
    }, [ppContent]);

    // Return Function
    return (
        <div className={"w-full h-full"}>
            {contentData}
        </div>
    )
}

// Export Class
export default Threats;