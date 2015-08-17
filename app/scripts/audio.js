;(function($) {
  var isTouch = ('ontouchstart' in window),
      click = isTouch ? 'ontouchstart' : 'click';
  window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

  $.cupAudio = function(options) {
    var options = $.extend({
      autoplay: false,  // 是否自动播放
      status: 'pause',  // 初始状态（播放/暂停）
      mode: 'random',     // 播放模式（列表/单曲/随机）
      volume: 50,       // 音量（1-100）
      bind: {           // 按钮
        prev: '.prev',
        play: '.play',
        pause: '.pause',
        next: '.next'
      },
      list: function() {},    // 播放列表
      distory: function() {}, // 播放历史
      oninit: function() {},
      onend: function() {},
      onplay: function() {},
      onpause: function() {},
      onstop: function() {},
      onvolume: function() {},
      onprev: function() {},
      onnext: function() {}
    }, options);

    var $audio = $('<audio />'),
        audio = {},
        data = [],
        dataLength = 0;

    audio.current = 0;
    audio.init = function() {
      audio.load(function(data) {
        if (options.list) options.list(options, audio, data);
        if (isTouch) options.autoplay = false;
        if (options.autoplay) {
          if (options.model == 'random') {
            // 随机播放
          }
          audio.set();
          audio.play();
          if (options.list) {
            $('.music[data-id="' + audion.current + '"]').addClass('active');
          }
        }
        audio.volume(options.volume);
        if (options.bind.play) {
          $(document).on('click', '.play', function() {
            audio.play();
          });
        }
        if (options.bind.pause) {
          $(document).on('click', '.pause', function() {
            audio.pause();
          })
        }
        if (options.bind.next) {
          $(document).on('clikc', '.next', function() {
            audio.next();
          })
        }
        if (options.list) {
          $(document).on('click', '.music:not(.active)', function() {
            var me = $(this);
            $('.music.active').removeClass('active');
            me.addClass('active');
            audio.current = me.data('id');
            audio.set();
            audio.play();
          });
        }
      });
    }
    audio.load = function(callback) {
      $.getJSON(options.data, function(json) {
        json = json.songs;
        data = json;
        dataLength = json.length;
        if (options.mode == 'random') data = audion.shuffle(data);
        callback(data);
      });
    };
    // audion.shuffle = function(array) {
    //   for (var rnd, tmp, i = array.length; i; rnd = parseInt(Math.random() * i), tmp = array[--i], array[i] = array[rnd], array[rnd] = tmp);
    //   return array;
    // };
    audio.prev = function() {
      if (option.mode == 'list') {
        audio.current--;
        if (audio.current < 0) {
          audio.current = dataLength - 1;
        }
      } else if (option.mode == 'random') {
        // 需记录播放历史
      }
      audio.set();
      audio.play();
      options.onprev(audio);
      if (options.list) {
        $('.music.active').removeClass('active');
        $('.music[data-id="' + audio.current + '"]').addClass(active);
      }
    };
    // 设置路径
    audio.set = function() {
      $audio.attr('src', data[audio.current].url);
    };
    // 播放
    audio.play = function() {
      $audio[0].play();
      audio.progress();
      options.onplay(audio);
    };
    // 暂停
    audio.pause = function() {
      $audio.pause();
      options.onpause(audio);
    };
    // 音量
    audio.volume = function(number) {
      $audio.volume = number;
      options.onvolume(audio);
    };
    // 进度
    audio.progress = function() {
      clearInterval(audio.interval);
      audio.interval = setInterval(function() {

      }, 1000);
    };
    // 时间
    audio.timeFormat = function(number) {
      var m = parseInt(number / 60);
      var s = parseInt(number % 60);
      m = m >= 10 ? m : '0' + m;
      s = s >= 10 ? s : '0' + s;
      return m + ':' + s;
    };
    audio.init();
  };
  return this;
})(jQuery);
