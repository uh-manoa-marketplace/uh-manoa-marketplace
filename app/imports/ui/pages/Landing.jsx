import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Container borderless>
          <p>
            The UH Manoa Marketplace is a web application where people apart of the UH community are
            able to buy or sell their personal belongings. Great for students who graduate and need to get
            rid of their unwanted stuff once they are finished dorming at the Univsersity of Hawai’i at Manoa.
          </p>
          <Grid container stackable columns="3">
            <Grid.Column>
              <Header>
                List
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header>
                Find
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header>
                Meet
              </Header>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

export default Landing;
