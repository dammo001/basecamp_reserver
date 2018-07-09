# basecamp_reserver

* Run like `node runner.js -u username -p password`. 

* -u (username) and -p (password) are required values. This script uses a headless chrome to log in to the burlingame basecamp (optional with -l) and register for a class at 06:15 AM (optional with -t -- make sure you pass single digit times with a leading 0, i.e. 05:15 not 5:15). Basecamp classes are made available at midnight for the next week, so you should probably run this on some sort of cronjob for 12:01 AM for any day you want to register for. 

* Requires at least node v 7.4.0 for async/await 
