#U-Guider
===============================================================
Aggregates links from various sources based on configured criteria. Logged-in users can post new links.

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
	OR just
	meteor add http momentjs:moment accounts-ui pauli:accounts-linkedin
- launch on local host:
	meteor


#TODOS
===============================================================
- More link sources
	- Stack overflow? issue: few questions and style of open/close q&a style
	- Yahoo questions? issue: barely any questions
	- Google scrape?
		- '-site:udacity.com -site:quora.com forum AND udacity AND *degree'

- Better search queries on Reddit/Quora
	- added two mo scrapes for Quora checking 'degree' & 'certif' with 'udacity'
	- considerably more results...note checking 'cert' stops a those 4 letters = worse results

- Sort available links based on...
	- Date created?
	- Number of clicks? (descending order?)
	- heart Ranking?

- how to handle posts ranked 0; Delete or simply hide?

- allow User to alert Support about particular link?

- responsiveness on diff devices

- whats an 'Error Handling"??

- Normalizing urls for comparisons
