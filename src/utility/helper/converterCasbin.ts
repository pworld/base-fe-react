import { StringAdapter } from 'casbin';

// format for convert ['resource.action', 'resource.action', ...] => ['dashboard.list', 'user.create', ...]
function convertPermissions(permissionArray: string[], roles: string) {
  const result: string[] = [];

  permissionArray.forEach(permission => {
    const [resource, action] = permission.split('.');

    result.push(`p, ${roles}, ${resource}, (${action})`);
  });
  return groupPermissions(result, roles || '');
}

function groupPermissions(permissionsArray: string[], roles: string) {
  const groupedPermissions: any = {};
  permissionsArray.forEach(permission => {
    const [p, role, resource, action] = permission.split(/,\s*|\s+/);
    const key = `${role},${resource}`;
    if (!groupedPermissions[key]) {
      groupedPermissions[key] = [];
    }
    groupedPermissions[key].push(action);
  });
  return concatenatePermissions(groupedPermissions, roles);
}

function concatenatePermissions(groupedPermissions: Record<any, any>[], roles: string) {
  const concatenatedPermissions = [];

  for (const key in groupedPermissions) {
    if (Object.prototype.hasOwnProperty.call(groupedPermissions, key)) {
      const resource = key.split(',')[1];
      const selectedActions = groupedPermissions[key];

      const actionObj = {
        actions: [],
        detailActions: []
      };

      actionObj.actions = selectedActions.filter((action: string) => !['(edit)', '(show)', '(delete)'].includes(action));
      actionObj.detailActions = selectedActions.filter((action: string) => ['(edit)', '(show)', '(delete)'].includes(action));


      const concatenatedActions = actionObj.actions.map((action: any) => `${action}`).join('|');
      const concatenatedDetailActions = actionObj.detailActions.map((action: any) => `${action}`).join('|');


      if (concatenatedDetailActions && concatenatedDetailActions.length > 0) {
        const concatenatedDetail = `p, ${roles}, ${resource}/*, ${concatenatedDetailActions}`;
        concatenatedPermissions.push(concatenatedDetail);
      }

      if (concatenatedActions && concatenatedActions.length > 0) {
        const concatenated = `p, ${roles}, ${resource}, ${concatenatedActions}`;
        concatenatedPermissions.push(concatenated);
      }
    }
  }
  return concatenatedPermissions;
}

// format for convert to casbin: ['p, roles, resource, (action)|(action)...'] => ['p, editor, dasboard, (list) | (show)']
// in every single index of array must be has format like above in different resources that used
function convertToCasbinStringAdapter(arrayCasbinFormat: string[]) {
  const joinedArrayToString = arrayCasbinFormat.join('\n');
  const rolesAdapter = new StringAdapter(joinedArrayToString);
  return rolesAdapter;
}

export { convertPermissions, convertToCasbinStringAdapter };