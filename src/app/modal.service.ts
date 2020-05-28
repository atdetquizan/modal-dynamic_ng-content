import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  Inject,
  TemplateRef,
  Type
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ModalComponent } from "./modal/modal.component";
import { ModalConfig } from "./shared/config";
import { ModalRef } from "./shared/modal-ref";

export type Content<T> = string | TemplateRef<T> | Type<T>;

@Injectable()
export class ModalService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open<T>(content: Content<T>, config?: ModalConfig) {
    /**
     * The WeakMap object is a collection of key / value pairs
     * in which the keys are objects and the values ​​are arbitrary values.
     */
    const map = new WeakMap();
    map.set(ModalConfig, config);
    /**
     * ModalRef events
     */
    const dialogRef = new ModalRef();
    map.set(ModalRef, dialogRef);

    const factory = this.resolver.resolveComponentFactory(ModalComponent);
    const ngContent = this.resolveNgContent(content);
    const componentRef = factory.create(this.injector, ngContent);

    componentRef.hostView.detectChanges();

    const { nativeElement } = componentRef.location;
    this.document.body.appendChild(nativeElement);

    /**
     * Remove modal component of body
     */
    const sub = dialogRef.afterClosed.subscribe(() => {
      document.querySelector(nativeElement.tagName).remove();
      componentRef.destroy();
      sub.unsubscribe();
    });

    // setTimeout(() => {
    //     document.querySelector(nativeElement.tagName).remove();
    //     componentRef.destroy();
    // }, 1000);
  }

  resolveNgContent<T>(content: Content<T>) {
    if (typeof content === "string") {
      const element = this.document.createTextNode(content);
      return [[element]];
    }

    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(null);
      console.log(viewRef);
      // In earlier versions, you may need to add this line
      // this.appRef.attachView(viewRef);
      return [viewRef.rootNodes];
    }

    const factory = this.resolver.resolveComponentFactory(content);
    const componentRef = factory.create(this.injector);
    return [
      [componentRef.location.nativeElement],
      [this.document.createTextNode("Second ng-content")]
    ];
  }
}
