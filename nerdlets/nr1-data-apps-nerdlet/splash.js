/**
 * Main entrypoint into Sea of Green funtionality
 *
 * @file This files defines the core sea of green entry nerdlet for launcher
 * @author
 */
/** core */
import React from 'react';
import PropTypes from 'prop-types';
/** nr1 */
import { Button } from 'nr1';
/** local */
import splashImage from './splash.png'
import DataApps from './components/data-apps';
/** 3rd party */


// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Splash extends React.Component {
  static propTypes = {
    nerdletUrlState: PropTypes.object,
    launcherUrlState: PropTypes.object,
  }; //propTypes

  constructor(props) {
    super(props);
    this.state = {
      showSplash: false,
      tabIndex: 1,
    };

    this.mapClickHandler = this.mapClickHandler.bind(this);
  }; //constructor

  mapClickHandler(e, tabIndex) {
    e.preventDefault();
    this.setState({
      tabIndex: tabIndex,
      showSplash: false,
    });
  }

  render() {
    const { showSplash, tabIndex } = this.state;
    const { nerdletUrlState, launcherUrlState } = this.props;

    return (showSplash) ? (
      <div className="splash" style={{backgroundImage: `url(${splashImage})`}}>
        <div className="parts">
          <div className="title" style={{marginTop: '5%'}} onClick={e => this.mapClickHandler(e, 3)}>
            <h2>Click here to proceed...</h2>
          </div>
        </div>
      </div>
    ) : (
      <DataApps
        launcherUrlState={launcherUrlState}
        nerdletUrlState={nerdletUrlState}
        tabIndex={tabIndex}
      />
    );
  } //render
} //Splash
