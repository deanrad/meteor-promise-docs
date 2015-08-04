{{#template name="motivation"}}
# Motivation
Two of Meteor's big advantages are *Reactivity* and *Fibers*, both of which
allow a developer to **not worry** about asynchronous values - most of the time.

However, much of JavaScript is about embracing data whether it's available now,
or some time in the future like the result of an AJAX or `Meteor.call`
method call. And the standards committee guiding JavaScript now says that the object called a
`Promise` is a core part of the language. Interoperating with many different libraries, and being able to count on Meteor's
Reactivity and Fibers while working with async, or `Promise` values is important to Meteor's future, as long as Meteor
is a JavaScript platform.

This site is intended to guide you through some advanced scenarios where sync and async code have to interoperate with Meteor's reactivity. Of course, all of this guide is subject to change as new options emerge, so follow [this repo](http://github.com/deanius/meteor-promise) to continue the discussion. Thanks for your interest!
{{/template}}
