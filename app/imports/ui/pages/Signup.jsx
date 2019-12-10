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
    if (value.endsWith('@hawaii.edu')) {
      this.setState({ [name]: value });
    }
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    // Added more to this.state in order to accommodate for our Profiles collection below.
    const { email, password, firstName, lastName, image, biography } = this.state;
    Accounts.createUser({ email, username: email, password, firstName, lastName, image, biography }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
        // console.log('IT worked');
      }
    Profiles.insert({ firstName: firstName, lastName: lastName, image: image, biography: biography, owner: email });
    });
  }

  state = {
    emailError: true,
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
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
                  label="UH Email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="example@hawaii.edu"
                  error={this.state.emailError}
                  onChange={this.handleChange}
                />
                <Form.Input
                    label='First Name'
                    name='firstName'
                    type='text'
                    placeholder="John"
                    onChange={this.handleChange}/>
                <Form.Input
                  label='Last Name'
                  name='lastName'
                  type='text'
                  placeholder="Doe"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Profile Picture (As a link)'
                  name='image'
                  type='text'
                  onChange={this.handleChange}
                />
                <Form.TextArea
                  label='Biography'
                  name='biography'
                  type='text'
                  placeholder='Introduce yourself!'
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Button
                    content="Submit"
                    // disabled={!this.state.email}
                />
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
