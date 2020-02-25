/**
 *
 *
 * @file
 * @author
 */
/** core */
import React from 'react';
import PropTypes from 'prop-types';
/** nr1 */
import {
  navigation,
  Button,
  Tabs,
  TabsItem,
} from 'nr1';
/** local */
import InsightsDashboard from '../../../insights-dashboard';
import SubTab1 from '../../../insights-dashboard/dashboards/cloud-native-services.json';
/** 3rd party */

export default class Tab1 extends React.Component {
  static propTypes = {
    accountId: PropTypes.number,
  }; //propTypes

  constructor(props) {
    super(props);
  }; //constructor

  /** Lifecycle render */
  render() {
    const { accountId } = this.props;

    return(
<div className="inside-container">
  <Tabs>

<TabsItem value='tab-1' label='Cloud Native Services'><InsightsDashboard accountId={accountId} dashboard={SubTab1} /></TabsItem>
  </Tabs>
</div>
    );
  } //render
} //Tab1
