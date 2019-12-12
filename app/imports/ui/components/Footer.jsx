import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '0px' };
    return (
        <footer>
          <div style={divStyle}
               className="footer">
            <hr/>
            <Grid container
                  centered
                  stackable>
              <Grid.Column textAlign='center'>
                UH Manoa Marketplace<br/>
                University of Hawaii<br/>
                Honolulu, HI 96822<br/>
                <Link to={'/quickStart/'}>Quick Start</Link><br/>
                <a href="https://uh-manoa-marketplace.github.io/">Homepage</a><br/>
              </Grid.Column>
            </Grid>
          </div>
        </footer>
    );
  }
}

export default Footer;
