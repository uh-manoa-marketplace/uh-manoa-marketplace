import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Card, Loader } from 'semantic-ui-react';
import Item from '/imports/ui/components/Item';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Items';
import { Favorites } from '../../api/favorite/Favorites';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class PopularItems extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const filteredItems = this.props.items;
    // Sorting Items by the most amounts of likes. For some reason items with no likes were put at the front of
    // the list. To fix this I used _.reject to resolve this issue.
    const mostPopular = _.sortBy(filteredItems, 'liked');
    // console.log(mostPopular);
    // Rejecting items that have no likes at all.
    const itemsWithNoLikes = _.reject(mostPopular, function (item) { return item.liked.length === 0; });
    // console.log(itemsWithNoLikes);
    return (
        <Container>
          <Header as='h2' textAlign='center' inverted>Popular Items</Header>
          <Card.Group>
            {itemsWithNoLikes.map((item, index) => <Item key={index} item={item} Items={Items}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
PopularItems.propTypes = {
  items: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Items documents.
  const subscription = Meteor.subscribe('Items');
  const subscription2 = Meteor.subscribe('Favorites');
  return {
    items: Items.find({}).fetch(),
    favorites: Favorites.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(PopularItems);
