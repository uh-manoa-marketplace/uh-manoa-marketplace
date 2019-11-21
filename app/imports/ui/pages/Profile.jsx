import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Image, Icon, Card, Grid, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Items } from '../../api/item/Items';

/** A simple static component to render some text for the landing page. */
class Profile extends React.Component {
  render() {
    return (
        <Grid columns={2} divided container>
          <Grid.Column>
            <Header as={'h2'} textAlign={'center'}>Your Public Profile</Header>
            <Card fluid color={'black'}>
              <Image src='https://pmcdeadline2.files.wordpress.com/2018/09/6241.jpeg?w=605' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Johnathan Foobar III</Card.Header>
                <Card.Meta>Joined in 2016</Card.Meta>
                <Card.Description>
                  Johnathan is a junior majoring in ICS.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button icon labelPosition='right'>
                  Message
                  <Icon name='mail' />
                </Button>
              </Card.Content>
            </Card>
            <Button content={'Edit Profle'} />
            <Button content={'My Favorites'} as={NavLink} exact to="/favorites"/>
            <Button content={'My Items'} />
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Profile.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Items documents.
  const subscription = Meteor.subscribe('Items');
  return {
    items: Items.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Profile);
