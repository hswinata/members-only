# members-only

I created this CRUD project to showcase my sessions, authentication, authorization, security, and database skills that I recently acquired from a Bootcamp.

## Features

1. Creating Messages:
   - Users can sign up and create messages that include a title, timestamp, and text.
2. Password Security:
   - To enhance security, user passwords are hashed using bcrypt with 10 salt rounds.
3. Admin Privileges:
   - During sign-up, users can become administrators by using the secret keyword "springrull."
   - Admins have the following permissions: CREATE, READ, and DELETE messages.
   - No one, including admins, can UPDATE messages.
4. Normal User Access:
   - Normal users can read messages on the message board.
   - Message author and timestamp details are hidden by default.
   - To access message author and timestamp, users can opt to become exclusive members.
5. User Profile Updates:
   - All users, regardless of their role, have the ability to update their user profiles.

## Technologies

1. Backend and Server:
   - Node.js
   - Express.js
2. Authentication, Authorization, and Security:
   - Passport.js
   - bcrypyt
   - express-session
3. Database:
   - MongoDB
   - Mongoose
4. View Engine:
   - EJS (Embedded JavaScript)
