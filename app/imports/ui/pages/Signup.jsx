import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profiles/Profile';


/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    // Added more to this.state in order to accommodate for our Profiles collection below.
    const { email, password, firstName, lastName, image, biography } = this.state;
    const backupImage = '/UH-logo.png';
    const backupBiography = 'I am a University of Hawaii member.';
    // eslint-disable-next-line max-len
    Accounts.createUser({ email, username: email, password, firstName, lastName, image, biography }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
        // Found a potential issue, if the user inserts a space within Image or Biography input, the Profiles page won't
        // work properly. I will do further research on why this is the case. However the implementation is for new
        // users being able to leave the images and/or biography input blank is okay.
        // When the creation of new account is successfully we have to go through four verifications:
        // First when the image URL and biography are left blank, we assign it to our default UH logo and biography.
        if (image === undefined && biography === undefined) {
          Profiles.insert(
              {
                firstName: firstName,
                lastName: lastName,
                image: backupImage,
                biography: backupBiography,
                owner: email,
              },
          );
          // Second is when the image need to be set to default.
        } else if (image === undefined) {
          Profiles.insert(
              {
                firstName: firstName,
                lastName: lastName,
                image: backupImage,
                biography: biography,
                owner: email,
              },
          );
        } else if (biography === undefined) {
        // Third is when the biography isn't filled out and the image URL is filled out.
        // Same thing as before, just reassigning and adding it to the Profiles Collection.
          Profiles.insert(
              {
                firstName: firstName,
                lastName: lastName,
                image: image,
                biography: backupBiography,
                owner: email,
              },
          );
        } else if ((image && biography) !== undefined) {
        // Lastly is the ideal case where the user actually takes the time to fill out every on SignUp. If they
        // filled the field with at least something in there (could be anything).
          Profiles.insert(
              {
                firstName: firstName,
                lastName: lastName,
                image: image,
                biography: biography,
                owner: email,
              },
          );
        }
      }
    });
  }

  /** Display the signup form. Redirect to ListItem page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/list' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="johnnyAppleseed@hawaii.edu"
                  required={true}
                  onChange={this.handleChange}
                />
                <Form.Input
                    label='First Name'
                    name='firstName'
                    type='text'
                    placeholder='Johnny'
                    required={true}
                    onChange={this.handleChange}/>
                <Form.Input
                  label='LastName'
                  name='lastName'
                  type='text'
                  placeholder='Appleseed'
                  required={true}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Profile Picture (As a Link)'
                  name='image'
                  type='text'
                  placeholder='https://hosting-site.com/your-image.jpg'
                  onChange={this.handleChange}
                />
                <Form.TextArea
                  label='Biography'
                  name='biography'
                  type='text'
                  placeholder='Tell something about yourself'
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  required={true}
                  onChange={this.handleChange}
                />
                <Form.Button content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
