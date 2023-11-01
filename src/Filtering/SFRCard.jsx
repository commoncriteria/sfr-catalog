// Imports
import Card from "../Components/Card.jsx";
import PropTypes from "prop-types";
import Dropdown from "../Components/Dropdown.jsx";
import SearchDropdown from "../Components/SearchDropdown.jsx";
import { alpha, Stack, styled, Switch, Typography } from "@mui/material";
import { useState, useEffect } from "react";

/**
 * The SFRCard class that displays the SFRCard filtering content
 * @param props             the input props
 * @returns {JSX.Element}   the tab content
 * @constructor             passes in props to the class
 */
function SFRCard(props) {
    const [searchToggle, setSearchToggle] = useState(sessionStorage.getItem("searchToggle") ? JSON.parse(sessionStorage.getItem("searchToggle")) : false); // default is false to search by SFR

    // Prop Validation
    SFRCard.propTypes = {
        allSfrs: PropTypes.array,
        filteredSfrs: PropTypes.array,
        selections: PropTypes.array,
        handleSetSelectedSfrs: PropTypes.func.isRequired,
        handleSetSfrQuery: PropTypes.func,
        sfrQuery: PropTypes.string
    };

    useEffect(() => {
       
        if (sessionStorage.getItem("searchToggle") && (JSON.parse(sessionStorage.getItem("searchToggle")) !== searchToggle)) {
            props.handleSetSfrQuery(null);
            props.handleSetSelectedSfrs(null);
        }


    }, [searchToggle])

    console.log(props.filteredSfrs);

    const handleToggle = () => {
        setSearchToggle(!searchToggle)
        sessionStorage.setItem("searchToggle", JSON.stringify(!searchToggle))

    }


    /**
     * Handles the dropdown select for sfrs
     * @param event the event handler
     */
    const handleDropdownSelect = (event, values) => {
        // if (typeof values == "string") {
        //     props.handleSetSelectedSfrs([values])
        // } else {
        //     props.handleSetSelectedSfrs(values)
        // }
        if (typeof values == "string") {
            props.handleSetSelectedSfrs([values])
        } else if (typeof values == "object") {
            console.log(values);
            // when cleared out, becomes null, which is an object; only want to set when there is an actual value
            if (values) {
                props.handleSetSelectedSfrs([values.sfr]);
            } else {
                props.handleSetSelectedSfrs(null);
            }

        }
        else {
            props.handleSetSelectedSfrs(values)
        }
    };

    const handleTextInput = (event, newinputvalue, reason) => {
        // console.log(event);
        console.log(newinputvalue);
        // console.log(reason);

        console.log(props.selections);

        if (props.allSfrs.includes(newinputvalue)) {
            props.handleSetSelectedSfrs([newinputvalue]);
        } 

        if (reason === 'reset') {
            if (props.allSfrs.includes(newinputvalue)) {
                props.handleSetSelectedSfrs([newinputvalue]);
            } else if (!props.selections) {
                props.handleSetSfrQuery(null);
            }
        } else {
            if (newinputvalue.length != 0) {
                props.handleSetSfrQuery(newinputvalue);
            } else {
                props.handleSetSfrQuery(null);
            }
        }
    }


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
        if (searchToggle) {
            return (
                <SearchDropdown
                    label={"SFR Search By String"}
                    multiselect={false}
                    options={props.filteredSfrs ? props.filteredSfrs : []}
                    input={props.sfrQuery}
                    selections={props.selections}
                    handleDropdownSelect={handleDropdownSelect}
                    handleTextInput={handleTextInput}
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
                    handleTextInput={handleTextInput}
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
                            <AccentSwitch checked={searchToggle} inputProps={{ 'aria-label': 'controlled' }} size="medium"
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