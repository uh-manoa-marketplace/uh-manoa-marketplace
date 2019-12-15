import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, Grid, Header } from 'semantic-ui-react';
import Favorite from '/imports/ui/components/Favorite';
import PropTypes from 'prop-types';
import { Favorites } from '../../api/favorite/Favorites';
import { Profiles } from '../../api/profiles/Profile';
import ProfileCard from '../components/ProfileCard';

/** A simple static component to render some text for the landing page. */
class Profile extends React.Component {
  render() {

    const allItems = this.props.favorites; // Will be changed to favourite items only
    return (
        <Grid columns={2} divided container>
          <Grid.Column>
            <Header as={'h2'} textAlign={'center'} inverted>Your Public Profile</Header>
            {/* eslint-disable-next-line max-len */}
            {this.props.profiles.map((profile, index) => <ProfileCard key={index} profile={profile} Profiles={Profiles}/>)}
          </Grid.Column>

          <Grid.Column>
            <Header as={'h2'} textAlign={'center'} inverted>Your Favorite Items</Header>
            <Card.Group itemsPerRow={2}>
              {allItems.map((favorite, index) => <Favorite key={index} favorite={favorite} Favorites={Favorites}/>)}
            </Card.Group>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Profile.propTypes = {
  favorites: PropTypes.array.isRequired,
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Items documents.
  const subscription1 = Meteor.subscribe('Favorites');
  const subscription2 = Meteor.subscribe('Profiles');
  return {
    favorites: Favorites.find({}).fetch(),
    profiles: Profiles.find({}).fetch(),
    ready: subscription1.ready() && subscription2.ready(),
  };
})(Profile);
