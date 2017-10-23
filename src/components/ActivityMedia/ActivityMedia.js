/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Message } from '@dlghq/dialog-types';
import { Text } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ActivityList from '../ActivityList/ActivityList';
import ActivityMediaItem from './ActivityMediaItem';
import styles from './ActivityMedia.css';

export type Props = {
  className?: string,
  messages: Message[],
  onGoToMessage: (message: Message) => mixed
};

class ActivityMedia extends PureComponent {
  props: Props;

  renderMessages() {
    const { messages } = this.props;

    if (!messages.length) {
      return (
        <div className={styles.empty}>
          <Text id="ActivityMedia.empty" />
        </div>
      );
    }

    return messages.map((message) => {
      return (
        <ActivityMediaItem
          key={message.rid}
          message={message}
          onClick={this.props.onGoToMessage}
        />
      );
    });
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <ActivityList className={className}>
        {this.renderMessages()}
      </ActivityList>
    );
  }
}

export default ActivityMedia;