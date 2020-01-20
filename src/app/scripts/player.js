var audio = {    
        init: function() {        
        var $that = this;        
            $(function() {            
                $that.components.media();        
            });    
        },
        components: {        
            media: function(target) {            
                var media = $('audio.fc-media', (target !== undefined) ? target : 'body');            
                if (media.length) {                
                    media.mediaelementplayer({                    
                        audioHeight: 40,
                        features : ['playpause', 'volume', 'tracks', 'fullscreen'],
                        alwaysShowControls      : true,
                        timeAndDurationSeparator: '<span></span>',
                        iPadUseNativeControls: true,
                        iPhoneUseNativeControls: true,
                        AndroidUseNativeControls: true                
                    });            
                }        
            },
                
        },
    };
    audio.init();

var metadata = new Vue({
    el: '.contain',
    data: {
        cover: 'https://chickenfm.com/images/default.png',
        artist: 'loading...',
        title: 'loading...'
    }
})
function setMetaData() {
    axios.get('https://api.chickenfm.com/app.php')
    .then(r => {
        var data = r.data
        metadata.cover = data.cover;
        metadata.artist = data.artist;
        metadata.title = data.title;
    })
}
setMetaData()
setInterval(setMetaData, 5000)