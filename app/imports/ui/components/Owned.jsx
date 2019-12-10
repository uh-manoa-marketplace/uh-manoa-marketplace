import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Items } from '../../api/item/Items';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Item extends React.Component {

  removeItem(docID) {
    Items.remove(docID);
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
            </Card.Header>
            <Card.Meta>
              Owner: {this.props.item.owner}
            </Card.Meta>
            <Card.Description>
              Category: {this.props.item.category}<br/>
              Price: ${this.props.item.price}<br/>
              Condition: {this.props.item.condition}<br/>
              Description: {this.props.item.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign='center'>
            <Button.Group>
              <Button
                  color='red'
                  onClick={() => this.removeItem(this.props.item._id)}>REMOVE
              </Button>
              <Button.Or />
              <Button positive>
                <Link to={`/editItem/${this.props.item._id}`}>EDIT</Link>
              </Button>
            </Button.Group>
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
