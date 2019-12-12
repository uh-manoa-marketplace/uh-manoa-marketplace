import React from 'react';
import { Grid, Icon, Header, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class QuickStartPage extends React.Component {
  render() {
    return (
        <div className='landing background'>
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
                      }}>
                Quick Start Guide
              </Header>
              <Header as='h1'
                      inverted
                      style={{
                        fontSize: '3em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      }}>
                Buying
              </Header>
              <Header inverted>
                Browse through the items for sale
              </Header>
              <Header inverted>
                Click on the <Icon name='heart outline'/> icon to add to your favorites
              </Header>
              <Header as='h1'
                      inverted
                      style={{
                        fontSize: '3em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      }}>
                Selling
              </Header>
              <Button as={NavLink}
                      primary
                      size='huge'
                      exact
                      to="/list">See Whats For Sale
                <Icon name='right arrow'/></Button>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default QuickStartPage;
