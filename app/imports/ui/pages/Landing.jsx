import React from 'react';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={8}>
            <h1>UH Manoa Marketplace</h1>
            <p>A marketplace for UH Manoa students, faculty, and staff.</p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
