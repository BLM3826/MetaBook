# Simple blog app

This app is comprised of two main parts: the front-end and the back-end.

## Back-end

### Overview

The back-end of this application is an HTTP web-server (using Express) that exposes some public and some protected routes, through a well-defined API. The protected routes require authorization to be accessed. The server also connects to a MongoDB instance that is used for persisting user data.

Moreover, the server will be used to serve the static files of a front-end Single Page App (html, css, js). To differentiate between serving API calls or the front-end app, a convention can be used. For example, we could say that all requests under the `/api` prefix path, are used to serve API calls. All other requests will be used to serve the SPA files.

Under this convention requests such as `/test`, `/`, `/hello/world/1/2/3/` and `/test-test-test?1=2` will simply be used by the server to send back the same static files (html, css, js) of the SPA. However, requests such as `/api/login`, `/api/test`, `/api/hello?f=3&t=15` will be treated by the server like regular API calls because they have the `/api` prefix.

### Database schema

The database could include a User model that represents all registered users and a BlogPost model with the information of each blog post.

### API

The basic functions that should be supported by the routes of this server are login, register and CRUD (Create/Read/Update/Delete) on blog posts. An example of the API that is served can look like this (the API prefix is implied in the names of the routes):

|       Name       |  Method  |                      Request body                       |              Response body              |                                                                                                                                                                                                                                                                                                          Effect                                                                                                                                                                                                                                                                                                           | Protected |
| :--------------: | :------: | :-----------------------------------------------------: | :-------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------: |
|     `/login`     |  `POST`  |                  [Username, Password]                   |         [Session cookie/token]          | Checks if the client's credentials are valid; if they are, send back a session token/cookie that will be used to verify the user on every protected API call. This token can be added on the [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) of each request, so that the server can authorize protected requests more easily. Additionally this token can be stored on the browser's [session or local storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API), and retrieved when the user visits the webpage again (e.g. from a different tab) without needing to login again. |   False   |
|    `/logout`     |  `POST`  |                            -                            |                    -                    |                                                                                                                                                                                                                              Reads the session token from the cookies of the request, and logs out the user (e.g. this could mean deletion of the session token from the browser's storage).                                                                                                                                                                                                                              |   False   |
|   `/register`    |  `POST`  |               [Username, Password, Email]               |                    -                    |                                                                                                                                                                                                                                                                                            Creates a new user in the database.                                                                                                                                                                                                                                                                                            |   False   |
|  `/blog-posts`   |  `GET`   |                        [UserId]                         |          [Array of blog posts]          |                                                                                                                                                                                                                                                              Retrieves all blog-posts for the given user from the database, and sends it back to the client.                                                                                                                                                                                                                                                              |   False   |
| `/blog-posts/id` |  `GET`   |                        [UserId]                         |        [Object of the blog post]        |                                                                                                                                                                                                                                                                               Retrieves the blog-post with the given ID for the given user.                                                                                                                                                                                                                                                                               |   False   |
|  `/blog-posts`   |  `POST`  |                [Object of the blog post]                |     [ID of newly created blog-post]     |                                                                                                                                                                                                                                                          Creates a new blog-post in the DB, for the requestor user, with the data provided by the requests body.                                                                                                                                                                                                                                                          |   True    |
| `/blog-posts/id` |  `PUT`   | [Object of the properties that change in the blog post] | [Object of the newly changed blog post] |                                                                                                                                                                                                                                                                             Modifies the blog-post with the given ID for the requestor user.                                                                                                                                                                                                                                                                              |   True    |
| `/blog-posts/id` | `DELETE` |                            -                            |                    -                    |                                                                                                                                                                                                                                                                              Deletes the blog-post with the given ID for the requestor user.                                                                                                                                                                                                                                                                              |   True    |

### Notes

On protected routes: for simplicity, the information of which user sent each request, can be included in the session token/cookie that the user receives upon a successful login.

The request body could be in JSON format for simplicity, but you're free to choose whichever format better suits you.

On the `/blog-posts` POST and PUT routes, any body data corresponding to the blog-post model on the database, should be validated accordingly. For example if there's a BlogPost model in the database that looks like this:

```
BlogPost {
 title: String,
 text: String
}
```

and a `/blog-posts/id` PUT request is received that looks like this

```
{
 title: 52
}
```

then the client should get an error, since the type of the `title` field doesn't match the type of the equivalent field in the BlogPost in the database.

Don't forget to also use the proper [HTTP codes on each response](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). For example, a request to a protected route, without the valid session token, could result in a [401](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401). A response code to a successful request is [200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200), and so on.

## Front-end

### Overview

The front-end is expected to be a simple SPA, with its own client-side route handling and a few pages that provide actions and views for the operations and data supported by the back-end.

### Routes

On SPAs it's a common practice to have client-side routing with URLs that simply don't mean anything to the backend, but can be interpreted by the SPA to match different pages and views. For a framework such as AngularJS, libraries like [ui-router](https://ui-router.github.io/ng1/) facilitate the handling of client-side routing with ease. Note that client-side routes shouldn't start with the API prefix, since those routes will be interpreted by the backend as API calls.

### UI

It's a good practice to design the UI first on paper or with a wireframe/mockup tool on the PC. For the implementation, feel free to use whichever framework you prefer (for AngularJS you could use [angularjs material](https://material.angularjs.org)). The following are some recommendations on how the app could look.

It's nice for the app to have a sticky header that operates like a toolbar, and displays different options according to whether the user is logged in or not. For example, for a logged in user there should be a button 'Log out', but on users who haven't logged in this button isn't necessary.

A `/login` client-side route/page could display a simple form of two input fields, so that the user can enter their Username and Password. Two `Login` and `Register` buttons.

A `/register` page that can also be accessed by the `Register` button of the `/login` route. Contains the input fields necessary to get the registered user's info, and buttons to submit the registration request to the server.

A `/user/:id/blog-posts` page that displays links of all the blog posts for the user with the given id. If this is a logged-in user, this route can include buttons for adding new blog posts, or deleting already existing posts.

A `/user/:user-id/blog-posts/:blog-post-id` page that displays the blog post content (i.e. title, text). If the user with `user-id` is currently logged in, this route could also display buttons for editing the content of the blog post.

Don't forget that logged-in users can view blog posts of any registered users, but not edit. Logged-in users can view but only edit their own posts.

### Requests

The API requests from the client to the server, can be handled either by the browser native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) which is supported by all modern browsers, or from an external library like [Axios](https://github.com/axios/axios) or from the AngularJS [$resource service](https://docs.angularjs.org/api/ngResource/service/$resource).
