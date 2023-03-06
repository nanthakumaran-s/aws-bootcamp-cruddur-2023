import opentelemetry from '@opentelemetry/api';
import axios from 'axios'
// import Libhoney from 'libhoney';

// const honeycomb = new Libhoney({
//   writeKey: process.env.HONEYCOMB_API_KEY,
//   dataset: 'frontend-react-js',
// });

export async function reportSpan(span) {

  const { _spanContext, _ended, duration, startTime, endTime, name, parentSpanId } = span;

  const payload = {
    ..._spanContext,
    _ended,
    name,
    duration_ms: duration[1] / 1000 / 1000,
    endTime: endTime[0],
    traceId: parentSpanId,
    parentId: parentSpanId,
    timestamp: startTime[0],
  };

  // const event = honeycomb.newEvent();
  // event.add(payload);
  // event.send();
  console.log(process.env.HONEYCOMB_API_KEY)
  await axios
  .post('https://api.honeycomb.io/1/events/frontend-react-js', payload, {
    headers: {
      'X-Honeycomb-Team': process.env.HONEYCOMB_API_KEY,
      'X-Honeycomb-Event-Time': startTime[0],
      'Content-Type': 'application/json',
    }
  })
}

export async function withTracing(name, cb, parentSpan) {
  const tracer = opentelemetry.trace.getTracer('frontend-react-js');
  let span;

  if (parentSpan) {
    const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), parentSpan);
    span = tracer.startSpan(name, undefined, ctx);
  } else {
    span = tracer.startSpan(name);
  }

  await cb();

  span.end();

  reportSpan(span);
}

export function getTracer() {
  const tracer = opentelemetry.trace.getTracer('frontend-react-js');
  return tracer;
}