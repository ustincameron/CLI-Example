# README

BuildSpotify README to document steps necessary to execute the
application via the command line and lay out future plans.


**Available Options:**

* `addPlaylist`
* `removePlaylist`
* `addSongtoPlaylist`


**Dependencies:**

* Purposefully written in JS to have the most compatibility.
Can be used with any language that parses JS with arguments.
This example is focused on Node.js for arguments, but can be modified to work with Java via Oracle's "Nashorn" rendering engine.


**Run Example:**
* `clear && node app.js -- spotify.json changes.json output.json`

We attempt to verify output by preventing duplications. Will also respond with number of found changes.


**<changes-file> Example:** *changes.json example included in project.*

`{
  "addPlaylist": {},
  "removePlaylist": {},
  "addSongtoPlaylist": {}
}`

(*these match up to available options/methods*)

**Future Options:**

* viewPlaylist
* reorderPlaylist
* addSong
* removeSong
* viewSongs
* addUser
* removeUser
* viewUsers

**Future Optimizations:**
* ~~Validate add methods to prevent duplicates & empty additions~~
* Convert removePlaylist to ES7 and object destructuring instead of ES6 filter().
* Remove quotes from input-file and change-file json to streamline methods.

**Changes Required for Scale:**
* Parse <input-file> and <changes-file> line-by-line instead of entire file onLoad.
This would require replacing `readFileSync()` with `readSync()` and a defined bufferSize or other data stream alternative.


**Time Spent:**
* 2.5 hours ~