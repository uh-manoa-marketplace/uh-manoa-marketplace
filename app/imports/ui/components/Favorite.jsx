import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Favorites } from '../../api/favorite/Favorites';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Favorite extends React.Component {

  removeItem(docID) {
    Favorites.remove(docID);
  }

  messageUser(user) {
    console.log(`Attempting to message '${user}'...`);
  }

  render() {
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
              <Button
                  floated='right'
                  compact
                  size='mini'
                  icon='paper plane'
                  onClick={() => this.messageUser(this.props.favorite.owner)}
              />
            </Card.Meta>
            <Card.Description>
              Price: ${this.props.favorite.price}<br/>
              Condition: {this.props.favorite.condition}<br/>
              Description: {this.props.favorite.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
                fluid
                color='red'
                onClick={() => this.removeItem(this.props.favorite._id)}>REMOVE
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
