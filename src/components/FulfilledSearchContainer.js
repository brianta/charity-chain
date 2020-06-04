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
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


class FulfilledSearch extends Component {
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
    Axios.get("https://api.npoint.io/9e096ecdd61cdc2321ff")
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
        <div>
        <div>
        <div>
          <div>
                    <form style={{margin:"1em"}} onSubmit={this.handleSubmit} noValidate variant="filled" autoComplete="off">
            <div>
              <Input
                id="Search"
                value={searchQuery}
                onChange={this.searchData}
                placeholder="Filter by name or org"
              />
            </div>
          </form>
            {queryResults.map((item) => (
                    <Card style={{margin:"1em"}} variant="outlined">
                    <CardContent>
                    <Typography variant="h5" component="h2">
                    <strong>{item.People}</strong>
                    </Typography>
                    <Typography variant="h6" component="h3">
                    Match Offer: {item.Match_Offer}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                    <strong></strong>{item.How_to_Match}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                    <strong>Org: </strong>{item.Org}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                    <strong><a href={item.Source}>Tweet</a> them a thank you!</strong>
                    </Typography>
                    </CardContent>
                    </Card>
            ))}
          </div>
          </div>
        </div>
      </div>
    )
  }
}
export default FulfilledSearch