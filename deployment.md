# Deployment directives

## TODO before deployment

make sure to change server ENV variables (prod to true and client port to 80 instead of 8080 if nginx is serving the frontend)

-   [x] remove the vue config file
-   [x] Set Prod env variable to true
-   [ ] Remove all the console logs, including the one on Logout event
-   [ ] make sure not to include path details in gql errors
-   [ ] add NSFW image filter ?

## Useful references

-   [what is a reverse proxy?](https://github.com/donnemartin/system-design-primer#reverse-proxy-web-server)
-   [deploying nodejs app](https://www.section.io/engineering-education/deploying-nodejs-web-app/)
-   [deploying multiple applications with NGINX as reverse proxy](https://www.section.io/engineering-education/nginx-reverse-proxy/)
-   [Using nginx to serve multiple nodejs applications on different domains](https://www.manuelkruisz.com/blog/posts/nginx-multiple-domains-one-server)
-   [Load Balancing Node.js Applications with NGINX and Docker](https://auth0.com/blog/load-balancing-nodejs-applications-with-nginx-and-docker/)
-   [How To Dockerize A NodeJS Application Using Nginx As A Reverse Proxy](https://blog.learningdollars.com/2021/06/10/how-to-dockerize-a-nodejs-application-using-nginx-as-a-reverse-proxy/)

## Architecture

Keeping it simple by locating everything on a single VPS (cost efficient)

```
            +------------------ VPS #0 -----------------------------------+
            |                                                             |
            |            |--> backend:<some_port> --> mongodb<def_port>   |
            |            |                                                |
user ---->  | nginx:80 --|                                                |
            |            |                                                |
            |            |--> frontend<some_port>                         |
            |                                                             |
            +-------------------------------------------------------------+
```

### Wanted behaviour

Users should be able to visit `devsbunker.com` without specifying a port number. The backend should be hidden (I guess the only option is by using CORS, which we already do). I've tried the following setup:

- simple webserver to serve devsbunker's client on port 8080
- `npm run start` for the backend (port 5000)
- proxy the client via nginx on port 80

Using this configuration, the backend blocks nginx as it is not an allowed source (CORS) and both the client and the backend are manually accessible by specifying the ports.

I must be doing something wrong with nginx but I am not sure the original plan is possible. One easy way for deployment is to make nginx directly serve the client (no reverse proxy) and to allow nginx as a valid source in the backend since it is protected by CORS.

This seems the way also because a reverse proxy is needed if you have to serve 2 or more applications, in our case we don't want to serve the backend since it's only usable by our client.

## CONFIG #0 - NO HTTPS

nginx serving the frontend on port 80 and backend listening on port 5000

### nginx config file

```
server {
    listen 80;
    server_name devsbunker.com;
    root <path to frontend>;
    location / {
        autoindex on;
        try_files $uri $uri/ /index.html =404;
    }
}
```

### backend env changes
```
prod=true
CLIENTSIDE_PORT=80
```

### frontend env changes

```
VUE_APP_MAIN_URL=http://devsbunker.com
```

## Commands issued to setup test machine (f0lg0 rp3)

```
loadkeys it
*connect to Wifi (edit netplan config file)*
*enable autologin*
sudo apt update
sudo apt upgrade
sudo apt install net-tools
sudo apt install git
sudo apt install nodejs --> NOTE: this install v. 10.19, NOT RECCOMENDED, use NVM instead to manage versions
sudo apt install npm
=== MONGODB === 
follow this guide!!!
https://www.mongodb.com/developer/how-to/mongodb-on-raspberry-pi/
===============
sudo apt install nginx
sudo systemctl status nginx
*edit /etc/hosts to add testing domain names*
```

remember to manually add the placeholder png 
