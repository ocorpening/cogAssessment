## The design of this app:


This app lets users type in characters into an input box, printing colored shapes as each character
is typed. Then when the user presses the enter key (submits the form) there is a REST call to send the string entered
to the server, where the counts for each of the 26 characters will be updated in mongo. There is a button to give the 26
character counts. The counts include all strings entered by all users of the system.

**The database is initialized at startup with 26 character counts set to zero.**

* There will be two REST methods:

- sendString which is a put with the string, causing whatever characters were entered to be counted and updated in the database.
- getCounts which is a get and fetches the 26 character counts.

* There is a single view with the input field and a button to update the display of the character counts.

* I initially scaffolded the app with:
yo meanjs

* Then I did npm install, bower install, and grunt.

* Then I added crud for the charCount:
yo meanjs:crud-module charCount

* Then I initialized git repo.

* The db requires this table to exist, issue this command in the mongo shell:
db.createCollection("chartrackers")

TODO: styling, unit tests

There is much boilerplate I did not write: perhaps comparing checkins can show my progress as I went from boilerplate
to completed application

## To run the application:
* clone it
* npm install
* bower install
* grunt

Then browse to