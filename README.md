# members-only

I developed the CRUD project "Members-Only" as a pivotal showcase of my skills in sessions, authentication, authorization, security, and database management. This project marks a significant milestone in my journey, as it reflects the knowledge I acquired during my later stages in a bootcamp, with a strong emphasis on the backend, server, and database aspects.


## Features

1. Message Creation:
   - Users are empowered to sign up and create messages complete with a title, timestamp, and content.
2. Password Security:
   - To bolster security, user passwords undergo hashing using bcrypt with 10 salt rounds, ensuring sensitive data remains protected.
4. Admin Privileges:
   - During the registration process, users have the unique opportunity to gain administrative privileges by employing the secret keyword "springrull."
   - Admins possess comprehensive permissions, including CREATE, READ, and DELETE actions for messages.
   - However, regardless of their role, no one has the authority to UPDATE messages.
6. Normal User Access:
   - Normal users have access to the message board, allowing them to read posted messages.
   - By default, message author and timestamp details remain concealed.
   - For an enhanced experience, users can choose to become exclusive members, gaining access to message author and timestamp information.
8. User Profile Updates:
   - Every user, regardless of their role, retains the ability to update their user profiles.

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
