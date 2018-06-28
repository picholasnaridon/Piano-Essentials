# Piano-Essentials
Script to load Piano library and functionality using only custom HTML tags

Add Composer script:

Fill in your account ID in the "aid" attribute, and either "sandbox" or "api" in the environment attribute. 
This will pull the correct setup.

```html
    <script src="https://cdn.rawgit.com/picholasnaridon/Piano-Essentials/cda9e17b/tp.js" environment="" aid=""></script>
```

Add login and logout buttons:
```html
        <piano-login-logout></piano-login-logout>
```html

Add Signup and My account buttons:
```html
        <piano-register-myaccount></piano-register-myaccount>
```

Add My Account container:
```html
        <piano-my-account></piano-my-account>
```
