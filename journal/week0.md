# Week 0 — Billing and Architecture

## Checklist

- [x] Watched Week 0 - Live Streamed Video
- [x] Watched Chirag's Week 0 - Spend Considerations
- [x] Watched Ashish's Week 0 - Security Considerations
- [x] Recreate Conceptual Diagram in Lucid Charts or on a Napkin
- [x] Recreate Logical Architectual Diagram in Lucid Charts
- [x] Create an Admin User
- [x] Use CloudShell
- [x] Generate AWS Credentials
- [x] Installed AWS CLI
- [x] Create a Billing Alarm
- [x] Create a Budget

## AWS CLI Output
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/221104615-9140becf-1247-484f-b7e1-3d6574b3e246.png">

Problem faced: I have ran into a issue that every cli command outputs 

```bash
Unknown output type: default
```

Then I found that when configuring aws cli we need to specify the output format as one of these `json`, `text` or `table`

## Billing Alarm

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/221105901-d7e85541-dc3e-4c11-9c7c-b828469baa73.png">
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/221106966-30ef5093-7959-4b0d-ad96-f5c446584488.png">

## AWS Budgets

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/221108153-30288097-6b47-4de1-9b67-2341bafef90d.png">

> NOTE: Here I have added 2 subscribers for a budget


## Conceptual Diagram

<img width="821" alt="image" src="https://user-images.githubusercontent.com/59391441/219666236-c4ea044e-3d14-41d8-8170-cefde76456aa.png">
https://lucid.app/lucidchart/585f22f3-bcca-4044-bd90-4bf2865a5fce/edit?viewport_loc=-109%2C-3%2C1579%2C877%2C0_0&invitationId=inv_380504c7-9bb2-4f4d-9670-421f2afe289d

## Logical Architectual Diagram

<img width="882" alt="image" src="https://user-images.githubusercontent.com/59391441/219687671-ce4fdb8c-792f-4c01-aa4d-39d71a37a866.png">
https://lucid.app/lucidchart/e782765e-0655-4962-af74-be17366a1672/edit?viewport_loc=102%2C-348%2C3033%2C1686%2C0_0&invitationId=inv_564aa49b-a926-4f56-9985-db5b8c568c68
