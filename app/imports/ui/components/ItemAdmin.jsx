import React from 'react';
import { Card, Image, Rating, Button, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Favorites } from '../../api/favorite/Favorites';

/** Renders a Card of an item that is up for sale. See pages/ItemPage.jsx. Has ability to view all items (Admins
 *  included) */
class ItemAdmin extends React.Component {

  removeItem(docID) {
    this.props.Items.remove(docID);
  }

  messageUser(user) {
    console.log(`Attempting to message '${user}'...`);
  }

  myFav(docID, itemCategory, itemName, itemPrice, itemImg, itemOwner, itemCondition, itemDescription) {
    Favorites.insert(
        {
          _id: `${docID}`,
          category: `${itemCategory}`,
          name: `${itemName}`,
          price: itemPrice,
          image: `${itemImg}`,
          owner: `${itemOwner}`,
          condition: `${itemCondition}`,
          description: `${itemDescription}`,
        },
        (error) => {
          if (error) {
            swal('Error', 'Item is already added to your Favorites', 'error');
          } else {
            swal('Success', 'Item added successfully to Favorites', 'success');
          }
        },
    );
    // console.log(
    //     `Favorites now contains:
    //     \n${docID}\n${itemName}\n${itemPrice}\n${itemImg}\n${itemOwner}\n${itemCondition}\n${itemDescription}`,
    // );
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
              <Rating
                  icon='heart'
                  floated='right'
                  onRate={() => this.myFav(
                      this.props.item._id,
                      this.props.item.category,
                      this.props.item.name,
                      this.props.item.price,
                      this.props.item.image,
                      this.props.item.owner,
                      this.props.item.condition,
                      this.props.item.description,
                  )}/>
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
              Category: {this.props.item.category}<br/>
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
