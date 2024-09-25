import { ChangeDetectionStrategy, Component, forwardRef, inject, Input, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { BaseEditor } from './base-editor';
import * as i0 from "@angular/core";
export class EditorComponent extends BaseEditor {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2VkaXRvci9zcmMvbGliL2VkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUEyQjNDLE1BQU0sT0FBTyxlQUFnQixTQUFRLFVBQVU7SUF0Qi9DOztRQXVCVSxTQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFFNUIsb0JBQWUsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ2pDLGNBQVMsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7S0EwRnRCO0lBeEZDLElBQ0ksT0FBTyxDQUFDLE9BQVk7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFD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S0FBSzt1QkFBQyxTQUFTO2dCQWNaLEtBQUs7c0JBRFIsS0FBSzt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgZm9yd2FyZFJlZiwgaW5qZWN0LCBJbnB1dCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBCYXNlRWRpdG9yIH0gZnJvbSAnLi9iYXNlLWVkaXRvcic7XHJcbmltcG9ydCB7IE5neEVkaXRvck1vZGVsIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5kZWNsYXJlIHZhciBtb25hY286IGFueTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgc2VsZWN0b3I6ICduZ3gtbW9uYWNvLWVkaXRvcicsXHJcbiAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiZWRpdG9yLWNvbnRhaW5lclwiICNlZGl0b3JDb250YWluZXI+PC9kaXY+JyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAgIDpob3N0IHtcclxuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgaGVpZ2h0OiAyMDBweDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLmVkaXRvci1jb250YWluZXIge1xyXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICBoZWlnaHQ6IDk4JTtcclxuICAgICAgfVxyXG4gIGBdLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHByb3ZpZGVyczogW3tcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRWRpdG9yQ29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbiAgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEVkaXRvckNvbXBvbmVudCBleHRlbmRzIEJhc2VFZGl0b3IgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgcHJpdmF0ZSB6b25lID0gaW5qZWN0KE5nWm9uZSk7XHJcbiAgcHJpdmF0ZSBfdmFsdWU6IHN0cmluZyA9ICcnO1xyXG5cclxuICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7fTtcclxuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgQElucHV0KCdvcHRpb25zJylcclxuICBzZXQgb3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcclxuICAgIHRoaXMuX29wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZy5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICBpZiAodGhpcy5fZWRpdG9yKSB7XHJcbiAgICAgIHRoaXMuX2VkaXRvci5kaXNwb3NlKCk7XHJcbiAgICAgIHRoaXMuaW5pdE1vbmFjbyhvcHRpb25zLCB0aGlzLmluc2lkZU5nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBvcHRpb25zKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICB9XHJcblxyXG4gIEBJbnB1dCgnbW9kZWwnKVxyXG4gIHNldCBtb2RlbChtb2RlbDogTmd4RWRpdG9yTW9kZWwpIHtcclxuICAgIHRoaXMub3B0aW9ucy5tb2RlbCA9IG1vZGVsO1xyXG4gICAgaWYgKHRoaXMuX2VkaXRvcikge1xyXG4gICAgICB0aGlzLl9lZGl0b3IuZGlzcG9zZSgpO1xyXG4gICAgICB0aGlzLmluaXRNb25hY28odGhpcy5vcHRpb25zLCB0aGlzLmluc2lkZU5nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZSB8fCAnJztcclxuICAgIC8vIEZpeCBmb3IgdmFsdWUgY2hhbmdlIHdoaWxlIGRpc3Bvc2UgaW4gcHJvY2Vzcy5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fZWRpdG9yICYmICF0aGlzLm9wdGlvbnMubW9kZWwpIHtcclxuICAgICAgICB0aGlzLl9lZGl0b3Iuc2V0VmFsdWUodGhpcy5fdmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaW5pdE1vbmFjbyhvcHRpb25zOiBhbnksIGluc2lkZU5nOiBib29sZWFuKTogdm9pZCB7XHJcblxyXG4gICAgY29uc3QgaGFzTW9kZWwgPSAhIW9wdGlvbnMubW9kZWw7XHJcblxyXG4gICAgaWYgKGhhc01vZGVsKSB7XHJcbiAgICAgIGNvbnN0IG1vZGVsID0gbW9uYWNvLmVkaXRvci5nZXRNb2RlbChvcHRpb25zLm1vZGVsLnVyaSB8fCAnJyk7XHJcbiAgICAgIGlmIChtb2RlbCkge1xyXG4gICAgICAgIG9wdGlvbnMubW9kZWwgPSBtb2RlbDtcclxuICAgICAgICBvcHRpb25zLm1vZGVsLnNldFZhbHVlKHRoaXMuX3ZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvcHRpb25zLm1vZGVsID0gbW9uYWNvLmVkaXRvci5jcmVhdGVNb2RlbChvcHRpb25zLm1vZGVsLnZhbHVlLCBvcHRpb25zLm1vZGVsLmxhbmd1YWdlLCBvcHRpb25zLm1vZGVsLnVyaSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW5zaWRlTmcpIHtcclxuICAgICAgdGhpcy5fZWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGUodGhpcy5fZWRpdG9yQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQsIG9wdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9lZGl0b3IgPSBtb25hY28uZWRpdG9yLmNyZWF0ZSh0aGlzLl9lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudCwgb3B0aW9ucyk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFoYXNNb2RlbCkge1xyXG4gICAgICB0aGlzLl9lZGl0b3Iuc2V0VmFsdWUodGhpcy5fdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2VkaXRvci5vbkRpZENoYW5nZU1vZGVsQ29udGVudCgoZTogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fZWRpdG9yLmdldFZhbHVlKCk7XHJcblxyXG4gICAgICAvLyB2YWx1ZSBpcyBub3QgcHJvcGFnYXRlZCB0byBwYXJlbnQgd2hlbiBleGVjdXRpbmcgb3V0c2lkZSB6b25lLlxyXG4gICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9lZGl0b3Iub25EaWRCbHVyRWRpdG9yV2lkZ2V0KCgpID0+IHtcclxuICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHJlZnJlc2ggbGF5b3V0IG9uIHJlc2l6ZSBldmVudC5cclxuICAgIGlmICh0aGlzLl93aW5kb3dSZXNpemVTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5fd2luZG93UmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl93aW5kb3dSZXNpemVTdWJzY3JpcHRpb24gPSBmcm9tRXZlbnQod2luZG93LCAncmVzaXplJykuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2VkaXRvci5sYXlvdXQoKSk7XHJcbiAgICB0aGlzLm9uSW5pdC5lbWl0KHRoaXMuX2VkaXRvcik7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=