cookieman
=========

Simple commonjs cookie lib with path and domain awareness and ie7+ support


## Usage    
```javascript
var cm = require("cookieman");
```

### get
Get an array containing all available cookies that match specified name
```javascript
cm.get("foo"); // [{name: "foo", value: "bar"}]
```

### set
Set a cookie, with optional options object to specify expiry, path and/or domain
```javascript
cm.set("name", "value", {
	expires: [date], // e.g. new Date(Date.now() + 60000)
	path: [path], // e.g. "/"
	domain: [domain] // e.g. ".foo.com"
});
```

### cookies
Get an array of all available cookies
```javascript
cm.cookies(); // [{name: "name", value: "value"}]
```

### clear
Clear a cookie. This returns a boolean indicating whether the cookie was cleared or not.
Note that to delete a cookie which lives on a specific path and/or domain, you must specify its path and/or domain.
```javascript
cm.clear("name", {
	path: [path], // e.g. "/"
	domain: [domain] // e.g. ".foo.com"
}); // true
```

### clearAll
Brute force clear all cookies with specified name on all super/subdomains and paths and return path and domain of cleared cookies
```javascript
cm.clearAll("name"); // [{ path: "/", domain: ".foo"}]
```
## Test

```
karma start
```
