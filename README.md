# learning tracker

This web application allows you to keep tabs on your learning.
You are able to track articles you come across the internet, videos you would like to save, books you would like to or are
currently reading, and much more!
You can also group all of these under a specific topic. For example, you can create a topic called React with which you
can associate articles, books, and videos under.

The frontend is built using Next.js and the backend is built using Spring. The database used is MongoDB.

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
