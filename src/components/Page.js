import React from "react";
import Footer from "./Footer";
import Grid from "@material-ui/core/Grid";
import { Style } from "react-style-tag";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
    topper: {
        backgroundColor: "#eee",
    },
    root: {
        maxWidth: "1168px",
        marginTop: "94px",
    },
});

const Component = ({ children, classes }) => {
    return (
        <div className={classes.topper}>
            <Style>{`
      body {background: #eee}
    `}</Style>
            {/* <Grid alignItems="stretch" container justify="center" spacing={0}>
        <Grid className={classes.root} item xs={12}> */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    border: "1px solid blue",
                }}
            >
                <div
                    style={{
                        maxWidth: "100%",
                        marginTop: "94px",
                        border: "1px solid red",
                    }}
                >
                    <div style={{ padding: "16px" }}>
                        {children}
                        <Footer />
                    </div>
                </div>
            </div>
            {/* </Grid> */}
            {/* </Grid> */}
        </div>
    );
};

export default withStyles(styles)(Component);
