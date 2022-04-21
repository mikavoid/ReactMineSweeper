let a: number;
let b: boolean;
let c: string;

let d: string[];

const logFn = (data: unknown): void => {
  const data2: unknown = data;
  console.log(data);
  console.log(data2);
};

type Permission = "admin" | "user" | "manager";

type PermissionsWithoutAdmin = Exclude<Permission, "admin">;

interface DepartmentsForPermissions {
  depName: string;
  level: number;
}

const depsForPerms: Record<Permission, DepartmentsForPermissions> = {
  admin: {
    depName: "security",
    level: 10,
  },
  user: {
    depName: "",
    level: 2,
  },
  manager: {
    depName: "",
    level: 10,
  },
};

type TuplePermissions = [Permission, Permission];
type BasicUser<A = boolean, P = TuplePermissions> = {
  name: string;
  surname: string;
  age: number;
  isAdmin: A;
  permissions?: P;
};

type BasicUserWithoutPermissions = Omit<BasicUser, "permissions">;

type BasicUserReadonly = Readonly<BasicUser>;
type BasicUserRequired = Required<BasicUser>;
type BasicUserPartial = Partial<BasicUser>;
type BasicUserReadOnlyRequired = Readonly<Required<BasicUser>>;

// interface IUserWithPermissions extends BasicUser<boolean> {
//   permissions: string[];
// }
// a = 5;

const user: BasicUser<boolean> = {
  name: "",
  surname: "",
  age: 18,
  isAdmin: true,
};

type AdvancedUser = {
  account: number;
};

type FullUser<A = boolean, P = TuplePermissions> = BasicUser<A, P> &
  AdvancedUser;

const usersArray: BasicUser[] = [user, user, user];

function getFirst<T>(array: T[]): T {
  return array[0];
}

type getFirstReturnType = ReturnType<() => string>;
const first = getFirst<BasicUser>(usersArray);

const user2: FullUser = {
  name: "",
  surname: "",
  age: 18,
  isAdmin: true,
  permissions: ["admin", "manager"],
  account: 2,
};

user2.name = "ok";

type MathFunc = (a: number, b: number) => number;

const mul: MathFunc = (a, b) => a * b;
const add: MathFunc = (a, b) => a + b;

const res = mul(2, 2);
