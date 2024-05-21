import { getCompany, getCompanyList } from "./db/companies.js";
import { getJob, getJobByCompanyId, getJobs } from "./db/jobs.js";

export const resolvers = {
  Query: {
    jobs: async () => {
      return await getJobs();
    },
    companies: async () => {
      return await getCompanyList();
    },
    singleJob: async (_root, args) => {
      return await getJob(args.id);
    },
    singleCompany: async (_root, args) => {
      return await getCompany(args.id);
    },
  },
  Job: {
    company: (job) => {
      return getCompany(job.companyId);
    },
    date: (job) => {
      return job.createdAt;
    },
  },
  Company: {
    job: (company) => {
      return getJobByCompanyId(company.id);
    },
  },
};
