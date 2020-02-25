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
  Spinner
} from 'nr1';
/** local */
import Tab1 from './components/tab1';
import Tab2 from './components/tab2';
/** 3rd party */


/**
 * DataApps - Component
 */
export default class DataApps extends React.Component {
  static propTypes = {
    nerdletUrlState: PropTypes.object,
    launcherUrlState: PropTypes.object,
    tabIndex: PropTypes.number,
  }; //propTypes

  constructor(props) {
    super(props);
    this.state = {
      currentTab: ('tabIndex' in props) ? props.tabIndex : 1,
      accountId: 2246998,
    };

    this.switchTab = this.switchTab.bind(this);
  }; //constructor

  switchTab(e, id) {
    e.preventDefault();

    this.setState({
      currentTab: id,
    });
  }

  /** Lifecycle render */
  render() {
    const { currentTab, accountId } = this.state;

    return(

<div className="container">
  <div className="tabs-main">
    <ul className="tabs">
      <li className={currentTab === 1 ? 'active' : ''}><a href="#main-tab-1" className="u-unstyledLink" onClick={e => this.switchTab(e, 1)}>Modernization</a></li>
      <li className={currentTab === 2 ? 'active' : ''}><a href="#main-tab-2" className="u-unstyledLink" onClick={e => this.switchTab(e, 2)}>Optimization</a></li>
    </ul>
  </div> 
  <div className="tab-content">
    <div id="main-tab-1" className={currentTab === 1 ? 'show' : ''}><Tab1 accountId={accountId} /></div>
    <div id="main-tab-2" className={currentTab === 2 ? 'show' : ''}><Tab2 accountId={accountId} /></div>
  </div>
</div>

    );
  } //render
}//DataApps
