# FaturaAuthService

## SETUP
- You need to have node, mongodb, rabbitmq up and running in your machine or their docker images
### Database Used:
- Mongodb 

### Setup 
- Create .env file in app root directory 
- follow env.sample for env name:-
```
        PORT= 3000  ## Application Running Port
        DBURI=mongodb://ip:port/db-name ##Database URI
        SECRET_KEY_PATH = MY_SECRET_KEY  ## Path to jwt secret
        USER_EMAIL= xyz@gmail.com ##gmail account to send email (gmail is used for ease)
        USER_PASSWORD=1234 ##gmail account password
        PORT= 3000
        RABBITMQ_HOST = 
        SEND_VERIFICATION_MAIL_WORKER= 
````
- Run npm i


### API

### Users:  
1- POST /api/users/signup 
```
body: 
        username: string
        email: string
        passowrd: string 
```

2- POST /api/users/signIn 
```
body: 
        email: string
        passowrd: string 
```

3 - POST /api/users/verify 
```
body: 
        verificationCode: number

```

4- GET /api/users/logout --> to clear cookie


5- POST /api/users/roles/:userId 
```
body: 
        roles: string[] (ObjectId Compitable) 

```

## Missing Implemantation:
- Locking out users for brutal force attacks.
- Adding Routes to create or update roles and permissions (You'll find initial roles file in data folder for ease)

# Additional Resources:
- https://lucid.app/lucidchart/5eb4a08e-82f0-421f-bf88-68691f1133e8/edit?viewport_loc=-108%2C-435%2C3062%2C1558%2C0_0&invitationId=inv_8f560e53-9965-4052-9bc6-9485724768cf
