# adswap

adswap allows you to serve alternative ads to people running AdBlock/AdBlocker. It's written in pure javascript, no extra libraries are needed.

DEMO URL: https://adspy.herokuapp.com/

## How to use adswap

Wherever you have ads placed, inside of the adblock, add a comment with the following parameters:

```
<!-- adswap adswapImage: <ad image> adswapLink: <ad link> -->
```

Here's an example of a functional adswap block that will show this image: [http://placehold.it/800x90](http://placehold.it/800x90) with this link: [http://google.com](http://google.com).

```
<!-- adswap adswapImage: http://placehold.it/800x90 adswapLink: http://google.com -->
```

## installation

Then all you have to do is copy the two javascript files from the `views/js` folder of this project and add them to the header on your page file in this order:
```
<script src="http://yoursite.com/js/adframe.js"></script>  
<script src="http://yoursite.com/js/client.js"></script>
```


## Using the analytics API
This project also has a small node server that can connect to a mongodb database and report a small amount of data on users that are coming to your site that are using adblock. It is an optional feature that is disabled by default.

If you would like to use it, go to `js/client.js` and uncomment line 7 to enable the monitor function to be called when adblock is enabled, and then change the `hostname` variable on line 27 to whatever URL the node server will be running on.

Now that the client files are setup, you need to configure the server. The only thing that needs to be done is to edit the `app.js` file by modifying line 10 and put the correct mongodb connection information in there.

The last step is to install and run the node server, to do this just clone this repository onto a server with node installed, run `npm install` to install the modules, and then start the server with `npm start`.

## The API

### POST `/montior/:url`
```
Headers: Content/Type = application/json
Body: {
  info: {
	date: new Date(),
	appVersion: navigator.appVersion,
	language: navigator.language,
	platform: navigator.platform,
	userAgent: navigator.userAgent,
	vendor: navigator.vendor
  }
}
------------------------------------------
Success Response:
{
  "status": "insert" or "update",
  "success": true
}
```

### GET `/list`
```
Success Response:
{
  "data": [
    {
      "_id": "598d628c56e9534bd746ee87",
      "site": "localhost",
      "visitorInfo": [
        {
          "date": "2017-08-11T07:53:48.532Z",
          "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
          "language": "en-US",
          "platform": "MacIntel",
          "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
          "vendor": "Google Inc."
        }
      ],
      "hits": 20
    },
    {
      "_id": "598d628c56e9534bd746ac64",
      "site": "joshterrill.com",
      "visitorInfo": [
        {
          "date": "2017-08-11T07:57:13.540Z",
          "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
          "language": "en-US",
          "platform": "MacIntel",
          "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
          "vendor": "Google Inc."
        }
      ],
      "hits": 1
    },
  ]
}
```

### GET `/list/:url`
```
Success Response:
{
  "data": [
    {
      "_id": "598d628c56e9534bd746ee87",
      "site": "localhost",
      "visitorInfo": [
        {
          "date": "2017-08-11T07:53:48.532Z",
          "appVersion": "5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
          "language": "en-US",
          "platform": "MacIntel",
          "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36",
          "vendor": "Google Inc."
        }
      ],
      "hits": 20
    }
  ]
}
```
