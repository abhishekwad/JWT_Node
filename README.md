# JWT_Node

How Do they work?
When a user sends a request with required parameters like username and password. The application checks if username and password are valid. On validation, the application will create a token using a payload and a secret key. It will then send the token back to the user to store and send it with each request. When user sends request with this token, application verifies validity with same secret key. If the token is valid, the request is served, else the application will send an appropriate error message.





Basic Structure of JWT
1- header: It contains token type and algorithm used to make signature. Gets encoded to base64.
2- payload: Any custom user data like username and email.
3- signature: Hash of encoded header, payload and a secret key.




This is a nde.js application with few routes and authenticate them using tokens. 
