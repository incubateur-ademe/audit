This a project aiming to build survey forms from a set of questions stored on a Grist document, so that users may answer those questions and the responses could also be stored on a Grist document.

## Local installation

```
cp .env.template .env.local # Configure here your Grist server URL & API Key
yarn
yarn build
yarn dev
```

## Release process

### Contribute

Clone project locally, create a feature branch, code, test and push your branch
Create a merge request

### Deploying to staging

When a merge request is merged, deploy to staging is automatic with the gitlab-ci pipeline

### Deploying to production

When happy with testing in staging, [go to the pipelines](https://gitlab.com/incubateur-territoires/incubateur/survey-builder/-/pipelines) and click the play button to create a release, a tag and trigger the production deployment

## Tools

### Syncing collaborateurs & startups from beta.gouv.fr

This script is pulling data from beta.gouv.fr API and pushing it to the configured grist document, [tuto video](https://www.loom.com/share/cc349d78023547d1b3ea4173472e0325)

```
yarn sync-collaborateurs-startups
```

## License

See [license file](License.md)