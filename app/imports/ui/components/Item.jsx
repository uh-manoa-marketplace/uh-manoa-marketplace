import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Item extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image
                size='small'
                src={this.props.item.image}/>
            <Card.Header>{this.props.item.itemName} {this.props.item.owner}</Card.Header>
            <Card.Meta>{this.props.item.price}</Card.Meta>
            <Card.Meta>{this.props.item.condition}</Card.Meta>
          </Card.Content>
        </Card>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default withRouter(Item);
