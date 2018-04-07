import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Header, Embed, Feed, Message, Button } from 'semantic-ui-react';

import withAuthorization from './Session/withAuthorization';
import { db } from './../firebase';
import SignLayout from './SignLayout';
import LandingPage from './Landing';
import { updateMetaData } from '../actions';

class HomePage extends Component {

  addLike(videoId, video, val) {
    this.props.updateMetaData(videoId, video, 'likes', val);
    this.addView(videoId, video, val);
  }

  addView(videoId, video, val) {
    if (val) {
      this.props.updateMetaData(videoId, video, 'views', val);
    }
  }

  rendervideos() {
    const { authUser } = this.props;
    const result = _.map(this.props.videos, (value, prop) => {
      const { placeholder, uri, views, views_counter, likes, likes_counter } = value
      return (
        <Feed.Event key={prop}>
          <Feed.Content>
            <Embed placeholder={placeholder} source="youtube" id={uri} autoplay
              onClick={this.addView.bind(this, prop, value, views ? views[authUser] ? false : true : true)} />
            <Feed.Meta>
              <Feed.Like>
                <Button primary={value.likes ? !value.likes[this.props.authUser] : true}
                  onClick={this.addLike.bind(this, prop, value, likes ? !likes[authUser] : true)}>{likes_counter} Likes </Button>
              </Feed.Like>
              &emsp;{views_counter}&nbsp;views
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      );
    });
    return result.length > 0 ? result : <LandingPage />
  }

  render() {
    return (
      <SignLayout>
        <Feed size="large">
          {this.rendervideos()}
        </Feed>
      </SignLayout>
    );
  }
}

const authCondition = (authUser) => !!authUser;

const mapStateToProps = state => {
  return { videos: state.fetchVideos, authUser: state.sessionState.authUser.uid };
}
export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, { updateMetaData })
)(HomePage);
