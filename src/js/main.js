$(document).ready(function () {
    var $menu = $( "#mm-menu" );
    $menu.mmenu({
        extensions: [ "theme-dark", "border-full", "fx-menu-fade", "pagedim-black" ],
        offCanvas: {
               pageSelector: ".wrapper",
               position  : "right"
            },
        navbar: {
          title: 'UNICORN'
        }
    });
    var $icon = $( ".hamburger" );
    var API = $menu.data( "mmenu" );

    $icon.click(function() {
        API.open();
    });

    $icon.click(function() {
         API.close();
      });

    API.bind( "open:finish", function () {
        setTimeout(function () {
            $icon.addClass( "is-active" );
        }, 100);
    });

    API.bind( "close:finish", function () {
        setTimeout(function () {
            $icon.removeClass( "is-active" );
        }, 100);
    });
});
