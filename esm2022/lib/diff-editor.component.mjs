import { ChangeDetectionStrategy, Component, Input, NgZone, inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { BaseEditor } from './base-editor';
import * as i0 from "@angular/core";
export class DiffEditorComponent extends BaseEditor {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZi1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvZWRpdG9yL3NyYy9saWIvZGlmZi1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXNCM0MsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFVBQVU7SUFqQm5EOztRQWtCVSxTQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBeUUvQjtJQXBFQyxJQUNJLE9BQU8sQ0FBQyxPQUFZO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkUsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQ0ksYUFBYSxDQUFDLEtBQXNCO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFD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akIvQixTQUFTO2lDQUNJLElBQUksWUFDTix3QkFBd0IsWUFDeEIsdURBQXVELG1CQVloRCx1QkFBdUIsQ0FBQyxNQUFNOzhCQVMzQyxPQUFPO3NCQURWLEtBQUs7dUJBQUMsU0FBUztnQkFjWixhQUFhO3NCQURoQixLQUFLO3VCQUFDLGVBQWU7Z0JBVWxCLGFBQWE7c0JBRGhCLEtBQUs7dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBOZ1pvbmUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEJhc2VFZGl0b3IgfSBmcm9tICcuL2Jhc2UtZWRpdG9yJztcclxuaW1wb3J0IHsgRGlmZkVkaXRvck1vZGVsIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5kZWNsYXJlIHZhciBtb25hY286IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgc2VsZWN0b3I6ICduZ3gtbW9uYWNvLWRpZmYtZWRpdG9yJyxcclxuICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJlZGl0b3ItY29udGFpbmVyXCIgI2VkaXRvckNvbnRhaW5lcj48L2Rpdj4nLFxyXG4gIHN0eWxlczogW2BcclxuICAgIDpob3N0IHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIGhlaWdodDogMjAwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmVkaXRvci1jb250YWluZXIge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgaGVpZ2h0OiA5OCU7XHJcbiAgICB9XHJcbiAgYF0sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERpZmZFZGl0b3JDb21wb25lbnQgZXh0ZW5kcyBCYXNlRWRpdG9yIHtcclxuICBwcml2YXRlIHpvbmUgPSBpbmplY3QoTmdab25lKTtcclxuXHJcbiAgX29yaWdpbmFsTW9kZWw6IERpZmZFZGl0b3JNb2RlbDtcclxuICBfbW9kaWZpZWRNb2RlbDogRGlmZkVkaXRvck1vZGVsO1xyXG5cclxuICBASW5wdXQoJ29wdGlvbnMnKVxyXG4gIHNldCBvcHRpb25zKG9wdGlvbnM6IGFueSkge1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29uZmlnLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcclxuICAgIGlmICh0aGlzLl9lZGl0b3IpIHtcclxuICAgICAgdGhpcy5fZWRpdG9yLmRpc3Bvc2UoKTtcclxuICAgICAgdGhpcy5pbml0TW9uYWNvKG9wdGlvbnMsIHRoaXMuaW5zaWRlTmcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IG9wdGlvbnMoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCdvcmlnaW5hbE1vZGVsJylcclxuICBzZXQgb3JpZ2luYWxNb2RlbChtb2RlbDogRGlmZkVkaXRvck1vZGVsKSB7XHJcbiAgICB0aGlzLl9vcmlnaW5hbE1vZGVsID0gbW9kZWw7XHJcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XHJcbiAgICAgIHRoaXMuX2VkaXRvci5kaXNwb3NlKCk7XHJcbiAgICAgIHRoaXMuaW5pdE1vbmFjbyh0aGlzLm9wdGlvbnMsIHRoaXMuaW5zaWRlTmcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KCdtb2RpZmllZE1vZGVsJylcclxuICBzZXQgbW9kaWZpZWRNb2RlbChtb2RlbDogRGlmZkVkaXRvck1vZGVsKSB7XHJcbiAgICB0aGlzLl9tb2RpZmllZE1vZGVsID0gbW9kZWw7XHJcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XHJcbiAgICAgIHRoaXMuX2VkaXRvci5kaXNwb3NlKCk7XHJcbiAgICAgIHRoaXMuaW5pdE1vbmFjbyh0aGlzLm9wdGlvbnMsIHRoaXMuaW5zaWRlTmcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGluaXRNb25hY28ob3B0aW9uczogYW55LCBpbnNpZGVOZzogYm9vbGVhbik6IHZvaWQge1xyXG5cclxuICAgIGlmICghdGhpcy5fb3JpZ2luYWxNb2RlbCB8fCAhdGhpcy5fbW9kaWZpZWRNb2RlbCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29yaWdpbmFsTW9kZWwgb3IgbW9kaWZpZWRNb2RlbCBub3QgZm91bmQgZm9yIG5neC1tb25hY28tZGlmZi1lZGl0b3InKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9vcmlnaW5hbE1vZGVsLmxhbmd1YWdlID0gdGhpcy5fb3JpZ2luYWxNb2RlbC5sYW5ndWFnZSB8fCBvcHRpb25zLmxhbmd1YWdlO1xyXG4gICAgdGhpcy5fbW9kaWZpZWRNb2RlbC5sYW5ndWFnZSA9IHRoaXMuX21vZGlmaWVkTW9kZWwubGFuZ3VhZ2UgfHwgb3B0aW9ucy5sYW5ndWFnZTtcclxuXHJcbiAgICBsZXQgb3JpZ2luYWxNb2RlbCA9IG1vbmFjby5lZGl0b3IuY3JlYXRlTW9kZWwodGhpcy5fb3JpZ2luYWxNb2RlbC5jb2RlLCB0aGlzLl9vcmlnaW5hbE1vZGVsLmxhbmd1YWdlKTtcclxuICAgIGxldCBtb2RpZmllZE1vZGVsID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbCh0aGlzLl9tb2RpZmllZE1vZGVsLmNvZGUsIHRoaXMuX21vZGlmaWVkTW9kZWwubGFuZ3VhZ2UpO1xyXG5cclxuICAgIHRoaXMuX2VkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgY29uc3QgdGhlbWUgPSBvcHRpb25zLnRoZW1lO1xyXG5cclxuICAgIGlmIChpbnNpZGVOZykge1xyXG4gICAgICB0aGlzLl9lZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZURpZmZFZGl0b3IodGhpcy5fZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsIG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9lZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZURpZmZFZGl0b3IodGhpcy5fZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsIG9wdGlvbnMpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbnMudGhlbWUgPSB0aGVtZTtcclxuICAgIHRoaXMuX2VkaXRvci5zZXRNb2RlbCh7XHJcbiAgICAgIG9yaWdpbmFsOiBvcmlnaW5hbE1vZGVsLFxyXG4gICAgICBtb2RpZmllZDogbW9kaWZpZWRNb2RlbFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gcmVmcmVzaCBsYXlvdXQgb24gcmVzaXplIGV2ZW50LlxyXG4gICAgaWYgKHRoaXMuX3dpbmRvd1Jlc2l6ZVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLl93aW5kb3dSZXNpemVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3dpbmRvd1Jlc2l6ZVN1YnNjcmlwdGlvbiA9IGZyb21FdmVudCh3aW5kb3csICdyZXNpemUnKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fZWRpdG9yLmxheW91dCgpKTtcclxuICAgIHRoaXMub25Jbml0LmVtaXQodGhpcy5fZWRpdG9yKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==