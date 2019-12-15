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
              <Header as="h1"
                      inverted
                      style={{
                        fontSize: '3em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      }}>
                Buying
              </Header>
              <Header as="h1"
                      inverted
                      style={{
                        fontSize: '1em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      }}>
                Browse all the items listed in &#39;Items for Sale&#39;
              </Header>
              <Header as="h1"
                      inverted
                      style={{
                        fontSize: '1em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      }}>
                Browse the most popular items listed in &#39;Popular Items&#39;
              </Header>
              <Header as="h1"
                      inverted
                      style={{
                        fontSize: '1em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      }}>
                Click on <Icon name='heart'/>to add an item to &#39;My Favorites&#39;
              </Header>
              <Header as="h1"
                      inverted
                      style={{
                        fontSize: '1em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      }}>
                Click on <Icon name='mail'/> on an item you&#39;re interested in to email the seller
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
              <Header as="h1"
                      inverted
                      style={{
                        fontSize: '1em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      }}>
                List an item for sale in &#39;List An Item&#39; and fill out all the necessary information
              </Header>
              <Header as="h1"
                      inverted
                      style={{
                        fontSize: '1em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      }}>
                Browse your items listed in &#39;My Items&#39; and choose to Remove or Edit a listing
              </Header>
              <Header as="h1"
                      inverted
                      style={{
                        fontSize: '1em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                        paddingBottom: '3em',
                      }}>
                Wait for buyers to email you about an item and set up a meeting
              </Header>
              <Button as={NavLink}
                      primary
                      size='huge'
                      exact
                      to="/list">See What&#39;s For Sale
                <Icon name='right arrow'/></Button>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default QuickStartPage;
