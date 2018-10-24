import React from 'react';
import {Alert, Modal, Button} from 'react-bootstrap';

let AlertModal = React.createClass({
  onHide: function(e) {
    e.preventDefault();
    this.props.onHide();
  },

  render: function() {
    return (
      <Modal {...this.props} animation={true} enforceFocus={false}>
          <Modal.Header closeButton>
            <Modal.Title>{ this.props.modalTitle ? this.props.modalTitle : "Oh snap!" }</Modal.Title>
          </Modal.Header>
        <Modal.Body>
          <Alert bsStyle={this.props.level} >
            <h4 className="text-center">{ this.props.message }</h4>
          </Alert>
          { (this.props.note) &&
            <p>{ this.props.note }</p>}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.onHide}>Got it</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = AlertModal;
