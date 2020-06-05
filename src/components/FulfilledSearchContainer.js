import React, { Component } from "react";
import Axios from "axios";
import * as JsSearch from "js-search";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  links: {
    textDecoration: "none",
    color: "#3F51B5",
  },
});

const currencies = [

];

class FulfilledSearch extends Component {
  state = {
    bookList: [],
    search: [],
    searchResults: [],
    isLoading: true,
    isError: false,
    searchQuery: "",
  };
  /**
   * React lifecycle method to fetch the data
   */
  async componentDidMount() {
    Axios.get("https://api.npoint.io/1944203635c82d1687cc")
      .then((result) => {
        const bookData = result.data;
        this.setState({ bookList: bookData });
        this.rebuildIndex();
      })
      .catch((err) => {
        this.setState({ isError: true });
        console.log("====================================");
        console.log(`Something bad happened while fetching the data\n${err}`);
        console.log("====================================");
      });
  }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = () => {
    const { bookList } = this.state;
    const dataToSearch = new JsSearch.Search("People");
    /**
     *  defines a indexing strategy for the data
     * more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy();
    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     *
     */
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();
    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("People");

    dataToSearch.addIndex("People"); // sets the index attribute for the data
    dataToSearch.addIndex("Org"); // sets the index attribute for the data

    dataToSearch.addDocuments(bookList); // adds the data to be searched
    this.setState({ search: dataToSearch, isLoading: false });
  };

  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  searchData = (e) => {
    const { search } = this.state;
    const queryResult = search.search(e.target.value);
    this.setState({ searchQuery: e.target.value, searchResults: queryResult });
  };
  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { bookList, searchResults, searchQuery } = this.state;
    const queryResults = searchQuery === "" ? bookList : searchResults;
    return (
      <div>
        <div>
          <div>
            <div>
              <div></div>
              <form
                style={{ margin: "1em", display: "flex" }}
                onSubmit={this.handleSubmit}
                noValidate
                variant="filled"
                autoComplete="off"
              >
                <Autocomplete
                  id="Search"
                  freeSolo
                  fullWidth
                  disableClearable
                  options={currencies.map((option) => option.value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type to filter by organization or name"
                      margin="normal"
                      variant="outlined"
                      InputProps={{ ...params.InputProps, type: "search" }}
                      value={searchQuery}
                      onChange={this.searchData}
                    />
                  )}
                />
              </form>
              {queryResults.map((item) => (
                <Card style={{ margin: "1em" }} variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      <strong>{item.People}</strong>
                    </Typography>
                    <Typography variant="h6" component="h3">
                      Matched: {item.Match_Offer}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      <strong></strong>
                      {item.How_to_Match}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      <strong>Org: </strong>
                      {item.Org}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      <a target="_blank" rel="noopener noreferrer" style={{textDecoration: "none",color:"#3F51B5"}} href={item.Source}>
                        Tweet
                      </a>{" "}
                      them a thank you!
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(FulfilledSearch);
