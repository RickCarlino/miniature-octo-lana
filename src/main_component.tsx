import * as React from "react";
import { observer, inject } from 'mobx-react';
@inject("color")
@observer
export class Wow extends React.Component<{}, {}> {
  render() {
    return <p> Heyo!</p>;
  }
}
