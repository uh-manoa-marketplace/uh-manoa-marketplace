import React from 'react';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import HiddenField from 'uniforms-semantic/HiddenField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import PropTypes from 'prop-types';
import { messages, MessageSchema } from '../../api/message/messages';


/** Renders the Page for adding a document. */
class AddMessage extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { buyer, seller, message, time } = data;
    messages.insert({ buyer, seller, message, time },
        (error) => {
          if (error) {
            swal('Message Error', error.message, 'error');
          } else {
            swal('Success', 'Message sent', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <AutoForm ref={ref => { fRef = ref; }} schema={MessageSchema} onSubmit={data => this.submit(data, fRef)}>
          <Segment>
            <TextField label="Send a Message"
                       name='message'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
            <HiddenField name='buyer'
                         value={this.props.buyer}/>
            <HiddenField name='seller'
                         value={this.props.seller}/>
            <HiddenField name='time'
                         value={new Date()}/>
          </Segment>
        </AutoForm>
    );
  }
}

AddMessage.propTypes = {
  buyer: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired,
};

export default AddMessage;
