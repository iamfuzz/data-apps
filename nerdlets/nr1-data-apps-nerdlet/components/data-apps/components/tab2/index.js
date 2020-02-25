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
import SubTab1 from '../../../insights-dashboard/dashboards/optimization-ec2.json';
import SubTab2 from '../../../insights-dashboard/dashboards/optimization-ebs.json';
import SubTab3 from '../../../insights-dashboard/dashboards/optimization-s3.json';
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

<TabsItem value='tab-1' label='Compute'><InsightsDashboard accountId={accountId} dashboard={SubTab1} /></TabsItem>
<TabsItem value='tab-2' label='EBS'><InsightsDashboard accountId={accountId} dashboard={SubTab2} /></TabsItem>
<TabsItem value='tab-3' label='S3'><InsightsDashboard accountId={accountId} dashboard={SubTab3} /></TabsItem>
  </Tabs>
</div>
    );
  } //render
} //Tab1
