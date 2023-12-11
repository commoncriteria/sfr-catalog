// This software was produced for the U.S.Government under Basic Contract No.W56KGU - 18 - D-0004,
//   and is subject to the Rights in Noncommercial Computer Software and Noncommercial Computer Software
//   Documentation Clause 252.227 - 7014(FEB 2014)

//   © 2023 The MITRE Corporation.

// Imports
import { TETabsPane } from "tw-elements-react";
import Threats from "../Tabs/Threats.jsx";
import Objectives from "../Tabs/Objectives.jsx";
import SFRs from "../Tabs/SFRs.jsx";
import PPs from "../Tabs/PPs.jsx";
import Results from "../Tabs/Results.jsx";
import PropTypes from "prop-types";

/**
 * The Tabs class that displays the tab content on click
 * @param props             the input props
 * @returns {JSX.Element}   the tabs element
 * @constructor             passes in props to the class
 */
function TabContent(props) {
    // Prop Validation
    TabContent.propTypes = {
        activeTab: PropTypes.string.isRequired,
        selectedThreats: PropTypes.array,
        selectedSecurityObjectives: PropTypes.array,
        selectedSfrs: PropTypes.array,
        selectedPps: PropTypes.array,
        sfrFamily: PropTypes.string.isRequired,
    };

    // Functions
    const showTabContent = () => {
        let tab = props.activeTab
        let title = "Invalid"
        let content = null;

        // Gather tab title and content using the currently active tab
        switch (tab) {
            // All Results Tab Content
            case "results_tab":
                title = "Results";
                content = (<Results
                    activeTab={props.activeTab}
                    selectedThreats={props.selectedThreats}
                    selectedSecurityObjectives={props.selectedSecurityObjectives}
                    selectedSfrs={props.selectedSfrs}
                    selectedPps={props.selectedPps}
                />)
                break;
            // Threats Tab Content
            case "threat_tab":
                title = "Threats";
                content = (<Threats activeTab={props.activeTab} />)
                break;
            // Objectives Tab Content
            case "objective_tab":
                title = "Objectives";
                content = (<Objectives activeTab={props.activeTab} />)
                break;
            // SFRs Tab Content
            case "sfr_tab":
                title = "SFRs";
                content = (<SFRs activeTab={props.activeTab} />)
                break;
            // PPs Tab Content
            case "pp_tab":
                title = "PPs";
                content = (<PPs activeTab={props.activeTab} />)
                break;
            // Default
            default:
                break;
        }

        // Tab Content by Type
        return (
            <TETabsPane show={props.activeTab === tab} className="rounded-lg min-h-full parent flex flex-col">
                <div className="border-2 border-gray-400 rounded-xl p-3 bg-base-200 h-16">
                    <h1 className="text-3xl font-bold text-secondary flex justify-center items-center">Results</h1>
                </div>
                <div className="mt-4 mb-0 border-2 border-gray-300 rounded-lg p-3 bg-gray-300 text-black flex justify-center child flex-1 text-lg min-h-screen">
                    {props.selectedPps ?
                        <Results
                            activeTab={props.activeTab}
                            selectedThreats={props.selectedThreats}
                            selectedSecurityObjectives={props.selectedSecurityObjectives}
                            selectedSfrs={props.selectedSfrs}
                            selectedPps={props.selectedPps}
                            sfrFamily={props.sfrFamily}
                        />
                        :
                        null
                    }
                </div>
            </TETabsPane>
        )
    }

    // Return Function
    return (
        // Tab Content
        <div className="h-full">
            {showTabContent()}
        </div>
    );
}

// Export Class
export default TabContent;