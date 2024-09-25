# Monaco Editor Component for Angular 2 and above.

 - Angular <= 4: v3.x.x
 - Angular 5: v5.x.x
 - Angular 6: v6.x.x
 - Angular 7: v7.x.x
 - Angular 8: v8.x.x
 - Angular 9: v9.x.x
 - Angular 10: v10.x.x 
 - Angular 12: v12.x.x
 - Angular 13: not supported ( best to use 14, otherwise contact author)
 - Angular 14: v14.x.x
 - Angular 15: v15.x.x
 - Angular 16: v16.x.x
- Angular 17: 17.x.x
- Angular 18: 18.x.x

Using this Module you can utilize the Monaco Editor as an Angular Component. Feel free to contribute, raise feature requests and make it better.

Supports all the options available in monaco-editor [Monaco Editor Options](https://microsoft.github.io/monaco-editor/docs.html)

## Demo

https://ngx-monaco-editor-v2.surge.sh/

![img.png](img.png)

## Setup

### Installation

Install from npm repository:
```
npm install monaco-editor ngx-monaco-editor-v2 --save
 ```

Breaking change from v10, is to use monaco-editor next to ngx-monaco-editor-v2 in your package.json file.
 
For angular version 6 use v6.x.x
```
npm install ngx-monaco-editor-v2@6.0.0 --save
 ```

Add the glob to assets in `angular.json`
```typescript
{
  "apps": [
    {
      "assets": [
      { "glob": "**/*", "input": "node_modules/monaco-editor", "output": "/assets/monaco/" }
      ],
      ...
    }
    ...
  ],
  ...
}
 ```


For Angular 6 and below, add the glob to assets in `.angular-cli.json` schema - `projects.[project-name].architect.build` (to make monaco-editor lib available to the app):
```typescript
{
  "options":{
        {"assets": [
          { "glob": "**/*", "input": "node_modules/ngx-monaco-editor-v2/assets/monaco", "output": "./assets/monaco/" }

        ],
        ...
        }
    ...
    },
  ...
}
 ```

### Sample
Include MonacoEditorModule in Main Module and Feature Modules where you want to use the editor component.(eg: app.module.ts): 
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Create Editor options in component.(eg: app.component.ts)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
}
```
Include editor in html with options and ngModel bindings.(eg: app.component.html)
```html
<ngx-monaco-editor [options]="editorOptions" [(ngModel)]="code"></ngx-monaco-editor>
```

Include diff-editor in html with options.(eg: app.component.html)
```html
<ngx-monaco-diff-editor [options]="options" [originalModel]="originalModel" [modifiedModel]="modifiedModel"></ngx-monaco-diff-editor>
```
```typescript
import { Component } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  options = {
    theme: 'vs-dark'
  };
  originalModel: DiffEditorModel = {
    code: 'heLLo world!',
    language: 'text/plain'
  };

  modifiedModel: DiffEditorModel = {
    code: 'hello orlando!',
    language: 'text/plain'
  };
}
```

### Styling
To match height of container element add height: 100% and wrap in container
```html
<div style="height: 500px">
    <ngx-monaco-editor style="height: 100%" [options]="editorOptions" [(ngModel)]="code"></ngx-monaco-editor>
</div>
```
Add class to editor tag. (eg. class="my-code-editor")
```html
<ngx-monaco-editor class="my-code-editor" [options]="editorOptions" [(ngModel)]="code"></ngx-monaco-editor>
```
Add styling in css/scss file:
```scss
.my-code-editor {
  .editor-container {
    height: calc(100vh - 100px);
  }
}
```
Set automaticLayout option to adjust editor size dynamically. Recommended when using in modal dialog or tabs where editor is not visible initially.

### Events
Output event (onInit) expose editor instance that can be used for performing custom operations on the editor. 
```html
<ngx-monaco-editor [options]="editorOptions" [(ngModel)]="code" (onInit)="onInit($event)"></ngx-monaco-editor>
```

```typescript
export class AppComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  onInit(editor) {
      let line = editor.getPosition();
      console.log(line);
    }
}
```

## Configurations
`forRoot()` method of MonacoEditorModule accepts config of type `NgxMonacoEditorConfig`.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'app-name/assets', // configure base path for monaco editor. Starting with version 8.0.0 it defaults to './assets'. Previous releases default to '/assets', or you can pass CDN url here
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
  requireConfig: { preferScriptTags: true } // allows to oweride configuration passed to monacos loader
  monacoRequire: (<any>window).monacoRequire // pass here monacos require function if you loaded monacos loader (loader.js) yourself 
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

### Configure JSON Defaults
`onMonacoLoad` property of `NgxMonacoEditorConfig` can be used to configure JSON default.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { AppComponent } from './app.component';

export function onMonacoLoad() {

  console.log((window as any).monaco);

  const uri = monaco.Uri.parse('a://b/foo.json');
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [{
      uri: 'http://myserver/foo-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          p1: {
            enum: ['v1', 'v2']
          },
          p2: {
            $ref: 'http://myserver/bar-schema.json'
          }
        }
      }
    }, {
      uri: 'http://myserver/bar-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          q1: {
            enum: ['x1', 'x2']
          }
        }
      }
    }]
  });

}

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets', // You can pass CDN url here instead 
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Now pass model config of type `NgxEditorModel` to Editor Component
```typescript
@Component({
  selector: 'app-root',
  template: `<ngx-monaco-editor [options]="options" [model]="model"></ngx-monaco-editor>`,
  styles: []
})
export class AppComponent {
  options = {
    theme: 'vs-dark'
  };
  
  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false',
    '}'
  ].join('\n');

  model: NgxEditorModel = {
    value: this.jsonCode,
    language: 'json',
    uri: monaco.Uri.parse('a://b/foo.json')
  };
}
```

### Configuration for Electron
If you expose node's `require` in your render process, monaco will try to use its `NodeScriptLoader` and fail to load its files. To presuade it to use its `BrowserScriptLoader` instead it is necessery to set `preferScriptTags` to true.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets', // You can pass CDN url here instead 
  requireConfig: { preferScriptTags: true }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```
If for some reason you want to load monaco yourself. 
```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>Angular Electron</title>
  <base href="./">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="assets/icons/favicon.ico">
</head>

<body>
  <app-root></app-root>
  <script>
    // Monaco uses a custom amd loader that over-rides node's require.
    // Keep a reference to node's require so we can restore it after executing the amd loader file.
    var nodeRequire = require;
  </script>
  <script src="assets/monaco/min/vs/loader.js"></script>
  <script type="text/javascript">
    // Save Monaco's amd require and restore Node's require
    var monacoRequire = require;
    require = nodeRequire;
    require.nodeRequire = require;
  </script>
</body>

</html>
```
You just need to save monaco `require` function defined in `loader.js` somewhere and pass it to `monacoRequire` in configuration.
```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import { AppComponent } from './app.component';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets', 
  requireConfig: { preferScriptTags: true },
  monacoRequire: (window as any).monacoRequire
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Links
[Monaco Editor](https://github.com/Microsoft/monaco-editor/)<br/>
[Monaco Editor Options](https://microsoft.github.io/monaco-editor/docs.html)

## License

MIT © [Miroslav Maksimovic](https://github.com/miki995)
