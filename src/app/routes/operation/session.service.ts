import {Injectable} from '@angular/core';
import {isObject} from 'rxjs/util/isObject';
import {isString} from 'util';
import {isArray} from 'rxjs/util/isArray';
import {Router} from '@angular/router';


@Injectable()
export class SessionService {
  public user = 'userList';
  public admin = 'adminList';
  public data = 'dataList';
  public checkOptions = 'checkOptionsOnes';


  public _preId = 'Y';  // 定义本地存储数据库前缀
  public _timeSign = '-'; // 时间戳与存储数据之间的拼接符号
  public status = {
    SUCCESS: 0, // 成功
    FAILURE: 1, // 失败
    OVERFLOW: 2, // 溢出
    TIMEOUT: 3 // 过期
  };
  public _storage = sessionStorage || window.sessionStorage;

  constructor() {
  }

  public getKey(key: string) {
    return this._preId + key;
  }

  /**
   *
   * @param key 数据字段
   * @param value 数据值
   * @param time 添加时间
   */
  public set(key: string, value, time?: any) {
    let status: number = this.status.SUCCESS;
    if (isObject(value)) {
      try {
        value = JSON.stringify(value);
      } catch (e) {
        // 不能转成json字符串
        return Promise.reject(e);
      }
    }
    key = this.getKey(key); // 获取真实key;
    // console.log(key);
    try {
      // 获取时间戳
      time = new Date(time).getTime() || time.getTime();
    } catch (e) {
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31;
    }
    try {
      this._storage.setItem(key, time + this._timeSign + value);
    } catch (e) {
      status = this.status.OVERFLOW;
    }
    return new Promise((resolve, reject) => {
      if (!status) {
        // 成功
        resolve(value);
      } else {
        // 失败
        reject(status);
      }
    });
  }

  /**
   *
   * @param key 数据字段
   * @param type 返回的数据类型 json string
   * @param async 是否使用Promise
   * @returns {any}
   */
  public get(key: string, type?: string, async?: boolean) {
    let status: number = this.status.FAILURE,
      value = null,
      index,
      time,
      result;
    key = this.getKey(key);  // 获取真实key
    // console.log(async);
    const timeSingLen = this._timeSign.length;
    try {
      value = this._storage.getItem(key);
    } catch (e) {
      result = {
        status: this.status.FAILURE,
        value: null
      };
      if (async === undefined || async) {
        return Promise.reject(result);
      }
      // callback && callback.call(this, result.status, result.value);
    }
    if (value) {
      // 获取时间戳与存储数据之间的拼接符起始位置
      index = value.indexOf(this._timeSign);
      // 获取时间戳
      time = +value.slice(0, index); // 转为数字
      if (new Date(time).getTime() > new Date().getTime() || time === 0) {
        value = value.slice(index + timeSingLen);
        if (type === 'json') {
          try {
            value = JSON.parse(value);
            status = this.status.SUCCESS;
          } catch (e) {
            // 解析json出错
            if (async === undefined || async) {
              status = this.status.FAILURE;
              return Promise.reject(e);
            } else {
              throw Error(e);
            }
          }
        } else {
          if (value) {
            status = this.status.SUCCESS;
          }
        }
      } else {
        // 过期则结果为null
        value = null;
        // 标记为过期
        status = this.status.TIMEOUT;
        // 删除该字段
        this.remove(key);
      }
    } else {
      // 未获取字符串标记为失败状态
      status = this.status.FAILURE;
    }
    result = {
      status: status,
      value: value
    };
    // callback && callback.call(this, result.status, result.value);
    if ((async === undefined || async)) {
      return Promise.resolve(value);
    } else {
      return result;
    }
  }

  /**
   * 异步获取
   * @param key
   * @param type
   * @returns {Promise<never>|Promise<T>|any}
   */
  public asyncGet(key: string, type?: string): Promise<any> {
    return type === undefined || !type ? this.get(key, 'string') : this.get(key, type);
  }

  /**
   * 同步获取
   * @param key
   * @param type
   * @returns {Promise<never>|Promise<never>|Promise<T>|any}
   */
  public disAsyncGet(key: string, type?: string): { status: number, value: any } {
    return this.get(key, type === undefined || !type ? 'string' : 'json', false);
  }

  /**
   *
   * @param key 数据字段
   */
  public remove(key: string, isAsync = true): any {
    let status: number = this.status.FAILURE,
      value = null;
    key = this.getKey(key);

    try {
      value = this._storage.getItem(key);
    } catch (e) {
      // 获取时候发生异常
      status = this.status.FAILURE;
    }
    if (value) {
      try {
        this._storage.removeItem(key);
        status = this.status.SUCCESS;
      } catch (e) {
        // 删除时候发生异常
        status = this.status.FAILURE;
      }
    }
    if (isAsync) {
      return new Promise((resolve, reject) => {
        !status ? resolve(true) : resolve(false);
      });
    } else {
      return status;
    }
  }

  public clear(): void {
    return this._storage.clear();
  }

  hasKey(key) {
    let status: number = this.status.SUCCESS,
      result = false;
    key = this.getKey(key);
    try {
      result = !!this._storage.getItem(key);
    } catch (e) {
      // 获取时候发生异常
      status = this.status.FAILURE;
    }
    return result;
  }


  /* ------------------------------------删除----------------------------------------------  */

  batchRemove(keys: Array<string> = []): boolean {
    let count = 0;
    keys.forEach(item => {
      if (this.deleteIsOk(item)) {
        count++;
      }
    });
    return keys.length === count;
  }

  removeData(index): boolean {
    return this.deleteIsOk(this.data + index);
  }

  removeAll() {
    return this.clear();
  }


  /* ------------------------------------获取----------------------------------------------------- */

  getDatas(index, type = 'json') {
    return this.getData(this.data + index, type);
  }

  getCheck(index, type = 'json') {
    return this.getData(this.checkOptions + index, type);
  }


  /* ----------------------------------设置--------------------------------------- */


  setData(index, value) {
    this.set(this.data + index, value);
  }

  setCheck(index, value) {
    this.set(this.checkOptions + index, value);
  }


  public getData(key, type = 'json') {
    if (this.hasKey(key)) {
      const data = this.disAsyncGet(key, type);
      if (!data.status) {
        return data.value;
      }
    }
    return 'null';
  }

  public deleteIsOk(key: string): boolean {
    return (this.hasKey(key) && !this.remove(key, false))
      || !this.hasKey(key);
  }


}
