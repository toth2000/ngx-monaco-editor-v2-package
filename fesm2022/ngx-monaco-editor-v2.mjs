import * as i0 from '@angular/core';
import { InjectionToken, inject, EventEmitter, Component, Input, ViewChild, Output, NgZone, forwardRef, ChangeDetectionStrategy, NgModule, makeEnvironmentProviders } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { CommonModule } from '@angular/common';

const NGX_MONACO_EDITOR_CONFIG = new InjectionToken('NGX_MONACO_EDITOR_CONFIG');

let loadedMonaco = false;
let loadPromise;
class BaseEditor {
    constructor() {
        this.config = inject(NGX_MONACO_EDITOR_CONFIG);
        this.onInit = new EventEmitter();
        this._insideNg = false;
    }
    set insideNg(insideNg) {
        this._insideNg = insideNg;
        if (this._editor) {
            this._editor.dispose();
            this.initMonaco(this._options, this.insideNg);
        }
    }
    get insideNg() {
        return this._insideNg;
    }
    ngAfterViewInit() {
        if (loadedMonaco) {
            // Wait until monaco editor is available
            loadPromise.then(() => {
                this.initMonaco(this._options, this.insideNg);
            });
        }
        else {
            loadedMonaco = true;
            loadPromise = new Promise((resolve) => {
                let baseUrl = this.config.baseUrl;
                // ensure backward compatibility
                if (baseUrl === "assets" || !baseUrl) {
                    baseUrl = "./assets/monaco/min/vs";
                }
                if (typeof (window.monaco) === 'object') {
                    this.initMonaco(this._options, this.insideNg);
                    resolve();
                    return;
                }
                const onGotAmdLoader = (require) => {
                    let usedRequire = require || window.require;
                    let requireConfig = { paths: { vs: `${baseUrl}` } };
                    Object.assign(requireConfig, this.config.requireConfig || {});
                    // Load monaco
                    usedRequire.config(requireConfig);
                    usedRequire([`vs/editor/editor.main`], () => {
                        if (typeof this.config.onMonacoLoad === 'function') {
                            this.config.onMonacoLoad();
                        }
                        this.initMonaco(this._options, this.insideNg);
                        resolve();
                    });
                };
                if (this.config.monacoRequire) {
                    onGotAmdLoader(this.config.monacoRequire);
                    // Load AMD loader if necessary
                }
                else if (!window.require) {
                    const loaderScript = document.createElement('script');
                    loaderScript.type = 'text/javascript';
                    loaderScript.src = `${baseUrl}/loader.js`;
                    loaderScript.addEventListener('load', () => { onGotAmdLoader(); });
                    document.body.appendChild(loaderScript);
                    // Load AMD loader without over-riding node's require
                }
                else if (!window.require.config) {
                    var src = `${baseUrl}/loader.js`;
                    var loaderRequest = new XMLHttpRequest();
                    loaderRequest.addEventListener("load", () => {
                        let scriptElem = document.createElement('script');
                        scriptElem.type = 'text/javascript';
                        scriptElem.text = [
                            // Monaco uses a custom amd loader that over-rides node's require.
                            // Keep a reference to node's require so we can restore it after executing the amd loader file.
                            'var nodeRequire = require;',
                            loaderRequest.responseText.replace('"use strict";', ''),
                            // Save Monaco's amd require and restore Node's require
                            'var monacoAmdRequire = require;',
                            'require = nodeRequire;',
                            'require.nodeRequire = require;'
                        ].join('\n');
                        document.body.appendChild(scriptElem);
                        onGotAmdLoader(window.monacoAmdRequire);
                    });
                    loaderRequest.open("GET", src);
                    loaderRequest.send();
                }
                else {
                    onGotAmdLoader();
                }
            });
        }
    }
    ngOnDestroy() {
        if (this._windowResizeSubscription) {
            this._windowResizeSubscription.unsubscribe();
        }
        if (this._editor) {
            this._editor.dispose();
            this._editor = undefined;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0", ngImport: i0, type: BaseEditor, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.0", type: BaseEditor, selector: "ng-component", inputs: { insideNg: "insideNg" }, outputs: { onInit: "onInit" }, viewQueries: [{ propertyName: "_editorContainer", first: true, predicate: ["editorContainer"], descendants: true, static: true }], ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0", ngImport: i0, type: BaseEditor, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], propDecorators: { insideNg: [{
                type: Input,
                args: ['insideNg']
            }], _editorContainer: [{
                type: ViewChild,
                args: ['editorContainer', { static: true }]
            }], onInit: [{
                type: Output
            }] } });

class EditorComponent extends BaseEditor {
    constructor() {
        super(...arguments);
        this.zone = inject(NgZone);
        this._value = '';
        this.propagateChange = (_) => { };
        this.onTouched = () => { };
    }
    set options(options) {
        this._options = Object.assign({}, this.config.defaultOptions, options);
        if (this._editor) {
            this._editor.dispose();
            this.initMonaco(options, this.insideNg);
        }
    }
    get options() {
        return this._options;
    }
    set model(model) {
        this.options.model = model;
        if (this._editor) {
            this._editor.dispose();
            this.initMonaco(this.options, this.insideNg);
        }
    }
    writeValue(value) {
        this._value = value || '';
        // Fix for value change while dispose in process.
        setTimeout(() => {
            if (this._editor && !this.options.model) {
                this._editor.setValue(this._value);
            }
        });
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    initMonaco(options, insideNg) {
        const hasModel = !!options.model;
        if (hasModel) {
            const model = monaco.editor.getModel(options.model.uri || '');
            if (model) {
                options.model = model;
                options.model.setValue(this._value);
            }
            else {
                options.model = monaco.editor.createModel(options.model.value, options.model.language, options.model.uri);
            }
        }
        if (insideNg) {
            this._editor = monaco.editor.create(this._editorContainer.nativeElement, options);
        }
        else {
            this.zone.runOutsideAngular(() => {
                this._editor = monaco.editor.create(this._editorContainer.nativeElement, options);
            });
        }
        if (!hasModel) {
            this._editor.setValue(this._value);
        }
        this._editor.onDidChangeModelContent((e) => {
            const value = this._editor.getValue();
            // value is not propagated to parent when executing outside zone.
            this.zone.run(() => {
                this.propagateChange(value);
                this._value = value;
            });
        });
        this._editor.onDidBlurEditorWidget(() => {
            this.onTouched();
        });
        // refresh layout on resize event.
        if (this._windowResizeSubscription) {
            this._windowResizeSubscription.unsubscribe();
        }
        this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => this._editor.layout());
        this.onInit.emit(this._editor);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0", ngImport: i0, type: EditorComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.0", type: EditorComponent, isStandalone: true, selector: "ngx-monaco-editor", inputs: { options: "options", model: "model" }, providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => EditorComponent),
                multi: true
            }], usesInheritance: true, ngImport: i0, template: '<div class="editor-container" #editorContainer></div>', isInline: true, styles: [":host{display:block;height:200px}.editor-container{width:100%;height:98%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0", ngImport: i0, type: EditorComponent, decorators: [{
            type: Component,
            args: [{ standalone: true, selector: 'ngx-monaco-editor', template: '<div class="editor-container" #editorContainer></div>', changeDetection: ChangeDetectionStrategy.OnPush, providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => EditorComponent),
                            multi: true
                        }], styles: [":host{display:block;height:200px}.editor-container{width:100%;height:98%}\n"] }]
        }], propDecorators: { options: [{
                type: Input,
                args: ['options']
            }], model: [{
                type: Input,
                args: ['model']
            }] } });

class DiffEditorComponent extends BaseEditor {
    constructor() {
        super(...arguments);
        this.zone = inject(NgZone);
    }
    set options(options) {
        this._options = Object.assign({}, this.config.defaultOptions, options);
        if (this._editor) {
            this._editor.dispose();
            this.initMonaco(options, this.insideNg);
        }
    }
    get options() {
        return this._options;
    }
    set originalModel(model) {
        this._originalModel = model;
        if (this._editor) {
            this._editor.dispose();
            this.initMonaco(this.options, this.insideNg);
        }
    }
    set modifiedModel(model) {
        this._modifiedModel = model;
        if (this._editor) {
            this._editor.dispose();
            this.initMonaco(this.options, this.insideNg);
        }
    }
    initMonaco(options, insideNg) {
        if (!this._originalModel || !this._modifiedModel) {
            throw new Error('originalModel or modifiedModel not found for ngx-monaco-diff-editor');
        }
        this._originalModel.language = this._originalModel.language || options.language;
        this._modifiedModel.language = this._modifiedModel.language || options.language;
        let originalModel = monaco.editor.createModel(this._originalModel.code, this._originalModel.language);
        let modifiedModel = monaco.editor.createModel(this._modifiedModel.code, this._modifiedModel.language);
        this._editorContainer.nativeElement.innerHTML = '';
        const theme = options.theme;
        if (insideNg) {
            this._editor = monaco.editor.createDiffEditor(this._editorContainer.nativeElement, options);
        }
        else {
            this.zone.runOutsideAngular(() => {
                this._editor = monaco.editor.createDiffEditor(this._editorContainer.nativeElement, options);
            });
        }
        options.theme = theme;
        this._editor.setModel({
            original: originalModel,
            modified: modifiedModel
        });
        // refresh layout on resize event.
        if (this._windowResizeSubscription) {
            this._windowResizeSubscription.unsubscribe();
        }
        this._windowResizeSubscription = fromEvent(window, 'resize').subscribe(() => this._editor.layout());
        this.onInit.emit(this._editor);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0", ngImport: i0, type: DiffEditorComponent, deps: null, target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.0", type: DiffEditorComponent, isStandalone: true, selector: "ngx-monaco-diff-editor", inputs: { options: "options", originalModel: "originalModel", modifiedModel: "modifiedModel" }, usesInheritance: true, ngImport: i0, template: '<div class="editor-container" #editorContainer></div>', isInline: true, styles: [":host{display:block;height:200px}.editor-container{width:100%;height:98%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0", ngImport: i0, type: DiffEditorComponent, decorators: [{
            type: Component,
            args: [{ standalone: true, selector: 'ngx-monaco-diff-editor', template: '<div class="editor-container" #editorContainer></div>', changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block;height:200px}.editor-container{width:100%;height:98%}\n"] }]
        }], propDecorators: { options: [{
                type: Input,
                args: ['options']
            }], originalModel: [{
                type: Input,
                args: ['originalModel']
            }], modifiedModel: [{
                type: Input,
                args: ['modifiedModel']
            }] } });

class MonacoEditorModule {
    static forRoot(config = {}) {
        return {
            ngModule: MonacoEditorModule,
            providers: [
                { provide: NGX_MONACO_EDITOR_CONFIG, useValue: config }
            ]
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0", ngImport: i0, type: MonacoEditorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.0", ngImport: i0, type: MonacoEditorModule, imports: [CommonModule,
            EditorComponent,
            DiffEditorComponent], exports: [EditorComponent,
            DiffEditorComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.0", ngImport: i0, type: MonacoEditorModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0", ngImport: i0, type: MonacoEditorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        EditorComponent,
                        DiffEditorComponent
                    ],
                    exports: [
                        EditorComponent,
                        DiffEditorComponent
                    ]
                }]
        }] });
function provideMonacoEditor(config = {}) {
    return makeEnvironmentProviders([
        { provide: NGX_MONACO_EDITOR_CONFIG, useValue: config }
    ]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { DiffEditorComponent, EditorComponent, MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG, provideMonacoEditor };
//# sourceMappingURL=ngx-monaco-editor-v2.mjs.map
