import { defineStore } from 'pinia';
import { AxiosResponse } from 'axios';
import Issue from '@/adapters/Issue';
import { Raw } from '@/@types/Raw';
import Project from '@/adapters/Project';
import Filter from '@/adapters/Filter';
import User from '@/adapters/User';
import Sprint from '@/adapters/Sprint';
import Board from '@/adapters/Board';

export const useJiraStore = defineStore('jira', {
  state: () => {
    return {};
  },
  getters: {},
  actions: {
    search(resourceId: string, params: Filter): Promise<Issue[]> {
      const jql = Filter.toJQL(params) ? { jql: Filter.toJQL(params) } : {};

      return this.$api.jira.search(resourceId, jql).then(({ data }: AxiosResponse) => {
        return Array.isArray(data.issues) ? data.issues.map((raw: Raw) => Issue.fromRaw(raw)) : [];
      });
    },

    getProjects(resourceId: string): Promise<Project[]> {
      return this.$api.jira.getProjects(resourceId).then(({ data }: AxiosResponse) => {
        return Array.isArray(data.values) ? data.values.map((raw: Raw) => Project.fromRaw(raw)) : [];
      });
    },

    getProject(resourceId: string, projectKey: string): Promise<Project[]> {
      return this.$api.jira.getProject(resourceId, projectKey).then(({ data }: AxiosResponse) => {
        return data ? data : [];
      });
    },

    getUsers(resourceId: string, query: string): Promise<User[]> {
      return this.$api.jira.getUsers(resourceId, query).then(({ data }: AxiosResponse) => {
        return data ? data : [];
      });
    },

    getBoards(resourceId: string, projectId: number | null): Promise<Board[]> {
      return this.$api.jira.getBoards(resourceId, projectId).then(({ data }: AxiosResponse) => {
        return data ? data : [];
      });
    },

    getSprints(resourceId: string, boardId: number | null): Promise<Sprint[]> {
      return this.$api.jira.getSprints(resourceId, boardId).then(({ data }: AxiosResponse) => {
        return data ? data : [];
      });
    },
  },
});
