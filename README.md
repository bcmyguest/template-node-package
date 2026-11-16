# template-node-package

[![CI](https://github.com/bcmyguest/template-node-package/actions/workflows/ci.yml/badge.svg)](https://github.com/bcmyguest/template-node-package/actions/workflows/ci.yml)

__DESCRIPTION__

<!-- template:start -->
## Using this template

```bash
gh repo create my-pkg --template bcmyguest/template-node-package --private --clone
cd my-pkg
scripts/init.sh my-pkg "One-line description"
git commit -am "chore: init from template-node-package"
pre-commit install --install-hooks --hook-type pre-commit --hook-type commit-msg
```

`init.sh` renames `template-node-package` everywhere, fills the description,
sets the owner from the `origin` remote, refreshes `package-lock.json`, removes
this section and deletes itself. CI fails while any placeholder remains.

To publish to npm: publish the first version by hand (`npm publish`), add
`release.yml` as the package's trusted publisher on npmjs.com, then set the
repository variable `PUBLISH_NPM=true`.
<!-- template:end -->

## Install

```bash
npm install -g template-node-package
```

Each GitHub release also carries the npm tarball and its SHA-256:

```bash
gh release download --repo bcmyguest/template-node-package -p '*.tgz'
npm install -g ./template-node-package-*.tgz
```

## Usage

```bash
template-node-package Node
# Hello, Node!
```

```js
import { greet } from "template-node-package";
```

## License

Apache-2.0
