import {chain, Rule, schematic, SchematicContext, Tree,} from '@angular-devkit/schematics';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';

export function ngAdd(options: any): Rule {
  return (tree: Tree, schematicContext: SchematicContext) => {
    schematicContext.addTask(new NodePackageInstallTask());
    return chain([
      schematic('website', options)
    ])(tree, schematicContext);
  };
}
