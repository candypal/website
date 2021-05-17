import {
  apply,
  chain,
  FileEntry,
  forEach,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import {join, normalize} from 'path';
import {getWorkspace} from '@schematics/angular/utility/config';
import {WebsiteUtil} from '../utils/WebsiteUtil';

export function setupOptions(host: Tree, options: any): Tree {
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }
  const project = workspace.projects[options.project];

  options.path = join(normalize(project.root), 'src');
  return host;
}

export function website(tree: Tree, _options: any): Rule {
  console.log('info', `🚫Added "${_options}" provided`);
  const websiteUtil = new WebsiteUtil();
  return chain([
    websiteUtil.addPackageJsonDependencies(),
    websiteUtil.installPackageJsonDependencies(),
    (tree: Tree, _context: SchematicContext) => {
      setupOptions(tree, _options);

      const movePath = normalize(_options.path + '/');
      const templateSource = apply(url('./files/src'), [
        template({..._options}),
        move(movePath),
        // fix for https://github.com/angular/angular-cli/issues/11337
        forEach((fileEntry: FileEntry) => {
          if (tree.exists(fileEntry.path)) {
            tree.overwrite(fileEntry.path, fileEntry.content);
          }
          return fileEntry;
        }),
      ]);
      const rule = mergeWith(templateSource, MergeStrategy.Overwrite);
      return rule(tree, _context);
    },
    websiteUtil.addModuleToImports(tree, _options),
    /*
        _options && _options.skipPackageJson ? noop() : maker.addPackageJsonDependencies(),
        _options && _options.skipPackageJson ? noop() : maker.installPackageJsonDependencies(),
        _options && _options.skipModuleImport ? noop() : maker.addModuleToImports(_options),
    */



    /*(tree: Tree, options: any) => {
      return (host: Tree, context: SchematicContext) => {
        let project: any;
        const workspace = getWorkspace(host);
        project = getProject(workspace, options.project ? options.project : Object.keys(workspace['projects'])[0]);
        /!*project = getProjectFromWorkspace(
          workspace,
          // Takes the first project in case it's not provided by CLI
          options.project ? options.project : Object.keys(workspace['projects'])[0]
        );*!/

        const moduleName = 'WebsiteModule.forRoot({' +
          ' loginUrl: environment.restUrl/user/login,\n' +
          ' alertDelayInSeconds: 7\n' +
          '});';


        const modulePath = getAppModulePath(host, getProjectMainFile(project));
        const text = host.read(modulePath);
        context.logger.log('info', ''+ text);
        // const source = ts.createSourceFile(modulePath, text.toString('utf-8'), ts.ScriptTarget.Latest, true);

        // addModuleImportToModule(host, modulePath, moduleName, src);
        // addImportToModule(source, moduleName, 'angular-made-with-love', project);
        context.logger.log('info', `✅️ "${moduleName}" is imported`);

        return host;
      };
    },*/

  ]);
}
