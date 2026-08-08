import type { ImpactMetric } from '@/content/case-studies';

type MetricValueProps = {
  metric: ImpactMetric;
  /** `metric-value` on the case study cards, `impact-num` in the impact grid. */
  className: string;
};

/** Renders a figure with its approximation qualifier styled separately. */
export function MetricValue({ metric, className }: MetricValueProps) {
  return (
    <span className={className}>
      {metric.prefix && <i>{metric.prefix}</i>}
      {metric.value}
    </span>
  );
}
