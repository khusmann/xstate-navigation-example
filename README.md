# Declarative Navigation in React with XState

Inspired by:

- https://itnext.io/better-navigation-with-state-machines-6c917866f351
- https://thewidlarzgroup.com/multistep-form-xstate-formik
- https://github.com/tpucci/react-nonav

This is a little attempt to get react navigation to play nice with xstate so that
navigation can be described declaratively. The goal would be to have the entire
app navigation tree specified in a top-level state machine, so that all routes
could be visualized in a state visualizer. Components then trigger nav events
through callback functions passed through props, making it especially clear how
component-level events map to messages passed to the top-level state machine.
I think this would also make the components easier to test, and clearer what
global context dependencies they have (because it all goes through props).

Although this little example "works", I doubt this is a good pattern for production
because of the challenges of keeping react-nav's state in sync with xstate. For
example, clicking the back button breaks everything in the present example. This is
fixable, but I imagine I'd keep finding little quirks to work around like this.
(Also everything rerenders on state changes which may or may not be fixable) It seems
that it'd be better to just make a new navigation library to do this sort of thing
(e.g. react-nonav).
