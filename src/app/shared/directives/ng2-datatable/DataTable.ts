import {
    Directive, Input, EventEmitter, SimpleChange, OnChanges, DoCheck, IterableDiffers,
    IterableDiffer, Output
} from "@angular/core";
import * as _ from "lodash";
import {ReplaySubject} from "rxjs/Rx";

export interface SortEvent {
    sortBy: string|string[];
    sortOrder: string
}

export interface PageEvent {
    event: string;
    activePage: number;
    rowsOnPage: number;
    dataLength: number;
}

export interface DataEvent {
    length: number;
}

@Directive({
    selector: 'table[rzhData]',
    exportAs: 'rzhDataTable'
})
export class DataTable implements OnChanges{

    @Input("rzhData") public inputData: any = {};
    public totalRow: number = 0;
    public rowsOnPage = 20;
    public activePage = 1;

    @Input("sortBy") public sortBy: string|string[] = "";
    @Input("sortOrder") public sortOrder = "asc";
    @Output("sortByChange") public sortByChange = new EventEmitter<string|string[]>();
    @Output("sortOrderChange") public sortOrderChange = new EventEmitter<string>();
    @Output("pageChange") public pageChange = new EventEmitter<PageEvent>();

    private mustRecalculateData = false;

    public data: any[];

    public onSortChange = new ReplaySubject<SortEvent>(1);
    public pageInit = new EventEmitter<PageEvent>();

    public constructor(private differs: IterableDiffers) {
    }

    public getSort(): SortEvent {
        return {sortBy: this.sortBy, sortOrder: this.sortOrder};
    }

    public setSort(sortBy: string|string[], sortOrder: string): void {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = _.includes(["asc","desc"], sortOrder) ? sortOrder : "asc";
            this.mustRecalculateData = true;
            this.onSortChange.next({sortBy: sortBy, sortOrder: sortOrder});
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    }

    public getPage(): PageEvent {
        return {event:'getpage',activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.totalRow};
    }

    public setPage(activePage: number, rowsOnPage: number): void {
        // console.log("setPage执行",this.rowsOnPage,rowsOnPage,this.activePage,activePage);
        if (this.rowsOnPage !== rowsOnPage || this.activePage !== activePage) {
            if(isNaN(activePage)){
                this.activePage = 1;
            }else{
                this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.rowsOnPage, rowsOnPage);
            }
            this.rowsOnPage = rowsOnPage;
            // console.log("activePage",this.activePage);
            // console.log("this.mfTable.pageInit",this.pageInit);
            // console.log("this.mfTable.onPageChange",this.pageChange);
            this.pageChange.emit({
              event:"pageChange",
              activePage: this.activePage,
              rowsOnPage: this.rowsOnPage,
              dataLength: this.totalRow
            });
        }
        this.data = this.inputData.voList;
    }

    private calculateNewActivePage(previousRowsOnPage: number, currentRowsOnPage: number): number {
        let firstRowOnPage = (this.activePage - 1) * previousRowsOnPage + 1;
        let newActivePage = Math.ceil(firstRowOnPage / currentRowsOnPage);
        return isNaN(newActivePage)?1:newActivePage;
      // return newActivePage;
    }

    private recalculatePage() {
        let lastPage = Math.ceil(this.totalRow / this.rowsOnPage);
        this.activePage = lastPage < this.activePage ? lastPage : this.activePage;
        this.activePage = this.activePage || 1;
        // console.log("初始化页面");
        this.pageInit.emit({
            event:"pageInit",
            activePage: this.activePage,
            rowsOnPage: this.rowsOnPage,
            dataLength: this.totalRow
        });
        this.data = this.inputData.voList;
    }
    private initParams(){
      this.activePage = this.inputData.curPage;
      this.totalRow = this.inputData.totalRow;
      this.rowsOnPage = this.inputData.pageSize;
    }

    public ngOnChanges(changes: {[key: string]: SimpleChange}): any {
        // console.log("onchange",changes)
        if (changes["rowsOnPage"]) {
              if(typeof changes["rowsOnPage"].previousValue !=="undefined"){
                // console.log('changes["rowsOnPage"].currentValue',changes["rowsOnPage"].currentValue);
                this.rowsOnPage = changes["rowsOnPage"].previousValue;
                this.setPage(this.activePage, changes["rowsOnPage"].currentValue);
              }
        }

        if (changes["sortBy"] || changes["sortOrder"]) {
            if (!_.includes(["asc", "desc"], this.sortOrder)) {
                console.warn("angular2-datatable: value for input mfSortOrder must be one of ['asc', 'desc'], but is:", this.sortOrder);
                this.sortOrder = "asc";
            }
            if (this.sortBy) {
                this.onSortChange.next({sortBy: this.sortBy, sortOrder: this.sortOrder});
            }
            this.mustRecalculateData = true;
        }
        if(changes["activePage"]){
          if(!changes["inputData"].firstChange){
              this.setPage(this.activePage, this.rowsOnPage);
              return;
          }
        }
        if (changes["inputData"]) {
            this.inputData = changes["inputData"].currentValue || [];
            this.initParams();
            this.recalculatePage();
        }
    }

    // private fillData(): void {
    //     this.activePage = this.activePage;
    //     this.rowsOnPage = this.rowsOnPage;
	//
    //     let offset = (this.activePage - 1) * this.rowsOnPage;
    //     let data = this.inputData;
    //     var sortBy = this.sortBy;
    //     if (typeof sortBy === 'string' || sortBy instanceof String) {
    //         data = _.orderBy(data, this.caseInsensitiveIteratee(<string>sortBy), [this.sortOrder]);
    //     } else {
    //         data = _.orderBy(data, sortBy, [this.sortOrder]);
    //     }
    //     data = _.slice(data, offset, offset + this.rowsOnPage);
    //     this.data = data;
    // }

    private caseInsensitiveIteratee(sortBy: string) {
        return (row: any): any => {
            var value = row;
            for (let sortByProperty of sortBy.split('.')) {
                if(value) {
                    value = value[sortByProperty];
                }
            }
            if (value && typeof value === 'string' || value instanceof String) {
                return value.toLowerCase();
            }
            return value;
        };
    }
}
