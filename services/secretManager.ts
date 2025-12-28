import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { SecretConfig, SecretPayload, SecretMetadata } from '../types';

/**
 * Creates a new regional secret in Google Cloud Secret Manager
 * 
 * @param projectId - The Google Cloud project ID
 * @param locationId - The location/region for the secret (e.g., 'europe-west1')
 * @param secretId - The unique identifier for the secret
 * @returns Promise with the created secret metadata
 * 
 * @example
 * ```typescript
 * const metadata = await createRegionalSecret('my-project', 'europe-west1', 'api-key');
 * console.log(`Secret created: ${metadata.name}`);
 * ```
 */
export async function createRegionalSecret(
  projectId: string,
  locationId: string,
  secretId: string
): Promise<SecretMetadata> {
  try {
    // Configure regional endpoint
    const apiEndpoint = `secretmanager.${locationId}.rep.googleapis.com:443`;
    const client = new SecretManagerServiceClient({ apiEndpoint });

    const parent = `projects/${projectId}/locations/${locationId}`;

    // Create the secret
    const [secret] = await client.createSecret({
      parent,
      secretId,
      secret: {
        replication: {
          userManaged: {
            replicas: [
              {
                location: locationId,
              },
            ],
          },
        },
      },
    });

    return {
      name: secret.name || '',
      createTime: secret.createTime?.seconds?.toString(),
      labels: secret.labels || {},
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create regional secret: ${error.message}`);
    }
    throw new Error('Failed to create regional secret: Unknown error');
  }
}

/**
 * Adds a new version to an existing secret with the provided payload
 * 
 * @param projectId - The Google Cloud project ID
 * @param locationId - The location/region of the secret
 * @param secretId - The unique identifier for the secret
 * @param payload - The secret data to store
 * @returns Promise with the created version name
 * 
 * @example
 * ```typescript
 * await addSecretVersion('my-project', 'europe-west1', 'api-key', { data: 'my-secret-value' });
 * ```
 */
export async function addSecretVersion(
  projectId: string,
  locationId: string,
  secretId: string,
  payload: SecretPayload
): Promise<string> {
  try {
    const apiEndpoint = `secretmanager.${locationId}.rep.googleapis.com:443`;
    const client = new SecretManagerServiceClient({ apiEndpoint });

    const parent = `projects/${projectId}/locations/${locationId}/secrets/${secretId}`;

    // Add the secret version
    const [version] = await client.addSecretVersion({
      parent,
      payload: {
        data: Buffer.from(payload.data, 'utf8'),
      },
    });

    return version.name || '';
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to add secret version: ${error.message}`);
    }
    throw new Error('Failed to add secret version: Unknown error');
  }
}

/**
 * Accesses and retrieves a secret version's payload
 * 
 * @param projectId - The Google Cloud project ID
 * @param locationId - The location/region of the secret
 * @param secretId - The unique identifier for the secret
 * @param versionId - The version ID (defaults to 'latest')
 * @returns Promise with the decrypted secret payload
 * 
 * @example
 * ```typescript
 * const secret = await accessSecretVersion('my-project', 'europe-west1', 'api-key');
 * console.log(`Secret value: ${secret.data}`);
 * ```
 */
export async function accessSecretVersion(
  projectId: string,
  locationId: string,
  secretId: string,
  versionId: string = 'latest'
): Promise<SecretPayload> {
  try {
    const apiEndpoint = `secretmanager.${locationId}.rep.googleapis.com:443`;
    const client = new SecretManagerServiceClient({ apiEndpoint });

    const name = `projects/${projectId}/locations/${locationId}/secrets/${secretId}/versions/${versionId}`;

    // Access the secret version
    const [version] = await client.accessSecretVersion({ name });

    const payload = version.payload?.data?.toString('utf8') || '';

    return { data: payload };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('NOT_FOUND')) {
        throw new Error(`Secret not found: ${secretId}`);
      }
      if (error.message.includes('PERMISSION_DENIED')) {
        throw new Error(`Permission denied accessing secret: ${secretId}`);
      }
      throw new Error(`Failed to access secret version: ${error.message}`);
    }
    throw new Error('Failed to access secret version: Unknown error');
  }
}

/**
 * Updates a secret's metadata (labels, annotations)
 * 
 * @param projectId - The Google Cloud project ID
 * @param locationId - The location/region of the secret
 * @param secretId - The unique identifier for the secret
 * @param updateMask - Fields to update (e.g., 'labels')
 * @param secret - The updated secret object with new metadata
 * @returns Promise with the updated secret metadata
 * 
 * @example
 * ```typescript
 * await updateSecret('my-project', 'europe-west1', 'api-key', 'labels', {
 *   labels: { environment: 'production', team: 'platform' }
 * });
 * ```
 */
export async function updateSecret(
  projectId: string,
  locationId: string,
  secretId: string,
  updateMask: string,
  secret: { labels?: Record<string, string> }
): Promise<SecretMetadata> {
  try {
    const apiEndpoint = `secretmanager.${locationId}.rep.googleapis.com:443`;
    const client = new SecretManagerServiceClient({ apiEndpoint });

    const name = `projects/${projectId}/locations/${locationId}/secrets/${secretId}`;

    // Update the secret
    const [updatedSecret] = await client.updateSecret({
      secret: {
        name,
        labels: secret.labels,
      },
      updateMask: {
        paths: [updateMask],
      },
    });

    return {
      name: updatedSecret.name || '',
      createTime: updatedSecret.createTime?.seconds?.toString(),
      labels: updatedSecret.labels || {},
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update secret: ${error.message}`);
    }
    throw new Error('Failed to update secret: Unknown error');
  }
}

/**
 * Deletes a secret and all its versions
 * 
 * @param projectId - The Google Cloud project ID
 * @param locationId - The location/region of the secret
 * @param secretId - The unique identifier for the secret
 * @returns Promise that resolves when deletion is complete
 * 
 * @example
 * ```typescript
 * await deleteSecret('my-project', 'europe-west1', 'api-key');
 * console.log('Secret deleted successfully');
 * ```
 */
export async function deleteSecret(
  projectId: string,
  locationId: string,
  secretId: string
): Promise<void> {
  try {
    const apiEndpoint = `secretmanager.${locationId}.rep.googleapis.com:443`;
    const client = new SecretManagerServiceClient({ apiEndpoint });

    const name = `projects/${projectId}/locations/${locationId}/secrets/${secretId}`;

    // Delete the secret
    await client.deleteSecret({ name });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('NOT_FOUND')) {
        throw new Error(`Secret not found: ${secretId}`);
      }
      throw new Error(`Failed to delete secret: ${error.message}`);
    }
    throw new Error('Failed to delete secret: Unknown error');
  }
}

/**
 * Helper function to get a secret configuration from environment variables
 * 
 * @returns SecretConfig object with project ID, location, and secret ID
 * @throws Error if required environment variables are not set
 */
export function getSecretConfigFromEnv(): SecretConfig {
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
  const locationId = process.env.GOOGLE_CLOUD_LOCATION;

  if (!projectId || !locationId) {
    throw new Error(
      'Missing required environment variables: GOOGLE_CLOUD_PROJECT_ID and GOOGLE_CLOUD_LOCATION'
    );
  }

  return {
    projectId,
    locationId,
    secretId: '', // To be set by the caller
  };
}
