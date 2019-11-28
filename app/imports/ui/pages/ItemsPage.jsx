import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Card, Loader, Input } from 'semantic-ui-react';
import Item from '/imports/ui/components/Item';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Items } from '../../api/item/Items';
/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ItemsPage extends React.Component {

  /** This constructor is what the current state of the input field. */
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

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
    // Filter function that actively changes as the user types in the find a particular named Item.
    const filteredItems = this.props.items.filter(
        (items) => items.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1,
    );
    return (
        <Container>
          <Header as='h2' textAlign='center'>List of Items</Header>
          <Container className='searchField'>
            <Input
                fluid
                icon = 'search'
                type='text'
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
                />
          </Container>
          <Card.Group>
            {filteredItems.map((item, index) => <Item key={index} item={item} Items={Items}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ItemsPage.propTypes = {
  items: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Items documents.
  const subscription = Meteor.subscribe('Items');
  return {
    items: Items.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ItemsPage);
