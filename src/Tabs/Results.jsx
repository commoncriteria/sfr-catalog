import PropTypes from "prop-types";
import { useState, useMemo, useEffect } from "react";
import AccordionContent from "../Components/AccordionContent.jsx";
import Card from "../Components/Card.jsx";
import * as query from "../utils/query.js";
import SFRDatabase from "../assets/NIAPDocumentBundle.json";


/**
 * The Results class that displays the Results tab content
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function Results(props) {
    Results.propTypes = {
        selectedThreats: PropTypes.array,
        selectedSecurityObjectives: PropTypes.array,
        selectedSfrs: PropTypes.array,
        selectedPps: PropTypes.array,
    }

    // Constants
    const [ppContent, setPPContent] = useState(sessionStorage.getItem("ppContent") ? JSON.parse(sessionStorage.getItem("ppContent")) : []);

    // initialize metadata
    var threat_accordion_object = null;
    var objective_accordion_object = null;
    var sfr_accordion_object = null;

    useEffect(() => {
        if (props.selectedSfrs) {
            sfr_accordion_object = { name: props.selectedSfrs[0], isOpen: false, toggle: false, type: "SFRs" };
        }

        if (props.selectedThreats) {
            threat_accordion_object = { name: props.selectedThreats[0], isOpen: false, toggle: false, type: "Threats" };
        }

        if (props.selectedSecurityObjectives) {
            objective_accordion_object = { name: props.selectedSecurityObjectives[0], isOpen: false, toggle: false, type: "SecurityObjectives" };
        }
        // Update dropdowns according to threat selections
        let ppContentArr = [];

        if (props.selectedPps) {
            props.selectedPps.forEach(pp => {
                let pp_accordion_obj = {};
                pp_accordion_obj["name"] = pp;
                pp_accordion_obj["values"] = [threat_accordion_object, objective_accordion_object, sfr_accordion_object].filter(Boolean);
                ppContentArr.push(pp_accordion_obj);
            });
        }
        setPPContent(ppContentArr);
    }, [props.selectedPps, props.selectedSfrs, props.selectedThreats, props.selectedSecurityObjectives])

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
                let ppName = pp.name;
                let values = pp.values.valueOf();
                let tds = query.sfrToTD(SFRDatabase, props.selectedSfrs, ppName);
                cards.push(
                    <div className={Object.keys(currentPPContent).length > 1 ? "flex-none my-4 w-1/2" : "my-4 mr-2 ml-2 w-full"} key={ppName + "_Card"}>
                        <Card
                            largeTitle={true}
                            cardTitle={ppName}
                            cardContent={(
                                <div key={ppName}>
                                    {
                                        (values && Object.keys(values) !== 0) ?
                                            values.map((item) => {
                                                return (
                                                    <div className={"my-2"} key={item.name + ppName}>
                                                        <AccordionContent
                                                            name={item.name}
                                                            ppName={ppName}
                                                            type={item.type}
                                                            toggle={item.toggle}
                                                            isOpen={item.isOpen}
                                                            accordionHeader={item.name}
                                                            ppContent={currentPPContent}
                                                            handleSetPPContent={handleSetPPContent}
                                                            selectedThreats={props.selectedThreats}
                                                            selectedSecurityObjectives={props.selectedSecurityObjectives}
                                                            selectedSfrs={props.selectedSfrs}
                                                            tds={tds == undefined ? [] : tds}
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
                    <div className="flex flex-row">
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
        <div className={"w-full min-h-full overflow-auto"}>
            {contentData}
        </div>
    )
}


// Export Class
export default Results;