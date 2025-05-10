interface ProjectType {
	id: number;
	imageUrl: string;
	projectName: string;
	description: string;
	demoUrl: string;
	repositoryUrl: string;
}

interface NewProjectType {
	userId: number;
	imageUrl: string;
	projectName: string;
	demoUrl: string;
	repositoryUrl: string;
	description: string;
}


export type { ProjectType, NewProjectType }