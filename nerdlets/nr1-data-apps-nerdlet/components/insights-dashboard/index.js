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
  ChartGroup,
  BillboardChart,
  FunnelChart,
  PieChart,
  BarChart,
  LineChart,
  TableChart,
  HistogramChart,
  AreaChart,
} from 'nr1';
/** local */
/** 3rd party */
import MD from 'markdown-it';

const md = new MD();

/**
 * InsightsDashboard Component
 */
export default class InsightsDashboard extends React.Component {
  static propTypes = {
    accountId: PropTypes.number,
    dashboard: PropTypes.object,
  }; //propTypes

  constructor(props) {
    super(props);
    this.state = {};
  }; //constructor

  /** Lifecycle render */
  render() {
    const { accountId, dashboard } = this.props;

    const widgetStyle = (widget) => ({
      gridColumn: '' + widget.column + ' / span ' + widget.width,
      gridRow: '' + widget.row + ' / span ' + widget.height,
    });

    const widgetContent = (widget) => {
      if (!widget) return null;
      if (/(billboard|attribute_sheet|gauge)/.test(widget.process_as))
        return <BillboardChart fullHeight fullWidth accountId={accountId} query={widget.nrql} />;
      if (/funnel/.test(widget.process_as))
        return <FunnelChart fullHeight fullWidth accountId={accountId} query={widget.nrql} />;
      if (/pie/.test(widget.process_as))
        return <PieChart fullHeight fullWidth accountId={accountId} query={widget.nrql} />;
      if (/bar/.test(widget.process_as))
        return <BarChart fullHeight fullWidth accountId={accountId} query={widget.nrql} />;
      if (/line/.test(widget.process_as))
        return <LineChart fullHeight fullWidth accountId={accountId} query={widget.nrql} />;
      if (/table/.test(widget.process_as))
        return <TableChart fullHeight fullWidth accountId={accountId} query={widget.nrql} />;
      if (/histogram/.test(widget.process_as))
        return <HistogramChart fullHeight fullWidth accountId={accountId} query={widget.nrql} />;
      if (/area/.test(widget.process_as))
        return <AreaChart fullHeight fullWidth accountId={accountId} query={widget.nrql} />;
      if (!widget.nrql) {
        let markdown = (widget.customizations || {}).markdown;
        if (markdown) return <div dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
      }
      return null;
    }

    return(
      <div className="insights-dashboard" style={{gridTemplateColumns: 'repeat(' + dashboard.grid_column_count + ', 1fr)'}}>
        <ChartGroup>
        {'widgets' in dashboard && dashboard.widgets.map((widget, i) => (
          <div className="widget" style={widgetStyle(widget)} key={i}>
            <h2 className="widget-header">{widget.title}</h2>
            {widgetContent(widget)}
          </div>
        ))}
        </ChartGroup>
      </div>
    );
  } //render
}//Foundation
