export interface IResourceMeta {
  parent?: string;
  label?: string;
  dataProviderName?: string;
  hide?: boolean;
  canDelete?: boolean;
  icon?: React.ReactNode;
}

export interface IResource {
  name: string;
  list?: string;
  create?: string;
  show?: string;
  edit?: string;
  tag?: string;
  parentName?: string,
  meta?: IResourceMeta;
}
