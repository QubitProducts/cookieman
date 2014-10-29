cookieman
=========

simple commonjs cookie lib with path and domain awareness and ie7+ support


## Usage    
```javascript
var cm = require("cookieman");
```

### get
get an array containing all available cookies
```javascript
cm.cookies(); // [{name: "foo", value: "bar"}]
```

### set
set a cookie, with optional options object to specify expiry, path and/or domain
```javascript
cm.set("name", "value", {
	expiry: [date], // e.g. new Date(Date.now() + 60000)
	path: [path], // e.g. "/"
	domain: [domain] // e.g. ".foo.com"
});
```

### cookies
get an array of cookies that match the specified name [{name: "foo", value: "bar"}]
```javascript
cm.get("name"); // [{name: "name", value: "value"}]
```

### clear
clear a cookie, (this returns a boolean indicating whether the cookie was cleared or not)
```javascript
cm.clear("name"); // true
```

### clearAll
force clear all cookies with specified name and return path and domain of cleared cookies
```javascript
cm.clearAll("name"); // [{ path: "/", domain: ".foo"}]
```
## Test

```
karma start
```