/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { throttle } from 'lodash';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import styles from './ToolbarSearchInput.css';

export type Props = {
  query: ?string,
  className?: string,
  onFocus: () => any,
  onBlur: () => any,
  onChange: () => any,
  onSearch: (query: string) => any
};

class ToolbarSearchInput extends PureComponent {
  props: Props;
  input: HTMLInputElement;

  constructor(props) {
    super(props);

    this.handleSearch = throttle(this.handleSearch, 300);
  }

  handleChange = (event) => {
    this.props.onChange(event.target.value, event);
    this.handleSearch();
  };

  handleClear = (event) => {
    this.props.onChange('', event);
    this.focus();
  };

  handleSearch = () => {
    this.props.onSearch(this.props.query);
  };

  setInput = (input: HTMLInputElement) => {
    this.input = input;
  };

  focus() {
    this.input.focus();
  }

  renderClearIcon() {
    if (!this.props.query) {
      return null;
    }

    return (
      <Icon
        glyph="close"
        className={styles.clear}
        size={18}
        onClick={this.handleClear}
      />
    );
  }

  render(): React.Element<any> {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <Icon glyph="search" className={styles.icon} size={22} />
        <input
          type="search"
          ref={this.setInput}
          className={styles.input}
          value={this.props.query}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.handleChange}
        />
        {this.renderClearIcon()}
      </div>
    );
  }
}

export default ToolbarSearchInput;
