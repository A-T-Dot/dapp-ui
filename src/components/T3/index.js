import React, { useState } from 'react';
import { Container, Segment, Header, Statistic } from 'semantic-ui-react';
import IpfsUpload from '../Forms/IpfsUpload';
export function T3() {

  const [page] = useState({ pageName: 'page 2', members: '-', status: '-' })

  return (
    <Container>
      <IpfsUpload/>
    </Container>
  )
}

