import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Favorites } from '../../api/favorite/Favorites';
import { Items } from '../../api/item/Items';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Favorite extends React.Component {

  removeItem(docID, itemLikedBy) {
    const currentUser = Meteor.user() ? Meteor.user().username : '';
    const findUser = _.where(itemLikedBy, { liked: currentUser });
    if (findUser) {
      Favorites.update(
          { _id: docID },
          { $pull: { liked: `${currentUser}` } },
      );
    }
    Items.update({ _id: docID }, { $pull: { liked: `${currentUser}` } });
  }

  render() {
  const numOfLikes = _.uniq(_.map(this.props.favorite.liked, function (e) { return e; }));
    return (
        <Card centered>
          <Card.Content>
            <Image centered size='medium' src={this.props.favorite.image}/>
          </Card.Content>
          <Card.Content>
            <Card.Header>
              {this.props.favorite.name}
            </Card.Header>
            <Card.Meta>
              Owner: {this.props.favorite.owner}
              <Button floated='right' compact size='mini'>
                {/* eslint-disable-next-line max-len */}
                <a href={`mailto: ${this.props.favorite.owner}?subject=Purchasing your ${this.props.favorite.name}&body=Hi, I'm interested in purchasing your ${this.props.favorite.name}.`}>
                  <Icon name={'paper plane'}/>
                </a>
              </Button>
            </Card.Meta>
            <Card.Description>
              {numOfLikes.length} <Icon name='user'/> liked this<br/>
              Category: {this.props.favorite.category}<br/>
              Price: ${this.props.favorite.price}<br/>
              Condition: {this.props.favorite.condition}<br/>
              Description: {this.props.favorite.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
                fluid
                color='red'
                onClick={() => this.removeItem(this.props.favorite._id, this.props.favorite.liked)}>REMOVE
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Favorite.propTypes = {
  favorite: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Favorite);
