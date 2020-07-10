'use strict';

const BuildSpotify = class{

    constructor(input, changes, output) {
        this.fs = require('fs');

        this.input_file = JSON.parse(this.fs.readFileSync(input));
        this.changes_file = JSON.parse(this.fs.readFileSync(changes));
        this.output_file = output;

        this.parseChanges();
        this.writeOutputFile();
    }

    parseChanges(){
        console.log("Found:");

        (this.changes_file["addPlaylist"]) ? this.addPlaylist() : null;
        (this.changes_file["removePlaylist"]) ? this.removePlaylist() : null;
        (this.changes_file["addSongtoPlaylist"]) ? this.addSongtoPlaylist() : null;
    }

    addPlaylist(){
        console.log(this.changes_file["addPlaylist"].length+" new playlist(s).");
        let items = this.input_file["playlists"];

        items.push.apply(items, this.changes_file["addPlaylist"]); //merge playlists
        items[items.length-1].song_ids.push(this.input_file["songs"][0].id); //add our default track
        this.input_file["playlists"] = items; //merge db
    }

    removePlaylist(){
        console.log(this.changes_file["removePlaylist"].length+" playlist(s) to remove.");
        let new_items;

        this.changes_file["removePlaylist"].map(change => new_items = this.input_file["playlists"].filter((data) =>  data.id.toString().indexOf(change.id.toString()) == -1)); //filter by id
        this.input_file["playlists"] = new_items; //merge db
    }

    addSongtoPlaylist(){
        console.log(this.changes_file["addSongtoPlaylist"].length+" playlist(s) to update.");

        let items = this.input_file["playlists"];
        let changes = this.changes_file["addSongtoPlaylist"];
        let new_items;

        changes.map(change => { //loop through changes
            items.filter((data) =>  {
                if(data.id.toString().indexOf(change.id.toString()) !== -1){
                    var new_songs = data.song_ids.concat(change.song_ids);
                }
                data.song_ids = (new_songs) ? new_songs : data.song_ids;
            })
        } );
        this.input_file["playlists"] = items; //merge db
    }

    writeOutputFile(){
        console.log("New file: "+this.output_file+".");
        this.fs.writeFileSync(this.output_file, JSON.stringify(this.input_file));
    }

}
const args = process.argv.slice(2);
const app = new BuildSpotify(args[1], args[2], args[3]);