export const getPageKey = (path: string) => {
  const segments = path.split('/').filter(Boolean);

  if (segments.includes('actions')) return 'actionsPage';
  if (segments.includes('clients')) return 'allClientsPage';
  if (segments.includes('partners')) return 'partnersPage';
  if (segments.includes('files')) return 'filesPage';
  if (segments.includes('document')) return 'documentBuilderPage';
  if (segments.includes('income')) return 'incomePage';
  if (segments.length === 2 && segments[0] === 'home') return 'homePage';
  if (segments.includes('projects') || (segments.length === 3 && segments[0] === 'home')) return 'projectPage';

  return null;
};
