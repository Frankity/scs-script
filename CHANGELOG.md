# Change Log

## [0.0.3] - 2025-05-01

### Added
- Added the ability to follow references associated with the following definitions:
  
  - `model`
  - `collision`
  - `ui_shadow`
  - `defaults[]`
  - `@include`

  just `Ctrl + click` over the underlined path in your mod, some strings are marked as followable, but they're not.

## [0.0.4] - 2025-05-01

### Added
- Updated Readme.

## [0.0.5] - 2025-05-03

### Added
- Reserved words.
- Documentation of some of them when hover it.
- Autocompletion.

### Removed
- Path HighHightligthing from non path strings

## [0.0.6] - 2025-05-07

### Added
- Added rich hover: shows icon previews and model paths if the referenced files exist.
- Advanced validation: checks for correct types (number, enum, string, tuple, tupleOrNumber) and allowed values for properties.
- Warns if referenced files in paths or @include directives do not exist in the workspace.
- Improved formatter: auto-indents blocks and @include directives.
- Added reserved word autocompletion.
- Separated validation rules and reserved words into independent files.
