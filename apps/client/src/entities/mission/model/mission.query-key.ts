export const missionQueryKeys = {
  all: ['missions'] as const,
  today: () => [...missionQueryKeys.all, 'today'] as const,
  history: () => [...missionQueryKeys.all, 'history'] as const,
};
