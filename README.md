cookieman
=========

simple commonjs cookie lib with path and domain awareness and ie8+ support


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

### delete
delete a cookie, (this returns a boolean indicating whether the cookie was deleted or not)
```javascript
cm.delete("name"); // true
```

### deleteAll
force delete all cookies with specified name and return path and domain of deleted cookies
```javascript
cm.deleteAll("name"); // [{ path: "/", domain: ".foo"}]
```
## Test

```
karma start
```