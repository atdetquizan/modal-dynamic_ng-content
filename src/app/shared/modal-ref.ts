import { Observable, Subject } from "rxjs";

export class ModalRef {
    /**
     * Creates an instance of neyhaz modal ref.
     */
    constructor() {}
    /**
     * Closes neyhaz modal ref
     * @param [result]
     */
    close(result?: any) {
        this._afterClosed.next(result);
    }
    /**
     * After closed of neyhaz modal ref
     */
    private readonly _afterClosed = new Subject<any>();
    /**
     * After closed of neyhaz modal ref
     */
    afterClosed: Observable<any> = this._afterClosed.asObservable();
}
