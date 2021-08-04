
const User = require('../models/UserModel');
const passport = require('passport');

/* Key Point - When you log in, passport will put the user object (username and password and whatever else you’re saving — email, etc) into req.session.passport.user with the serializeUser() method. Then on future requests, you don’t need to ask the user to log in again for the life of the session.
Important Key Point - The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.
Passport will maintain persistent login sessions. In order for persistent sessions to work, the authenticated user must be serialized to the session, and deserialized when subsequent requests are made.
Passport does not impose any restrictions on how your user records are stored. Instead, you provide functions to Passport which implements the necessary serialization and deserialization logic. In a typical application, this will be as simple as serializing the user ID, and finding the user by ID when deserializing.
Passport supports storing the user information in the session if your app supports it.  passport attaches the profile information to req.user. This occurs as a direct result of the serializeUser() and deserializeUser() functions. - https://hackernoon.com/passportjs-the-confusing-parts-explained-edca874ebead
Question - 1 - Where does user.id go after passport.serializeUser has been called?
Ans - The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.
serializeUser determines, which data of the user object should be stored in the session. The result of the serializeUser method is attached to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide the user id as the key) req.session.passport.user = {id:'xyz'}
Question-2 - We are calling passport.deserializeUser right after it where does it fit in the workflow?
The first argument of deserializeUser corresponds to the key of the user object that was given to the done function (see 1.). So your whole object is retrieved with help of that key. That key here is the user id (key can be any key of the user object i.e. name,email etc). In deserializeUser that key is matched with that in memory array / database or any data resource.
*/

// Use Strategies
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});




module.exports = passport