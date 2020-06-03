import React, { Component } from "react"
import Axios from "axios"
import * as JsSearch from "js-search"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

class Search extends Component {
  state = {
    bookList: [],
    search: [],
    searchResults: [],
    isLoading: true,
    isError: false,
    searchQuery: "",
  }
  /**
   * React lifecycle method to fetch the data
   */
  async componentDidMount() {
    Axios.get("https://api.npoint.io/e4815ed4b9327680b766")
      .then(result => {
        const bookData = result.data
        this.setState({ bookList: bookData })
        this.rebuildIndex()
      })
      .catch(err => {
        this.setState({ isError: true })
        console.log("====================================")
        console.log(`Something bad happened while fetching the data\n${err}`)
        console.log("====================================")
      })
  }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = () => {
    const { bookList } = this.state
    const dataToSearch = new JsSearch.Search("People")
    /**
     *  defines a indexing strategy for the data
     * more about it in here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    /**
     * defines the sanitizer for the search
     * to prevent some of the words from being excluded
     *
     */
    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer()
    /**
     * defines the search index
     * read more in here https://github.com/bvaughn/js-search#configuring-the-search-index
     */
    dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("People")

    dataToSearch.addIndex("People") // sets the index attribute for the data
    dataToSearch.addIndex("Org") // sets the index attribute for the data

    dataToSearch.addDocuments(bookList) // adds the data to be searched
    this.setState({ search: dataToSearch, isLoading: false })
  }

  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  searchData = e => {
    const { search } = this.state
    const queryResult = search.search(e.target.value)
    this.setState({ searchQuery: e.target.value, searchResults: queryResult })
  }
  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    const { bookList, searchResults, searchQuery } = this.state
    const queryResults = searchQuery === "" ? bookList : searchResults
    return (
      <div style={{ margin: 3 + 'em' }} >
        <div style={{ margin: "0 auto" }}>
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <div style={{ margin: "0 auto" }}>
              <Input
                id="Search"
                value={searchQuery}
                onChange={this.searchData}
                placeholder="Filter"
                style={{ margin: "0 auto", width: "400px" }}
              />
            </div>
          </form>
          <div>
          <div style={{ margin: "1em auto" }} >
            Number of items:
            {queryResults.length}
          </div>
            <TableContainer style={{minWidth: 650}} component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left"><strong>People</strong></TableCell>
                    <TableCell align="left"><strong>Source</strong></TableCell>
                    <TableCell align="left"><strong>Org</strong></TableCell>
                    <TableCell align="left"><strong>Match Offer</strong></TableCell>
                    <TableCell align="left"><strong>How to Match</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queryResults.map((item) => (
                    <TableRow key={item.People}>
                      <TableCell component="th" scope="item">
                        {item.People}
                      </TableCell>
                      <TableCell align="left">{item.Source}</TableCell>
                      <TableCell align="left">{item.Org}</TableCell>
                      <TableCell align="left">{item.Match_Offer}</TableCell>
                      <TableCell align="left">{item.How_to_Match}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    )
  }
}
export default Search