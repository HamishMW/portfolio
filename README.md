# Personal portfolio

![Site preview](/public/social-image.png)

A design portfolio to showcase a few projects. Feel free to clone and play around with it.

## Install & run

Make sure you have yarn installed, then run:

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
    "authDomain": "domain.firebaseapp.com",
    "databaseURL": "https://domain.firebaseio.com",
    "projectId": "proj-id",
    "storageBucket": "bucket",
    "messagingSenderId": "123"
  }
}
```
