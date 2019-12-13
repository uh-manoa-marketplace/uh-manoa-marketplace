import React from 'react';
import { Grid, Icon, Header, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='landing background'>
          <Grid container
                centered
                stackable>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Header as='h1'
                        inverted
                        style={{
                          fontSize: '4em',
                          fontWeight: 'normal',
                          marginTop: '1.5em',
                          marginBottom: '1.5em',
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
            </Grid.Row>
            <Grid.Row columns={3}
                      style={{
                        marginTop: '1.5em',
                        marginBottom: '2em',
                      }}>
              <Grid.Column textAlign='center'>
                <Header as='h3'
                        style={{ fontSize: '2em' }}
                        inverted>
                  List
                </Header>
                <Header as='p'
                        style={{ fontSize: '1.33em' }}
                        inverted>
                  UH Manoa-related items that you do not use anymore but others in the UH community may want or need.
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Header as='h3'
                        style={{ fontSize: '2em' }}
                        inverted>
                  Find
                </Header>
                <Header as='p'
                        style={{ fontSize: '1.33em' }}
                        inverted>
                  UH Manoa-related items you may want or need for cheaper prices.
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Header as='h3'
                        style={{ fontSize: '2em' }}
                        inverted>
                  Meet
                </Header>
                <Header as='p'
                        style={{ fontSize: '1.33em' }}
                        inverted>
                  buyers and sellers on UH Manoa campus for safe and convenient transactions.
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default Landing;
