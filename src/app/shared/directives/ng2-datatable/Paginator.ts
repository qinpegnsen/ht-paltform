import {Component, Input, SimpleChange, OnChanges, Optional, OnInit} from "@angular/core";
import {DataTable, PageEvent} from "./DataTable";

@Component({
    selector: "mfPaginator",
    template: `<ng-content></ng-content>`
})
export class Paginator implements OnInit {


  @Input("mfTable") inputMfTable: DataTable;

    public mfTable: DataTable;

    public activePage: number;
    public rowsOnPage: number;
    public dataLength: number = 0;
    public lastPage: number;

    public constructor(@Optional() public injectMfTable: DataTable) {
    }
    ngOnInit(): void {
        window.setTimeout(()=>{
          this.mfTable = this.inputMfTable || this.injectMfTable;
          this.onSubscriber(this.mfTable.getPage());
          this.mfTable.pageInit.subscribe(this.onSubscriber);
        },500);
    }

    public setPage(pageNumber: number): void {
        this.mfTable.setPage(pageNumber, this.rowsOnPage);
    }

    public setRowsOnPage(rowsOnPage: number): void {
        this.mfTable.setPage(this.activePage, rowsOnPage);
    }

    public onSubscriber = (event: PageEvent)=> {
        this.activePage = event.activePage;
        this.rowsOnPage = event.rowsOnPage;
        this.dataLength = event.dataLength;
        this.lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
    };
}
