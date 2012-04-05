#  Project: Scorecard
#  Description: Display your CodeSchool (http://www.codeschool.com/) courses and badges on your site!
#  Author: Ali B. (http://awhitebox.com)
#  License: MIT License (See LICENSE)
#  Thanks: Code School (http://www.codeschool.com)
#          jQuery boilerplate (https://github.com/zenorocha/jquery-boilerplate)
#          Proudify (https://github.com/icebreaker/proudify)

(($, window) ->
  pluginName = 'scorecard'
  document = window.document
  # Plugin defaults
  defaults =
    username: false,
    sections: ['completed', 'in-progress', 'badges']
    newtab: false
    loading:
      message: 'Loading...'
      id: 'load-message'

  class Plugin
    constructor: (@element, options) ->
      @options = $.extend {}, defaults, options
      @_defaults = defaults
      @_name = pluginName
      @init()

    init: ->
      self = @
      e = @.element
      if self.options.username?
        url = "http://www.codeschool.com/users/#{self.options.username}.json?callback=?"
        $(e).append($('<p/>', {id: self.options.loading.id}).text self.options.loading.message)
        $.getJSON url, (data) ->
          $(e).find("##{self.options.loading.id}").remove()
          for section in self.options.sections
            switch section
              when 'completed'
                $(e).append (self.renderSection data.courses.completed, 'title', 'url', 'badge')
              when 'in-progress'
                $(e).append (self.renderSection data.courses.in_progress, 'title', 'url', 'badge')
              when 'badges'
                $(e).append (self.renderSection data.badges, 'name', 'course_url', 'badge')
      else
        $(e).append($('<p/>').text "Scorecard: Code school username is not configured.")

    renderSection: (data, title_key, url_key, image_key) ->
      list = $('<ul/>')
      for item in data
        li = $('<li/>').append $('<a/>',
          href: item[url_key]
          title: item[title_key]
          target: '_blank' if @.options.newtab
        ).append $('<img>',
          src: item[image_key]
          alt: item[title_key]
        )
        list.append li
      list

  # A really lightweight plugin wrapper around the constructor,
  # preventing against multiple instantiations
  $.fn[pluginName] = (options) ->
    @each ->
      if !$.data(this, "plugin_#{pluginName}")
        $.data(@, "plugin_#{pluginName}", new Plugin(@, options))
)(jQuery, window)
