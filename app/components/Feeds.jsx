import { Feed, Divider } from 'semantic-ui-react';
import React, { Component } from 'react';


export default class Feeds extends Component {
  render() {
    return (
      <div>
        <Divider horizontal> Dogs</Divider>
        <Feed>
          {this.props.theTweets.dogs.slice(-5).map((dog) => {
            return (
              <Feed.Event
                key={dog.id}>
                <Feed.Label>
                  <img src={dog.user.profile_image_url} />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary> 
                  {dog.user.name}
                  <Feed.Date>{dog.created_at}</Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra>{dog.text}</Feed.Extra>
                </Feed.Content>
              </Feed.Event>
            )
          })}
        </Feed>
        <Divider horizontal> Cats </Divider>
        <Feed>
          {this.props.theTweets.cats.slice(-5).map((cat) => {
            return (
              <Feed.Event
                key={cat.id}>
                <Feed.Label>
                  <img src={cat.user.profile_image_url} />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                  {cat.user.name}
                  <Feed.Date>{cat.created_at}</Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra>{cat.text}</Feed.Extra>
                </Feed.Content>
              </Feed.Event>
            )
          })}
        </Feed>
 

      </div>
    )
  }
}

{/* <Divider horizontal> Donuts </Divider>
{this.props.theTweets.donuts.length > 0 ? (
            <Feed>
            {this.props.theTweets.donuts.slice(-5).map((donut) => {
              return (
                <Feed.Event
                  key={donut.id}>
                  <Feed.Label>
                    <img src={donut.user.profile_image_url} />
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary>
                    {donut.user.name}
                    <Feed.Date>{donut.created_at}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra>{donut.text}</Feed.Extra>
                  </Feed.Content>
                </Feed.Event>
              )
            })}
          </Feed>
) : (<div> Waiting on donuts</div>)} */}