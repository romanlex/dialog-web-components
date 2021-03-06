/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { MessageMedia as MessageMediaType, MessageMediaInteractiveConfirm } from '@dlghq/dialog-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import MessageMedia from '../../MessageMedia/MessageMedia';
import Markdown from '../../Markdown/Markdown';
import styles from './Text.css';

export type Props = {|
  className?: string,
  text: string,
  media?: Array<?MessageMediaType>,
  isPending?: boolean,
  maxWidth: number,
  maxHeight: number,
  onInteractiveAction?: (id: string, value: string, confirm?: ?MessageMediaInteractiveConfirm) => mixed
|};

class Text extends Component<Props> {
  shouldComponentUpdate(nextProps: Props): boolean {
    return (
      this.props.text !== nextProps.text ||
      this.props.media !== nextProps.media ||
      this.props.isPending !== nextProps.isPending ||
      this.props.className !== nextProps.className
    );
  }

  render() {
    const { maxWidth, maxHeight } = this.props;
    const className = classNames(styles.container, this.props.className, this.props.isPending ? styles.pending : null);

    const markdown =
      this.props.text === '' ? null : <Markdown className={className} text={this.props.text} emojiSize={18} />;

    if (this.props.media && this.props.media.length) {
      const media = this.props.media.map((item, key) => {
        if (item) {
          return (
            <MessageMedia
              key={key} // eslint-disable-line
              media={item}
              maxWidth={maxWidth}
              maxHeight={maxHeight}
              onInteractiveAction={this.props.onInteractiveAction}
            />
          );
        }

        return null;
      });

      return (
        <div className={className}>
          {markdown}
          {media}
        </div>
      );
    }

    return markdown;
  }
}

export default Text;
