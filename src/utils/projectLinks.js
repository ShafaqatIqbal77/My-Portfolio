import toast from 'react-hot-toast';

/**
 * Returns true when a project link is unset or still contains a placeholder token.
 */
export const isPlaceholderUrl = (value) => !value || value.includes('[PLACEHOLDER');

/**
 * Opens an external URL in a new tab or notifies the user if it is a placeholder.
 */
export const handleProjectLinkClick = (url, event) => {
  if (isPlaceholderUrl(url)) {
    if (event) event.preventDefault();
    toast('Add your repository URL in src/data/projects.js', { icon: 'ℹ️' });
    return;
  }

  if (!event) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
