The design of this app:


This app lets users type in characters into an input box, printing colored shapes as each character
is typed. Then when the user presses the enter key (submits the form) there is a REST call to send the string entered
to the server, where the counts for each of the 26 characters will be updated in mongo. There is a button to give the 26
character counts. The counts include all strings entered by all users of the system.

The database is initialized the first time the app is run with 26 character counts set to zero.

There will be two REST methods:

sendString which is a put with the string, causing whatever characters were entered to be counted and updated in the database.
getCounts which is a get and fetches the 26 character counts.

There is a single view with the input field and a button to update the display of the character counts.

I initially scaffolded the app with:
yo meanjs

Then I did npm install, bower install, and grunt.

Then I added crud for the charCount:
yo meanjs:crud-module charCount

Then I initialized git repo.