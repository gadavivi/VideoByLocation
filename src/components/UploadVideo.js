import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Form, Input, Message, Button } from 'semantic-ui-react';

import withAuthorization from './Session/withAuthorization';
import { fieldUpdate, saveVideo } from '../actions'
import SignLayout from './SignLayout';


class UploadVideo extends Component {

  onSubmit() {
    const { uri, latitude, longitude } = this.props;

    this.props.saveVideo({ uri, latitude, longitude })
  }

  render() {
    const {uri, error, uploading, disabled} = this.props;

    return (
      <SignLayout>
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Form.Field>
            <Input
              value={uri}
              onChange={(event) => {
                this.props.fieldUpdate({ prop: 'uri', value: event.target.value });
                this.props.fieldUpdate({ prop: 'error', value: '' });
              }}
              label="Link"
              labelPosition="left"
              placeholder="Paste youtube link here..."
            />
          </Form.Field>
          {error ? <Message negative header="Oops!" content={error} /> : null}
          <Button primary loading={uploading} disabled={disabled}>Upload!</Button>
        </Form>
      </SignLayout>
    );
  }
}

const mapStateToProps = (state) => {
  const { uri, error, uploading } = state.video;
  const { latitude, longitude } = state.position;
  const disabled = latitude && longitude ? false : true;
  return { uri, error, uploading, latitude, longitude, disabled };
}

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, { fieldUpdate, saveVideo })
)(UploadVideo);