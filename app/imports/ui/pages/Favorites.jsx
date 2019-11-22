import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Card } from 'semantic-ui-react';
import Item from '/imports/ui/components/Item';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Items';

/** A simple static component to render some text for the landing page. */
class Favorites extends React.Component {
  render() {

    const allItems = this.props.items; // Will be changed to favorited items only

    return (
        <Grid container>
          <Grid.Column>
            <Header as={'h2'} textAlign={'center'}>My Favorites</Header>
            <Card.Group itemsPerRow={4}>
              {allItems.map((item, index) => <Item key={index} item={item}/>)}
            </Card.Group>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Favorites.propTypes = {
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
})(Favorites);
