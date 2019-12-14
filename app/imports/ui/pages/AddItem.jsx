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

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  category: {
    type: String,
    allowedValues: ['electronics', 'books', 'supplies', 'furniture', 'miscellaneous'],
    defaultValue: 'electronics',
  },
  name: String,
  price: Number,
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
class AddStuff extends React.Component {

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
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container
              centered>
          <Grid.Column>
            <Header as="h2"
                    textAlign="center" inverted>Add Item</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }}
                      schema={formSchema}
                      onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <SelectField name='category'/>
                <TextField name='name'/>
                <NumField name='price'
                          decimal={false}/>
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

export default AddStuff;
