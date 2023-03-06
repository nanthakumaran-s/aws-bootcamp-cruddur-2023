# Week 2 — Distributed Tracing

### Key Takeaways this week

- Use different Dockerfile for development, testing and production
- Expanding experience section with projects, open source works rather than separating them on resume

### Highlights of this week

- Explored datadog and explored it's services for observability and monitoring
- Tried to create observability for the backend server using `boto3` rather than using aws-xray-sdk

---

### Table of Contents

- [Activities](#activities)
  + [Instrumentation using Honeycomb](#instrumentation-using-honeycomb)
  + [Instrumentation using AWS X Ray](#instrumentation-using-aws-x-ray)
  + [Implementing Cloudwatch logs](#implementing-cloudwatch-logs)
  + [Implementing Rollbar](#implementing-rollbar)
- [Homeworks](#homeworks)
  + [Cloud Career](#cloud-career)

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

