import "server-only";

/**
 * Storage abstraction for private assets (recordings, message attachments).
 * Never returns a permanently-public URL — callers get a short-lived signed
 * URL, and access must always go through a permission check first
 * (see src/lib/permissions.ts) before a signed URL is ever issued.
 */
export interface StorageService {
  readonly name: string;
  getSignedUploadUrl(key: string, contentType: string): Promise<{ uploadUrl: string; key: string }>;
  getSignedDownloadUrl(key: string, expiresInSeconds?: number): Promise<string>;
  delete(key: string): Promise<void>;
}

class LocalDevStorageService implements StorageService {
  readonly name = "local";

  async getSignedUploadUrl(key: string) {
    // Dev-only stand-in. Real deployments should not use this.
    return { uploadUrl: `/api/dev-storage/upload?key=${encodeURIComponent(key)}`, key };
  }

  async getSignedDownloadUrl(key: string) {
    return `/api/dev-storage/download?key=${encodeURIComponent(key)}`;
  }

  async delete(_key: string) {
    // no-op stub
  }
}

class S3StorageService implements StorageService {
  readonly name = "s3";

  async getSignedUploadUrl(_key: string, _contentType: string): Promise<{ uploadUrl: string; key: string }> {
    throw new Error(
      "S3StorageService is not configured. Set STORAGE_BUCKET / STORAGE_ACCESS_KEY / STORAGE_SECRET_KEY and implement using an S3-compatible SDK (e.g. @aws-sdk/client-s3 + s3-request-presigner)."
    );
  }

  async getSignedDownloadUrl(_key: string): Promise<string> {
    throw new Error("S3StorageService is not configured.");
  }

  async delete(_key: string): Promise<void> {
    throw new Error("S3StorageService is not configured.");
  }
}

function resolveStorage(): StorageService {
  switch (process.env.STORAGE_PROVIDER) {
    case "s3":
      return new S3StorageService();
    case "local":
    default:
      return new LocalDevStorageService();
  }
}

export const storageService = resolveStorage();
