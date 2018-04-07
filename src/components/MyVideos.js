import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Card, Embed, Button, Message } from 'semantic-ui-react';

import withAuthorization from './Session/withAuthorization';
import SignLayout from './SignLayout';
import { getMyVideos, deleteVideo } from '../actions';

class MyVideosPage extends Component {

    componentDidMount() {
        this.props.getMyVideos({ userId: this.props.authUser })
    }

    deleteVideo(videoId) {
        this.props.deleteVideo(videoId);
    }
    
    rendervideos() {
        const result = _.map(this.props.videos, (value, prop) => {
            return (
                <Card key={prop}>
                    <Card.Content>
                        <Embed placeholder={value.placeholder} source="youtube" id={value.uri} />
                    </Card.Content>
                    <Button
                        onClick={this.deleteVideo.bind(this, prop)}
                        loading={value.waingToBeDelete}
                        primary>Delete</Button>
                    <Card.Content extra>
                    </Card.Content>
                </Card>
            );
        });

        return result.length > 0 ? result : <Message>You havn't uploaded any videos!</Message>
    }

    render() {
        return (
            <SignLayout>
                <Card.Group>
                    {this.rendervideos()}
                </Card.Group>
            </SignLayout>
        );
    }
}


const authCondition = (authUser) => !!authUser;

const mapStateToProps = state => {
    return { videos: state.myVideos, authUser: state.sessionState.authUser.uid };
}

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, { getMyVideos, deleteVideo })
)(MyVideosPage);