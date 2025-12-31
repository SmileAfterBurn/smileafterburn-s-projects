# Google Cloud Secret Manager Setup Guide

This guide provides comprehensive instructions for setting up and using Google Cloud Secret Manager in the Social Service Map Ukraine project.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Authentication Setup](#authentication-setup)
3. [Enabling Secret Manager API](#enabling-secret-manager-api)
4. [Creating Secrets via CLI](#creating-secrets-via-cli)
5. [TypeScript API Usage](#typescript-api-usage)
6. [Cloud Build Integration](#cloud-build-integration)
7. [Security Best Practices](#security-best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- **Google Cloud Project**: An active GCP project with billing enabled
- **Node.js**: Version 20 or later (required by the project)
- **gcloud CLI**: Installed and configured ([Installation Guide](https://cloud.google.com/sdk/docs/install))
- **Permissions**: Your user or service account needs the following IAM roles:
  - `Secret Manager Admin` (for full CRUD operations)
  - Or specific roles:
    - `Secret Manager Secret Accessor` (to read secrets)
    - `Secret Manager Secret Version Adder` (to create secret versions)
    - `Secret Manager Secret Creator` (to create secrets)
    - `Secret Manager Secret Deleter` (to delete secrets)

## Authentication Setup

### Option 1: Service Account (Recommended for Production)

1. **Create a Service Account**:
   ```bash
   gcloud iam service-accounts create secret-manager-sa \
     --display-name="Secret Manager Service Account" \
     --project=YOUR_PROJECT_ID
   ```

2. **Grant Required Permissions**:
   ```bash
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:secret-manager-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/secretmanager.admin"
   ```

3. **Create and Download Key**:
   ```bash
   gcloud iam service-accounts keys create ~/secret-manager-key.json \
     --iam-account=secret-manager-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com
   ```

4. **Set Environment Variable**:
   ```bash
   export GOOGLE_APPLICATION_CREDENTIALS=~/secret-manager-key.json
   ```

### Option 2: User Account (For Local Development)

1. **Authenticate with your user account**:
   ```bash
   gcloud auth application-default login
   ```

2. **Set your default project**:
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

## Enabling Secret Manager API

Enable the Secret Manager API in your project:

```bash
gcloud services enable secretmanager.googleapis.com --project=YOUR_PROJECT_ID
```

Verify it's enabled:
```bash
gcloud services list --enabled --filter="NAME:secretmanager" --project=YOUR_PROJECT_ID
```

## Creating Secrets via CLI

### Create a Regional Secret

Regional secrets provide better performance and data residency control:

```bash
# Create secret from a string
gcloud secrets create api-key \
  --location=europe-west1 \
  --replication-policy=user-managed \
  --data-file=- <<< "your-actual-api-key-value"

# Or create secret from a file
echo "your-actual-api-key-value" > /tmp/secret.txt
gcloud secrets create api-key \
  --location=europe-west1 \
  --replication-policy=user-managed \
  --data-file=/tmp/secret.txt
rm /tmp/secret.txt  # Clean up
```

### Add a New Version to Existing Secret

```bash
gcloud secrets versions add api-key \
  --location=europe-west1 \
  --data-file=- <<< "updated-api-key-value"
```

### List All Secrets

```bash
gcloud secrets list --location=europe-west1
```

### Access a Secret Value

```bash
# Get latest version
gcloud secrets versions access latest \
  --secret=api-key \
  --location=europe-west1

# Get specific version
gcloud secrets versions access 1 \
  --secret=api-key \
  --location=europe-west1
```

### Update Secret Labels

```bash
gcloud secrets update api-key \
  --location=europe-west1 \
  --update-labels=environment=production,app=social-map
```

### Delete a Secret

```bash
gcloud secrets delete api-key \
  --location=europe-west1
```

## TypeScript API Usage

### Setup Environment Variables

Create a `.env` file in your project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_LOCATION=europe-west1
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
```

### Basic CRUD Operations

#### 1. Create a Regional Secret

```typescript
import { createRegionalSecret } from './services/secretManager';

const metadata = await createRegionalSecret(
  'my-project-id',
  'europe-west1',
  'my-secret'
);
console.log(`Created: ${metadata.name}`);
```

#### 2. Add Secret Version (Store the actual secret value)

```typescript
import { addSecretVersion } from './services/secretManager';

await addSecretVersion(
  'my-project-id',
  'europe-west1',
  'my-secret',
  { data: 'my-secret-value' }
);
```

#### 3. Access Secret

```typescript
import { accessSecretVersion } from './services/secretManager';

// Get latest version
const payload = await accessSecretVersion(
  'my-project-id',
  'europe-west1',
  'my-secret'
);
console.log(`Secret: ${payload.data}`);

// Get specific version
const version1 = await accessSecretVersion(
  'my-project-id',
  'europe-west1',
  'my-secret',
  '1'
);
```

#### 4. Update Secret Metadata

```typescript
import { updateSecret } from './services/secretManager';

await updateSecret(
  'my-project-id',
  'europe-west1',
  'my-secret',
  'labels',
  {
    labels: {
      environment: 'production',
      team: 'platform'
    }
  }
);
```

#### 5. Delete Secret

```typescript
import { deleteSecret } from './services/secretManager';

await deleteSecret('my-project-id', 'europe-west1', 'my-secret');
```

### Using the Helper Function

```typescript
import { getSecretConfigFromEnv, accessSecretVersion } from './services/secretManager';

// Automatically reads from environment variables
const config = getSecretConfigFromEnv();

const payload = await accessSecretVersion(
  config.projectId,
  config.locationId,
  'api-key'
);
```

### Error Handling

All functions throw typed errors. Handle them appropriately:

```typescript
try {
  const payload = await accessSecretVersion(
    projectId,
    locationId,
    'non-existent-secret'
  );
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('not found')) {
      console.error('Secret does not exist');
    } else if (error.message.includes('Permission denied')) {
      console.error('Insufficient permissions');
    } else {
      console.error(`Error: ${error.message}`);
    }
  }
}
```

## Cloud Build Integration

The project's `cloudbuild.yaml` has been updated to use Secret Manager instead of placeholder values.

### How It Works

1. **Secret Retrieval**: During build, Cloud Build retrieves secrets using `gcloud secrets versions access`
2. **Environment Injection**: The secret is injected as an environment variable
3. **Build Execution**: The build process (npm run build) uses the secret

### Updated cloudbuild.yaml

```yaml
steps:
  - name: 'node:20'
    entrypoint: 'npm'
    args: ['install']

  - name: 'gcr.io/cloud-builders/gcloud'
    entrypoint: 'bash'
    args:
      - '-c'
      - |
        export API_KEY=$(gcloud secrets versions access latest --secret="api-key" --location="${_LOCATION}")
        npm run build
    env:
      - 'NODE_VERSION=20'

substitutions:
  _LOCATION: 'europe-west1'
  _ARTIFACT_BUCKET: 'your-gcs-bucket-name'
```

### Grant Cloud Build Access to Secrets

Cloud Build needs permission to access secrets:

```bash
# Get your project number
PROJECT_NUMBER=$(gcloud projects describe YOUR_PROJECT_ID --format="value(projectNumber)")

# Grant Secret Manager Secret Accessor role to Cloud Build service account
gcloud secrets add-iam-policy-binding api-key \
  --location=europe-west1 \
  --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### Testing Cloud Build Locally

You can test the build configuration locally:

```bash
# Install cloud-build-local
gcloud components install cloud-build-local

# Run build locally (requires Docker)
cloud-build-local --config=cloudbuild.yaml --dryrun=false .
```

## Security Best Practices

### 1. Principle of Least Privilege

- Grant only the minimum required permissions
- Use separate service accounts for different environments
- Regularly audit IAM permissions

### 2. Secret Rotation

Implement regular secret rotation:

```bash
# Add a new version (rotates the secret)
gcloud secrets versions add api-key \
  --location=europe-west1 \
  --data-file=- <<< "new-rotated-key"

# Disable old versions
gcloud secrets versions disable 1 \
  --secret=api-key \
  --location=europe-west1
```

### 3. Regional Secrets

- Use regional secrets for better performance and compliance
- Choose a region close to your Cloud Build and application deployment
- Recommended for EU: `europe-west1` or `europe-west3`

### 4. Audit Logging

Enable and monitor Cloud Audit Logs:

```bash
gcloud logging read "resource.type=secretmanager.googleapis.com/Secret" \
  --limit=50 \
  --project=YOUR_PROJECT_ID
```

### 5. Never Log Secrets

Ensure secrets are never logged:

```typescript
// ❌ Bad
console.log(`API Key: ${apiKey}`);

// ✅ Good
console.log(`API Key retrieved successfully (length: ${apiKey.length})`);
```

### 6. Use Secret Versions

- Always create new versions instead of updating existing ones
- Keep at least 2-3 versions for rollback capability
- Disable old versions instead of deleting them immediately

### 7. Environment Separation

Use different secrets for different environments:

```bash
gcloud secrets create api-key-dev --location=europe-west1 ...
gcloud secrets create api-key-staging --location=europe-west1 ...
gcloud secrets create api-key-prod --location=europe-west1 ...
```

## Troubleshooting

### Issue: "Permission Denied" Error

**Symptom**: Error message contains "PERMISSION_DENIED"

**Solution**:
1. Verify IAM roles:
   ```bash
   gcloud projects get-iam-policy YOUR_PROJECT_ID \
     --flatten="bindings[].members" \
     --filter="bindings.members:YOUR_SERVICE_ACCOUNT"
   ```

2. Grant required role:
   ```bash
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:YOUR_SA@PROJECT.iam.gserviceaccount.com" \
     --role="roles/secretmanager.secretAccessor"
   ```

### Issue: "Secret Not Found"

**Symptom**: Error message contains "NOT_FOUND"

**Solution**:
1. List all secrets to verify name:
   ```bash
   gcloud secrets list --location=europe-west1
   ```

2. Check if you're using the correct region:
   ```bash
   gcloud secrets describe SECRET_NAME --location=europe-west1
   ```

### Issue: "API Not Enabled"

**Symptom**: Error about Secret Manager API not being enabled

**Solution**:
```bash
gcloud services enable secretmanager.googleapis.com --project=YOUR_PROJECT_ID
```

### Issue: Authentication Errors

**Symptom**: "Could not load the default credentials"

**Solution**:
1. Check if `GOOGLE_APPLICATION_CREDENTIALS` is set:
   ```bash
   echo $GOOGLE_APPLICATION_CREDENTIALS
   ```

2. Verify the file exists and is readable:
   ```bash
   cat $GOOGLE_APPLICATION_CREDENTIALS
   ```

3. Re-authenticate:
   ```bash
   gcloud auth application-default login
   ```

### Issue: Wrong Region

**Symptom**: Secret works in CLI but not in TypeScript

**Solution**: Ensure both CLI and TypeScript use the same region:
- CLI: `--location=europe-west1`
- TypeScript: `locationId: 'europe-west1'`

### Issue: Cloud Build Can't Access Secrets

**Symptom**: Build fails with permission error during secret access

**Solution**:
1. Verify Cloud Build service account has access:
   ```bash
   gcloud secrets get-iam-policy api-key --location=europe-west1
   ```

2. Grant access:
   ```bash
   PROJECT_NUMBER=$(gcloud projects describe YOUR_PROJECT_ID --format="value(projectNumber)")
   gcloud secrets add-iam-policy-binding api-key \
     --location=europe-west1 \
     --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
     --role="roles/secretmanager.secretAccessor"
   ```

### Issue: TypeScript Import Errors

**Symptom**: Cannot find module '@google-cloud/secret-manager'

**Solution**:
```bash
npm install @google-cloud/secret-manager
```

### Debug Mode

Enable debug logging for more information:

```bash
export GOOGLE_CLOUD_DEBUG=true
export GOOGLE_APPLICATION_CREDENTIALS_JSON=$(cat your-key.json)
```

## Additional Resources

- [Secret Manager Documentation](https://cloud.google.com/secret-manager/docs)
- [Secret Manager Node.js Client](https://cloud.google.com/nodejs/docs/reference/secret-manager/latest)
- [IAM Permissions Reference](https://cloud.google.com/secret-manager/docs/access-control)
- [Best Practices](https://cloud.google.com/secret-manager/docs/best-practices)
- [Pricing](https://cloud.google.com/secret-manager/pricing)

## Support

For issues specific to this project, please open an issue in the GitHub repository. For Google Cloud support, visit the [Google Cloud Console](https://console.cloud.google.com/).
