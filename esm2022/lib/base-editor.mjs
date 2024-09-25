import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { NGX_MONACO_EDITOR_CONFIG } from './config';
import * as i0 from "@angular/core";
let loadedMonaco = false;
let loadPromise;
export class BaseEditor {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1lZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9lZGl0b3Ivc3JjL2xpYi9iYXNlLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUVULFlBQVksRUFFWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHdCQUF3QixFQUF5QixNQUFNLFVBQVUsQ0FBQzs7QUFFM0UsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQ3pCLElBQUksV0FBMEIsQ0FBQztBQUsvQixNQUFNLE9BQWdCLFVBQVU7SUFIaEM7UUFJRSxXQUFNLEdBQUcsTUFBTSxDQUF3Qix3QkFBd0IsQ0FBQyxDQUFDO1FBZ0J2RCxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUluQyxjQUFTLEdBQVksS0FBSyxDQUFDO0tBdUZwQztJQXpHQyxJQUNJLFFBQVEsQ0FBQyxRQUFpQjtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQVNELGVBQWU7UUFDYixJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ2pCLHdDQUF3QztZQUN4QyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxR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VTtnQkFhK0IsZ0JBQWdCO3NCQUEvRCxTQUFTO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDcEMsTUFBTTtzQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE91dHB1dCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgaW5qZWN0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBOR1hfTU9OQUNPX0VESVRPUl9DT05GSUcsIE5neE1vbmFjb0VkaXRvckNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcclxuXHJcbmxldCBsb2FkZWRNb25hY28gPSBmYWxzZTtcclxubGV0IGxvYWRQcm9taXNlOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGU6ICcnXHJcbn0pXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRWRpdG9yIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBjb25maWcgPSBpbmplY3Q8Tmd4TW9uYWNvRWRpdG9yQ29uZmlnPihOR1hfTU9OQUNPX0VESVRPUl9DT05GSUcpO1xyXG5cclxuICBASW5wdXQoJ2luc2lkZU5nJylcclxuICBzZXQgaW5zaWRlTmcoaW5zaWRlTmc6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2luc2lkZU5nID0gaW5zaWRlTmc7XHJcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XHJcbiAgICAgIHRoaXMuX2VkaXRvci5kaXNwb3NlKCk7XHJcbiAgICAgIHRoaXMuaW5pdE1vbmFjbyh0aGlzLl9vcHRpb25zLCB0aGlzLmluc2lkZU5nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBpbnNpZGVOZygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnNpZGVOZztcclxuICB9XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2VkaXRvckNvbnRhaW5lcicsIHsgc3RhdGljOiB0cnVlIH0pIF9lZGl0b3JDb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgQE91dHB1dCgpIG9uSW5pdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIHByb3RlY3RlZCBfZWRpdG9yOiBhbnk7XHJcbiAgcHJvdGVjdGVkIF9vcHRpb25zOiBhbnk7XHJcbiAgcHJvdGVjdGVkIF93aW5kb3dSZXNpemVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF9pbnNpZGVOZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBpZiAobG9hZGVkTW9uYWNvKSB7XHJcbiAgICAgIC8vIFdhaXQgdW50aWwgbW9uYWNvIGVkaXRvciBpcyBhdmFpbGFibGVcclxuICAgICAgbG9hZFByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbml0TW9uYWNvKHRoaXMuX29wdGlvbnMsIHRoaXMuaW5zaWRlTmcpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxvYWRlZE1vbmFjbyA9IHRydWU7XHJcbiAgICAgIGxvYWRQcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmU6IGFueSkgPT4ge1xyXG4gICAgICAgIGxldCBiYXNlVXJsID0gdGhpcy5jb25maWcuYmFzZVVybDtcclxuICAgICAgICAvLyBlbnN1cmUgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgIGlmIChiYXNlVXJsID09PSBcImFzc2V0c1wiIHx8ICFiYXNlVXJsKSB7XHJcbiAgICAgICAgICBiYXNlVXJsID0gXCIuL2Fzc2V0cy9tb25hY28vbWluL3ZzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgKCg8YW55PndpbmRvdykubW9uYWNvKSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIHRoaXMuaW5pdE1vbmFjbyh0aGlzLl9vcHRpb25zLCB0aGlzLmluc2lkZU5nKTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb25Hb3RBbWRMb2FkZXI6IGFueSA9IChyZXF1aXJlPzogYW55KSA9PiB7XHJcbiAgICAgICAgICBsZXQgdXNlZFJlcXVpcmUgPSByZXF1aXJlIHx8ICg8YW55PndpbmRvdykucmVxdWlyZTtcclxuICAgICAgICAgIGxldCByZXF1aXJlQ29uZmlnID0geyBwYXRoczogeyB2czogYCR7YmFzZVVybH1gIH0gfTtcclxuICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVxdWlyZUNvbmZpZywgdGhpcy5jb25maWcucmVxdWlyZUNvbmZpZyB8fCB7fSk7XHJcblxyXG4gICAgICAgICAgLy8gTG9hZCBtb25hY29cclxuICAgICAgICAgIHVzZWRSZXF1aXJlLmNvbmZpZyhyZXF1aXJlQ29uZmlnKTtcclxuICAgICAgICAgIHVzZWRSZXF1aXJlKFtgdnMvZWRpdG9yL2VkaXRvci5tYWluYF0sICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5vbk1vbmFjb0xvYWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5vbk1vbmFjb0xvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmluaXRNb25hY28odGhpcy5fb3B0aW9ucywgdGhpcy5pbnNpZGVOZyk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5tb25hY29SZXF1aXJlKSB7XHJcbiAgICAgICAgICBvbkdvdEFtZExvYWRlcih0aGlzLmNvbmZpZy5tb25hY29SZXF1aXJlKTtcclxuICAgICAgICAvLyBMb2FkIEFNRCBsb2FkZXIgaWYgbmVjZXNzYXJ5XHJcbiAgICAgICAgfSBlbHNlIGlmICghKDxhbnk+d2luZG93KS5yZXF1aXJlKSB7XHJcbiAgICAgICAgICBjb25zdCBsb2FkZXJTY3JpcHQ6IEhUTUxTY3JpcHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XHJcbiAgICAgICAgICBsb2FkZXJTY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xyXG4gICAgICAgICAgbG9hZGVyU2NyaXB0LnNyYyA9IGAke2Jhc2VVcmx9L2xvYWRlci5qc2A7XHJcbiAgICAgICAgICBsb2FkZXJTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHsgb25Hb3RBbWRMb2FkZXIoKTsgfSk7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxvYWRlclNjcmlwdCk7XHJcbiAgICAgICAgLy8gTG9hZCBBTUQgbG9hZGVyIHdpdGhvdXQgb3Zlci1yaWRpbmcgbm9kZSdzIHJlcXVpcmVcclxuICAgICAgICB9IGVsc2UgaWYgKCEoPGFueT53aW5kb3cpLnJlcXVpcmUuY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBzcmMgPSBgJHtiYXNlVXJsfS9sb2FkZXIuanNgO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvYWRlclJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgbG9hZGVyUmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0RWxlbS50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHRFbGVtLnRleHQgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTW9uYWNvIHVzZXMgYSBjdXN0b20gYW1kIGxvYWRlciB0aGF0IG92ZXItcmlkZXMgbm9kZSdzIHJlcXVpcmUuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gS2VlcCBhIHJlZmVyZW5jZSB0byBub2RlJ3MgcmVxdWlyZSBzbyB3ZSBjYW4gcmVzdG9yZSBpdCBhZnRlciBleGVjdXRpbmcgdGhlIGFtZCBsb2FkZXIgZmlsZS5cclxuICAgICAgICAgICAgICAgICAgICAndmFyIG5vZGVSZXF1aXJlID0gcmVxdWlyZTsnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRlclJlcXVlc3QucmVzcG9uc2VUZXh0LnJlcGxhY2UoJ1widXNlIHN0cmljdFwiOycsICcnKSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBTYXZlIE1vbmFjbydzIGFtZCByZXF1aXJlIGFuZCByZXN0b3JlIE5vZGUncyByZXF1aXJlXHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhciBtb25hY29BbWRSZXF1aXJlID0gcmVxdWlyZTsnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyZXF1aXJlID0gbm9kZVJlcXVpcmU7JyxcclxuICAgICAgICAgICAgICAgICAgICAncmVxdWlyZS5ub2RlUmVxdWlyZSA9IHJlcXVpcmU7J1xyXG4gICAgICAgICAgICAgICAgXS5qb2luKCdcXG4nKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0RWxlbSk7XHJcbiAgICAgICAgICAgICAgICBvbkdvdEFtZExvYWRlcigoPGFueT53aW5kb3cpLm1vbmFjb0FtZFJlcXVpcmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbG9hZGVyUmVxdWVzdC5vcGVuKFwiR0VUXCIsIHNyYyk7XHJcbiAgICAgICAgICAgIGxvYWRlclJlcXVlc3Quc2VuZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvbkdvdEFtZExvYWRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgaW5pdE1vbmFjbyhvcHRpb25zOiBhbnksIGluc2lkZU5nOiBib29sZWFuKTogdm9pZDtcclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5fd2luZG93UmVzaXplU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX3dpbmRvd1Jlc2l6ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xyXG4gICAgICB0aGlzLl9lZGl0b3IuZGlzcG9zZSgpO1xyXG4gICAgICB0aGlzLl9lZGl0b3IgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==