import React from 'react';
import { Button, Card, Image, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Item extends React.Component {

  messageUser(user) {
    console.log(`Attempting to message '${user}'...`);
  }

  myFav(item) {
    console.log(`Adding '${item}' to your favorites...`);
  }

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image centered size='medium' src={this.props.item.image}/>
          </Card.Content>
          <Card.Content>
            <Card.Header>
              {this.props.item.name}
              <Rating icon='heart' floated='right' onRate={() => this.myFav(this.props.item._id)}/>
            </Card.Header>
            <Card.Meta>
              Owner: {this.props.item.owner}
              <Button
                  floated='right'
                  compact
                  size='mini'
                  icon='paper plane'
                  onClick={() => this.messageUser(this.props.item.owner)}
              />
            </Card.Meta>
            <Card.Description>
              Price: ${this.props.item.price}<br/>
              Condition: {this.props.item.condition}<br/>
              Description: {this.props.item.description}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Item.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Item);
