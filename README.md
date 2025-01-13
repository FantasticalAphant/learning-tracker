# learning tracker

### Setting up environment variables:

```sh
# you can also just add variables to docker environment
$ vim path/to/src/main/resources/secrets.properties
```

```env
spring.data.mongodb.uri=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
youtube.api.key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

aws.access-key-id=XXXXXXXXXXXXXXXXXXXX
aws.secret-access-key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
aws.bucket-name=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
aws.region=XXXXXXXXX
```

[YouTube API Key Information](https://developers.deepl.com/docs)

[AWS S3 Information](https://aws.amazon.com/s3/)

---

## Running on Docker

```sh
$ docker-compose up --build # in the root directory
```
