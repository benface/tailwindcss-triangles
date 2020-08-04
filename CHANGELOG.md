# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project mostly adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.0] - 2020-08-04

### Changed
- Got rid of the internal hack we used in order to support variants, thanks to Tailwind’s `addComponents()` accepting a `variants` option since v1.5

## [3.0.0] - 2020-02-05

### Changed
- Changed to use Tailwind 1.2’s new plugin definition syntax

## [2.1.0] - 2019-07-08

### Added
- Added support for variants

## [2.0.0] - 2019-05-13

No change since 2.0.0-beta.1

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

[Unreleased]: https://github.com/benface/tailwindcss-triangles/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/benface/tailwindcss-triangles/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/benface/tailwindcss-triangles/compare/v2.1.0...v3.0.0
[2.1.0]: https://github.com/benface/tailwindcss-triangles/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/benface/tailwindcss-triangles/compare/v2.0.0-beta.1...v2.0.0
[2.0.0-beta.1]: https://github.com/benface/tailwindcss-triangles/compare/v1.0.0...v2.0.0-beta.1
[1.0.0]: https://github.com/benface/tailwindcss-triangles/releases/tag/v1.0.0
