This is a REST API server application implemented by Node JS, which consists of 3 different auth flows:
* Signing up ---> Verify Email is not in use ---> Token
* Signing in ---> Verify Email/Password ---> Token
* Auth'd Request ---> Verify Token ---> Resource Access

The key is exchanging username and password for some identified token.

## Cookies v.s. Token

**Cookies:**
* Automatically included on all requests;
* Unique to each domain;
* Cannot be sent to different domains;

**Token:**
* Have to manually wire up;
* Can be sent any domain;

JSON Web Token (JWT) is used in this API server. **JWT = User ID + Secret String**.

## bcrypt: A library for encrypting password

Password + Salt = Hashed Password

## Passport: A middleware for authenticating user

Incoming Request ---> Passport ---> Router Handler

* JwtStrategy is used to authenticate user with JWT
* LocalStrategy is used to authenticate user with username and password