# Week 2 — Distributed Tracing

### Key Takeaways this week

- Use different Dockerfile for development, testing and production
- Expanding experience section with projects, open source works rather than separating them on resume

### Highlights of this week

- Explored datadog and explored it's services for observability and monitoring
- Tried to create observability for the backend server using `boto3` rather than using aws-xray-sdk
- Learnt a lot about OpenTelemetry, it's collectors and instrumentation in different languages

### Hurdles

- In frontend, while using `HONEYCOMB_API_KEY` it returns `undefined`. Can't get the proper explaination on why this is happending whereas `REACT_APP_BACKEND_URL` is working fine
- Got `CORS` error when configured `FETCH INSTRUMENTATION` in the frontend. Tackled it by configuring it with `{}` instead of `{..}`

---

### Table of Contents

- [Activities](#activities)
  + [Instrumentation using Honeycomb](#instrumentation-using-honeycomb)
  + [Instrumentation using AWS X Ray](#instrumentation-using-aws-x-ray)
  + [Implementing Cloudwatch logs](#implementing-cloudwatch-logs)
  + [Implementing Rollbar](#implementing-rollbar)
- [Homeworks](#homeworks)
  + [Cloud Career](#cloud-career)
  + [Instrument frontend](#instrument-frontend)
  + [Add custom instrumentation and more attributes](#add-custom-instrumentation-and-more-attributes)
  + [Custom queries in Honeycomb](#custom-queries-in-honeycomb)

---
## Activities

### Instrumentation using Honeycomb

Instrumented the backend server using honeycomb, 

`docker compose logs`

```sh
aws-bootcamp-cruddur-2023-backend-flask-1      | {
aws-bootcamp-cruddur-2023-backend-flask-1      |     "name": "home-activities-span",
aws-bootcamp-cruddur-2023-backend-flask-1      |     "context": {
aws-bootcamp-cruddur-2023-backend-flask-1      |         "trace_id": "0xe74fd5657bbcfb5e5164800d175c23db",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "span_id": "0xae41667e984867cc",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "trace_state": "[]"
aws-bootcamp-cruddur-2023-backend-flask-1      |     },
aws-bootcamp-cruddur-2023-backend-flask-1      |     "kind": "SpanKind.INTERNAL",
aws-bootcamp-cruddur-2023-backend-flask-1      |     "parent_id": "0xec6b88331948ff98",
aws-bootcamp-cruddur-2023-backend-flask-1      |     "start_time": "2023-03-06T09:55:55.982931Z",
aws-bootcamp-cruddur-2023-backend-flask-1      |     "end_time": "2023-03-06T09:55:55.983227Z",
aws-bootcamp-cruddur-2023-backend-flask-1      |     "status": {
aws-bootcamp-cruddur-2023-backend-flask-1      |         "status_code": "UNSET"
aws-bootcamp-cruddur-2023-backend-flask-1      |     },
aws-bootcamp-cruddur-2023-backend-flask-1      |     "attributes": {
aws-bootcamp-cruddur-2023-backend-flask-1      |         "app.result_length": 3
aws-bootcamp-cruddur-2023-backend-flask-1      |     },
aws-bootcamp-cruddur-2023-backend-flask-1      |     "events": [],
aws-bootcamp-cruddur-2023-backend-flask-1      |     "links": [],
aws-bootcamp-cruddur-2023-backend-flask-1      |     "resource": {
aws-bootcamp-cruddur-2023-backend-flask-1      |         "attributes": {
aws-bootcamp-cruddur-2023-backend-flask-1      |             "telemetry.sdk.language": "python",
aws-bootcamp-cruddur-2023-backend-flask-1      |             "telemetry.sdk.name": "opentelemetry",
aws-bootcamp-cruddur-2023-backend-flask-1      |             "telemetry.sdk.version": "1.16.0",
aws-bootcamp-cruddur-2023-backend-flask-1      |             "service.name": "backend-flask"
aws-bootcamp-cruddur-2023-backend-flask-1      |         },
aws-bootcamp-cruddur-2023-backend-flask-1      |         "schema_url": ""
aws-bootcamp-cruddur-2023-backend-flask-1      |     }
aws-bootcamp-cruddur-2023-backend-flask-1      | }
```

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/223077255-94bba275-cf6b-4801-9c31-1447b9bc5dc5.png">
<img width="1439" alt="image" src="https://user-images.githubusercontent.com/59391441/223077375-75c3b5b0-52ac-4b21-a4ee-4766d44b4fb6.png">

Commit -> [fix: added span and traces for home and notification route](https://github.com/nanthakumaran-s/aws-bootcamp-cruddur-2023/commit/99540af53814de255ba8a062c753b6a6bd5bbb4e)

### Instrumentation using AWS X Ray

Instrumented the backend server using honeycomb,

`backend logs`

```sh
aws-bootcamp-cruddur-2023-backend-flask-1      |     "name": "/api/activities/home",
aws-bootcamp-cruddur-2023-backend-flask-1      |     "context": {
aws-bootcamp-cruddur-2023-backend-flask-1      |         "trace_id": "0xc8566b62b35a99af9c2dcf44eafe60ae",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "span_id": "0x455e016e841b5642",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "trace_state": "[]"
aws-bootcamp-cruddur-2023-backend-flask-1      |     },
aws-bootcamp-cruddur-2023-backend-flask-1      |     "kind": "SpanKind.SERVER",
aws-bootcamp-cruddur-2023-backend-flask-1      |     "parent_id": null,
aws-bootcamp-cruddur-2023-backend-flask-1      |     "start_time": "2023-03-06T09:58:57.535294Z",
aws-bootcamp-cruddur-2023-backend-flask-1      |     "end_time": "2023-03-06T09:58:57.538085Z",
aws-bootcamp-cruddur-2023-backend-flask-1      |     "status": {
aws-bootcamp-cruddur-2023-backend-flask-1      |         "status_code": "UNSET"
aws-bootcamp-cruddur-2023-backend-flask-1      |     },
aws-bootcamp-cruddur-2023-backend-flask-1      |     "attributes": {
aws-bootcamp-cruddur-2023-backend-flask-1      |         "http.method": "GET",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "http.server_name": "0.0.0.0",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "http.scheme": "http",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "net.host.port": 4567,
aws-bootcamp-cruddur-2023-backend-flask-1      |         "http.host": "4567-nanthakumar-awsbootcamp-ztkuv7qj1es.ws-us89.gitpod.io",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "http.target": "/api/activities/home",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "net.peer.ip": "192.168.154.201",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "http.user_agent": "curl/7.64.0",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "net.peer.port": 53902,
aws-bootcamp-cruddur-2023-backend-flask-1      |         "http.flavor": "1.1",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "http.route": "/api/activities/home",
aws-bootcamp-cruddur-2023-backend-flask-1      |         "http.status_code": 200
aws-bootcamp-cruddur-2023-backend-flask-1      |     },
aws-bootcamp-cruddur-2023-backend-flask-1      |     "events": [],
aws-bootcamp-cruddur-2023-backend-flask-1      |     "links": [],
aws-bootcamp-cruddur-2023-backend-flask-1      |     "resource": {
aws-bootcamp-cruddur-2023-backend-flask-1      |         "attributes": {
aws-bootcamp-cruddur-2023-backend-flask-1      |             "telemetry.sdk.language": "python",
aws-bootcamp-cruddur-2023-backend-flask-1      |             "telemetry.sdk.name": "opentelemetry",
aws-bootcamp-cruddur-2023-backend-flask-1      |             "telemetry.sdk.version": "1.16.0",
aws-bootcamp-cruddur-2023-backend-flask-1      |             "service.name": "backend-flask"
aws-bootcamp-cruddur-2023-backend-flask-1      |         },
aws-bootcamp-cruddur-2023-backend-flask-1      |         "schema_url": ""
aws-bootcamp-cruddur-2023-backend-flask-1      |     }
aws-bootcamp-cruddur-2023-backend-flask-1      | }
```

`xray daemon logs`

```sh
aws-bootcamp-cruddur-2023-xray-daemon-1        | 2023-03-06T09:58:58Z [Info] Successfully sent batch of 1 segments (0.067 seconds)
```
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/223078967-55f8fc9f-78d6-4d81-98c3-7aa8ddc7de5e.png">

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/223078478-c41f4083-a492-4b92-9103-419943bb1b7d.png">

Commit -> [fix: configured aws xray segments and sub segments](https://github.com/nanthakumaran-s/aws-bootcamp-cruddur-2023/commit/2724fd0a2b14ca7a8a601f6d2d9a14951073cfc8)

### Implementing Cloudwatch logs

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/223083604-0751435c-8ae4-4de2-9a3b-3a5618d1fd27.png">

Commit -> [feat: added cloudwatch logs](https://github.com/nanthakumaran-s/aws-bootcamp-cruddur-2023/commit/deb952be477ef889fcafa6e288ef8a219b7ec8e7)

### Implementing Rollbar

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/223127615-f91ba0d4-8031-4c3c-827b-07f3d0b638ea.png">

Commit -> [fix: Configured rollbar and commented out AWS X-Ray & CloudWatch Log](https://github.com/nanthakumaran-s/aws-bootcamp-cruddur-2023/commit/ee677095f11491119903d5fc475e6ae8a7feca7d)

## Homeworks

### Cloud Career

<img width="708" alt="image" src="https://user-images.githubusercontent.com/59391441/223133596-72363184-b4fa-464d-bbbc-725f8b2bfa4f.png">

### Instrument frontend

To instrument frontend we need to first install,

```sh
$ cd frontend-react-js
$ npm i @opentelemetry/api @opentelemetry/context-zone @opentelemetry/instrumentation-document-load @opentelemetry/instrumentation-fetch @opentelemetry/instrumentation-xml-http-request @opentelemetry/sdk-trace-web
```
create a file `trace-provider.js` in the `src` directory

```js
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { ZoneContextManager } from '@opentelemetry/context-zone';
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';

const provider = new WebTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'frontend-react-js',
  }),
});
provider.register({
  contextManager: new ZoneContextManager()
});

const fetchInstrumentation = new FetchInstrumentation({});

fetchInstrumentation.setTracerProvider(provider);

registerInstrumentations({
  instrumentations: [
    fetchInstrumentation,
    new XMLHttpRequestInstrumentation({}),
    new DocumentLoadInstrumentation(),
  ]
})

export default function TraceProvider({ children }) {
  return (
    <>
      {children}
    </>
  );
}
```

In `index.js`

```js
import TraceProvider from './trace-provider';
...
  <React.StrictMode>
    <TraceProvider>
      <App />
    </TraceProvider>
  </React.StrictMode>
...
```

create a file `tracing-util.js` inside `utils` folder

```js
import opentelemetry from '@opentelemetry/api';
import axios from 'axios'

export async function reportSpan(span) {

  const { _spanContext, duration, startTime, endTime, name, parentSpanId } = span;

  const payload = {
    traceId: _spanContext.traceId,
    id: _spanContext.spanId,
    name,
    duration_ms: duration[1] / 1000 / 1000,
    endTime: endTime[0],
    parentId: parentSpanId,
    timestamp: startTime[0],
  };

  await axios
  .post('https://api.honeycomb.io/1/events/frontend-react-js', payload, {
    headers: {
      'X-Honeycomb-Team': <YOUR_HONEYCOMB_API_KEY>,
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
```

Then at last in `HomeFeedPage.js` add the following

```js
...
export default function HomeFeedPage() {
  const [span, setSpan] = React.useState(null)

  React.useEffect(() => {
    if (span) {
      span.end();
      reportSpan(span);
    }
  }, [span]);
  
  
  const loadData = async () => {
    try {
      const rootSpan = tracer.startSpan('frontend-react-js.home-feed');
      await withTracing(
        `home-feed-mock`,
        async () => {
          const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/home`
            const res = await fetch(backend_url, {
              method: "GET"
            });
            let resJson = await res.json();
            if (res.status === 200) {
              setActivities(resJson)
            } else {
              console.log(res)
            }
        },
        rootSpan,
      );
      await setSpan(rootSpan);

    } catch (err) {
      console.log(err);
    }
  };
 ...
```

After doing this all this correctly you can see the traces for `frontend-react-js` in the honeycomb.io dashboard like this

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/223206789-0a49d622-3320-4013-8df2-12b448b3f566.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/223206830-e94bfe50-4280-4bad-aef1-bab916cdab72.png">

Commit -> [fix: successfully completed instrumentation for frontend](https://github.com/nanthakumaran-s/aws-bootcamp-cruddur-2023/commit/31beecc1f756ced6e32d0ce76ffdb5b14e259088)

### Add custom instrumentation and more attributes

In `home_activities.py`

```py
...
      handles = []
      for i in results:
        handles.append(i['handle'])
      span.set_attribute("app.user_ids", handles)
...
```

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/223207749-52901041-0a44-4b9b-80e3-af26dd23c483.png">

Commit -> [feat: added used id attributes to honeycomb traces](https://github.com/nanthakumaran-s/aws-bootcamp-cruddur-2023/commit/3c20a1b1511e17390d68eb9c250033be89a840d4)

### Custom queries in Honeycomb

<img width="879" alt="image" src="https://user-images.githubusercontent.com/59391441/223208470-c4f31551-74eb-45dd-a2dd-36abd480456f.png">
<img width="862" alt="image" src="https://user-images.githubusercontent.com/59391441/223208548-3226d137-1cd6-48a9-aac2-879f2e299e04.png">
<img width="861" alt="image" src="https://user-images.githubusercontent.com/59391441/223208604-2394f8d6-ea86-423c-8eb0-24d2b5a8570c.png">
