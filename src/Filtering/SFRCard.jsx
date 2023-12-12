// This software was produced for the U.S.Government under Basic Contract No.W56KGU - 18 - D-0004,
//   and is subject to the Rights in Noncommercial Computer Software and Noncommercial Computer Software
//   Documentation Clause 252.227 - 7014(FEB 2014)

//   © 2023 The MITRE Corporation.

// Imports
import Card from "../Components/Card.jsx";
import PropTypes from "prop-types";
import Dropdown from "../Components/Dropdown.jsx";
import SearchDropdown from "../Components/SearchDropdown.jsx";
import { alpha, Stack, styled, Switch, Typography } from "@mui/material";
import * as query from "../utils/query.js";
import SFRDatabase from "../assets/NIAPDocumentBundle.json";

/**
 * The SFRCard class that displays the SFRCard filtering content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function SFRCard(props) {
    // Prop Validation
    SFRCard.propTypes = {
        allSfrs: PropTypes.array,
        filteredSfrs: PropTypes.array,
        selections: PropTypes.array,
        inputValue: PropTypes.string.isRequired,
        sfrQuery: PropTypes.string,
        handleSetSfrInputValue: PropTypes.func.isRequired,
        handleSetSelectedSfrs: PropTypes.func.isRequired,
        handleSetSfrQuery: PropTypes.func,
        searchToggle: PropTypes.bool,
        setSearchToggle: PropTypes.func,
    };

    /**
     * Handles the toggle for the type of search
     */
    const handleToggle = () => {
        // setSearchToggle(!searchToggle)
        props.setSearchToggle(!props.searchToggle)
        sessionStorage.setItem("searchToggle", JSON.stringify(!props.searchToggle))


        // set filteredSFRs to allSFRs (using query call since allSFRs is array of strings and filteredSFRs is array of objects)
        let sfrToPP = query.stringToSFR(SFRDatabase, '');
        let intersection = sfrToPP.filter(x => props.allSfrs.includes(x.sfr));
        props.handleSetSfrQuery(null, intersection)
        props.handleSetSelectedSfrs(null);
        props.handleSetSfrInputValue("");
    }

    /**
     * Handles the dropdown select for sfrs
     * @param event the event handler
     * @param values the values coming in from the dropdown
     */
    const handleDropdownSelect = (event, values) => {
        if (typeof values == "string") {
            props.handleSetSelectedSfrs([values])
        } else if (typeof values == "object") {
            // when cleared out, becomes null, which is an object; only want to set when there is an actual value
            if (values) {
                props.handleSetSelectedSfrs([values.sfr]);
            } else {
                props.handleSetSelectedSfrs(null);
            }
        } else {
            props.handleSetSelectedSfrs(values)
        }
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

    /**
     * Display dropdown according to toggle value
     * @returns {JSX.Element|null}
     */
    const generateCard = () => {
        if (props.searchToggle) {
            return (
                <SearchDropdown
                    label={"SFR Search by Content"}
                    selections={props.selections}
                    allSfrs={props.allSfrs}
                    filteredSfrs={props.filteredSfrs}
                    inputValue={props.inputValue}
                    sfrQuery={props.sfrQuery}
                    handleInputValue={props.handleSetSfrInputValue}
                    handleSetSelectedSfrs={props.handleSetSelectedSfrs}
                    handleSetSfrQuery={props.handleSetSfrQuery}
                />
            )
        } else {
            return (
                <Dropdown
                    label={"SFR"}
                    multiselect={false}
                    options={props.allSfrs}
                    selections={props.selections}
                    handleDropdownSelect={handleDropdownSelect}
                />
            )
        }
    }

    // Return Function
    return (
        <div>
            <Card
                cardTitle={"SFRs"}
                cardContent={
                    <div>
                        <h3 className="flex justify-center">Search By</h3>
                        <Stack direction="row" component="label" alignItems="center" justifyContent="center">
                            <Typography>SFR Name</Typography>
                            <AccentSwitch checked={props.searchToggle} inputProps={{ 'aria-label': 'controlled' }} size="medium"
                                onChange={() => (handleToggle())} />
                            <Typography>SFR Content</Typography>
                        </Stack>

                        {generateCard()}
                    </div>
                }
            />
        </div>
    )
}

// Export Class
export default SFRCard;