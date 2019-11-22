import React from 'react';
import { Container, Grid, Header, Icon, Button, List } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Container borderless='true'>
          <Grid verticalAlign='middle' columns="2" container>
            <Grid.Column width={8} textAlign='center'>
              <Header as="h1">
                Buy, Sell, & Trade with others in the UH community
              </Header>
              <List>
                <List.Item>
                  <Header as="h3"><Icon name="list alternate outline" size="large"/></Header>
                  <p>
                    <span className='headings'>List</span> UH Manoa-related items that you do not use
                    anymore but others in the UH community may want or need.
                  </p>
                </List.Item>
                <List.Item>
                  <Header as="h3">
                    <Icon name="search" size="large"/>
                  </Header>
                  <p>
                    <span className='headings'>Find</span> UH Manoa-related items you may
                    want or need for cheaper prices.
                  </p>
                </List.Item>
                <List.Item>
                  <Header as="h3">
                    <Icon name="handshake outline" size="large"/>
                  </Header>
                  <p>
                    <span className='headings'>Meet</span> buyers and sellers on UH Manoa
                    campus for safe and convenient transactions.
                  </p>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Header as="h1">
                Start listing today!
              </Header>
              <Button as={NavLink} exact to="/signup"><Icon name="add user"/>Signup</Button>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

export default Landing;
