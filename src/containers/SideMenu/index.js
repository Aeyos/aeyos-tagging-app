import React from "react";
import { Link } from "react-router-dom";
import CustomLink from '../../components/CustomLink';

import { Column } from "./style.js";
import routes from '../../routes';

export default class SideMenu extends React.Component {
  render() {
    return (
      <Column>
        {routes.map(route => <CustomLink {...route} />)}
      </Column>
    );
  }
}
