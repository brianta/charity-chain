import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/SEO";
import Page from "../components/Page";
import List from "../components/List";
import Tabs from "../components/Tabs";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Alien } from "mdi-material-ui";
import { Robot } from "mdi-material-ui";
import logo from "../../images/logo.png";
import Avatar from "@material-ui/core/Avatar";
import Search from "../components/SearchContainer";
import CompanySearch from "../components/CompanySearchContainer";
import FulfilledSearch from "../components/FulfilledSearchContainer";

const styles = (theme) => ({
  angles: {
    color: "theme.palette.secondary.light",
    opacity: 0.5,
    fontWeight: "normal",
  },
  avatar: {
    width: "160px",
    height: "160px",
    marginBottom: "40px",
    backgroundColor: theme.palette.primary.light,
  },
  logo: {
    width: "100px",
    height: "100px",
    border: "0",
  },
  text: {
    textAlign: "center",
  },
  h1: {
    fontSize: "4em",
  },
  h2: {
    fontSize: "1.6em",
  },
  tabs: {
    marginTop: "40px",
    marginBottom: "40px",
  },
  links: {
    textDecoration: "none",
    color: "#3F51B5",
  },
});
const Home = (props) => {
  const {
    classes,
    data: {
      Products: { edges: products },
      Services: { edges: services },
      Basic: {
        siteMetadata: {
          domain,
          company,
          defaultTitle,
          preamble,
          postamble,
          defaultDescription,
          contact: { email },
        },
      },
    },
  } = props;
  return (
    <Page>
      <SEO title={defaultTitle}>
        <meta content={defaultDescription} name="description" />
        <link href={domain} rel="canonical" />
      </SEO>
      <div className={classes.text}>
        <Typography className={classes.h1} color="Black" paragraph variant="h1">
          donation matching
        </Typography>
        <Typography className={classes.h2} paragraph variant="h2">
          {preamble}
        </Typography>
        <Typography
          className={classes.text}
          style={{ margin: "1em", textAlign: "center" }}
          gutterBottom
        >
          Donate today:{" "}
          <a
            className={classes.links}
            href="https://support.eji.org/give/153413/#!/donation/checkout"
          >
            Equal Justice Initiative
          </a>{" "}
          |{" "}
          <a
            className={classes.links}
            href="https://org2.salsalabs.com/o/6857/p/salsa/donation/common/public/?donate_page_KEY=15780"
          >
            NAACP
          </a>{" "}
          |{" "}
          <a className={classes.links} href="https://policingequity.org/donate">
            Center For Policing Equity
          </a>{" "}
          |{" "}
          <a className={classes.links} href="https://www.joincampaignzero.org/">
            Campaign Zero
          </a>
        </Typography>
        <Typography
          className={classes.text}
          style={{ margin: "1em", textAlign: "center" }}
          gutterBottom
        >
        <a className={classes.links} style={{textDecoration:"none"}} href="https://docs.google.com/forms/d/e/1FAIpQLScKjLsuuS2xAOb5aKFyMHdJYyr28581ufajTMfV1nBUfnDMsw/viewform?usp=sf_link">Add to this list</a>. 
        <br/>
         <a className={classes.links} style={{textDecoration:"none"}} href="https://forms.gle/XywPeyBbscJPBvHc7">Correct something on this list</a>.
        </Typography>
        <Typography
          className={classes.text}
          style={{ margin: "1em", textAlign: "center" }}
          gutterBottom
        >
        Tweet me <a className={classes.links} style={{textDecoration:"none"}} href="https://twitter.com/fanfavorite_bta">@fanfavorite_bta</a>
        </Typography>
      </div>
      <div
        style={{
          margin: "auto",
          width: "100%",
          maxWidth: 790,
        }}
        className={props.classes.tabs}
      >
        <Tabs
          items={[
            ["People", , <Search />],
            ["Company", , <CompanySearch />],
            ["Fully Matched", , <FulfilledSearch />],
          ]}
        />
      </div>

      <div className={classes.text}>
        <Typography></Typography>
      </div>
    </Page>
  );
};

export const query = graphql`
  query Name {
    Basic: site {
      siteMetadata {
        domain
        company
        defaultTitle
        preamble
        defaultDescription
        postamble
        contact {
          email
        }
      }
    }
    Products: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/products/" } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            siteLink
            imageLink
            customWidth
            customTopPadding
          }
        }
      }
    }
    Services: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/services/" } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            imageLink
          }
        }
      }
    }
  }
`;

export default withStyles(styles, { withTheme: true })(Home);
