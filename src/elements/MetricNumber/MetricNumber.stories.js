import MetricNumber from "./MetricNumber";

export default {
  title: 'Panels/Metric Number',
  component: MetricNumber,
};

export const Primary = {
    render: () => <MetricNumber number={1}/>,
};