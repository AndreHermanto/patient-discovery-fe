# Patient-Discovery-FE
The frontend of patient discovery

## Dev setup
### 1. Clone this repo
```
git clone https://github.com/gene-trustee/patient-discovery-fe.git && cd patient-discovery-frontend
```
### 2. Setup env vars
Follow `.env.example`
### 3. Start the dev server
```
npm ci && npm start
```

## Adding a cohort
### 1. Edit helpers.js
On line 252, add the KV pair to cohortDataset, where K is the cohort name in the Clinical DB and V is the Vectis name.
### 2. Edit CohortsTable.js
If you have a link to request permissions, you add it to line 202, where K is the cohort name in the clinical database and V is the link to request permissions.
### Further steps
Make sure you also change Clinical, Custodian, and Patient-Discovery-BE

## CI/CD
### Setup
Setup is done via Firebase. Install the Firebase CLI according to Google's documentation and run `firebase init hosting`

### Production
Triggered on push to master, this will deploy the site to `patient-discovery.web.app`.

### Staging
Triggered on a pull request, this will deploy the site to a staging URL. Make sure to add this staging URL to the Auth0 allowed sites in order to test functionality.
