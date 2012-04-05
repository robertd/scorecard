(function() {

  (function($, window) {
    var Plugin, defaults, document, pluginName;
    pluginName = 'scorecard';
    document = window.document;
    defaults = {
      username: false,
      sections: ['completed', 'in-progress', 'badges'],
      newtab: false,
      loading: {
        message: 'Loading...',
        id: 'load-message'
      }
    };
    Plugin = (function() {

      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
      }

      Plugin.prototype.init = function() {
        var e, self, url;
        self = this;
        e = this.element;
        if (self.options.username != null) {
          url = "http://www.codeschool.com/users/" + self.options.username + ".json?callback=?";
          $(e).append($('<p/>', {
            id: self.options.loading.id
          }).text(self.options.loading.message));
          return $.getJSON(url, function(data) {
            var section, _i, _len, _ref, _results;
            $(e).find("#" + self.options.loading.id).remove();
            _ref = self.options.sections;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              section = _ref[_i];
              switch (section) {
                case 'completed':
                  _results.push($(e).append(self.renderSection(data.courses.completed, 'title', 'url', 'badge')));
                  break;
                case 'in-progress':
                  _results.push($(e).append(self.renderSection(data.courses.in_progress, 'title', 'url', 'badge')));
                  break;
                case 'badges':
                  _results.push($(e).append(self.renderSection(data.badges, 'name', 'course_url', 'badge')));
                  break;
                default:
                  _results.push(void 0);
              }
            }
            return _results;
          });
        } else {
          return $(e).append($('<p/>').text("Scorecard: Code school username is not configured."));
        }
      };

      Plugin.prototype.renderSection = function(data, title_key, url_key, image_key) {
        var item, li, list, _i, _len;
        list = $('<ul/>');
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          item = data[_i];
          li = $('<li/>').append($('<a/>', {
            href: item[url_key],
            title: item[title_key],
            target: this.options.newtab ? '_blank' : void 0
          }).append($('<img>', {
            src: item[image_key],
            alt: item[title_key]
          })));
          list.append(li);
        }
        return list;
      };

      return Plugin;

    })();
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
          return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    };
  })(jQuery, window);

}).call(this);
