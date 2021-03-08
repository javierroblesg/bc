import React from 'react';
import NotificationAlert from "react-notification-alert";
import "react-notification-alert/dist/animate.css";

import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    flashMessage: state.flashMessage
  }
}

class Notifications extends React.Component {
  myFunc = (type, title, body) => {
    let options = {
      place: "tr",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            {title}
          </span>
          <br />
          <span data-notify="message">
            {" "}
            {body}
          </span>
        </div>
      ),
      type: type,
      icon: "fa fa-user-o",
      autoDismiss: 5
    };
    this.refs.notify.notificationAlert(options);
  };ç
  render () {

    if(this.props.flashMessage.success !== null && this.props.flashMessage.category !== 'fetching') {
      if (this.props.flashMessage.success) {
        this.myFunc('success', 'Operation completed!', this.props.flashMessage.message);
      } else {
        this.myFunc('danger', 'There was a problem!', this.props.flashMessage.message);
      }
    }

    return (
      <div className="rna-wrapper">
        <NotificationAlert ref="notify" />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Notifications);