import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Card, Loader, Input, Dropdown } from 'semantic-ui-react';
import Item from '/imports/ui/components/Item';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Items';
import { Favorites } from '../../api/favorite/Favorites';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ItemsPage extends React.Component {

  /** This constructor is what the current state of the input field. */
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  state = {}

  selectedChoice = (e, { value }) => this.setState({ value });

  /** Update field for the current state of the typed characters. */
  updateSearch(event) {
    // This was just a tester to see if we can read what is being typed. In addition, whether the field was being
    // updated.
    // console.log(event.target.value);
    this.setState({ search: event.target.value });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    // This variable checks the current value of the dropdown menu.
    const { value } = this.state;

    // This is later used in the dropdown menu that is within the <Input> tag.
    const choices = [
      { key: '0', text: 'All', value: 'all' },
      { key: '1', text: 'Books', value: 'books' },
      { key: '2', text: 'Electronics', value: 'electronics' },
      { key: '3', text: 'Furniture', value: 'furniture' },
      { key: '4', text: 'Supplies', value: 'supplies' },
      { key: '5', text: 'Miscellaneous', value: 'miscellaneous' },
    ];

    // Filter function that actively changes as the user types in the find a particular named Item.
    const filteredItems = this.props.items.filter(
        (items) => items.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1,
    );

    // This is an optional feature we could potentially add in the future where it shuffles the items every time
    // refreshed.
    // const shuffleItems = _.shuffle(filteredItems);

    // VERY VITAL LINE THAT HELPS WITH SELECTION BUTTON NEAR SEARCH BAR!
    let findItems = _.where(filteredItems, { category: value });

    // Testing whether we have a empty list based on the category selected
    const checker = _.isEmpty(findItems);

    // This is in the event that the choice "All" is selected. We are assuming that each category will have items
    // inside it already.
    if (checker === true) {
      findItems = filteredItems;
    }

    return (
        <Container>
          <Header as='h2'
                  textAlign='center'>Items for Sale</Header>
          <Container className='searchField'>
            <Input
                fluid
                icon='search'
                type='text'
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
                label={
                  <Dropdown
                      defaultValue='all'
                      options={choices}
                      onChange={this.selectedChoice}
                      value={value}
                      selection
                  />
                }
            />
          </Container>
          <Card.Group>
            {findItems.map((item, index) => <Item key={index}
                                                  item={item}
                                                  Items={Items}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ItemsPage.propTypes = {
  items: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Items documents.
  const subscription = Meteor.subscribe('Items');
  const subscription2 = Meteor.subscribe('Favorites');
  return {
    items: Items.find({}).fetch(),
    favorites: Favorites.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ItemsPage);
