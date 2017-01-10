# Wallpaper Engine plugin for Construct 2

- semistandard at possible places

## how to use

1. install
1. make project.json as defined in document (wallpaper engine)
1. make conditions whatever you want (returns string?)
1. if you call "GetInitialProperties" it will do that. Don't invoke this twitce or more.
1. ~~DO NOT OPTIMIZE/MINIMIZE ON EXPORT (not yet work)~~ done.

## features

- User-defined property
  - [x] Condition (trigger): On Property Change
  - [x] Action             : Get Initial Property (invoke after initialized)
  - [x] Expression         : `.Value`

## License

- WTFPL 2
- based on JavaScript SDK Template (CC0)