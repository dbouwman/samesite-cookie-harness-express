# SameSite Cookies

This repo contains an express app that simulates impact of SameSite cookie attribute on various scenarios involving iframing content.

### Hosts File
In order to use this, you need to add the following lines to your hosts file

```
127.0.0.1 org.fakemaps.fakegis.com
127.0.0.1 www.fakegis.com
127.0.0.1 site-org.fakehub.fakegis.com
127.0.0.1 fake.customdomain.com
```

### Starting the app

Run `npm start`, and then open `http://site-org.fakehub.fakegis.com` in Chrome.

If you want to explore how this will work when Chrome 80 lands, and starts treating all cookies without a `SameSite` attribute as `SameSite=Lax`, then enable the "SameSite by default cookies" flag, availabe at [chrome://flags/](chrome://flags/)

