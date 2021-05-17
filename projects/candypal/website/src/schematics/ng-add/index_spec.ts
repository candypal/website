import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';

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

  const unitTestTreeGlobal: UnitTestTree;

  beforeEach(() => {
    schematicRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions)
      .subscribe((unitTestTreeWorkspace: UnitTestTree) => {
        schematicRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, unitTestTreeWorkspace)
          .subscribe((unitTestTreeAppliction: UnitTestTree) => {

        });
      });

  });

  it('works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    runner.runSchematicAsync('my-component', schemaOptions, unitTestTreeGlobal).toPromise().then(tree => {
      const appComponent = tree.readContent('/projects/candiman/website/src/app/app.component.ts');
      expect(appComponent).toContain(`name = '${schemaOptions.name}'`);
    });
  });
});
