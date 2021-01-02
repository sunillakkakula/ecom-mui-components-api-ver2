import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@tagline.com",
    password: bcrypt.hashSync("admin", 10),
    isAdmin: true,
  },
  {
    name: "Sunil",
    email: "sunil@tagline.com",
    password: bcrypt.hashSync("sunil", 10),
    isAdmin: false,
  },
  {
    name: "ksp",
    email: "ksp@tagline.com",
    password: bcrypt.hashSync("ksp", 10),
    isAdmin: false,
  },
  {
    name: "shahid",
    email: "shahid@tagline.com",
    password: bcrypt.hashSync("shahid", 10),
    isAdmin: false,
  },
];

export default users;
