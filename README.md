#  ![Cookieman](https://cloud.githubusercontent.com/assets/640611/11089200/f075ee22-885f-11e5-8cda-d620b6b79c69.png)
Simple commonjs cookie lib with path and domain awareness and ie7+ support


## usage    
```javascript
var cm = require('cookieman')
```

### get
Get an array containing all available cookies that match specified name
```javascript
cm.get('foo') // [{name: 'foo', value: 'bar'}]
```

### set
Set a cookie, with optional options object to specify expiry, path and/or domain
```javascript
cm.set('name', 'value', {
  expires: [date], // e.g. new Date(new Date().getTime() + 60000)
  path: [path], // e.g. '/'
  domain: [domain] // e.g. '.foo.com'
})
```

### cookies
Get an array of all available cookies
```javascript
cm.cookies() // [{name: 'name', value: 'value'}]
```

### clear
Clear a cookie. This returns a boolean indicating whether the cookie was cleared or not.
Note that to delete a cookie which lives on a specific path and/or domain, you must specify its path and/or domain.
```javascript
cm.clear('name', {
  path: [path], // e.g. '/'
  domain: [domain] // e.g. '.foo.com'
}) // true
```

### clearAll
Brute force clear all cookies with specified name on all super/subdomains and paths and return path and domain of cleared cookies
```javascript
cm.clearAll('name') // [{ path: '/', domain: '.foo'}]
```
## test

```
npm test
```

## Want to work on this for your day job?

This project was created by the Engineering team at [Qubit](http://www.qubit.com). As we use open source libraries, we make our projects public where possible.

We’re currently looking to grow our team, so if you’re a JavaScript engineer and keen on ES2016 React+Redux applications and Node micro services, why not get in touch? Work with like minded engineers in an environment that has fantastic perks, including an annual ski trip, yoga, a competitive foosball league, and copious amounts of yogurt.

Find more details on our [Engineering site](https://eng.qubit.com). Don’t have an up to date CV? Just link us your Github profile! Better yet, send us a pull request that improves this project.
