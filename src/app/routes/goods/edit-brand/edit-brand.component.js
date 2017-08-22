"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var EditBrandComponent = (function () {
    function EditBrandComponent(app) {
        this.app = app;
        this.brandInfo = {};
        this.output = new core_1.EventEmitter(); // 输出值
    }
    EditBrandComponent.prototype.ngOnInit = function () {
        console.log("█ 传入值this.argument ►►►", this.val);
    };
    EditBrandComponent.prototype.closePopup = function () {
        $('.popup').slideUp(300, this.app.container.clear());
    };
    EditBrandComponent.prototype.makeSure = function () {
        this.output.emit('传出值：hello world!'); // 向外传值
    };
    return EditBrandComponent;
}());
__decorate([
    core_1.Input()
], EditBrandComponent.prototype, "val", void 0);
__decorate([
    core_1.Output()
], EditBrandComponent.prototype, "output", void 0);
EditBrandComponent = __decorate([
    core_1.Component({
        selector: 'app-edit-brand',
        templateUrl: './edit-brand.component.html',
        styleUrls: ['./edit-brand.component.scss']
    })
], EditBrandComponent);
exports.EditBrandComponent = EditBrandComponent;
