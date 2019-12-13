import React from 'react';
import { Grid } from 'semantic-ui-react';

// The Footer appears at the bottom of every page. Rendered by the App Layout component. *
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '2em' };
    return (
        <footer>
          <div style={divStyle}
               className="footer">
            <hr/>
            <Grid container
                  centered
                  stackable>
              <Grid.Column textAlign='center'>
                Department of Information and Computer Sciences<br/>
                University of Hawaii<br/>
                Honolulu, HI 96822<br/>
              </Grid.Column>
            </Grid>
          </div>
        </footer>
    );
  }
}

export default Footer;
