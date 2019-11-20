import React from 'react';
import { Card, Image, Rating, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a Card of an item that is up for sale. See pages/ItemPage.jsx. Has ability to view all items (Admins
 *  included) */
class ItemAdmin extends React.Component {

  removeItem(docID) {
    this.props.Items.remove(docID);
  }

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
          <Card.Content extra>
            <Form>
              {/* I suppose for future implementation, we could try and grab the reason and store in a file for
               Admin record. */}
              <Form.TextArea label='Report' placeholder='Reason for removing this item...'/>
            </Form>
            <Button
                fluid
                color='red'
                onClick={() => this.removeItem(this.props.item._id)}>REMOVE
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ItemAdmin.propTypes = {
  item: PropTypes.object.isRequired,
  Items: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ItemAdmin);
