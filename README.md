# selecao-full-stack
Desafio para seleção de Desenvolvedor Full Stack

## Backend

I thought on making it simple, an api to make authentications and to deliver the required data. So Following the image on figma I figured out what features it should have. I need a route to return data for the three boxes and another one to return the currency list, just 2 routes. For the user I just saw a login page and no profile intented, then I set the user with just `{email: string, password: string}` initialy. After pondering a while, I decided to build this backend in a more scalable way, so made CRUDL operation for user and a 'getcurrency()' even though the frontend will not consume it. But since the user only have sensitive properties I didn't add the update method.

### Routes
All validation is done utilizing yup.

I always let this one, basically is the default response to anyone who manages to connect with this server. I like split this routes in several files, as are the controllers and middlewares, this way is easier to visualize.

```javascript
routes.get('/', (req: Request, res: Response) => {
    return res.json({ message: getMessage('default.helloWorld') });
});
```


This is an unprotected route, the signIn is using basic auth, I watched several videos back in 2020/2021 explaning why you should or shouldn't use basic auth, I got convinced about using it. In the end it's basically the same and just make a difference in huge projects. The password is compared using bcrypt checking against the hash stored in the database. If everything's okay it will return an accessToken using jsonwebtoken and set a refreshToken as a cookie.

```javascript
routes.get('/sign-in', AuthController.signIn);
```


Only users with a cookie are allowed here, it will receive the cooking and validate the refreshToken, if it's okay it will check against the database looking for a user with the same _id and tokenVersion and then return a new accessToken.

```javascript
routes.get('/refresh-token', AuthController.refreshAccessToken);
```


Only users with a cookie are allowed here also, it will receive the cooking and validate the refreshToken, then it will increment the tokenVersion of the validated user in the database, thus revoking all the tokens with the old version. Such a cool route, unfortunately it's not consumed by the api.

```javascript
routes.get('/revoke-token', AuthController.revokeRefreshToken);
```


Only logged users are allowed, this is one I thought would be helpful to make this application more scalable, it returns the lastest price of the selected currency consuming the first api. 

```javascript
routes.get('/currencies', auth(), CurrencyController.getCurrency);
```


Protected route as well, this one is consumed to keep boxes alive, it will consume the three apis and chew the data in the way the frontend needs.

```javascript
routes.get(
    '/currencies/now',
    auth(),
    CurrencyMiddleware.currentPrice,
    CurrencyController.currentPrice,
);
```

Protected route as well, this one is consumed to generate the list, it will return the daily of the past 30/60/90/120 days.

```javascript
routes.get(
    '/currencies/lately',
    auth(),
    CurrencyMiddleware.latelyPrice,
    CurrencyController.latelyPrice,
);
```

A public route, anyone can sent data as they please as long as it passes the validations tests, here bcrypt hashes the password and stores it in the database. Unfortunately there's no register page, it is only possible to consuming this endpoint directly with calls.

```javascript
routes.post('/users', UserMiddleware.store, UserController.store);
```

A protected route, there's no requirement for user list nor search, but I made this endpoint following CRUDL, you can retrieve up 10 users and skip the unmount you need to reach those you want.


```javascript
routes.get('/users', auth(), UserController.list);
```


Another protected route following CRUDL, it's not being used by the frontend

```javascript
routes.get('/users/findOne', auth(), UserMiddleware.findById, UserController.findOne);
```

Another protected route following CRUDL, it's not being used by the frontend, the logged user can only delete himself, the moment he perfoms this action his tokens loses functionally since the data they store doesn't exists in the database anymore

```javascript
routes.delete('/users', auth(), UserMiddleware.findById, UserController.remove);
```

## Frontend 
    I really got confused if I should make a signup page or not, in the end choose to don't do it, in the same fashion I didn't add a button for logout even though all the functions are implemented there, just there's no element to perform this action. Some elements I used aligment and others I calculated their proporcional size using `calc()`, I know some browsers don't support this function but I think would be worst if there was some random values of vh/vw in my code without an explanation, anyway this is something that can be easily fixed. 
About Scss/Sass, when I first learn React I used styled components in my projects, but at least to me it leaves the code more confusing, it's way better to have a file set apart for all the stylings, specially with all the features that scss/sass has, and now with tailwind out there I don't see myself going back use styled components anytime soon.
Since there was no way to sign-up through the frontend, to see the website working you need to have some users already stored in the database, whether by manual insertion or using postman/insonmia. To logout you can set the tokens to a short lifetime and wait for their time to expire.
 
   

### Login
    I didn't manage to get the same image as displayed on Figma, so left a blue background on its place. The form I made using react-hook-form, you're allowed to get in this page only if your token is empty and the refreshToken can't get you a new one. The font-size get a bit small on smartphones.
    
### Navbar
   The navbar is present is all screens, I have language toggle that changes the website language, it was mading using i18n. The activaty text is a bit to big when displayed in english. I would be cool to make the beeteller logo clickable, so it would redirect to home page, but since there's no other routes besides login didn't make much sense doing that.
   
### Dashboard
    The only one I thought it was fun to make, If you're not authenticated or failed trying to refresh your token you're send back to login. There are some rerenderings, which seems normal, but I tried my best to reduce them. 
    
   #### list
   A Title, a header and 30 rows of items, also a dropdown-nav that you can select which currency do you want to look at. 
   
   #### cards
    The cards are there, 3 of them, a fix number that I wrongly choose to map an array to create them. Also there's a refresh button that probably you better as part of the cards-container itself and not of header. 
    
   
### NotFound
   I happened to bumped into the tumblr error page these days, I found it was cool so I reproduced it here.
    

## What I could have done
I could have done an email authentication, so POST `/users` would save an inactive user and send an email with an activation link,the user would receive this email and click on the link to activate his account. But I thought it would be overenginering this simple application, so I didn't implement it is this project, but I have others repositories where I made it.

I could have made a way to change reset the password, even without two-step verification (email), having the label `forgot password?` and not being able to actually do it, disturbs me a little.

My original plan with the language toggle was to change all basic currencies, so if the language was English all currencies would be measured on dollar (the pair USD-BRL would be BRL-USD), if it was Portuguese all currencies would be measured on brl, and so on.

I could have render the boxes and list statically, there are always 3 boxes and always 30 rows, I should let them already defined instead trying to generating them, this way React could rerender just the info which has changed, this definitely is viable with the boxes at least.

I could have deployed it on heroku, I actually did it https://beeteller.herokuapp.com/login https://beeteller-api.herokuapp.com/, but there's some cors issue. Since I am using the same repository for backend and frontend I had to go for some not so usual ways, I have both backend and frontend deployed but they can't comunicate with each other due the cors issue, looks like I have set a proxy in the frontend to get this working. Probably if I had set two repositories for them it would be working just fine.

I could have tested the frontend, but I didn't and I don't think is that crucial testing the frontend during the early stage of development.
