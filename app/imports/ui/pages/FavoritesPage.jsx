import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Card } from 'semantic-ui-react';
import Favorite from '/imports/ui/components/Favorite';
import PropTypes from 'prop-types';
import { Favorites } from '../../api/favorite/Favorites';

/** A simple static component to render some text for the landing page. */
class FavoritesPage extends React.Component {
  render() {

    const allItems = this.props.favorites; // Will be changed to favorited items only

    return (
        <Grid container>
          <Grid.Column>
            <Header as={'h2'} textAlign={'center'}>My Favorites</Header>
            <Card.Group itemsPerRow={4}>
              {allItems.map((favorite, index) => <Favorite key={index} favorite={favorite} Favorites={Favorites}/>)}
            </Card.Group>
          </Grid.Column>
        </Grid>
    );
  }
}
/** Require an array of Stuff documents in the props. */
FavoritesPage.propTypes = {
  favorites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Items documents.
  const subscription = Meteor.subscribe('Favorites');
  return {
    favorites: Favorites.find({}).fetch(),
    ready: subscription.ready(),
  };
})(FavoritesPage);
