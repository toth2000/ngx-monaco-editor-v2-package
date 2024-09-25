import { CommonModule } from '@angular/common';
import { NgModule, makeEnvironmentProviders } from '@angular/core';
import { NGX_MONACO_EDITOR_CONFIG } from './config';
import { DiffEditorComponent } from './diff-editor.component';
import { EditorComponent } from './editor.component';
import * as i0 from "@angular/core";
export class MonacoEditorModule {
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
export function provideMonacoEditor(config = {}) {
    return makeEnvironmentProviders([
        { provide: NGX_MONACO_EDITOR_CONFIG, useValue: config }
    ]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2VkaXRvci9zcmMvbGliL2VkaXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXhGLE9BQU8sRUFBRSx3QkFBd0IsRUFBeUIsTUFBTSxVQUFVLENBQUM7QUFDM0UsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQWFyRCxNQUFNLE9BQU8sa0JBQWtCO0lBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBZ0MsRUFBRTtRQUN0RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTthQUN4RDtTQUNGLENBQUM7SUFDSixDQUFDOzhHQVJVLGtCQUFrQjsrR0FBbEIsa0JBQWtCLFlBVDNCLFlBQVk7WUFDWixlQUFlO1lBQ2YsbUJBQW1CLGFBR25CLGVBQWU7WUFDZixtQkFBbUI7K0dBR1Ysa0JBQWtCLFlBVDNCLFlBQVk7OzJGQVNILGtCQUFrQjtrQkFYOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLG1CQUFtQjtxQkFDcEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2YsbUJBQW1CO3FCQUNwQjtpQkFDRjs7QUFZRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsU0FBZ0MsRUFBRTtJQUNwRSxPQUFPLHdCQUF3QixDQUFDO1FBQzlCLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7S0FDeEQsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlLCBtYWtlRW52aXJvbm1lbnRQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5HWF9NT05BQ09fRURJVE9SX0NPTkZJRywgTmd4TW9uYWNvRWRpdG9yQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xyXG5pbXBvcnQgeyBEaWZmRWRpdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9kaWZmLWVkaXRvci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBFZGl0b3JDb21wb25lbnQgfSBmcm9tICcuL2VkaXRvci5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBFZGl0b3JDb21wb25lbnQsXHJcbiAgICBEaWZmRWRpdG9yQ29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBFZGl0b3JDb21wb25lbnQsXHJcbiAgICBEaWZmRWRpdG9yQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9uYWNvRWRpdG9yTW9kdWxlIHtcclxuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlnOiBOZ3hNb25hY29FZGl0b3JDb25maWcgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TW9uYWNvRWRpdG9yTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogTW9uYWNvRWRpdG9yTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7IHByb3ZpZGU6IE5HWF9NT05BQ09fRURJVE9SX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9XHJcbiAgICAgIF1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZU1vbmFjb0VkaXRvcihjb25maWc6IE5neE1vbmFjb0VkaXRvckNvbmZpZyA9IHt9KSB7XHJcbiAgcmV0dXJuIG1ha2VFbnZpcm9ubWVudFByb3ZpZGVycyhbXHJcbiAgICB7IHByb3ZpZGU6IE5HWF9NT05BQ09fRURJVE9SX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9XHJcbiAgXSk7XHJcbn1cclxuIl19