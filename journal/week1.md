# Week 1 — App Containerization

### Highlights
Besides doing live stream activities and homework,
- Added tasks in gitpod to install node modules on startup
- Run the backend and frontend both in gitpod and local environment

---

### Table of Contents

- [Activities](#activities)
  + [Containerize backend and frontend](#application-containerization)
  + [Notification in Cruddur](#added-notification-for-cruddur)
  + [Open API](#added-documentation-for-notification-route)
  + [DynamoDB local and PostgreSQL](#dynamodb-local-and-postgresql)
- [Homeworks](#homeworks)
  + [Dockerfile CMD as an external script](#external-script)
  + [Push and tag a image to DockerHub](#push-and-tag-a-image-to-dockerhub)

---
## Activities

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

## Homeworks

### External Script

1. Create a shell script to run the flask application 

```sh
#!/bin/bash
echo "Started from external script"
python3 -m flask run --host=0.0.0.0 --port=4567
```
2. Copy it to the `usr/local/bin` directory and make it executable by `chmod` command

```Dockerfile
COPY startup_script.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/startup_script.sh

CMD ["/usr/local/bin/startup_script.sh"]
```
3. Run `docker compose up` to use the external script
> NOTE: You need to remove the previous image before running the new. You can do it by `docker rmi <IMAGE ID>`

```sh
gitpod /workspace/aws-bootcamp-cruddur-2023 (main) $ docker compose up
[+] Building 1.2s (12/12) FINISHED                                                                                             
 => [internal] load build definition from Dockerfile                                                                      0.0s
 ...
 ...
 aws-bootcamp-cruddur-2023-backend-flask-1      | Started from external script
 ...
 aws-bootcamp-cruddur-2023-backend-flask-1      |  * Running on all addresses (0.0.0.0)
 aws-bootcamp-cruddur-2023-backend-flask-1      |  * Running on http://127.0.0.1:4567
 aws-bootcamp-cruddur-2023-backend-flask-1      |  * Running on http://172.18.0.4:4567
 ...
 ...
```

Commit -> [fix: CMD as an external script](https://github.com/nanthakumaran-s/aws-bootcamp-cruddur-2023/commit/316bed6607420fbab74bb3db17c18afc945a5edc)

### Push and tag a image to DockerHub

1. Build the image

```bash                                                                                      
❯ docker images
REPOSITORY                    TAG       IMAGE ID       CREATED         SIZE
...
cruddur-backend               latest    f89e9f655ad3   6 seconds ago   123MB
...
```

2. Login to Docker hub by the command `docker login`
3. Tag the image created by the build command in the specified format for pushing it to docker hub. Basically `<username>/<imagename>:<tagname>`

```bash
❯ docker tag cruddur-backend nanthakumaran/cruddur-backend:1.0
❯ docker images
REPOSITORY                      TAG       IMAGE ID       CREATED              SIZE
cruddur-backend                 latest    f89e9f655ad3   About a minute ago   123MB
nanthakumaran/cruddur-backend   1.0       f89e9f655ad3   About a minute ago   123MB
...
```

4. Push it to the registry by the command `docker push`

```bash
❯ docker push nanthakumaran/cruddur-backend:1.0
The push refers to repository [docker.io/nanthakumaran/cruddur-backend]
537dfe5ba3aa: Pushed 
82c4663ade00: Pushed 
eb31ebdc1629: Pushed 
cb1553bbda4c: Pushed 
a39fafe062c4: Pushed 
3da2cac66d3d: Pushed 
b941393613c0: Mounted from library/python 
f7263e15144b: Mounted from library/python 
d787e9b182b9: Mounted from library/python 
3d30caea0349: Mounted from library/python 
e7a0eed9531e: Mounted from library/python 
1.0: digest: sha256:3dbfd69f10df842d2d811fc379f7cf71c3616454675ddd2e39f1d7ab1f59af14 size: 2617
```

<img width="1425" alt="image" src="https://user-images.githubusercontent.com/59391441/221235918-af17b9c9-8f0b-42e9-90a0-7e7d1cec4d1c.png">

