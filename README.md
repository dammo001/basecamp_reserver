# basecamp_reserver

A simple script that logs into the basecamp website with a headless chrome instance and signs you up for a class exactly 1 week away at whatever time you pass in, with a default of 6:15 AM since those classes fill up the fastest. 

* Requires at least node v 7.4.0 for async/await support. 

Usage (basic cron usage):
==========

* Run like `node runner.js -u username -p password`. 
* -u (username) and -p (password) are required values. 
* -t specifies the time of the class you want -- this can be either the starting time or the ending time, and should have a leading 0, i.e. 05:15 not 5:15.
* -l is the location you want to sign up for. Location values are 
```
Pasadena -- 617539
West Hollywood -- 231989
San Francisco -- 114120
Santa Monica -- 181661
Burlingame -- 34319
``` 
With Burlingame being the default. 

* Basecamp classes are made available at midnight for the next week, so you should probably run this on some sort of cronjob for 12:01 AM for any day you want to register for. You can do this in the shell by using `crontab -e` and then adding this task with your desired flags. 
