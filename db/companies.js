import { connection } from "./connection.js";

const getCompanyTable = () => connection.table("company");

export async function getCompany(id) {
  return await getCompanyTable().first().where({ id });
}

export async function getCompanyList() {
  return await getCompanyTable().select();
}
