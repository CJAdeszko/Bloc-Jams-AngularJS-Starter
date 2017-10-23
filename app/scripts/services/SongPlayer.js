(function() {
    function SongPlayer(Fixtures) {
         var SongPlayer = {};

         /**
         * @desc Current album object
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();


         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
         };



         /**
         *@function playSong
         *@desc Plays the selected song and sets song objects .playing property to true
         *@param {Object} song
         */
         var playSong = function(song){
           //play current buzz object currentBuzzObject.play()
           currentBuzzObject.play();

           //set playing property of song object to true; song.playing = true
           song.playing = true;
         }


         /**
         *@function stopSong
         *@desc Stops the selected song and sets song objects .playing property to null
         *@param {Object} song
         */
         var stopSong = function(song){
           //stop current buzz object currentBuzzObject.stop()
           currentBuzzObject.stop();

           //set playing property of song object to null; song.playing = null
           SongPlayer.currentSong.playing = null;
         }


         /**
         *@function getSongIndex
         *@desc Returns index of the currently playing song
         *@param {Object} song
         *@return index
         */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };



        /**
        * @desc Currently playing song object
        * @type {Object}
        */
        SongPlayer.currentSong = null;


         /**
         *@method SongPlayer.play
         *@desc Determines if song selected is currently playing, if not, sets currentSong and plays
         *@param {Object} song
         */
         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
               setSong(song);
               playSong(song);
            }
         };

         /**
         *@method SongPlayer.pause
         *@desc Pauses currently playing song object, sets .playing property to false
         *@param {Object} song
         */
         SongPlayer.pause = function(song) {
           song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
          };


          /**
          *@method SongPlayer.previous
          *@desc Changes the index of the currentSong to the previous track
          */
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;

              if (currentSongIndex < 0) {
                  stopSong();
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };


          /**
          *@method SongPlayer.next
          *@desc Changes the index of the currentSong to the next track
          */
          SongPlayer.next = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;

              if (currentSongIndex == currentAlbum.songs.length) {
                  stopSong();
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };


         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
