# Personal portfolio

![Site preview](/public/social-image.png)

A design portfolio to showcase a few projects.

## Install & run

Make sure you have npm and yarn installed. Install dependencies with:

```bash
yarn
```

Once it's done start up a local server with:

```bash
yarn start
```

## Not included

API keys not included, in case you dudes are trying to be sneaky beaky. If you want to try the Firebase contact form, edit `/src/config.json` to contain your Firebase project's config like so:

```json

// In src/config.json

{
  "firebase": {
    "apiKey": "yourkey123",
    "databaseURL": "https://domain.firebaseio.com",
    "projectId": "proj-id",
  }
}
```
