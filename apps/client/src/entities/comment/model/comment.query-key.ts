export const commentQueryKeys = {
  all: ['comments'] as const,
  list: (submissionId: number) => [...commentQueryKeys.all, submissionId] as const,
};
