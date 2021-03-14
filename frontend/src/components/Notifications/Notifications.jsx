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
  myFunc = (type, title, body, icon) => {
    let options = {
      place: "tr",
      message: (
        <div className="alert-text" style={{display: 'inline'}}>
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
      icon: `${icon}`,
      autoDismiss: 5
    };
    this.refs.notify.notificationAlert(options);
  };
  render () {

    if(this.props.flashMessage.success !== null && this.props.flashMessage.category !== 'fetching') {
      if (this.props.flashMessage.success) {
        console.log(this.props.flashMessage.icon);
        this.myFunc('success', 'Operación completada!', this.props.flashMessage.message, this.props.flashMessage.icon);
      } else {
        this.myFunc('danger', 'Hubo un problema!', this.props.flashMessage.message, this.props.flashMessage.icon);
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