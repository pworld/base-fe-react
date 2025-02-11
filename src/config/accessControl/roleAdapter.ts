import { StringAdapter } from "casbin";

const rolesAdapter = new StringAdapter(`
p, editor, dashboard, 

p, admin, posts, (list)|(create)
p, admin, posts/*, (edit)|(show)|(delete)
p, admin, posts/*, field

p, admin, users, (list)|(create)
p, admin, users/*, (edit)|(show)|(delete)

p, admin, categories, (list)|(create)
p, admin, categories/*, (edit)|(show)|(delete)

p, editor, dashboard, (list)

p, editor, posts, (list)|(create)
p, editor, posts/*, (edit)|(show)
p, editor, posts/hit, field, deny

p, editor, categories, list

`);

export default rolesAdapter;