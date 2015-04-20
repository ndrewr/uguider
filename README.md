#U-Guider
===============================================================
Aggregates links from various sources based on configured criteria.

Each link has an associated Click Counter to alert Users to how many other Users have
already followed that link. This is meant to free User to visit less trafficked links.


#Link Sources
===============================================================
Currently checks Reddit hourly for the query:

q=udacity+nano*&restrict_sr=off&sort=new&t=all&limit=10

Currently scrapes Quora with Kimono API with the query:
(Quora currently has no public API)

udacity+nanodegree&time=month


#How to Run
===============================================================
- Install Meteor
- on CLI:
	meteor create uguider
- change to new project directory
- replace all files in root directory with contents of this repo
- add required packages
	meteor add http
	meteor add momentjs:moment
- launch on local host:
	meteor


#TODOS
===============================================================
- Sort available links based on...
	- Dated created?
	- Number of clicks? (descending order?)

- add Accounts system with LinkedIn login

- allow logged-in User to delete posts

- allow logged-in User to post new links

- allow User to alert Support about particular link?

