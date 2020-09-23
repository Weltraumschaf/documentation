const docsConfig = {
    temp: 'githubRepo', // Name of temporary folder, will be deleted after build
    repository: 'secureCodeBox/secureCodeBox-v2', // The repository url without the github part of the link
    trgPath: 'docs', // This needs to be 'docs' for the docusaurus build, but you may specify a 'docs/<subdirectory>'
    srcDirs: ['scanners', 'hooks'], // Directory names, relative to the root directory of the github project, containing the subdirectories with documentation
    srcFiles: [
      'docs/developer-guide/README.md',
      'docs/user-guide/README.md',
    ], // File names for documentation, relative to the root directory of the github project
    singleFileDirectory: 'guides', // Docs subdirectory as root category for `srcFiles`, defaults to root level of `docs/`
    sizeLimit: 500000, // Limit of file size, most importantly used for large findings.
    findingsDir: 'public/findings', // Directory for large findings which exceeded sizeLimit
  },
  integrationsConfig = {
    integrationsFN: 'src/integrations.js', // Name of the target file to (over-)write
    itgDirs: ['hooks', 'scanners'], // Names of the directories relative to the root level of the `/docs` folder
    defaultIcon: 'img/integrationIcons/Default.svg', // Default Icon when no imageUrl provided or could not resolve imageUrl
  },
  sidebarConfig = {
    sidebarName: 'sidebars.js', // Docusaurus looks for a file named `sidebars.js`
    sidebar: { someSidebar: {} }, // If you need more than one sidebar, you might change the "root object" on which to build the sidebar on
    rootCategory: 'others', // Name of category for all docs on the root level of the `/docs` folder
  };

module.exports = {
  docsConfig,
  integrationsConfig,
  sidebarConfig,
};