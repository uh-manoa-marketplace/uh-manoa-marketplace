import React from 'react';
import { Grid, List } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>
          <Grid.Column>
            <h1>A marketplace for UH Manoa students, faculty, and staff.</h1>
            <List>
              <List.Item>
                <h1>Buy</h1>
                <p>items listed from other UH Manoa students, faculty, and staff</p>
              </List.Item>
              <List.Item>
                <h1>Sell</h1>
                <p>your old UH Manoa-related items too others how may need it</p>
              </List.Item>
              <List.Item>
                <h1>Trade</h1>
                <p>your items for other items you may want</p>
              </List.Item>
            </List>
            </Grid.Column>
        </Grid>
    );
  }
}

export default Landing;
