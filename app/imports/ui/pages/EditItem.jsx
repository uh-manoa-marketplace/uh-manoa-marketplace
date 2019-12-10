import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SelectField from 'uniforms-semantic/SelectField';
import NumField from 'uniforms-semantic/NumField';
import { Items, ItemsSchema } from '../../api/item/Items';

/** Renders the Page for editing a single document. */
class EditItem extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { category, name, price, image, condition, description, _id } = data;
    Items.update(_id, { $set: { category, name, price, image, condition, description } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Item</Header>
            <AutoForm schema={ItemsSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <SelectField name='category'/>
                <TextField name='name'/>
                <NumField name='price' decimal={false}/>
                <TextField name='image'/>
                <SelectField name='condition'/>
                <LongTextField name='description'/>
                <SubmitField value='Submit Changes'/>
                <ErrorsField/>
                <HiddenField name='owner'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditItem.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Items');
  return {
    doc: Items.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditItem);
