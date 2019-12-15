import React from 'react';
import { Items } from '/imports/api/item/Items';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  category: {
    type: String,
    allowedValues: ['electronics', 'books', 'supplies', 'furniture', 'miscellaneous'],
    defaultValue: 'electronics',
  },
  name: String,
  price: {
    type: Number,
    min: 0,
  },
  image: String,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
  description: String,
  liked: {
   // This fixes the error of not being able to add an item. Forgot to add this with issue-035.
   type: String,
   optional: true,
  },
});

/** Renders the Page for adding a document. */
class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { redirectToReferer: false };
  }


  /** On submit, insert the data. */
  submit(data, formRef) {
    const { category, name, price, image, condition, description } = data;
    const owner = Meteor.user().username;
    Items.insert({ category, name, price, image, owner, condition, description, liked: '' },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            this.setState({ redirectToReferer: true });
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const { from } = this.props.location.state || { from: { pathname: '/list' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    return (
        <Grid container
              centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>List An Item</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }}
                      schema={formSchema}
                      onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <SelectField name='category'/>
                <TextField name='name'/>
                <NumField name='price'
                          decimal={false}
                          min={1}
                />
                <TextField name='image'/>
                <SelectField name='condition'/>
                <LongTextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

AddItem.propTypes = {
  location: PropTypes.object,
};


export default AddItem;
