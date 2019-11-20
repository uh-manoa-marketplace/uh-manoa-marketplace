import React from 'react';
import { Image, Icon, Card, Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Profile extends React.Component {
  render() {
    return (
        <Grid columns={2} divided container>
          <Grid.Column>
            <Card fluid color={'black'}>
              <Image src='https://pmcdeadline2.files.wordpress.com/2018/09/6241.jpeg?w=605' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Johnathan Foobar III</Card.Header>
                <Card.Meta>Joined in 2016</Card.Meta>
                <Card.Description>
                  Johnathan is a junior majoring in ICS.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  10 Friends
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Header as={'h2'} textAlign={'center'}>Favorites</Header>
            <Card.Group centered itemsPerRow={2}>
              <Card fluid color={'black'}>
                <Image src='https://pmcdeadline2.files.wordpress.com/2018/09/6241.jpeg?w=605' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Johnathan Foobar III</Card.Header>
                  <Card.Meta>Joined in 2016</Card.Meta>
                  <Card.Description>
                    Johnathan is a junior majoring in ICS.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    10 Friends
                  </a>
                </Card.Content>
              </Card>
              <Card fluid color={'black'}>
                <Image src='https://pmcdeadline2.files.wordpress.com/2018/09/6241.jpeg?w=605' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Johnathan Foobar III</Card.Header>
                  <Card.Meta>Joined in 2016</Card.Meta>
                  <Card.Description>
                    Johnathan is a junior majoring in ICS.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    10 Friends
                  </a>
                </Card.Content>
              </Card>
              <Card fluid color={'black'}>
                <Image src='https://pmcdeadline2.files.wordpress.com/2018/09/6241.jpeg?w=605' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Johnathan Foobar III</Card.Header>
                  <Card.Meta>Joined in 2016</Card.Meta>
                  <Card.Description>
                    Johnathan is a junior majoring in ICS.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    10 Friends
                  </a>
                </Card.Content>
              </Card>
              <Card fluid color={'black'}>
                <Image src='https://pmcdeadline2.files.wordpress.com/2018/09/6241.jpeg?w=605' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Johnathan Foobar III</Card.Header>
                  <Card.Meta>Joined in 2016</Card.Meta>
                  <Card.Description>
                    Johnathan is a junior majoring in ICS.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    10 Friends
                  </a>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Profile;
