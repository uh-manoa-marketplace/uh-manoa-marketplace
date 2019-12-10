import React from 'react';
import { Grid, Icon, Header, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='landing'>
          <Grid container
                centered
                stackable>
            <Grid.Column textAlign='center'>
              <Header as='h1'
                      inverted
                      style={{
                        fontSize: '4em',
                        fontWeight: 'normal',
                        marginBottom: 0,
                        marginTop: '3em',
                      }}>
                UH Manoa Marketplace
              </Header>
              <Header as='h2'
                      inverted
                      style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      }}>
                Buy, Sell, & Trade with others in the UH community
              </Header>
              <Button as={NavLink}
                      primary
                      size='huge'
                      exact
                      to="/signup">Get Started
                <Icon name='right arrow'/></Button>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
