/**
 * Main entrypoint into Sea of Green funtionality
 *
 * @file This files defines the core sea of green entry nerdlet for launcher
 * @author
 */
/** core */
import React from 'react';
/** nr1 */
import { PlatformStateContext } from 'nr1'
import { NerdletStateContext } from 'nr1';
/** local */
import Splash from './splash';
/** 3rd party */


// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Nr1DataApps extends React.Component {
  render() {
    return (
      <PlatformStateContext.Consumer>
        {launcherUrlState => (
          <NerdletStateContext.Consumer>
            {nerdletUrlState => (
              <Splash
                launcherUrlState={launcherUrlState}
                nerdletUrlState={nerdletUrlState}
              />
            )}
          </NerdletStateContext.Consumer>
        )}
      </PlatformStateContext.Consumer>
    );
  } //render
} //Nr1CsgPivotalSeaOfGreen
