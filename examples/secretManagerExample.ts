/**
 * Example usage of Google Cloud Secret Manager operations
 * 
 * This file demonstrates how to:
 * - Create a regional secret
 * - Add a secret version with an API key
 * - Access/retrieve a secret
 * - Update secret metadata (labels)
 * - Delete a secret
 * 
 * Prerequisites:
 * 1. Set up Google Cloud authentication (GOOGLE_APPLICATION_CREDENTIALS)
 * 2. Enable Secret Manager API in your project
 * 3. Set environment variables: GOOGLE_CLOUD_PROJECT_ID, GOOGLE_CLOUD_LOCATION
 * 
 * Run this example:
 * ```bash
 * export GOOGLE_CLOUD_PROJECT_ID=your-project-id
 * export GOOGLE_CLOUD_LOCATION=europe-west1
 * export GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
 * npx ts-node examples/secretManagerExample.ts
 * ```
 */

import {
  createRegionalSecret,
  addSecretVersion,
  accessSecretVersion,
  updateSecret,
  deleteSecret,
  getSecretConfigFromEnv,
} from '../services/secretManager';

async function runExample() {
  try {
    // Get configuration from environment variables
    const config = getSecretConfigFromEnv();
    const { projectId, locationId } = config;
    const secretId = 'example-api-key';

    console.log('='.repeat(60));
    console.log('Google Cloud Secret Manager Example');
    console.log('='.repeat(60));
    console.log(`Project ID: ${projectId}`);
    console.log(`Location: ${locationId}`);
    console.log(`Secret ID: ${secretId}`);
    console.log('='.repeat(60));

    // Step 1: Create a regional secret
    console.log('\n1. Creating regional secret...');
    const secretMetadata = await createRegionalSecret(projectId, locationId, secretId);
    console.log(`✓ Secret created: ${secretMetadata.name}`);
    console.log(`  Create time: ${secretMetadata.createTime}`);

    // Step 2: Add a secret version with an API key
    console.log('\n2. Adding secret version with API key...');
    const apiKeyValue = 'example-api-key-DO-NOT-USE-IN-PRODUCTION-replace-with-real-key';
    const versionName = await addSecretVersion(projectId, locationId, secretId, {
      data: apiKeyValue,
    });
    console.log(`✓ Secret version added: ${versionName}`);

    // Step 3: Access the secret
    console.log('\n3. Accessing secret version...');
    const secretPayload = await accessSecretVersion(projectId, locationId, secretId);
    console.log(`✓ Secret retrieved successfully`);
    console.log(`  Secret value length: ${secretPayload.data.length} characters`);
    console.log(`  First 10 characters: ${secretPayload.data.substring(0, 10)}...`);

    // Step 4: Update secret metadata (add labels)
    console.log('\n4. Updating secret metadata...');
    const updatedMetadata = await updateSecret(
      projectId,
      locationId,
      secretId,
      'labels',
      {
        labels: {
          environment: 'development',
          application: 'social-service-map',
          managed_by: 'typescript-example',
        },
      }
    );
    console.log(`✓ Secret updated: ${updatedMetadata.name}`);
    console.log(`  Labels:`, updatedMetadata.labels);

    // Step 5: Access the secret again to verify it still works
    console.log('\n5. Verifying secret access after update...');
    const verifyPayload = await accessSecretVersion(projectId, locationId, secretId);
    console.log(`✓ Secret verified: ${verifyPayload.data === apiKeyValue ? 'Match!' : 'Mismatch!'}`);

    // Step 6: Clean up - Delete the secret
    console.log('\n6. Cleaning up - deleting secret...');
    await deleteSecret(projectId, locationId, secretId);
    console.log(`✓ Secret deleted successfully`);

    // Step 7: Verify deletion (this should fail)
    console.log('\n7. Verifying deletion...');
    try {
      await accessSecretVersion(projectId, locationId, secretId);
      console.log('✗ Unexpected: Secret still accessible after deletion');
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        console.log('✓ Confirmed: Secret no longer exists');
      } else {
        throw error;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('Example completed successfully!');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('\n❌ Error during example execution:');
    if (error instanceof Error) {
      console.error(`   ${error.message}`);
      
      // Provide helpful error messages
      if (error.message.includes('GOOGLE_CLOUD_PROJECT_ID')) {
        console.error('\n💡 Tip: Set the required environment variables:');
        console.error('   export GOOGLE_CLOUD_PROJECT_ID=your-project-id');
        console.error('   export GOOGLE_CLOUD_LOCATION=europe-west1');
        console.error('   export GOOGLE_APPLICATION_CREDENTIALS=path/to/key.json');
      } else if (error.message.includes('PERMISSION_DENIED')) {
        console.error('\n💡 Tip: Ensure your service account has the following roles:');
        console.error('   - Secret Manager Admin (for full CRUD operations)');
        console.error('   - Or specific roles: Secret Manager Secret Accessor, Creator, Deleter');
      } else if (error.message.includes('NOT_FOUND')) {
        console.error('\n💡 Tip: Verify that Secret Manager API is enabled:');
        console.error('   gcloud services enable secretmanager.googleapis.com');
      }
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

// Alternative example: Working with existing secrets
async function workWithExistingSecret() {
  console.log('\n\nExample: Working with existing secrets');
  console.log('='.repeat(60));

  try {
    const config = getSecretConfigFromEnv();
    const { projectId, locationId } = config;

    // Access an existing secret (e.g., the api-key used in production)
    const secretId = 'api-key';
    
    console.log(`Accessing existing secret: ${secretId}`);
    const payload = await accessSecretVersion(projectId, locationId, secretId);
    console.log(`✓ Secret retrieved successfully`);
    console.log(`  Length: ${payload.data.length} characters`);

    // You can also access specific versions
    console.log('\nAccessing specific version (version 1)...');
    const version1 = await accessSecretVersion(projectId, locationId, secretId, '1');
    console.log(`✓ Version 1 retrieved: ${version1.data.length} characters`);
  } catch (error) {
    console.error('Error accessing existing secret:');
    if (error instanceof Error) {
      console.error(`  ${error.message}`);
    }
  }
}

// Run the main example
runExample();

// Uncomment to run the alternative example:
// workWithExistingSecret();
