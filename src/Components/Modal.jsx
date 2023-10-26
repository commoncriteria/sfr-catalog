import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from "prop-types";
import XMLViewer from "react-xml-viewer";
import {createTheme, ThemeProvider} from "@mui/material";

/**
 * The dialog slide transition
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * The theme of the mui controls
 * @type {Theme}
 */
const theme = createTheme({
    palette: {
        primary: {
            main: "#1FB2A6"
        },
        secondary: {
            main: "#E051BA"
        }
    },
});

/**
 * The modal class that displays a modal of information
 * @param props             the input props
 * @returns {JSX.Element}   the modal content
 * @constructor             passes in props to the class
 */
function Modal(props) {
    // Prop Validation
    Modal.propTypes = {
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired,
        buttonName: PropTypes.string.isRequired,
    };

    // Constants
    const [open, setOpen] = React.useState(false);

    // Functions
    /**
     * The open handler
     */
    const handleClickOpen = () => {
        setOpen(true);
    };

    /**
     * The close handler
     */
    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Gets the list of sfr components
     * @returns {null} returns the list of sfr components sorted and separated by a comma
     */
    const getSFRs = () => {
        let sfrs = null
        if (props.type === "TD") {
            props.content.SFR_Components.sort()
            sfrs = props.content.SFR_Components.join(", ")
        }
        return sfrs
    }

    // Return Function
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    sx={{color: "white"}}
                    onClick={handleClickOpen}>{props.buttonName}
                </Button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    style={{borderRadius: "100px"}}
                    maxWidth={"md"}
                >
                    <DialogTitle
                        color="secondary"
                        sx={{
                            margin: 0,
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "22px",
                            lineHeight: "1.6",
                            letterSpacing: "0.0075em",
                            padding: "16px 24px",
                            flex: "auto",
                            backgroundColor: "#F3F4F6"
                        }}
                        >{props.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description"
                           sx={{
                               margin: 0,
                               textAlign: "center",
                               color: "black",
                               fontWeight: "normal",
                               fontSize: "14px",
                               flex: "auto",
                               marginTop: "20px",
                           }}
                        >
                            <div>
                                {props.type === "TD" ?
                                    <div>
                                        <div>
                                            <label style={{fontWeight:"bold"}}>Publication Date: </label>
                                            <label>{props.content.Publication_Date}</label>
                                        </div>
                                        <div style={{marginTop:"10px"}}>
                                            <label style={{fontWeight:"bold"}}>SFR Components: </label>
                                            <label>{getSFRs()}</label>
                                        </div>
                                        <div style={{marginTop:"10px"}}>
                                            <label style={{fontWeight:"bold"}}>Text: </label>
                                            <XMLViewer xml={props.content.Text} collapsible
                                                       theme={{ attributeKeyColor: "#E051BA",
                                                           attributeValueColor: "#1FB2A6",
                                                       }}
                                            />
                                        </div>
                                    </div>
                                    :
                                    props.content
                                }
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            color={"secondary"}
                            sx={{
                                fontSize: "14px",
                            }}
                        >Close</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>
    );
}

// Export Class
export default Modal;