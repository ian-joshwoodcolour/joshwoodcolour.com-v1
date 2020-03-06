# Josh Wood Colour - API

This REST API extends the functionality of the Josh Wood Colour Shopify site.

[View production site](https://api.	joshwoodcolour.com/).

## ⬇️ Installing / Getting started

The API is installed as part of the main Josh Wood Colour repository.


## 🛠 Stack

The API runs on a Node server, using the Express framework. 

- Node
- Express 
- [Express Validator](https://www.npmjs.com/package/express-validator), for validating requests
- [CORS](https://www.npmjs.com/package/cors), for managing CORS requests
- [Helmet](https://www.npmjs.com/package/helmet), for securing HTTP headers
- [Body Parser](https://www.npmjs.com/package/body-parser), for parsing JSON and URL Encoded request bodies
- [Morgan](https://www.npmjs.com/package/morgan), for logging requests
- [New Relic](https://www.npmjs.com/package/newrelic), for monitoring performance
- [BugSnag](https://www.npmjs.com/package/bugsnag), for error reporting


## ➡️ Endpoints

### `/consultation/unsubscribe`

**Method** <br>
POST

**Parameters** <br>

| Name | Type | Description | Required | 
|------|------|-------------|----------|
| email | string | An email address used on the Consultation tool | true |


**Rate limit** <br>
Integrates with MailChimp which has a limit of 10 simultaneous connections.

**Success response** <br>
A JSON object with single 'success' property, the value will be true if there is a successul MailChimp request.

Example:
```
{success: true}
```

**Error response** <br>
A JSON object with single 'success' property, the value will be false if there is an unsuccessul MailChimp request.

Example:
```
{success: false}
```

**Usage** <br>
[https://joshwoodcolour.com/pages/consultation](https://joshwoodcolour.com/pages/consultation) <br>
When completing the Consulation, opt-in to saving your answers with your email address and this will automatically attempt to unsubscribe that email from the MailChimp list.

**Test** <br>

1. Go to the [Consultation page](https://joshwoodcolour.com/pages/consultation)
2. Begin a consultation
3. When asked if you want to save your consultation results, say 'Yes'
4. Enter an email address
5. Complete the rest of the consultation and submit
6. Observe you have been redirected to the results page
7. Go back to the [Consultation page](https://joshwoodcolour.com/pages/consultation)
8. Begin another consultation with different answers
9. When asked if you want to save your consultation results, say 'Yes'
10. Enter the same email address you used previously
11. Complete the rest of the consultation and submit
12. Observe you have been redirected to the results page and it shows new recommendations


--

### `/consultation/retrieve`

**Method** <br>
POST

**Parameters** <br>

| Name | Type | Description | Required | 
|------|------|-------------|----------|
| email | string | An email address used on the Consultation tool | true |

**Rate limit** <br>
Integrates with MailChimp which has a limit of 10 simultaneous connections.

**Success response** <br>
A JSON object with the results of a successful MailChimp request, the values being answers provided in the Consultation.

Example:
```{
    "NAME": "Sean",
    "HAIRTYPE": "All-over colour",
    "CURCOLOUR": "Light blonde",
    "HAIRSHADE": "Light blonde (Shade 8.5)",
    "GREYAMOUNT": "Some (10-50%)",
    "REGROWTHCO": "Dark blonde",
    "REGROWTHSH": "Light blonde (Shade 8.0)",
    "GREYDIFFIC": "Yes",
    "COLOURAMBI": "A bit lighter",
    "UNWANTEDTO": "Brassy/yellow",
    "HAIRTEXTUR": "Frizzy",
    "COLOURSAT": "Home",
    "SAVECONSUL": "Yes",
    "NEWSLETTER": "Yes"
}```

**Error response** <br>
A JSON object with a MailChimp error message.

Example:
```{
    "errors": [
        {
            "type": "http://developer.mailchimp.com/documentation/mailchimp/guides/error-glossary/",
            "title": "Resource Not Found",
            "status": 404,
            "detail": "The requested resource could not be found.",
            "instance": "a1f4af2c-9557-41e6-a922-bb73f747f47a"
        }
    ]
}```

**Usage** <br>
[https://joshwoodcolour.com/pages/consultation](https://joshwoodcolour.com/pages/consultation) <br>
After completing the Consulation, a user can retrieve their results by entering their email.

**Test** <br>

1. Go to the [Consultation page](https://joshwoodcolour.com/pages/consultation)
2. Begin a consultation
3. When asked if you want to save your consultation results, say 'Yes'
4. Enter an email address
5. Complete the rest of the consultation and submit
6. Observe you have been redirected to the results page
7. Open the [Consultation page](https://joshwoodcolour.com/pages/consultation) in a **different** browser, or Incognito Mode
8. Instead of starting a consultation, choose to retrieve your previous consultation
9. Enter the email address you used in your consultation and submit
10. Observe that you have been redirected to the results page and it shows the correct results

--

### `/contact/create-ticket`

**Method** <br>
POST

**Parameters** <br>

| Name | Type | Description | Required | 
|------|------|-------------|----------|
| first_name | string | The user's first name | false |
| last_name | string | The user's last name | false |
| email | string | The user's email address | true |
| order_number | number | The user's order number of a shop purchase | false |
| description | string | The user's reason for getting in touch | false |
| subject | string | The user's type of request | false |


**Rate limit** <br>
Integrates with MailChimp which has a limit of 10 simultaneous connections.

**Success response** <br>
JSON.

Example:
```
{success: true}
```
**Usage** <br>
*Via the contact form available on ultiple pages on the site, including the footer links*.

After completing the contact form the data is then sent to the API to then post to Zendesk.

1. Go to the [Consultation page](https://joshwoodcolour.com/pages/consultation)
2. Begin a consultation
3. When asked if you want to save your consultation results, say 'Yes'
4. Enter an email address
5. Complete the rest of the consultation and submit
6. Observe you have been redirected to the results page
7. Go back to the [Consultation page](https://joshwoodcolour.com/pages/consultation)
8. Begin another consultation with different answers
9. When asked if you want to save your consultation results, say 'Yes'
10. Enter the same email address you used previously
11. Complete the rest of the consultation and submit
12. Observe you have been redirected to the results page and it shows new recommendations



## 🖥 Developing

### Running server

To get the server up and running, simply run:

```shell
npm start
```

This will create a local server with the default port of **1337**. This relies on `.env` file that contains all required environment variables for the APIs, etc. If you need a copy from production please work with DevOps to complete this.

### Testing

Tests are currently missing. Please check back soon.


### Deploying / Publishing

Deployments are currently made manually via Deploybot. Please work with DevOps to complete this.


## 👋 Contributing

Please see README of the main project for contribution guidelines.


## 💬 Discussion

Any questions can be raised in the [#joshwoodcolour](https://maidoteam.slack.com/messages/C4UTWFZ8X) Slack channel.
