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

    const allItems = _.where(this.props.items, { owner: 'john@foo.com' });

    return (
        <Container>
          <Header as='h2' textAlign='center'>My Items</Header>
          <Card.Group>
            {allItems.map((item, index) => <Owned key={index} item={item} Items={Items}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserItemsPage.propTypes = {
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
})(UserItemsPage);
