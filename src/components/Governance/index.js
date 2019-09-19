import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Search, Button, Card, Grid, List } from 'semantic-ui-react';
import axios from "../../api/axios";

function listItem (elements) {
  const items = []

  for (const [index, value] of elements.entries()) {
    items.push(<Card key={index}>
      <Card.Content>
        <Card.Header>GE #{value.geId}</Card.Header>
        <Card.Description>
          <List as={Link} to={`/ge/${value.geId}`}>
            <List.Item>{value.content}</List.Item>
          </List>
        </Card.Description>
      </Card.Content>
    </Card>)
  }
  return items
}

export function Governance () {

  const [ges, setGes] = useState([]);
  const items = listItem(ges);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios("/api/v1/ges");
        let { data, error } = response;
        if(error) {
          console.log(error)
          return;
        }
        console.log(data);
        setGes(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  },[]); 



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
          <Button basic color='blue'>New GE</Button>
          <Button primary>New Whiteboard</Button>
        </Grid.Column>
      </Grid>

      <Card.Group>
        {items}
      </Card.Group>
    </Container>
  )
}

