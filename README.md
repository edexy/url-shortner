<h1>API Project: URL Shortener Microservice for freeCodeCamp</h1>


<h3>User Stories</h3>
<ol type="1">

<li> I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`</li>
<li> If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. *HINT*: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.</li>
<li>When I visit the shortened URL, it will redirect me to my original link.</li>


<h3<Creation Example:</h3>

<p>POST [project_url]/api/shorturl/new - body (urlencoded) :  url=https://www.google.com</p>

<h3>Usage:</h3>

<p>[this_project_url]/api/shorturl/3<p>

<p> Will redirect to:</p>

<p>https://www.freecodecamp.org/forum/</p>
