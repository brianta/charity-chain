import React from "react";
import Footer from "./Footer";
import { Style } from "react-style-tag";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
    topper: {
        backgroundColor: "#eee",
    },
    root: {
        maxWidth: "1168px",
        marginTop: "36px",
    },
});

const Component = ({ children, classes }) => {
    return (
        <div className={classes.topper}>
            <Style>{`
      body {background: #eee}
    `}</Style>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "1168px",
                        marginTop: "36px",
                    }}
                >
                    <div style={{ padding: "16px" }}>
                        {children}
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withStyles(styles)(Component);
