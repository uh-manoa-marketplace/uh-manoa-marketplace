import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

// import { Profiles } from '../../api/profiles/Profile';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCard extends React.Component {
  render() {
  const year = new Date();
    return (
        <div>
          <Card fluid color={'black'}>
            <Image src={this.props.profile.image} size='medium' wrapped ui={false}/>
            <Card.Content>
              <Card.Header>
                {this.props.profile.firstName} {this.props.profile.lastName}
              </Card.Header>
              {/* Here I just added a time function that grabs the current year. Doesn't technically work but it's
               something more dynamic. Maybe for M3 we could add a date joined to the profile schema */}
              <Card.Meta>Joined in {year.getFullYear()}</Card.Meta>
              <Card.Description>
                {this.props.profile.biography}
              </Card.Description>
            </Card.Content>
          </Card>
          <Link to={`/editProfile/${this.props.profile._id}`}>
            <Button fluid>Edit Profile</Button>
          </Link>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileCard);
