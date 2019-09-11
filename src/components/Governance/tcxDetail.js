import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Segment, Grid, List } from 'semantic-ui-react';

function listItem (elements) {
  const items = []

  for (const [index, value] of elements.entries()) {
    items.push(<Grid.Column key={index}>
      <Segment>
        <List as={Link} to={`/node/${value.index}`}>
          <List.Item>Node #{value.index}</List.Item>
          <List.Item>{value.content}</List.Item>
        </List>
      </Segment>
    </Grid.Column>)
  }
  return items
}

export function TCXDetail (props) {

  const elements = [
    { index: 1, content: 'article 1' },
    { index: 2, content: 'article 2' },
    { index: 5, content: 'article 3' },
  ]
  const items = listItem(elements)

  const { tcxid } = props.match.params
  const [balance, setBalance] = useState({ atdot: 50, token: 30 })
  const [current, setCurrent] = useState({ index: tcxid, content: 'some desc' })

  return (
    <Container>
      <Grid>
        <Grid.Column width={16}>
          TCX #{current.index}: {current.content}
          <Button style={{ marginLeft: '1rem'}} primary>Add Content Node</Button>
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

