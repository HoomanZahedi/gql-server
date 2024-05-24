import { getCompany, getCompanyList } from "./db/companies.js";
import { createJob, deleteJob, getJob, getJobByCompanyId, getJobs, updateJob } from "./db/jobs.js";
import {GraphQLError} from 'graphql';

export const resolvers = {
  Query: {
    jobs: async () => {
      const jobList = await getJobs();
      if(!jobList){
        throw new GraphQLError('No Job Found!',{
          extensions: { code: 'NOT_FOUND' },
        })
      }
      return jobList
    },
    companies: async () => {
      return await getCompanyList();
    },
    singleJob: async (_root, args) => {
      const job = await getJob(args.id);
      if(!job){
        return new GraphQLError('No Job Found!',{
          extensions: { code: 'NOT_FOUND' },
        })
      }
      return job
    },
    singleCompany: async (_root, args) => {
      const company = await getCompany(args.id);
      if(!company){
        return new GraphQLError('No company Found!',{
          extensions: { code: 'NOT_FOUND' },
        })
      }
      return company
    },
  },

  Mutation:{
    createJob:(_root,{input:{title,description}})=>{
      const companyId = 'Gu7QW9LcnF5d';
      return createJob({companyId,title,description})
    },
    deleteJob:async(_root,args)=>{
      const job = await deleteJob(args.id);
      return job
    },
    updateJob:async(_root,{input:{id,title,description}})=>{
      return updateJob({id,title,description})
    }
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
