import React, { useState, useEffect } from 'react';
import { Container, Header } from 'semantic-ui-react';


export function NodeExplorer (props) {
  const { nodeid } = props.match.params
  const [current, setCurrent] = useState({ index: nodeid })

  useEffect(() => {
    // TODO request api
    
  }, []);

  return (
    <Container>
      <Header size='large'>
        Node Explorer
      </Header>
      node id: {current.index}

    </Container>
  )
}

