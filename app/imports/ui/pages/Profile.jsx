import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Profile extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={8}>
            <h1>Profile Page</h1>
            <Image src={'https://pmcdeadline2.files.wordpress.com/2018/09/6241.jpeg?w=605'}/> // Placeholder photo
            <p>
              Place profile info here. <br/>
              Name <br/>
              Title <br/>
              Major <br/>
              Contact info <br/>
              Etc. <br/>
            </p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Profile;
