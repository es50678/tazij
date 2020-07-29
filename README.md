# Tazij
Driver for the [Freshdesk REST API](https://developers.freshdesk.com/api/)

## Installation
```(shell script)
$ yarn add @es50678/tazij
```

## Usage
#### commonJS/node
```(javascript)
const Tazjit = require('@es50678/tazjit')

// plug in your subdomain and api key
// ie: if your freshdesk domain is "https://google.freshdesk.com"
const freshdeskHost = new Tazjit({ subdomain: 'google', apiKey: 'abc' })

// get all freshdesk ticket links related to a given JIRA ticket
freshdeskHost.ticketsForJIRA("GOOG-349")
  .then((freshdeskLinks) => {
    console.log(freshdeskLinks)
  });
```
