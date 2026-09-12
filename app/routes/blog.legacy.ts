import { redirect } from "react-router";
export function loader() { throw redirect("/tr/blog", 301); }
