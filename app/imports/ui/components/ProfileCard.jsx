import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

// import { Profiles } from '../../api/profiles/Profile';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCard extends React.Component {

  render() {
    return (
        <div>
          <Card fluid color={'black'}>
            <Image src={this.props.profile.image} size='medium' wrapped ui={false}/>
            <Card.Content>
              <Card.Header>
                {this.props.profile.firstName} {this.props.profile.lastName}
              </Card.Header>
              <Card.Meta>Joined in 2016</Card.Meta>
              <Card.Description>
                {this.props.profile.biography}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button icon labelPosition='right'>
                Message
                <Icon name='mail'/>
              </Button>
            </Card.Content>
          </Card>
          <Button fluid>
            <Link to={`/editProfile/${this.props.profile._id}`}>Edit Profile</Link>
          </Button>
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