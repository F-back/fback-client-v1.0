import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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

export const useProject = (id?: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      if (!id) throw new Error('Project ID is required');
      const response = await axios.get<Project>(`${endPoints.projects}/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
