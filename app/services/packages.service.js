'use strict';

export function PackagesService() {
  const PACKAGE_GROUPS = [
    {
      name: 'grunt',
      title: 'Grunt',
      description: 'The JavaScript Task Runner.',
      logoUrl: '/assets/images/grunt-logo-100.png'
    },
    {
      name: 'gulp',
      title: 'Gulp',
      description: 'The streaming build system.',
      logoUrl: '/assets/images/gulp-logo-100.png'
    },
    {
      name: 'jspm',
      title: 'JSPM',
      description: 'Registry and format agnostic JavaScript package manager.',
      logoUrl: '/assets/images/jspm-logo-100.png'
    },
    {
      name: 'yeoman',
      title: 'Yeoman',
      description: `The web's scaffolding tool for modern webapps.`,
      logoUrl: '/assets/images/yeoman-logo-100.png'
    }
  ];

  this.getPackageGroups = () => PACKAGE_GROUPS;

  this.getPackageGroup = (name) => {
    var filtered = PACKAGE_GROUPS.filter(item => item.name === name);
    if (filtered.length > 0) return filtered[0];
    return null;
  }
}
