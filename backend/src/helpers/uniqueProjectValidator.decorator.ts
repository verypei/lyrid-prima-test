// import { Injectable, BadRequestException, Inject } from '@nestjs/common';
// import { COMPANY_REPOSITORY, PROJECT_REPOSITORY } from 'src/constants';
// import { Company } from 'src/entity/company.entity';
// import { Project } from 'src/entity/project.entity';
// import { ProjectRepository } from 'src/repositories/project.repository';

// @Injectable()
// export class UniqueProjectValidator {
//     constructor(
//                 @Inject(COMPANY_REPOSITORY) private companyRepository: typeof Company,
        
//               @Inject(PROJECT_REPOSITORY) private projectRepository: typeof Project
      
//   ) {}

//   async validateProjectName(projectName: string): Promise<void> {
//     // Check if a project with the same name exists
//     const existingProject = await this.projectRepository.findOne({
//       where: { project: projectName.toLowerCase() }
//     });

//     if (existingProject) {
//       throw new BadRequestException(`Project name "${projectName}" already exists. Please use a unique name.`);
//     }
//   }
// }
