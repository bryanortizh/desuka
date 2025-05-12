import { Injectable } from "@angular/core";


@Injectable()
export class FunctionPlayerService {


    stopFunctionPlayer(stopEvent: Event): void {
        stopEvent.stopPropagation();
        console.log('Function player stopped');
    }
}