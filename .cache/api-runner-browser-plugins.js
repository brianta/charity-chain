module.exports = [{
      plugin: require('../plugins/gatsby-plugin-top-layout/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-material-ui/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"FoxAndGeese","short_name":"FoxAndGeese","start_url":"/","background_color":"#eeeeee","display":"standalone","icon":"images/logo.png"},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":"UA-120162676-1"},
    }]
