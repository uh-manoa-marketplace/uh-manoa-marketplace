import React from 'react';
import { Button, Card, Image, Rating, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Favorites } from '../../api/favorite/Favorites';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Item extends React.Component {

  // myFav(docID, itemName, itemPrice, itemImg, itemOwner, itemCondition, itemDescription) {
  //   messageUser(user);
  //   console.log(`Attempting to message '${user}'...`);
  // };

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
            <Image centered
                   size='medium'
                   src={this.props.item.image}/>
          </Card.Content>
          <Card.Content>
            <Card.Header>
              {this.props.item.name}
              <Rating
                  icon='heart'
                  floated='right'
                  onRate={
                    () => this.myFav(
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
              <Button floated='right' compact size='mini'>
                {/* eslint-disable-next-line max-len */}
                <a href={`mailto: ${this.props.item.owner}?subject=Purchasing your ${this.props.item.name}&body=Hi, I'm interested in purchasing your ${this.props.item.name}.`}>
                  <Icon name={'paper plane'}/>
                </a>
              </Button>
            </Card.Meta>
            <Card.Description>
              Category: {this.props.item.category}<br/>
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
