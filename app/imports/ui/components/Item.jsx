import React from 'react';
import { Button, Card, Image, Rating, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Favorites } from '../../api/favorite/Favorites';
import { Items } from '../../api/item/Items';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Item extends React.Component {

  // myFav(docID, itemName, itemPrice, itemImg, itemOwner, itemCondition, itemDescription) {
  //   messageUser(user);
  //   console.log(`Attempting to message '${user}'...`);
  // };

  myFav(docID, itemCategory, itemName, itemPrice, itemImg, itemOwner, itemCondition, itemDescription, itemLikedBy) {
    // const currentUser = Meteor.user() ? Meteor.user().username : '';
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
          liked: `${itemLikedBy}`,
        },
        (error) => {
          if (error) {
            swal('Success', 'Item added successfully to Favorites', 'success');
            // swal('Error', 'Item is already added to your Favorites', 'error');
            Favorites.update({ _id: docID }, { $push: { liked: itemLikedBy } });
            // if (!findUser) {
            // }
          } else {
            swal('Success', 'Item added successfully to Favorites', 'success');
            Favorites.update({ _id: docID }, { $push: { liked: itemLikedBy } });
          }
        },
    );
    // db.students.update(
    //     { _id: 1 },
    //     {
    //       $push: {
    //         quizzes: {
    //           $each: [ { id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 } ],
    //           $sort: { score: 1 }
    //         }
    //       }
    //     }
    // )
    // This updates the Item that was selected to be store into favorites. The user is added to the liked array.
    Items.update({ _id: docID }, { $push: { liked: itemLikedBy } });
  }

  setRating(likedArray) {
    const currentUser = Meteor.user() ? Meteor.user().username : '';
    // console.log(`this is the likedArray: ${likedArray}`);
    // if (likedArray.includes(currentUser)) {
    //   return 1;
    // }
    // return 0;

    // Attempting to fix the error with the deployed version. Works the same way as "includes" function.
    const userChecker = _.contains(likedArray, currentUser);
    if (userChecker) {
      return 1;
    }
    return 0;
  }

  render() {
    const currentUser = Meteor.user() ? Meteor.user().username : '';
    // console.log(`currentUser = ${currentUser}`);
    const userLiked = currentUser;
    // console.log(`this.props.item.liked = ${this.props.item.liked}`);
    const numOfLikes = _.uniq(_.map(this.props.item.liked, function (e) { return e; }));
    // console.log(numOfLikes.length);
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
                  defaultRating={this.setRating(this.props.item.liked)} // This makes the favorite icon sticky
                  disabled={!!(this.setRating(this.props.item.liked))} // Disables heart icon once selected
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
                        userLiked,
                    )}/>
            </Card.Header>
            <Card.Meta>
              Owner: {this.props.item.owner}
              {/* eslint-disable-next-line max-len */}
              <a href={`mailto: ${this.props.item.owner}?subject=Purchasing your ${this.props.item.name}&body=Hi, I'm interested in purchasing your ${this.props.item.name}.`}>
                <Button icon={'mail'} content={'email'} floated='right'/>
              </a>
            </Card.Meta>
            <Card.Description>
              {numOfLikes.length} <Icon name='user'/> liked this<br/>
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
  favorite: PropTypes.object,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Item);
