import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Card, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Items';
import Owned from '../components/Owned';

/** A simple static component to render some text for the landing page. */
class UserItemsPage extends React.Component {
  render() {

    const currentUser = Meteor.user() ? Meteor.user().username : '';
    console.log(currentUser);
    const filteredItems = _.where(this.props.items, { owner: currentUser });

    return (
        <Container>
          <Header as='h2' textAlign='center'>My Items</Header>
          <Card.Group>
            {filteredItems.map((item, index) => <Owned key={index} item={item} Items={Items}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserItemsPage.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Items documents.
  const subscription = Meteor.subscribe('Items');
  return {
    items: Items.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserItemsPage);
