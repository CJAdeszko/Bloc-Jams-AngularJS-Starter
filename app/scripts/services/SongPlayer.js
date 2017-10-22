(function() {
    function SongPlayer() {
         var SongPlayer = {};

         /**
         * @desc Currently playing song object
         * @type {Object}
         */
         var currentSong = null;

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
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
         };


         /**
         *@function playSong
         *@desc Plays the selected song and sets song objects .playing property to true
         *@param {Object} song
         */
         var playSong = function(song){
           //play current buzz object currentBuzzObject.play()
           currentBuzzObject.play();

           //set playing property of song object to true song.playing = true
           song.playing = true;
         }

         /**
         *@method SongPlayer.play
         *@desc Determines if song selected is currently playing, if not, sets currentSong and plays
         *@param {Object} song
         */
         SongPlayer.play = function(song) {
             if (currentSong !== song) {
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
            currentBuzzObject.pause();
            song.playing = false;
          };


         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
