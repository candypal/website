import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import {Tree} from '@angular-devkit/schematics';

describe('website', () => {

  const collectionPath = path.join(__dirname, '../collection.json');
  const schematicRunner = new SchematicTestRunner(
    'schematics',
    path.join(__dirname, './../collection.json'),
  );

  const workspaceOptions: any = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '0.5.0',
  };

  const appOptions: any = {
    name: 'schematest'
  };

  const schemaOptions: any = {
    name: 'foo'
  };

  let appTree: UnitTestTree;

  beforeEach(() => {
    appTree = schematicRunner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
    appTree = schematicRunner.runExternalSchematic('@schematics/angular', 'application', appOptions, appTree);
  });

  it('works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    runner.runSchematicAsync('website', schemaOptions, appTree).toPromise().then(tree => {
      const appComponent = tree.readContent('/projects/candiman/website/src/app/app.component.ts');
      expect(appComponent).toContain(`name = '${schemaOptions.name}'`);
    });
  });

  describe('simple-schematic', () => {
    it('works', () => {
      const runner = new SchematicTestRunner('schematics', collectionPath);
      const tree = runner.runSchematic('simple-schematic', {}, Tree.empty());


      expect(tree.files).toEqual([]);
    });
  });
});
