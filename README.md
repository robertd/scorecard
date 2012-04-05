#Scorecard

Scorecard is a jQuery plugin that lets you show off your [Code School](http://www.codeschool.com)'s completed and/or in-progress courses as well as earned badges.

#Demo!

A demo page is available [here](http://dmondark.github.com/scorecard/demo.html).

##Installation

1. Clone/Download `jquery-scorecard.min.js` somewhere in your project.
2. Include a recent version of jQuery and Scorecard in `<head>`:

```html
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="jquery-scorecard.min.js"></script>
```

##Usage

Scorecard will append an unordered list inside the specified element for each
of the three sections (completed courses, in-progress courses and badges). For
example:

```html
<div id="my-cs-badges">
  <h2>My Code School Bages</h2>
</div>
...
<script type="text/javascript">
  $('#my-cs-badges').scorecard({
    username: 'dmondark',
    sections: ['badges'],
    loading:
      message: 'Loading Code School bages...'
  });
</script>
```
##Configuration

A hash of options can be passed to scorecards as below:

* `username`: Your code school username (This is required)
* `sections`: An 1-3 elements array of the sections to be rendered possible
values are: 'completed', 'in-progress' and/or 'badges' (default: All)
* `newtab`: Whether clicking on a course/badge will open the link in a new tab
(default: false)
* `loading.message`: The text displayed while the badges are being loaded
(default "Loading...")
* `loading.id`: The ID assigned to the <p> element that wraps the loading message
(default "load-message")

##Styling

Scorecard tries to be non-intrusive and will not add any classes or ids to the
markup it is generating. Element hierarchy can instead be used to style any of
the child elements if needs be.
For the example above, to set an opacity of .5 to the badges on hover, a sample
css selector would look something like:

```css
#my-cs-badges > ul > li > a > img:hover{
  opacity: 0.5;
}
```

##Thanks
Many thanks to the good guys at Code School for the help with the API.

Also thanks to Mihail Szabolcs ([@theicebreaker](https://twitter.com/theicebreaker))
for writing [Proudify](https://github.com/icebreaker/proudify) which was the main
inspiration behind Scorecard.

This plugin was jump-started with Zeno Rocha's [jquery-boilerplate](https://github.com/zenorocha/jquery-boilerplate)

##Disclaimer
This is my very first CoffeeScript project as well as my first jQuery plugin,
therefore there bound to be things that I'm doing wrong and/or obviously missing.

If you have an idea about a feature or a better and more obvious way to do
something, please help by forking the repo, doing your magic and sending a pull
request (using a feature branch would be superb). Thanks!


##License
Copyright (c) 2012, Ali B. (http://awhitebox.com)

Scorecards is provided under the MIT license. For more information see LICENSE.
