# kittenlytics
Analyzes your tweets based on cat-related word usage 😺

## Set-up

The kittenlytics application requires Twitter authentication tokens, which
you can generate for your account by creating a
[Twitter app](https://apps.twitter.com/).


**First create a credentials file:**

```
cd kittenlytics
$EDITOR creds.json
```

Add the following to the file, replacing "XXX" with your actual values:

```
{
  "twitter": {
      "consumerKey": "XXX",
      "consumerSecret": "XXX",
      "accessToken": "XXX",
      "accessTokenSecret": "XXX"
    }
}

```

**Install modules:**

`npm install`

**Start kittenlytics:**

`node twitter.js`

Now open localhost:9999 in your browser!
