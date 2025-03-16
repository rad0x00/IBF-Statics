$(document).ready(function(){
  // FUNCTIONS
  caroufredsel_slider();
  $('a[data-rel^=lightcase]').lightcase();

  $(window).on("load", function(){
    caroufredsel_slider();
    $('.spinner-wrap').css({'opacity': '0'});
    setTimeout(function(){
      $('.spinner-wrap').hide();
    },500);
  });

  $(window).on("resize", function(){
    caroufredsel_slider();
  });

  function caroufredsel_slider() {
    $(".cs-slider .slides").each(function(){
      var $this    = $(this);
      var ctrlPrev = $(this).closest(".cs-slider").find(".prev");
      var ctrlNext = $(this).closest(".cs-slider").find(".next");

      $this.carouFredSel({
        auto: {
          play: $this.data("auto"),
          timeoutDuration: $this.data("duration"),
        },
        start: "random",
        width: $this.data("cs-width"),
        circular: $this.data("cs-circular"),
        infinite: $this.data("cs-infinite"),
        height: $this.data("cs-height"),
        responsive: $this.data("cs-responsive"),
        direction : $this.data("cs-direction"),
        prev    : ctrlPrev,
        next    : ctrlNext,
        pagination  : "."+$this.data("paginate"),
        scroll:{
          items: $this.data("item-scroll"),
          fx : $this.data("effects"),
        },
        items:{
          height: $this.data("item-height"),
          width: $this.data("item-width"),
          visible: {
              min: $this.data("min"),
              max: $this.data("max")
          },
        },
        swipe:true,
      });
      $this.touchwipe({
        wipeUp: function(e) {
          e.preventDefault();
        },
        wipeDown: function(e) {
          e.preventDefault();
        },
        wipeLeft: function(e) {
          $this.trigger("next", 1);
        },
        wipeRight: function(e) {
          $this.trigger("prev", 1);
        }
      });
    });
  }
});