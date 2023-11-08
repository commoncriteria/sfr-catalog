import { Accordion, AccordionHeader, AccordionBody, Tooltip } from "@material-tailwind/react";
import { alpha, Stack, styled, Switch, Typography } from "@mui/material";
import PropTypes from "prop-types";
import * as query from "../utils/query.js";
import SFRDatabase from "../assets/NIAPDocumentBundle.json";
import XMLViewer from "react-xml-viewer";
import Modal from "./Modal.jsx";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * The Accordion class that displays the accordion
 * @param props             the input props
 * @returns {JSX.Element}   the accordion content
 * @constructor             passes in props to the class
 */
function AccordionContent(props) {
    // Prop Validation
    AccordionContent.propTypes = {
        name: PropTypes.string.isRequired,
        ppName: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        toggle: PropTypes.bool.isRequired,
        isOpen: PropTypes.bool.isRequired,
        accordionHeader: PropTypes.string.isRequired,
        ppContent: PropTypes.array.isRequired,
        handleSetPPContent: PropTypes.func.isRequired,
        selectedThreats: PropTypes.array,
        selectedSecurityObjectives: PropTypes.array,
        selectedSfrs: PropTypes.array,
        tds: PropTypes.array,
        sfrFamily: PropTypes.string.isRequired,
    };

    // Styling
    const AccentSwitch = styled(Switch)(({ theme }) => {
        return ({
            '& .MuiSwitch-switchBase.Mui-checked': {
                color: "#17877D",
                '&:hover': {
                    backgroundColor: alpha("#17877D", theme.palette.action.hoverOpacity),
                },
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: "#17877D",
            },
        });
    });

    const customTheme = {
        attributeKeyColor: "#0074D9",
        attributeValueColor: "#2ECC40"
    };

    /**
     * Display content according to toggle value, type, name and ppName.
     * It will call the query according to the above values and display the associated data
     * @returns {JSX.Element|null}
     */
    const queryContent = () => {
        let type = props.type
        let ppName = props.ppName
        let toggle = props.toggle;

        let threat_content = '';
        let objective_content = '';
        let sfr_content_html = '';
        let sfr_content_xml = '';

        // get content based on PP
        if (props.selectedThreats) {
            try {
                threat_content = query.getThreatContent(SFRDatabase, props.selectedThreats[0])[0][ppName];
            } catch (e) {
                console.log(e);
            }
        }
        if (props.selectedSecurityObjectives) {
            try {
                objective_content = query.getSecurityObjectiveContent(SFRDatabase, props.selectedSecurityObjectives[0])[0][ppName];
            } catch (e) {
                console.log(e);
            }
        }
        if (props.selectedSfrs) {
            // try catch as there may be a race condition since the pp filter is reactive in many places and content might be undefined on first render
            try {
                // for CC Part 2 SFRs, only html version exists
                if (ppName.includes("CC Part 2")) {
                    let base_component = props.sfrFamily + ".1";
                    sfr_content_html = query.getSfrContent(SFRDatabase, base_component)[0][ppName]["Text"];
                } else {
                    // check if text exists, else pull from the XML
                    if (Object.keys(query.getSfrContent(SFRDatabase, props.selectedSfrs[0])[0][ppName]).includes("Text")) {
                        sfr_content_html = query.getSfrContent(SFRDatabase, props.selectedSfrs[0])[0][ppName]["Text"];
                    }

                    sfr_content_xml = query.getSfrContent(SFRDatabase, props.selectedSfrs[0])[0][ppName]["XML"];
                }
            } catch (e) {
                console.log(e);
            }
        }

        switch (type) {
            case "Threats": {
                if (toggle) {
                    return (
                        <div className="mx-3 my-2">
                            <XMLViewer xml={threat_content} theme={customTheme} collapsible />
                        </div>
                    )
                } else {
                    return (
                        <div className="mx-3 my-2">
                            <p>{threat_content}</p>
                        </div>
                    )
                }
            }
            case "SecurityObjectives": {
                if (toggle) {
                    return (
                        <div className="mx-3 my-2">
                            <XMLViewer xml={objective_content} theme={customTheme} collapsible />
                        </div>
                    )
                } else {
                    return (
                        <div className="mx-3 my-2">
                            <p>{objective_content}</p>
                        </div>
                    )
                }
            }
            case "SFRs": {
                // for CC Part 2 SFRs, only html version exists
                if (ppName.includes("CC Part 2")) {
                    return (
                        <div className="mx-3 my-2" dangerouslySetInnerHTML={{ __html: sfr_content_html }} />
                    )
                } else {
                    if (toggle) {
                        return (
                            <div className="mx-3 my-2">
                                <XMLViewer xml={sfr_content_xml} theme={customTheme} collapsible />
                            </div>
                        )
                    } else {
                        if (sfr_content_html.length != 0) {
                            return (
                                <div className="mx-3 my-2" dangerouslySetInnerHTML={{ __html: sfr_content_html }} />
                            )
                        } else {
                            return (
                                <div className="mx-3 my-2">
                                    <p>{sfr_content_xml}</p>
                                </div>
                            )
                        }
                    }
                }
            }
            default:
                return null;
        }
    }

    // Handle Functions
    /**
     * Handles the updates to the accordion and sets the related data in the parent
     */
    const handleUpdates = (type) => {
        try {
            // Get selection value
            let name = props.name
            let ppName = props.ppName
            let isOpen = props.isOpen
            let pps = props.ppContent.valueOf()
            let toggle = props.toggle
            let ppIndex = pps.findIndex(x => x.name === ppName);
            if (ppIndex !== -1) {
                let values = pps[ppIndex].values.valueOf()
                let valueIndex = values.findIndex(x => x.name === name);
                if (valueIndex !== -1) {
                    if (type === "accordion") {
                        pps[ppIndex].values[valueIndex].isOpen = !isOpen
                    } else {
                        pps[ppIndex].values[valueIndex].toggle = !toggle
                    }
                }
            }

            // Update ppContent
            props.handleSetPPContent(pps.valueOf())
        } catch (e) {
            console.log(e)
        }
    }

    /**
    * Copy content of pane to clipboard
    * @param type: Threats, SecurityObjectives, or SFRs
    */
    const copyToClipboard = (type) => {
        let content = null;

        switch (type) {
            case "Threats": {
                try {
                    content = query.getThreatContent(SFRDatabase, props.selectedThreats[0])[0][props.ppName];

                    navigator.clipboard.writeText(content);
                    toast.success("Copied to Clipboard");
                } catch (e) {
                    console.log(e);
                }
                break;
            }
            case "SecurityObjectives": {
                try {
                    content = query.getSecurityObjectiveContent(SFRDatabase, props.selectedSecurityObjectives[0])[0][props.ppName];

                    navigator.clipboard.writeText(content);
                    toast.success("Copied to Clipboard");
                } catch (e) {
                    console.log(e);
                }
                break;
            }
            case "SFRs": {
                try {
                    // for CC Part 2 SFRs, only html version exists
                    if (props.ppName.includes("CC Part 2")) {
                        content = query.getSfrContent(SFRDatabase, props.selectedSfrs[0])[0][props.ppName]["Text"];
                    } else {
                        content = query.getSfrContent(SFRDatabase, props.selectedSfrs[0])[0][props.ppName]["XML"];
                    }

                    navigator.clipboard.writeText(content);
                    toast.success("Copied to Clipboard");
                } catch (e) {
                    console.log(e);
                }
                break;
            }
            default:
                return null;
        }
    }

    // Return Function
    return (
        <div>
            <Accordion
                id={props.name}
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
                    className={(props.isOpen ? " border-b-2 bg-gray-100" : " border-b-0") + " px-6 text-sm xs:max-lg:text-sm sm:max:lg:text-sm max-md:text-[0.5rem] md:max-lg:text-sm lg:max-2xl:text-md 2xl:text-lg font-extrabold text-accent border-gray-400"}
                    onClick={() => handleUpdates("accordion")}
                >
                    <div className="flex items-center">
                        <span>{props.accordionHeader}</span>
                        {
                            (props.type == "SFRs" && props.tds.length != 0) ?
                                <span className="ml-1">
                                    <Tooltip placement="bottom" className="border bg-white border-accent-content rounded-lg shadow-xl shadow-black/10"
                                        content={
                                            <div className="p-3">
                                                <Typography className="text-[#E051BA] text-center">
                                                    <span className="font-semibold">{`Contains TD: ${props.tds[0].TD_Number}`}</span>
                                                </Typography>
                                            </div>
                                        }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                            strokeWidth={2} className="w-[3vh] h-[3vh] flex-none cursor-pointer text-blue-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                        </svg>
                                    </Tooltip>
                                </span>
                                :
                                null
                        }
                    </div>
                </AccordionHeader>
                <AccordionBody className={"px-4 bg-gray-200"}>
                    <div className={props.type == "SFRs" ? "flex flex-col h-fit" : "flex flex-col h-fit"}>
                        <div>
                            {
                                !props.ppName.includes("CC Part 2") ?
                                    <Stack direction="row" component="label" alignItems="center" justifyContent="center">
                                        <Typography>String</Typography>
                                        <AccentSwitch checked={props.toggle} inputProps={{ 'aria-label': 'controlled' }} size="medium"
                                            onChange={() => handleUpdates("toggle")} />
                                        <Typography>XML</Typography>
                                    </Stack>
                                    :
                                    null
                            }
                            <div className="flex justify-center items-center"
                                onClick={() => copyToClipboard(props.type)}
                            >
                                <Tooltip content="Copy to Clipboard">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                                    </svg>
                                </Tooltip>

                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "10px", marginBottom: "10px" }}>
                            {
                                (props.type == "SFRs" && props.tds.length != 0) ?
                                    <Modal
                                        title={`TD: ${props.tds[0].TD_Number}`}
                                        content={props.tds[0]}
                                        buttonName={"View TD"}
                                        type={"TD"}
                                    />
                                    : null
                            }
                        </div>
                        <div key={props.name} className={props.type == "SFRs" ? "flex min-h-[36rem] max-h-[36rem] overflow-auto text-md lg:max-2xl:text-lg 2xl:text-xl" : "flex min-h-[32rem] max-h-[32rem] overflow-auto text-md lg:max-2xl:text-lg 2xl:text-xl"}>
                            {queryContent()}
                        </div>
                    </div>
                </AccordionBody>
            </Accordion>
            <ToastContainer
                position="bottom-center"
                autoClose={500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

// Export Class
export default AccordionContent;