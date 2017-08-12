/**
 * 分页对象
 */
export class Page {
  curPage: number;
  lastPage: boolean;
  needCountQuery: boolean;
  pageSize: number;
  params: any;
  sortColumns: string;
  totalPage: number;
  totalRow: number;
  voList: any;

  constructor(data?:any) {
      if(data){
          this.curPage = data.curPage;
          this.lastPage = data.lastPage;
          this.needCountQuery = data.needCountQuery;
          this.pageSize = data.pageSize;
          this.params = data.params;
          this.sortColumns = data.sortColumns;
          this.totalPage = data.totalPage;
          this.totalRow = data.totalRow;
          this.voList = data.voList;
      }
  }

  public genStartRow(){
    return (this.curPage - 1) * this.pageSize + 1;
  }

  public genEndRow(){
    return this.curPage * this.pageSize;
  }
}
