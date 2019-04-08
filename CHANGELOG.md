# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project mostly adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0-beta.1] - 2019-04-07

### Added
- Tailwind 1.0.0 compatibility

### Changed
- Moved the `triangles` config option to the `theme` object in your Tailwind config
- Flattened `defaultOptions` and split it into the `defaultSize` and `defaultColor` options
- Removed the default `direction`, it has to be set explicitly for each triangle now
- The default `height` cannot be customized anymore; a triangle’s height is now always half its `size` by default, or it can be customized per triangle
- Renamed the `prefix` option to `componentPrefix`

## [1.0.0] - 2019-02-17

Initial release

[Unreleased]: https://github.com/benface/tailwindcss-triangles/compare/v2.0.0-beta.1...HEAD
[2.0.0-beta.1]: https://github.com/benface/tailwindcss-triangles/compare/v1.0.0...v2.0.0-beta.1
[1.0.0]: https://github.com/benface/tailwindcss-triangles/releases/tag/v1.0.0
