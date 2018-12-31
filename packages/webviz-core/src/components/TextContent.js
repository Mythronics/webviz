// @flow
//
//  Copyright (c) 2018-present, GM Cruise LLC
//
//  This source code is licensed under the Apache License, Version 2.0,
//  found in the LICENSE file in the root directory of this source tree.
//  You may not use this file except in compliance with the License.

import * as React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

import styles from "./TextContent.module.scss";

type Props = {
  children: React.Node | string,
};

// Make links in Markdown work with react-router.
// Per https://github.com/rexxars/react-markdown/issues/29#issuecomment-275437798
function RouterLink(props) {
  return props.href.match(/^\//) ? (
    <Link to={props.href}>{props.children}</Link>
  ) : (
    <a href={props.href}>{props.children}</a>
  );
}

export default class TextContent extends React.Component<Props> {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
        {typeof children === "string" ? <ReactMarkdown source={children} renderers={{ link: RouterLink }} /> : children}
      </div>
    );
  }
}
