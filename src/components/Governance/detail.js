import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Segment, Grid, List } from 'semantic-ui-react';

function listItem (current, elements) {
  const items = []

  for (const [index, value] of elements.entries()) {
    items.push(<Grid.Column key={index}>
      <Segment>
        <List as={Link} to={`/ge/${current.index}/tcx/${value.index}`}>
          <List.Item>TCX #{value.index}</List.Item>
          <List.Item>{value.content}</List.Item>
        </List>
      </Segment>
    </Grid.Column>)
  }
  return items
}

export function GovernanceDetail (props) {

  const elements = [
    { index: 1, content: 'picture' },
    { index: 2, content: 'text' },
    { index: 5, content: 'breaking news / articles' },
  ]

  const { geid } = props.match.params
  const [balance, setBalance] = useState({ atdot: 50, token: 30 })
  const [current, setCurrent] = useState({ index: geid, content: 'some desc' })
  
  const items = listItem(current, elements)


  return (
    <Container>
      <Grid>
        <Grid.Column width={16}>
          GE #{current.index}: {current.content}
          <Button style={{ marginLeft: '1rem' }} default>Buy GE{current.index}</Button>
          <Button primary>New TCX</Button>
        </Grid.Column>
        <Grid.Column width={16}>
          Your balance: {balance.atdot}ATDot, {balance.token}GE{current.index} Token
        </Grid.Column>
      </Grid>

      <Grid stackable columns={5}>
        {items}
      </Grid>
    </Container>
  )
}

