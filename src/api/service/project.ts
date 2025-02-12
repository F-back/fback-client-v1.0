import { useQuery } from '@tanstack/react-query';
import { endPoints, instance } from '../endpoint';
import { Project } from '../type/project';

export const getProjects = async (): Promise<Project[]> => {
  return instance.get(endPoints.projects).then((res) => res.data);
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
};
