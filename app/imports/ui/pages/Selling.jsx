import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Items } from '/imports/api/item/Item';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Item from '../components/Item';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Selling extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Items</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2"
                  textAlign="center">
            Items for Sale
          </Header>
          <Card.Group centered>
            {this.props.items.map((item, index) => <Item
              key={index}
              item={item}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Selling.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Items documents.
  const subscription = Meteor.subscribe('Item');
  return {
    items: Items.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Selling);
