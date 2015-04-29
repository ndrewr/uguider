#U-Guider
===============================================================
Aggregates links from various sources based on configured criteria.

Each link has an associated Click Counter to alert Users to how many other Users have
already followed that link. This is meant to free User to visit less trafficked links.

Each post also carries a basic ranking system represented by hearts. More hearts floats to the top, zero hearts sink to the bottom. The same User cannot rank the same post (up or down) twice in a row.


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
	meteor add accounts-ui
	meteor add pauli:accounts-linkedin
- launch on local host:
	meteor


#TODOS
===============================================================
- Post ranked by User disappears from immediate display, prolly because entry update does
something weird?

- More link sources

- Better search queries on Reddit/Quora

- Sort available links based on...
	- Date created?
	- Number of clicks? (descending order?)
	- heart Ranking?

- how to handle posts ranked 0; Delete or simply hide?

- allow logged-in User to post new links

- allow User to alert Support about particular link?

- responsiveness on diff devices

- still INSECURE
