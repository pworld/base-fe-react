import {
  ApartmentIcon,
  CarIcon,
  CustomerIcon,
  DashboardIcon,
  DollarIcon,
  DropboxIcon,
  FileDoneIcon,
  HomeIcon,
  SettingIcon,
  ShopIcon,
  ShoppingIcon,
  TeamIcon,
  UserIcon,
  ReconciliationIcon,
  CreditCardIcon,
  SnippetsIcon
} from '@/components/ant-icons';
import { IResource } from '@/model/apps/app';

export const resources: IResource[] = [
  {
    name: 'dashboard',
    list: '/',
    meta: {
      label: 'Dashboard',
      icon: HomeIcon,
    },
  },
  // General Menu
  {
    name: 'customers',
    list: '/customers',
    create: '/customers/create',
    show: '/customers/show/:id',
    edit: '/customers/edit/:id',
    meta: {
      label: 'Customers',
      icon: CustomerIcon,
    },
  },
  {
    name: 'vendors',
    list: '/vendors/list',
    create: '/vendors/create',
    show: '/vendors/show/:id',
    edit: '/vendors/edit/:id',
    meta: {
      label: 'Vendors',
      icon: DollarIcon,
    },
  },
  {
    name: 'drivers',
    list: '/drivers',
    create: '/drivers/create',
    show: '/drivers/show/:id',
    edit: '/drivers/edit/:id',
  },
  {
    name: 'vehicles',
    list: '/vehicles/list',
    create: '/vehicles/create',
    show: '/vehicles/show/:id',
    edit: '/vehicles/edit/:id',
    meta: {
      label: 'Vehicle',
      icon: CarIcon,
    },
  },
  {
    name: 'orders',
    list: '/order/list',
    create: '/order/create',
    show: '/order/show/:id',
    edit: '/order/edit/:id',
    meta: {
      label: 'Order',
      icon: SnippetsIcon
    }
  },
  // Job Orders
  {
    name: 'parent-job-orders',
    tag: 'parent',
    meta: {
      label: 'Job Order',
      icon: ShopIcon,
    },
  },
  {
    name: 'job-orders',
    list: '/job-orders',
    create: '/job-orders/create',
    show: '/job-orders/show/:id',
    edit: '/job-orders/edit/:id',
    meta: {
      label: 'Job Order',
      icon: FileDoneIcon,
      parent: 'parent-job-orders'
    },
  },
  {
    name: 'job-order-trip-money-payment',
    list: '/job-order/trip-money-payment/list',
    create: '/job-order/trip-money-payment/create/:id',
    show: '/job-order/trip-money-payment/show/:id',
    meta: {
      label: 'Trip Money Job Order',
      parent: 'parent-job-orders',
      icon: CreditCardIcon
    }
  },
  {
    name: 'job-order-trip-expense-payment',
    list: '/job-order/trip-expense-payment/list',
    show: '/job-order/trip-expense-payment/show/:id',
    edit: '/job-order/trip-expense-payment/edit/:id',
    meta: {
      label: 'Payment',
      parent: 'parent-job-orders',
      icon: CreditCardIcon
    }
  },
  {
    name: 'job-order-trip-money-realization',
    list: '/job-order/trip-money-realization/list',
    create: '/job-order/trip-money-realization/create/:id',
    show: '/job-order/trip-money-realization/show/:id',
    edit: '/job-order/trip-money-realization/edit/:id',
    meta: {
      label: 'Trip Money Job Order',
      parent: 'parent-job-orders',
      icon: SnippetsIcon
    }
  },
  {
    name: 'job-order-trip-expense-realization',
    list: '/job-order/trip-expense-realization/list',
    create: '/job-order/trip-expense-realization/create/:id',
    show: '/job-order/trip-expense-realization/show/:id',
    edit: '/job-order/trip-expense-realization/edit/:id',
    meta: {
      label: 'Realization',
      parent: 'parent-job-orders',
      icon: SnippetsIcon
    }
  },
  // Maintenances
  {
    name: 'maintenance',
    tag: 'parent',
    meta: {
      label: 'Maintenance',
      icon: SettingIcon,
    },
  },
  {
    name: 'maintenance-service-items',
    list: '/maintenance-service-items',
    create: '/maintenance-service-items/create',
    show: '/maintenance-service-items/show/:id',
    edit: '/maintenance-service-items/edit/:id',
    meta: {
      parent: 'maintenance',
      label: 'Maintenance Service Item',
      icon: DropboxIcon,
    },
  },
  {
    name: 'maintenance-service-item-categories',
    list: '/maintenance-service-item-categories',
    create: '/maintenance-service-item-categories/create',
    show: '/maintenance-service-item-categories/show/:id',
    edit: '/maintenance-service-item-categories/edit/:id',
    meta: {
      parent: 'maintenance',
      label: 'Maintenance Service Item Categories',
      icon: SettingIcon,
    },
  },
  {
    name: 'vehicles-mini',
    list: '/vehicles/mini',
  },
  {
    name: 'maintenance-orders',
    list: '/maintenance-orders',
    create: '/maintenance-orders/create',
    show: '/maintenance-orders/show/:id',
    edit: '/maintenance-orders/edit/:id',
    meta: {
      parent: 'maintenance',
      label: 'Maintenance',
      icon: SettingIcon,
    },
  },
  {
    name: 'maintenance-orders-entry-finish',
    list: '/maintenance-orders/create-finish/:id',
    meta: {
      hide: true
    }
  },
  // Master Data
  {
    name: 'parent-masterdata',
    tag: 'parent',
    meta: {
      label: 'Masterdata',
      icon: ShopIcon,
    }
  },
  {
    name: 'vendor-categories',
    list: '/vendor-categories/list',
    create: '/vendor-categories/create',
    show: '/vendor-categories/show/:id',
    edit: '/vendor-categories/edit/:id',
    meta: {
      label: 'Vendor Categories',
      icon: ShoppingIcon,
      parent: 'parent-masterdata',
    },
  },
  {
    name: 'bank-accounts',
    list: '/bank-accounts/list',
    create: '/bank-accounts/create',
    show: '/bank-accounts/show/:id',
    edit: '/bank-accounts/edit/:id',
    meta: {
      label: 'Bank Accounts',
      icon: ShopIcon,
      parent: 'parent-masterdata',
    }
  },
  {
    name: 'branches',
    list: '/branches',
    create: '/branches/create',
    show: '/branches/show/:id',
    edit: '/branches/edit/:id',
    meta: {
      label: 'Branches',
      icon: ApartmentIcon,
      parent: 'parent-masterdata',
    },
  },
  {
    name: 'customer-categories',
    list: '/customer-categories',
    create: '/customer-categories/create',
    show: '/customer-categories/show/:id',
    edit: '/customer-categories/edit/:id',
    meta: {
      label: 'Customer Categories',
      icon: UserIcon,
      parent: 'parent-masterdata',
    },
  },
  {
    name: 'customer-pricelists',
    list: '/customer-pricelists',
    create: '/customer-pricelists/create',
    show: '/customer-pricelists/show/:id',
    edit: '/customer-pricelists/edit/:id',
    meta: {
      label: 'Customer Pricelist',
      icon: UserIcon,
      canDelete: true,
      parent: 'parent-masterdata',
    },
  },
  {
    name: 'trip-expense-items',
    list: '/trip-expense-items/list',
    create: '/trip-expense-items/create',
    show: '/trip-expense-items/show/:id',
    edit: '/trip-expense-items/edit/:id',
    meta: {
      label: 'Trip Expense Items',
      icon: DashboardIcon,
      parent: 'parent-masterdata',
    },
  },
  {
    name: 'routes',
    list: '/routes/list',
    create: '/routes/create',
    show: '/routes/show/:id',
    edit: '/routes/edit/:id',
    meta: {
      label: 'Routes',
      icon: ReconciliationIcon,
      parent: 'parent-masterdata',
    }
  },
];
