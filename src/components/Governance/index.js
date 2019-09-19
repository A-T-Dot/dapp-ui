import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Search, Button, Card, Grid, List, Item, Segment } from 'semantic-ui-react';
import axios from "../../api/axios";
import Tasks from './Tasks';
import GeCard from '../Cards/GeCard';
import NewGeModalButton from "../Modals/NewGeModalButton";

function listItem (elements) {

  let items = elements.map((ele, index) => {
    return <GeCard key={index} link={`/ge/${ele.geId}`} ge={ele} />;
  });

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

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // TODO: change to dynamic key
        const response = await axios("/api/v1/accounts/5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty/tasks");
        let { data, error } = response;
        if (error) {
          console.log(error);
          return;
        }
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []); 



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
    <div>
      <Container>
        <Grid>
          <Grid.Column width={8}>
            <Search
              onResultSelect={handleResultSelect}
              onSearchChange={handleSearchChange}
              loading={search.loading}
              results={search.results}
              value={search.value}
            />
          </Grid.Column>
          <Grid.Column floated="right" textAlign="right" width={8}>
            <NewGeModalButton/>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={12}>
            <Card.Group itemsPerRow={3}>{items}</Card.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            <Tasks tasks={tasks} />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

