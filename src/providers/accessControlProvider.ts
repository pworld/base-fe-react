import model from '@/config/accessControl/model';
import rolesAdapter from '@/config/accessControl/roleAdapter';
import {
  convertPermissions,
  convertToCasbinStringAdapter,
} from '@/utility/helper/converterCasbin';
import { BaseKey, IResourceItem, ITreeMenu } from '@refinedev/core';
import { newEnforcer } from 'casbin';
import { authProvider } from './authProvider';
import { IResource } from '@/model/apps/app';
import { resources } from '@/config/resources';

// Default Roles and permissions that not listed in BE
const role = 'general';
export const defaultPermissions = [
  'dashboard.view',
  'bank-accounts.view',
  'bank-accounts.create',
  'bank-accounts.edit',
  'bank-accounts.show',
  'bank-accounts.delete',
  'customer-categories.view',
  'customer-categories.create',
  'customer-categories.edit',
  'customer-categories.show',
  'customer-categories.delete',
  'customer-pricelists.view',
  'customer-pricelists.create',
  'customer-pricelists.edit',
  'customer-pricelists.show',
  'customer-pricelists.delete',
  'vendors.view',
  'vendors.create',
  'vendors.edit',
  'vendors.show',
  'vendors.delete',
  'dashboard.view',
  'trip-expense-items.view',
  'trip-expense-items.create',
  'trip-expense-items.edit',
  'trip-expense-items.show',
  'trip-expense-items.delete',
  'maintenance-service-item-categories.view',
  'maintenance-service-item-categories.create',
  'maintenance-service-item-categories.edit',
  'maintenance-service-item-categories.show',
  'maintenance-service-item-categories.delete',
  'maintenance-service-items.view',
  'maintenance-service-items.create',
  'maintenance-service-items.edit',
  'maintenance-service-items.show',
  'maintenance-service-items.delete',
  'job-orders.view',
  'job-orders.create',
  'job-orders.edit',
  'job-orders.show',
  'job-orders.delete',
  'route.view',
  'route.create',
  'route.edit',
  'route.show',
  'route.delete',
  "maintenances.view",
  "maintenances.create",
  "maintenances.edit",
  "maintenances.show",
  "maintenances.delete",
  "maintenance-orders-entry-finish.view",
  "maintenance-orders-entry-finish.create",
  "maintenance-orders-entry-finish.edit",
  "maintenance-orders-entry-finish.show",
  "maintenance-orders-entry-finish.delete",
  "job-order-trip-money-payment.view",
  "job-order-trip-money-payment.create",
  "job-order-trip-money-payment.edit",
  "job-order-trip-money-payment.show",
  "job-order-trip-expense-payment.view",
  "job-order-trip-expense-payment.create",
  "job-order-trip-expense-payment.edit",
  "job-order-trip-expense-payment.show",
  "job-order-trip-money-realization.view",
  "job-order-trip-money-realization.create",
  "job-order-trip-money-realization.edit",
  "job-order-trip-money-realization.show",
  "job-order-trip-money-realization.delete",
  "job-order-trip-expense-realization.view",
  "job-order-trip-expense-realization.create",
  "job-order-trip-expense-realization.edit",
  "job-order-trip-expense-realization.show",
  "job-order-trip-expense-realization.delete",
  "orders.view",
  "orders.create",
  "orders.edit",
  "orders.show",
  "orders.delete",
];

interface CanParams {
  action: string;
  resource?: string;
  params?: {
    resource?: IResourceItem & {
      children?: ITreeMenu[];
    };
    id?: BaseKey;
    [key: string]: any;
  };
}

// Casbin Method if using roles and policy
async function casbinAccess({
  action,
  resource,
  params = {},
}: CanParams): Promise<{ can: boolean }> {
  if (!resource) {
    console.error('Resource is undefined');
    return { can: false };
  }

  // Find the resource object with the name matching the given resourceName
  const resourceIsParentMenu: IResource | undefined = resources.find(
    (data) => data.name === resource
  );

  // Check if the found resource has a tag property equal to 'parent'
  if (resource && resourceIsParentMenu?.tag === 'parent') {
    return { can: true };
  }

  // Get and combine permission
  const rolePermissions = await authProvider.getPermissions();
  const permissions = [...rolePermissions, ...defaultPermissions];

  // if use permission from BE must have format like these
  const rolesAdaptersByString = convertPermissions(permissions, role);
  const adapters = convertToCasbinStringAdapter(rolesAdaptersByString);

  const enforcer = await newEnforcer(model, adapters);

  let target = resource;
  if (['delete', 'edit', 'view'].includes(action)) {
    target = `${resource}/${params.id}`;
  } else if (action === 'field') {
    target = `${resource}/${params.field}`;
  }

  const can = await enforcer.enforce(role, target, action);
  return { can };
}

// Refine Method
async function refineAccess({
  action,
  resource,
  params = {},
}: CanParams): Promise<{ can: boolean }> {
  if (!resource) {
    console.error('Resource is undefined');
    return { can: false };
  }

  // Find the resource object with the name matching the given resourceName
  const resourceIsParentMenu: IResource | undefined = resources.find(
    (data) => data.name === resource
  );

  // Check if the found resource has a tag property equal to 'parent'
  if (resource && resourceIsParentMenu?.tag === 'parent') {
    return { can: true };
  }

  // Get and combine permission
  const rolePermissions = await authProvider.getPermissions();
  const permissions = [...rolePermissions, ...defaultPermissions];

  const actions: Record<string, string> = {
    list: 'view',
    show: 'view',
  };
  let selectedPermissions = '';
  let selectedResource = '';

  if (resource.split('/').length > 1) {
    selectedResource = resource.split('/')[0];
    selectedPermissions = `${selectedResource}.${actions[action] ? actions[action] : action
      }`;
  } else {
    selectedPermissions = `${resource}.${actions[action] ? actions[action] : action
      }`;
  }

  if (
    permissions &&
    permissions.length > 0 &&
    permissions.includes(selectedPermissions)
  ) {
    return { can: true };
  } else {
    return { can: false };
  }
}

export const accessControlProvider = {
  can: refineAccess,
};
