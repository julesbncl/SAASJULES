import { CompanyRepository } from "../repository";
import { Company } from "../types";
import { mockCompany } from "./fixtures";

let companyStore: Company = { ...mockCompany };

export const mockCompanyRepository: CompanyRepository = {
  async getCompany(): Promise<Company> {
    return { ...companyStore };
  },

  async updateCompany(data: Partial<Company>): Promise<Company> {
    companyStore = { ...companyStore, ...data };
    return { ...companyStore };
  },
};
