(function($) {
    $.fn.photoViewer = function(){
        let request;
        let $current;
        let cache = {};
        let $frame = this.find(".photo-frame");
        let $thumbs = this.find('.thumb');

        if($frame.children("img").length <= 0){
            // this is the users first/initial visit
            // load the default selected image, (same as else block in the $thumbs click function)
            const src = this.find(".active").attr("href");
            let $img = $('<img/>');
            request = src;
            cache[src] = {
                $img: $img,
                isLoading: true
            }
            $frame.addClass('is-loading');
            $img.attr({
                'src': src,
                'alt': "headphones"
            });
            $img.on('load', function(){
                //on image load
                $(this).hide();
                $frame.removeClass("is-loading").append($img);
                cache[src].isLoading = false;
                if (request === src) {
                    crossfade($(this));
                }
            });
        }

        function crossfade($img){
            if ($current) {
                $current.stop().fadeOut('slow');
            }
            $img.css({
                marginLeft: -$img.width() / 2,
                marginTop: -$img.height() / 2,
            });
            $img.stop().fadeTo('slow', 1);
            $current = $img;
            //set the frame href to the thumbnail href
            $frame.attr("href", $img.attr("src"));
        }

        $thumbs.click(function(e){
            let $img;
            let src = $(this).attr("href"); //this way gets the relative path, which is what I need
            request = src;
            e.preventDefault();
            $thumbs.removeClass('active');
            $(this).addClass('active');
            if (cache.hasOwnProperty(src)) {
                //image is in the cache
                if (cache[src].isLoading === false) {
                    //not loading
                    crossfade(cache[src].$img);
                }
            }
            else{
                //otherwise it is not in cache
                $img = $('<img/>');
                cache[src] = {
                    $img: $img,
                    isLoading: true
                }
                $frame.addClass('is-loading');
                $img.attr({
                    'src': src,
                    'alt': this.title || ''
                });
                $img.on('load', function(){
                    //on image load
                    $(this).hide();
                    $frame.removeClass("is-loading").append($img);
                    cache[src].isLoading = false;
                    if (request === src) {
                        crossfade($(this));
                    }
                });
            }
        });

        return $(this);
    }
})(jQuery);