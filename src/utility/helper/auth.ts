import {
  accessControlProvider,
  defaultPermissions,
} from '@/providers/accessControlProvider';

// Define the method types explicitly to ensure type safety
type Method = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

// Extracted permission logic
export const getRequiredPermission = (
  url: string,
  method: Method,
  baseUrl: string
): string | undefined => {
  const actionMap: Record<Method, string> = {
    POST: 'create',
    GET: 'view',
    DELETE: 'delete',
    PUT: 'edit',
    PATCH: 'edit',
  };

  const resourceUrl = url.split(baseUrl);
  const splittedUrls = resourceUrl[resourceUrl.length >= 2 ? 1 : 0].split('/');
  const resource = splittedUrls[1];
  const selectedUrlMethod = splittedUrls[2];
  const action = selectedUrlMethod === 'list' || selectedUrlMethod === undefined ? 'view' : actionMap[method];

  return action ? `${resource}.${action}` : undefined;
};

export const getCanAccess = async (requiredPermission: string | undefined) => {
  const newRequiredPermission = requiredPermission?.split('.');
  if (newRequiredPermission && newRequiredPermission.length > 0) {
    const { can } = await accessControlProvider.can({
      action: newRequiredPermission[1],
      resource: newRequiredPermission[0],
    });
    return can;
  }

  return false;
};

// Extracted permission check logic
export const checkPermissions = async (config: any) => {
  try {
    // const permissions = await authProvider.getPermissions();
    const permissions = defaultPermissions;
    if (!Array.isArray(permissions)) {
      throw new Error('Permissions is not an array');
    }
    const requiredPermission = getRequiredPermission(
      config.url,
      config.method?.toUpperCase() as Method,
      config.baseURL
    );

    if (requiredPermission === 'refresh-token.view') return config;

    if (requiredPermission && !permissions.includes(requiredPermission)) {
      return Promise.reject(new Error('Insufficient permissions'));
    }

    return config;
  } catch (error) {
    return Promise.reject(error);
  }
};
