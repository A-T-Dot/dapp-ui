import React, { useState } from 'react';
import { Container, Segment, Header, Statistic } from 'semantic-ui-react';

export function T1() {

  const [page] = useState({ pageName: 'page 1', members: 'none', status: '-' })

  return (
    <Container>
      <Segment >
        <Header size='large'>{page.pageName}</Header>
      </Segment>
      <Segment>
        <Statistic.Group widths='two'>
          <Statistic>
            <Statistic.Value text>{page.members}</Statistic.Value>
            <Statistic.Label>Members</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value text>{page.status}</Statistic.Value>
            <Statistic.Label>Status</Statistic.Label>
          </Statistic>

        </Statistic.Group>
      </Segment>
    </Container>
  )
}

