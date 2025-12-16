Template repository for CRM packages. Necessary steps after using template:

1. Familiarize yourself with how to setup repositories at NAV https://github.com/navikt/offentlig
2. Check the `package.json` versions and update before running `npm install` and add `package-lock.json` to git.
3. Add secrets
   - Only Organization secrets are necessary. Contact a NAV Github admin to add the secrets (e.g. Christer Edvartsen). Use an existing crm repository as template to find the necassary Organization secrets.
5. Create an init release in GitHub (not pre-release)
    - Important! Release creation will fail if an init release has not been made!
6. Create file `.sfdx/sfdx-config.json` (to create package)
    - Add `{"defaultdevhubusername": "[your_devhub_user]","defaultusername": "" }` to it and change the DevHub username
7. Create a package in SFDX
    - `sfdx force:package:create -n YourPackageName -t Unlocked -r force-app`
    - If you receive an error, contact #crm-platform-team on Slack to create the package
8. Create an test metadata file in `force-app` folder to initiate init package creation (can be just a CustomLabel file)
9. Push changes made to `force-app` and `sfdx-project.json` (remember to fetch Package ID if #crm-platform-team creates the package)

# crm-hot-felles

[![Build](https://github.com/navikt/XXXXXXXXXXXXX/workflows/%5BPUSH%5D%20Create%20Package/badge.svg)](https://github.com/navikt/XXXXXXXXXXXXX/actions?query=workflow%3Acreate)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/navikt/XXXXXXXXXXXXX/blob/master/LICENSE)

Kort beskrivelse av hva prosjektet dreier seg om.
