import React, { useState, useEffect } from 'react';
import { Container, Search, Tab, Segment, Grid, List } from 'semantic-ui-react';
import axios from '../../api/axios';

function listItem (type, elements) {
  const items = []

  for (const [index, value] of elements.entries()) {
    items.push(<Grid.Column key={index}>
      <Segment>
        <List>
          <List.Item>{type} #{value.geId}</List.Item>
          <List.Item>{value.content}</List.Item>
        </List>
      </Segment>
    </Grid.Column>)
  }
  return items
}

export function Discover() {
  
  const [ges, setGes] = useState([]);
  const [tcxs, setTcxs] = useState([]);
  const [nodes, setNodes] = useState([]);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios("/api/v1/tcxs");
        let { data, error } = response;
        if(error) {
          console.log(error)
          return;
        }
        console.log(data);
        setTcxs(data);
 
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  },[]); 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios("/api/v1/nodes");
        let { data, error } = response;
        if (error) {
          console.log(error);
          return;
        }
        console.log(data);
        setNodes(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []); 

  const gePane = listItem("GE", ges);
  const tcsPane = listItem("TCS", tcxs);
  const nodePane = listItem("Node", nodes);

  const panes = [
    {
      menuItem: "GE",
      render: () => (
        <Grid stackable columns={5}>
          {gePane}
        </Grid>
      )
    },
    {
      menuItem: "TCX",
      render: () => (
        <Grid stackable columns={5}>
          {tcsPane}
        </Grid>
      )
    },
    {
      menuItem: "Node",
      render: () => (
        <Grid stackable columns={5}>
          {nodePane}
        </Grid>
      )
    }
  ];
  const [search, setSearch] = useState({
    results: [],
    value: "",
    loading: false
  });

  const handleSearchChange = (event, { value }) => {
    setSearch({ results: [], value: value, loading: true });
    setTimeout(() => {
      setSearch({
        loading: false,
        results: [
          {
            title: "Pagac - Kovacek",
            description: "Cross-group eco-centric strategy",
            image:
              "https://s3.amazonaws.com/uifaces/faces/twitter/nwdsha/128.jpg",
            price: "$71.71"
          },
          {
            title: "Mueller, Sawayn and Stamm",
            description: "Self-enabling bifurcated support",
            image:
              "https://s3.amazonaws.com/uifaces/faces/twitter/waghner/128.jpg",
            price: "$94.97"
          },
          {
            title: "Bernhard - Rogahn",
            description: "Organic disintermediate challenge",
            image:
              "https://s3.amazonaws.com/uifaces/faces/twitter/axel/128.jpg",
            price: "$92.87"
          },
          {
            title: "Hermann, Smith and Bogisich",
            description: "Persistent grid-enabled concept",
            image:
              "https://s3.amazonaws.com/uifaces/faces/twitter/ralph_lam/128.jpg",
            price: "$96.26"
          },
          {
            title: "Bartell LLC",
            description: "Operative didactic moderator",
            image: "https://s3.amazonaws.com/uifaces/faces/twitter/gt/128.jpg",
            price: "$54.59"
          }
        ]
      });
    }, 500);
  };
  const handleResultSelect = (event, { result }) => {
    console.log(result);
    alert(`click item: ${result.title}`);
  };

  return (
    <Container>
      <Search
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        loading={search.loading}
        results={search.results}
        value={search.value}
        style={{ marginBottom: "1rem" }}
      />
      <Tab menu={{ pointing: true }} panes={panes} />
    </Container>
  );
}

