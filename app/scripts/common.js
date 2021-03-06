$(document).ready(function() {
    $('#header').
      load('../views/tpls/header.html', function(data) {
        $('#sideBar').sidebar();
        $('#controlBar').menubar();
      });
    $('#footer').load('../views/tpls/footer.html');

    // 时间轴
    var timeline = $('#timeline');
    // 轮播图片插件
    var owl = $('#owl');
    owl.owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [989, 2],
        itemsMobile: [499, 1],
        autoPlay: true,
        navigation: true,
        navigationText: [
            '<a class="prev"><i class="fa fa-chevron-left"></i></a>',
            '<a class="next"><i class="fa fa-chevron-right"></i></a>'
        ],
        pagination: false,
        theme: ""
    });

    $(window).scroll(function() {
        // 导航悬挂窗口
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 250) {
            $('#nav').addClass('fixed');
        } else {
            $('#nav').removeClass('fixed');
        }

        timeliner();
    });

    // 博客分享按钮
    $('a.share-toggle').each(function(i) {
        $(this).on('click', function() {
            var next = $(this).next();
            if (next.hasClass('active')) {
                next.removeClass('active');
            } else {
                next.addClass('active');
            }
        });
    });

    timeliner();
});

function timeliner() {
    var timeline = $('#timeline');
    if (timeline.length == 0 ) return;

    var timelineTop = timeline.offset().top,
        timelineHeight = timeline.height(),
        timelineMaxHeight = $('.blog-timeline .content .wrap').first().outerHeight(),
        scrollTop = $(window).scrollTop();

    var nowHeight = scrollTop <= 341 ? 0 : scrollTop - 341;

    if (nowHeight <= timelineMaxHeight) {
        timeline.css('height', nowHeight + 'px');
    } else {
        if (scrollTop >= timelineMaxHeight) {
            timeline.css('height', timelineMaxHeight + 'px');
        } else {
            timeline.css('height', '0px');
        }
    }

    var dateBox = $('.item-wrap .item-date');
    dateBox.each(function (i) {
        var top = $(this).offset().top,
            height = $(this).height(),
            thisY = top + height / 2,
            maxY = timelineHeight + timelineTop;

        if (thisY <= maxY) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
};

;(function($, window) {
  var Sidebar = {
    init: function(options) {
      var me = this;
      this.status = 'closed';
      this.el = document.getElementById($.fn.sidebar.options.sidebar);
      this.controlBarEl = document.getElementById($.fn.sidebar.options.ctrlbar);
      this.controlBarEl.addEventListener('click', function(event) {
          me.triggerSwitch();
      });
    },
    open: function() {
        this.status = 'opened';
        this.el.className += ' nav-menu-active';
        this.controlBarEl.className += ' open-menu-active';
    },
    close: function() {
        this.status = 'closed';
        this.el.className = 'nav-menu';
        this.controlBarEl.className = 'open-menu';
        var menubar = Object.create(Menubar);
        menubar.init();
    },
    triggerSwitch: function() {
        if (this.status == 'opened') {
            this.close();
        } else {
            this.open();
        }
    }
  }

  $.fn.sidebar = function(options) {
    var sidebar = Object.create(Sidebar);
    sidebar.init(options);
  }

  $.fn.sidebar.options = {
    sidebar: 'sideBar',
    ctrlbar: 'controlBar'
  }

  var Menubar = {
    init: function() {
      var me = this;
      this.status = 'closed';
      this.submenuList = document.querySelectorAll('#sideBar .item-toggle');
      this.backItemList = document.querySelectorAll('#sideBar .back-item');
      for (var i = 0; i < this.submenuList.length; i++) {
          var $subMenu = this.submenuList[i];
          $subMenu.addEventListener('click', function() {
              if (me.status == 'closed') {
                  this.nextElementSibling.className += ' sub-menu-active';
              } else {
                  this.nextElementSibling.className = 'sub-menu';
              }
          });
      }
      for (var i = 0; i < this.backItemList.length; i++) {
          var $backItem = this.backItemList[i];
          $backItem.addEventListener('click', function() {
              this.parentNode.className = 'sub-menu';
          });
      }
    }
  }

  $.fn.menubar = function() {
    var menubar = Object.create(Menubar);
    menubar.init();
  }
})($, window);
