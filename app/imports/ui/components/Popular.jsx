import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a Card of an item that is up for sale. See pages/ItemPage.jsx. Has ability to view all items (Admins
 *  included) */
class Popular extends React.Component {

  render() {
    const numOfLikes = _.uniq(_.map(this.props.item.liked, function (e) { return e; }));
    // console.log(numOfLikes);
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
Popular.propTypes = {
  item: PropTypes.object.isRequired,
  Items: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Popular);
