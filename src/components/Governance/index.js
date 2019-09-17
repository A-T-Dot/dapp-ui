import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Search, Button, Segment, Grid, List } from 'semantic-ui-react';

function listItem (elements) {
  const items = []

  for (const [index, value] of elements.entries()) {
    items.push(<Grid.Column key={index}>
      <Segment>
        <List as={Link} to={`/ge/${value.index}`}>
          <List.Item>GE #{value.index}</List.Item>
          <List.Item>{value.content}</List.Item>
        </List>
      </Segment>
    </Grid.Column>)
  }
  return items
}

export function Governance () {

  const elements = [
    { index: 1, content: 'A collection of dog pictures' },
    { index: 2, content: 'A collection of dog pictures' },
    { index: 5, content: 'A collection of dog pictures' },
  ]
  const items = listItem(elements)

  const [search, setSearch] = useState({ results: [], value: '', loading: false })

  const handleSearchChange = (event, { value }) => {
    setSearch({ results: [], value: value, loading: true })
    setTimeout(() => {
      setSearch({
        loading: false,
        results: [{
          "title": "Pagac - Kovacek",
          "description": "Cross-group eco-centric strategy",
          "image": "https://s3.amazonaws.com/uifaces/faces/twitter/nwdsha/128.jpg",
          "price": "$71.71"
        },
        {
          "title": "Mueller, Sawayn and Stamm",
          "description": "Self-enabling bifurcated support",
          "image": "https://s3.amazonaws.com/uifaces/faces/twitter/waghner/128.jpg",
          "price": "$94.97"
        },
        {
          "title": "Bernhard - Rogahn",
          "description": "Organic disintermediate challenge",
          "image": "https://s3.amazonaws.com/uifaces/faces/twitter/axel/128.jpg",
          "price": "$92.87"
        },
        {
          "title": "Hermann, Smith and Bogisich",
          "description": "Persistent grid-enabled concept",
          "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ralph_lam/128.jpg",
          "price": "$96.26"
        },
        {
          "title": "Bartell LLC",
          "description": "Operative didactic moderator",
          "image": "https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg",
          "price": "$54.59"
        }]
      })
    }, 500)
  }
  const handleResultSelect = (event, { result }) => {
    console.log(result)
    alert(`click item: ${result.title}`)
  }

  return (
    <Container>
      <Grid>
        <Grid.Column width={8}>
          <Search
            onResultSelect={handleResultSelect}
            onSearchChange={handleSearchChange}
            loading={search.loading}
            results={search.results}
            value={search.value}
            style={{ marginBottom: "1rem" }}
          />
        </Grid.Column>
        <Grid.Column floated='right' textAlign='right' width={8}>
          <Button basic>New GE</Button>
          <Button primary>New Whiteboard</Button>
        </Grid.Column>
      </Grid>

      <Grid stackable columns={5}>
        {items}
      </Grid>
    </Container>
  )
}

