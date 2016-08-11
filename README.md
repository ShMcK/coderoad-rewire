# Rewire CodeRoad

Implementation for testing globals in the interactive coding tutorial framework [CodeRoad](https://coderoad.github.io).

- overrides `require` to all access to `__get__` local vars for testing
- allows testing on `import`'s by adding them as globals to the bottom of the file
