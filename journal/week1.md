# Week 1 — App Containerization

### Highlights
Besides doing live stream activities and homework,
- Added tasks in gitpod to install node modules on startup
- Run the backend and frontend both in gitpod and local environment

---

### Table of Contents

- Activities
  + [Containerize backend and frontend](#application-containerization)
  + [Notification in Cruddur](#added-notification-for-cruddur)
  + [Open API](#added-documentation-for-notification-route)
  + [DynamoDB local and PostgreSQL](#dynamodb-local-and-postgresql)

---

### Application Containerization

```bash
gitpod /workspace/aws-bootcamp-cruddur-2023 (main) $ docker ps
CONTAINER ID   IMAGE                                         COMMAND                  CREATED          STATUS          PORTS                                       NAMES
4e62addee72b   aws-bootcamp-cruddur-2023-backend-flask       "python3 -m flask ru…"   19 minutes ago   Up 19 minutes   0.0.0.0:4567->4567/tcp, :::4567->4567/tcp   aws-bootcamp-cruddur-2023-backend-flask-1
3573af4f4c01   aws-bootcamp-cruddur-2023-frontend-react-js   "docker-entrypoint.s…"   19 minutes ago   Up 19 minutes   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   aws-bootcamp-cruddur-2023-frontend-react-js-1
3df7ac4a8b6e   postgres:13-alpine                            "docker-entrypoint.s…"   19 minutes ago   Up 19 minutes   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   aws-bootcamp-cruddur-2023-db-1
a9baa52493cd   amazon/dynamodb-local:latest                  "java -jar DynamoDBL…"   19 minutes ago   Up 19 minutes   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp   dynamodb-local
```

Commit -> [fix: dockerised both server and client and managed using docker compose](https://github.com/nanthakumaran-s/aws-bootcamp-cruddur-2023/commit/b28d98588ec0c5ef356a1ed01e755b388d851a86)

### Added Notification for Cruddur

```json
// https://4567-nanthakumar-awsbootcamp-g4lj8kht06i.ws-us88.gitpod.io/api/activities/notifications

[
  {
    "created_at": "2023-02-22T15:59:38.603432+00:00",
    "expires_at": "2023-03-01T15:59:38.603432+00:00",
    "handle": "coco",
    "likes_count": 5,
    "message": "I am a white unicorn",
    "replies": [
      {
        "created_at": "2023-02-22T15:59:38.603432+00:00",
        "handle": "Worf",
        "likes_count": 0,
        "message": "This post has no honor!",
        "replies_count": 0,
        "reply_to_activity_uuid": "68f126b0-1ceb-4a33-88be-d90fa7109eee",
        "reposts_count": 0,
        "uuid": "26e12864-1c26-5c3a-9658-97a10f8fea67"
      }
    ],
    "replies_count": 1,
    "reposts_count": 0,
    "uuid": "68f126b0-1ceb-4a33-88be-d90fa7109eee"
  }
]
```

Commit -> [feat: added notification endpoint and notifications page](https://github.com/nanthakumaran-s/aws-bootcamp-cruddur-2023/commit/a9e4ee3f35e47c8af1095d04fb64146fbf5dcf3f)

### Added documentation for notification route

<img width="871" alt="image" src="https://user-images.githubusercontent.com/59391441/221219492-47d8b838-583c-448c-a238-4caa2daa9d41.png">

Commit -> [docs: added openapi documentation for notifications route main](https://github.com/nanthakumaran-s/aws-bootcamp-cruddur-2023/commit/697f60a128d23f8b1f44dabaa23d4ab75519cc19)

### DynamoDB local and PostgreSQL

```zsh
# DynamoDB
gitpod /workspace/aws-bootcamp-cruddur-2023 (main) $ aws dynamodb scan --table-name Music --query "Items" --endpoint-url http://localhost:8000
[
    {
        "Artist": {
            "S": "No One You Know"
        },
        "SongTitle": {
            "S": "Call Me Today"
        },
        "AlbumTitle": {
            "S": "Somewhat Famous"
        }
    }
]

#PostgreSQL
gitpod /workspace/aws-bootcamp-cruddur-2023 (main) $ psql -Upostgres --host localhost
Password for user postgres: 
psql (13.10 (Ubuntu 13.10-1.pgdg20.04+1))
Type "help" for help.

postgres=# \t
Tuples only is on.
postgres=# exit
```

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/59391441/221221364-a753b573-07bf-441c-a76d-6325a07cd705.png">

Commit -> [fix: added dynamodb and postgresql using docker compose](https://github.com/nanthakumaran-s/aws-bootcamp-cruddur-2023/commit/c2f1a77f147c0b293584872c8d7eae9cfc5d5ab5)



