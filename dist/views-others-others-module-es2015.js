(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-others-others-module"],{

/***/ "./node_modules/ng2-file-upload/file-upload/file-drop.directive.js":
/*!*************************************************************************!*\
  !*** ./node_modules/ng2-file-upload/file-upload/file-drop.directive.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var file_uploader_class_1 = __webpack_require__(/*! ./file-uploader.class */ "./node_modules/ng2-file-upload/file-upload/file-uploader.class.js");
var FileDropDirective = (function () {
    function FileDropDirective(element) {
        this.fileOver = new core_1.EventEmitter();
        this.onFileDrop = new core_1.EventEmitter();
        this.element = element;
    }
    FileDropDirective.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileDropDirective.prototype.getFilters = function () {
        return {};
    };
    FileDropDirective.prototype.onDrop = function (event) {
        var transfer = this._getTransfer(event);
        if (!transfer) {
            return;
        }
        var options = this.getOptions();
        var filters = this.getFilters();
        this._preventAndStop(event);
        this.uploader.addToQueue(transfer.files, options, filters);
        this.fileOver.emit(false);
        this.onFileDrop.emit(transfer.files);
    };
    FileDropDirective.prototype.onDragOver = function (event) {
        var transfer = this._getTransfer(event);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._preventAndStop(event);
        this.fileOver.emit(true);
    };
    FileDropDirective.prototype.onDragLeave = function (event) {
        if (this.element) {
            if (event.currentTarget === this.element[0]) {
                return;
            }
        }
        this._preventAndStop(event);
        this.fileOver.emit(false);
    };
    FileDropDirective.prototype._getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
    };
    FileDropDirective.prototype._preventAndStop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    FileDropDirective.prototype._haveFiles = function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        else if (types.contains) {
            return types.contains('Files');
        }
        else {
            return false;
        }
    };
    return FileDropDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", file_uploader_class_1.FileUploader)
], FileDropDirective.prototype, "uploader", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileDropDirective.prototype, "fileOver", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileDropDirective.prototype, "onFileDrop", void 0);
__decorate([
    core_1.HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDrop", null);
__decorate([
    core_1.HostListener('dragover', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileDropDirective.prototype, "onDragOver", null);
__decorate([
    core_1.HostListener('dragleave', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], FileDropDirective.prototype, "onDragLeave", null);
FileDropDirective = __decorate([
    core_1.Directive({ selector: '[ng2FileDrop]' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], FileDropDirective);
exports.FileDropDirective = FileDropDirective;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-item.class.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ng2-file-upload/file-upload/file-item.class.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var file_like_object_class_1 = __webpack_require__(/*! ./file-like-object.class */ "./node_modules/ng2-file-upload/file-upload/file-like-object.class.js");
var FileItem = (function () {
    function FileItem(uploader, some, options) {
        this.url = '/';
        this.headers = [];
        this.withCredentials = true;
        this.formData = [];
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.uploader = uploader;
        this.some = some;
        this.options = options;
        this.file = new file_like_object_class_1.FileLikeObject(some);
        this._file = some;
        if (uploader.options) {
            this.method = uploader.options.method || 'POST';
            this.alias = uploader.options.itemAlias || 'file';
        }
        this.url = uploader.options.url;
    }
    FileItem.prototype.upload = function () {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, {});
            this.uploader._onErrorItem(this, '', 0, {});
        }
    };
    FileItem.prototype.cancel = function () {
        this.uploader.cancelItem(this);
    };
    FileItem.prototype.remove = function () {
        this.uploader.removeFromQueue(this);
    };
    FileItem.prototype.onBeforeUpload = function () {
        return void 0;
    };
    FileItem.prototype.onBuildForm = function (form) {
        return { form: form };
    };
    FileItem.prototype.onProgress = function (progress) {
        return { progress: progress };
    };
    FileItem.prototype.onSuccess = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onError = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onCancel = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype.onComplete = function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    FileItem.prototype._onBeforeUpload = function () {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    };
    FileItem.prototype._onBuildForm = function (form) {
        this.onBuildForm(form);
    };
    FileItem.prototype._onProgress = function (progress) {
        this.progress = progress;
        this.onProgress(progress);
    };
    FileItem.prototype._onSuccess = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        this.onSuccess(response, status, headers);
    };
    FileItem.prototype._onError = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        this.onError(response, status, headers);
    };
    FileItem.prototype._onCancel = function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.onCancel(response, status, headers);
    };
    FileItem.prototype._onComplete = function (response, status, headers) {
        this.onComplete(response, status, headers);
        if (this.uploader.options.removeAfterUpload) {
            this.remove();
        }
    };
    FileItem.prototype._prepareToUploading = function () {
        this.index = this.index || ++this.uploader._nextIndex;
        this.isReady = true;
    };
    return FileItem;
}());
exports.FileItem = FileItem;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-like-object.class.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ng2-file-upload/file-upload/file-like-object.class.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isElement(node) {
    return !!(node && (node.nodeName || node.prop && node.attr && node.find));
}
var FileLikeObject = (function () {
    function FileLikeObject(fileOrInput) {
        this.rawFile = fileOrInput;
        var isInput = isElement(fileOrInput);
        var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        var postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        var method = '_createFrom' + postfix;
        this[method](fakePathOrObject);
    }
    FileLikeObject.prototype._createFromFakePath = function (path) {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    };
    FileLikeObject.prototype._createFromObject = function (object) {
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    };
    return FileLikeObject;
}());
exports.FileLikeObject = FileLikeObject;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-select.directive.js":
/*!***************************************************************************!*\
  !*** ./node_modules/ng2-file-upload/file-upload/file-select.directive.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var file_uploader_class_1 = __webpack_require__(/*! ./file-uploader.class */ "./node_modules/ng2-file-upload/file-upload/file-uploader.class.js");
var FileSelectDirective = (function () {
    function FileSelectDirective(element) {
        this.onFileSelected = new core_1.EventEmitter();
        this.element = element;
    }
    FileSelectDirective.prototype.getOptions = function () {
        return this.uploader.options;
    };
    FileSelectDirective.prototype.getFilters = function () {
        return {};
    };
    FileSelectDirective.prototype.isEmptyAfterSelection = function () {
        return !!this.element.nativeElement.attributes.multiple;
    };
    FileSelectDirective.prototype.onChange = function () {
        var files = this.element.nativeElement.files;
        var options = this.getOptions();
        var filters = this.getFilters();
        this.uploader.addToQueue(files, options, filters);
        this.onFileSelected.emit(files);
        if (this.isEmptyAfterSelection()) {
            this.element.nativeElement.value = '';
        }
    };
    return FileSelectDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", file_uploader_class_1.FileUploader)
], FileSelectDirective.prototype, "uploader", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FileSelectDirective.prototype, "onFileSelected", void 0);
__decorate([
    core_1.HostListener('change'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], FileSelectDirective.prototype, "onChange", null);
FileSelectDirective = __decorate([
    core_1.Directive({ selector: '[ng2FileSelect]' }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], FileSelectDirective);
exports.FileSelectDirective = FileSelectDirective;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-type.class.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ng2-file-upload/file-upload/file-type.class.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FileType = (function () {
    function FileType() {
    }
    FileType.getMimeClass = function (file) {
        var mimeClass = 'application';
        if (this.mime_psd.indexOf(file.type) !== -1) {
            mimeClass = 'image';
        }
        else if (file.type.match('image.*')) {
            mimeClass = 'image';
        }
        else if (file.type.match('video.*')) {
            mimeClass = 'video';
        }
        else if (file.type.match('audio.*')) {
            mimeClass = 'audio';
        }
        else if (file.type === 'application/pdf') {
            mimeClass = 'pdf';
        }
        else if (this.mime_compress.indexOf(file.type) !== -1) {
            mimeClass = 'compress';
        }
        else if (this.mime_doc.indexOf(file.type) !== -1) {
            mimeClass = 'doc';
        }
        else if (this.mime_xsl.indexOf(file.type) !== -1) {
            mimeClass = 'xls';
        }
        else if (this.mime_ppt.indexOf(file.type) !== -1) {
            mimeClass = 'ppt';
        }
        if (mimeClass === 'application') {
            mimeClass = this.fileTypeDetection(file.name);
        }
        return mimeClass;
    };
    FileType.fileTypeDetection = function (inputFilename) {
        var types = {
            'jpg': 'image',
            'jpeg': 'image',
            'tif': 'image',
            'psd': 'image',
            'bmp': 'image',
            'png': 'image',
            'nef': 'image',
            'tiff': 'image',
            'cr2': 'image',
            'dwg': 'image',
            'cdr': 'image',
            'ai': 'image',
            'indd': 'image',
            'pin': 'image',
            'cdp': 'image',
            'skp': 'image',
            'stp': 'image',
            '3dm': 'image',
            'mp3': 'audio',
            'wav': 'audio',
            'wma': 'audio',
            'mod': 'audio',
            'm4a': 'audio',
            'compress': 'compress',
            'zip': 'compress',
            'rar': 'compress',
            '7z': 'compress',
            'lz': 'compress',
            'z01': 'compress',
            'pdf': 'pdf',
            'xls': 'xls',
            'xlsx': 'xls',
            'ods': 'xls',
            'mp4': 'video',
            'avi': 'video',
            'wmv': 'video',
            'mpg': 'video',
            'mts': 'video',
            'flv': 'video',
            '3gp': 'video',
            'vob': 'video',
            'm4v': 'video',
            'mpeg': 'video',
            'm2ts': 'video',
            'mov': 'video',
            'doc': 'doc',
            'docx': 'doc',
            'eps': 'doc',
            'txt': 'doc',
            'odt': 'doc',
            'rtf': 'doc',
            'ppt': 'ppt',
            'pptx': 'ppt',
            'pps': 'ppt',
            'ppsx': 'ppt',
            'odp': 'ppt'
        };
        var chunks = inputFilename.split('.');
        if (chunks.length < 2) {
            return 'application';
        }
        var extension = chunks[chunks.length - 1].toLowerCase();
        if (types[extension] === undefined) {
            return 'application';
        }
        else {
            return types[extension];
        }
    };
    return FileType;
}());
/*  MS office  */
FileType.mime_doc = [
    'application/msword',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    'application/vnd.ms-word.document.macroEnabled.12',
    'application/vnd.ms-word.template.macroEnabled.12'
];
FileType.mime_xsl = [
    'application/vnd.ms-excel',
    'application/vnd.ms-excel',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.ms-excel.template.macroEnabled.12',
    'application/vnd.ms-excel.addin.macroEnabled.12',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
];
FileType.mime_ppt = [
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.presentationml.template',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.ms-powerpoint.addin.macroEnabled.12',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
];
/* PSD */
FileType.mime_psd = [
    'image/photoshop',
    'image/x-photoshop',
    'image/psd',
    'application/photoshop',
    'application/psd',
    'zz-application/zz-winassoc-psd'
];
/* Compressed files */
FileType.mime_compress = [
    'application/x-gtar',
    'application/x-gcompress',
    'application/compress',
    'application/x-tar',
    'application/x-rar-compressed',
    'application/octet-stream'
];
exports.FileType = FileType;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-upload.module.js":
/*!************************************************************************!*\
  !*** ./node_modules/ng2-file-upload/file-upload/file-upload.module.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var common_1 = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var file_drop_directive_1 = __webpack_require__(/*! ./file-drop.directive */ "./node_modules/ng2-file-upload/file-upload/file-drop.directive.js");
var file_select_directive_1 = __webpack_require__(/*! ./file-select.directive */ "./node_modules/ng2-file-upload/file-upload/file-select.directive.js");
var FileUploadModule = (function () {
    function FileUploadModule() {
    }
    return FileUploadModule;
}());
FileUploadModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [file_drop_directive_1.FileDropDirective, file_select_directive_1.FileSelectDirective],
        exports: [file_drop_directive_1.FileDropDirective, file_select_directive_1.FileSelectDirective]
    })
], FileUploadModule);
exports.FileUploadModule = FileUploadModule;


/***/ }),

/***/ "./node_modules/ng2-file-upload/file-upload/file-uploader.class.js":
/*!*************************************************************************!*\
  !*** ./node_modules/ng2-file-upload/file-upload/file-uploader.class.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var file_like_object_class_1 = __webpack_require__(/*! ./file-like-object.class */ "./node_modules/ng2-file-upload/file-upload/file-like-object.class.js");
var file_item_class_1 = __webpack_require__(/*! ./file-item.class */ "./node_modules/ng2-file-upload/file-upload/file-item.class.js");
var file_type_class_1 = __webpack_require__(/*! ./file-type.class */ "./node_modules/ng2-file-upload/file-upload/file-type.class.js");
function isFile(value) {
    return (File && value instanceof File);
}
var FileUploader = (function () {
    function FileUploader(options) {
        this.isUploading = false;
        this.queue = [];
        this.progress = 0;
        this._nextIndex = 0;
        this.options = {
            autoUpload: false,
            isHTML5: true,
            filters: [],
            removeAfterUpload: false,
            disableMultipart: false,
            formatDataFunction: function (item) { return item._file; },
            formatDataFunctionIsAsync: false
        };
        this.setOptions(options);
        this.response = new core_1.EventEmitter();
    }
    FileUploader.prototype.setOptions = function (options) {
        this.options = Object.assign(this.options, options);
        this.authToken = this.options.authToken;
        this.authTokenHeader = this.options.authTokenHeader || 'Authorization';
        this.autoUpload = this.options.autoUpload;
        this.options.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
        if (this.options.maxFileSize) {
            this.options.filters.unshift({ name: 'fileSize', fn: this._fileSizeFilter });
        }
        if (this.options.allowedFileType) {
            this.options.filters.unshift({ name: 'fileType', fn: this._fileTypeFilter });
        }
        if (this.options.allowedMimeType) {
            this.options.filters.unshift({ name: 'mimeType', fn: this._mimeTypeFilter });
        }
        for (var i = 0; i < this.queue.length; i++) {
            this.queue[i].url = this.options.url;
        }
    };
    FileUploader.prototype.addToQueue = function (files, options, filters) {
        var _this = this;
        var list = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            list.push(file);
        }
        var arrayOfFilters = this._getFilters(filters);
        var count = this.queue.length;
        var addedFileItems = [];
        list.map(function (some) {
            if (!options) {
                options = _this.options;
            }
            var temp = new file_like_object_class_1.FileLikeObject(some);
            if (_this._isValidFile(temp, arrayOfFilters, options)) {
                var fileItem = new file_item_class_1.FileItem(_this, some, options);
                addedFileItems.push(fileItem);
                _this.queue.push(fileItem);
                _this._onAfterAddingFile(fileItem);
            }
            else {
                var filter = arrayOfFilters[_this._failFilterIndex];
                _this._onWhenAddingFileFailed(temp, filter, options);
            }
        });
        if (this.queue.length !== count) {
            this._onAfterAddingAll(addedFileItems);
            this.progress = this._getTotalProgress();
        }
        this._render();
        if (this.options.autoUpload) {
            this.uploadAll();
        }
    };
    FileUploader.prototype.removeFromQueue = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this.queue.splice(index, 1);
        this.progress = this._getTotalProgress();
    };
    FileUploader.prototype.clearQueue = function () {
        while (this.queue.length) {
            this.queue[0].remove();
        }
        this.progress = 0;
    };
    FileUploader.prototype.uploadItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
        item._prepareToUploading();
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        this[transport](item);
    };
    FileUploader.prototype.cancelItem = function (value) {
        var index = this.getIndexOfItem(value);
        var item = this.queue[index];
        var prop = this.options.isHTML5 ? item._xhr : item._form;
        if (item && item.isUploading) {
            prop.abort();
        }
    };
    FileUploader.prototype.uploadAll = function () {
        var items = this.getNotUploadedItems().filter(function (item) { return !item.isUploading; });
        if (!items.length) {
            return;
        }
        items.map(function (item) { return item._prepareToUploading(); });
        items[0].upload();
    };
    FileUploader.prototype.cancelAll = function () {
        var items = this.getNotUploadedItems();
        items.map(function (item) { return item.cancel(); });
    };
    FileUploader.prototype.isFile = function (value) {
        return isFile(value);
    };
    FileUploader.prototype.isFileLikeObject = function (value) {
        return value instanceof file_like_object_class_1.FileLikeObject;
    };
    FileUploader.prototype.getIndexOfItem = function (value) {
        return typeof value === 'number' ? value : this.queue.indexOf(value);
    };
    FileUploader.prototype.getNotUploadedItems = function () {
        return this.queue.filter(function (item) { return !item.isUploaded; });
    };
    FileUploader.prototype.getReadyItems = function () {
        return this.queue
            .filter(function (item) { return (item.isReady && !item.isUploading); })
            .sort(function (item1, item2) { return item1.index - item2.index; });
    };
    FileUploader.prototype.destroy = function () {
        return void 0;
    };
    FileUploader.prototype.onAfterAddingAll = function (fileItems) {
        return { fileItems: fileItems };
    };
    FileUploader.prototype.onBuildItemForm = function (fileItem, form) {
        return { fileItem: fileItem, form: form };
    };
    FileUploader.prototype.onAfterAddingFile = function (fileItem) {
        return { fileItem: fileItem };
    };
    FileUploader.prototype.onWhenAddingFileFailed = function (item, filter, options) {
        return { item: item, filter: filter, options: options };
    };
    FileUploader.prototype.onBeforeUploadItem = function (fileItem) {
        return { fileItem: fileItem };
    };
    FileUploader.prototype.onProgressItem = function (fileItem, progress) {
        return { fileItem: fileItem, progress: progress };
    };
    FileUploader.prototype.onProgressAll = function (progress) {
        return { progress: progress };
    };
    FileUploader.prototype.onSuccessItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onErrorItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCancelItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCompleteItem = function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    FileUploader.prototype.onCompleteAll = function () {
        return void 0;
    };
    FileUploader.prototype._mimeTypeFilter = function (item) {
        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
    };
    FileUploader.prototype._fileSizeFilter = function (item) {
        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
    };
    FileUploader.prototype._fileTypeFilter = function (item) {
        return !(this.options.allowedFileType &&
            this.options.allowedFileType.indexOf(file_type_class_1.FileType.getMimeClass(item)) === -1);
    };
    FileUploader.prototype._onErrorItem = function (item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    };
    FileUploader.prototype._onCompleteItem = function (item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        var nextItem = this.getReadyItems()[0];
        this.isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this.onCompleteAll();
        this.progress = this._getTotalProgress();
        this._render();
    };
    FileUploader.prototype._headersGetter = function (parsedHeaders) {
        return function (name) {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || void 0;
            }
            return parsedHeaders;
        };
    };
    FileUploader.prototype._xhrTransport = function (item) {
        var _this = this;
        var that = this;
        var xhr = item._xhr = new XMLHttpRequest();
        var sendable;
        this._onBeforeUploadItem(item);
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        if (!this.options.disableMultipart) {
            sendable = new FormData();
            this._onBuildItemForm(item, sendable);
            var appendFile = function () { return sendable.append(item.alias, item._file, item.file.name); };
            if (!this.options.parametersBeforeFiles) {
                appendFile();
            }
            // For AWS, Additional Parameters must come BEFORE Files
            if (this.options.additionalParameter !== undefined) {
                Object.keys(this.options.additionalParameter).forEach(function (key) {
                    var paramVal = _this.options.additionalParameter[key];
                    // Allow an additional parameter to include the filename
                    if (typeof paramVal === 'string' && paramVal.indexOf('{{file_name}}') >= 0) {
                        paramVal = paramVal.replace('{{file_name}}', item.file.name);
                    }
                    sendable.append(key, paramVal);
                });
            }
            if (this.options.parametersBeforeFiles) {
                appendFile();
            }
        }
        else {
            sendable = this.options.formatDataFunction(item);
        }
        xhr.upload.onprogress = function (event) {
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            _this._onProgressItem(item, progress);
        };
        xhr.onload = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            var method = '_on' + gist + 'Item';
            _this[method](item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onerror = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onErrorItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.onabort = function () {
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            var response = _this._transformResponse(xhr.response, headers);
            _this._onCancelItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        };
        xhr.open(item.method, item.url, true);
        xhr.withCredentials = item.withCredentials;
        if (this.options.headers) {
            for (var _i = 0, _a = this.options.headers; _i < _a.length; _i++) {
                var header = _a[_i];
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (item.headers.length) {
            for (var _b = 0, _c = item.headers; _b < _c.length; _b++) {
                var header = _c[_b];
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (this.authToken) {
            xhr.setRequestHeader(this.authTokenHeader, this.authToken);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                that.response.emit(xhr.responseText);
            }
        };
        if (this.options.formatDataFunctionIsAsync) {
            sendable.then(function (result) { return xhr.send(JSON.stringify(result)); });
        }
        else {
            xhr.send(sendable);
        }
        this._render();
    };
    FileUploader.prototype._getTotalProgress = function (value) {
        if (value === void 0) { value = 0; }
        if (this.options.removeAfterUpload) {
            return value;
        }
        var notUploaded = this.getNotUploadedItems().length;
        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        var ratio = 100 / this.queue.length;
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    FileUploader.prototype._getFilters = function (filters) {
        if (!filters) {
            return this.options.filters;
        }
        if (Array.isArray(filters)) {
            return filters;
        }
        if (typeof filters === 'string') {
            var names_1 = filters.match(/[^\s,]+/g);
            return this.options.filters
                .filter(function (filter) { return names_1.indexOf(filter.name) !== -1; });
        }
        return this.options.filters;
    };
    FileUploader.prototype._render = function () {
        return void 0;
    };
    FileUploader.prototype._queueLimitFilter = function () {
        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
    };
    FileUploader.prototype._isValidFile = function (file, filters, options) {
        var _this = this;
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every(function (filter) {
            _this._failFilterIndex++;
            return filter.fn.call(_this, file, options);
        });
    };
    FileUploader.prototype._isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    FileUploader.prototype._transformResponse = function (response, headers) {
        return response;
    };
    FileUploader.prototype._parseHeaders = function (headers) {
        var parsed = {};
        var key;
        var val;
        var i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map(function (line) {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        });
        return parsed;
    };
    FileUploader.prototype._onWhenAddingFileFailed = function (item, filter, options) {
        this.onWhenAddingFileFailed(item, filter, options);
    };
    FileUploader.prototype._onAfterAddingFile = function (item) {
        this.onAfterAddingFile(item);
    };
    FileUploader.prototype._onAfterAddingAll = function (items) {
        this.onAfterAddingAll(items);
    };
    FileUploader.prototype._onBeforeUploadItem = function (item) {
        item._onBeforeUpload();
        this.onBeforeUploadItem(item);
    };
    FileUploader.prototype._onBuildItemForm = function (item, form) {
        item._onBuildForm(form);
        this.onBuildItemForm(item, form);
    };
    FileUploader.prototype._onProgressItem = function (item, progress) {
        var total = this._getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
        this._render();
    };
    FileUploader.prototype._onSuccessItem = function (item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    };
    FileUploader.prototype._onCancelItem = function (item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    };
    return FileUploader;
}());
exports.FileUploader = FileUploader;


/***/ }),

/***/ "./node_modules/ng2-file-upload/index.js":
/*!***********************************************!*\
  !*** ./node_modules/ng2-file-upload/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(/*! ./file-upload/file-select.directive */ "./node_modules/ng2-file-upload/file-upload/file-select.directive.js"));
__export(__webpack_require__(/*! ./file-upload/file-drop.directive */ "./node_modules/ng2-file-upload/file-upload/file-drop.directive.js"));
__export(__webpack_require__(/*! ./file-upload/file-uploader.class */ "./node_modules/ng2-file-upload/file-upload/file-uploader.class.js"));
__export(__webpack_require__(/*! ./file-upload/file-item.class */ "./node_modules/ng2-file-upload/file-upload/file-item.class.js"));
__export(__webpack_require__(/*! ./file-upload/file-like-object.class */ "./node_modules/ng2-file-upload/file-upload/file-like-object.class.js"));
var file_upload_module_1 = __webpack_require__(/*! ./file-upload/file-upload.module */ "./node_modules/ng2-file-upload/file-upload/file-upload.module.js");
exports.FileUploadModule = file_upload_module_1.FileUploadModule;


/***/ }),

/***/ "./node_modules/ng2-file-upload/ng2-file-upload.js":
/*!*********************************************************!*\
  !*** ./node_modules/ng2-file-upload/ng2-file-upload.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(/*! ./index */ "./node_modules/ng2-file-upload/index.js"));


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/others/app-blank/app-blank.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/others/app-blank/app-blank.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p class=\"m-333\">\n  This is a blank component.\n</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/others/app-gallery/app-gallery.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/others/app-gallery/app-gallery.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"p-0\">\n  <mat-card-title class=\"m-0\">\n    <div class=\"card-title-text\">Media gallery</div>\n    <mat-divider></mat-divider>\n  </mat-card-title>\n  <mat-card-content class=\"p-0\">\n    <mat-grid-list cols=\"3\" rowHeight=\"1:1\" class=\"app-gallery\">\n      <!-- Gallery item -->\n      <mat-grid-tile *ngFor=\"let photo of photos\">\n        <img [src]=\"photo.url\" alt=\"\">\n        <!-- item detail, show on hover -->\n        <div class=\"gallery-control-wrap\">\n          <div class=\"gallery-control\">\n            <h4 class=\"photo-detail fz-1\" [fxHide.lt-sm]=\"true\">{{photo.name}}</h4>\n            <span fxFlex></span>\n            <button mat-icon-button [matMenuTriggerFor]=\"photoMenu\" class=\"\">\n                <mat-icon>more_vert</mat-icon>\n            </button>\n            <mat-menu #photoMenu=\"matMenu\">\n                <button mat-menu-item><mat-icon>send</mat-icon>Send as attachment</button>\n                <button mat-menu-item><mat-icon>favorite</mat-icon>Favorite</button>\n                <button mat-menu-item><mat-icon>delete</mat-icon>Delete</button>\n            </mat-menu>\n          </div>\n        </div>\n      </mat-grid-tile>\n    </mat-grid-list>\n  </mat-card-content>\n</mat-card>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/others/app-pricing/app-pricing.component.html":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/others/app-pricing/app-pricing.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"p-0\">\n  <mat-card-title class=\"\">\n    <div class=\"card-title-text\">Plans and Pricing</div>\n    <mat-divider></mat-divider>\n  </mat-card-title>\n  <mat-card-content>\n    <mat-slide-toggle [(ngModel)]=\"isAnnualSelected\" color=\"primary\" class=\"mb-1\">Get upto 10% discount annually</mat-slide-toggle>\n\n    <div fxLayout=\"row wrap\">\n      <!-- Pricing box -->\n      <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" fxFlex.sm=\"50\">\n        <mat-card class=\"plan-pricing text-center p-0\">\n          <mat-card-title class=\"light-gray\">\n            <div class=\"card-title-text\">\n              <div class=\"\">Developer</div>\n              <div class=\"text-sm text-muted\">For New Developers</div>\n            </div>\n            <mat-divider></mat-divider>\n          </mat-card-title>\n          <mat-card-content>\n            <h1><strong>FREE</strong></h1>\n            <mat-list dense class=\"mb-1\">\n              <mat-list-item>10GB of Bandwidth</mat-list-item>\n              <mat-list-item>Max 50 connection</mat-list-item>\n              <mat-list-item>512MB RAM</mat-list-item>\n              <mat-list-item class=\"text-muted\">Unlimited access</mat-list-item>\n              <mat-list-item class=\"text-muted\">Unlimited User</mat-list-item>\n              <mat-list-item class=\"text-muted\">Data analytics</mat-list-item>\n            </mat-list>\n            <button mat-raised-button class=\"mat-accent\">Choose</button>\n          </mat-card-content>\n        </mat-card>\n      </div>\n      <!-- Pricing box -->\n      <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" fxFlex.sm=\"50\">\n        <mat-card class=\"plan-pricing text-center p-0\">\n          <mat-card-title class=\"mat-bg-primary\">\n            <div class=\"card-title-text\">\n              <div class=\"\">Starter</div>\n              <div class=\"text-sm text-muted-white\">For Professional Developers</div>\n            </div>\n            <mat-divider></mat-divider>\n          </mat-card-title>\n          <mat-card-content>\n            <h1>\n              <strong>$ \n              <span *ngIf=\"!isAnnualSelected\">{{30}} /Mo</span>\n              <span *ngIf=\"isAnnualSelected\">{{30 * 12 * .9}} /Yr</span>\n              </strong>\n            </h1>\n            <mat-list dense class=\"mb-1\">\n              <mat-list-item>100GB of Bandwidth</mat-list-item>\n              <mat-list-item>Max 500 connection</mat-list-item>\n              <mat-list-item>1GB RAM</mat-list-item>\n              <mat-list-item>Unlimited access</mat-list-item>\n              <mat-list-item class=\"text-muted\">Unlimited User</mat-list-item>\n              <mat-list-item class=\"text-muted\">Data analytics</mat-list-item>\n            </mat-list>\n            <button mat-raised-button class=\"mat-accent\">Choose</button>\n          </mat-card-content>\n        </mat-card>\n      </div>\n      <!-- Pricing box -->\n      <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" fxFlex.sm=\"50\">\n        <mat-card class=\"plan-pricing text-center p-0\">\n          <mat-card-title class=\"light-gray\">\n            <div class=\"card-title-text\">\n              <div class=\"\">Business</div>\n              <div class=\"text-sm text-muted\">For Small Businesses</div>\n            </div>\n            <mat-divider></mat-divider>\n          </mat-card-title>\n          <mat-card-content>\n            <h1>\n              <strong>$ \n              <span *ngIf=\"!isAnnualSelected\">{{60}} /Mo</span>\n              <span *ngIf=\"isAnnualSelected\">{{60 * 12 * .9}} /Yr</span>\n              </strong>\n            </h1>\n            <mat-list dense class=\"mb-1\">\n              <mat-list-item>100GB of Bandwidth</mat-list-item>\n              <mat-list-item>Max 1500 connection</mat-list-item>\n              <mat-list-item>2GB RAM</mat-list-item>\n              <mat-list-item>Unlimited access</mat-list-item>\n              <mat-list-item>Unlimited User</mat-list-item>\n              <mat-list-item class=\"text-muted\">Data analytics</mat-list-item>\n            </mat-list>\n            <button mat-raised-button class=\"mat-accent\">Choose</button>\n          </mat-card-content>\n        </mat-card>\n      </div>\n      <!-- Pricing box -->\n      <div fxFlex=\"100\" fxFlex.gt-sm=\"25\" fxFlex.sm=\"50\">\n        <mat-card class=\"plan-pricing text-center p-0\">\n          <mat-card-title class=\"light-gray\">\n            <div class=\"card-title-text\">\n              <div class=\"\">Enterprise</div>\n              <div class=\"text-sm text-muted\">For Large companies</div>\n            </div>\n            <mat-divider></mat-divider>\n          </mat-card-title>\n          <mat-card-content>\n            <h1>\n              <strong>$ \n              <span *ngIf=\"!isAnnualSelected\">{{160}} /Mo</span>\n              <span *ngIf=\"isAnnualSelected\">{{160 * 12 * .9}} /Yr</span>\n              </strong>\n            </h1>\n            <mat-list dense class=\"mb-1\">\n              <mat-list-item>1000GB of Bandwidth</mat-list-item>\n              <mat-list-item>Max 5000 connection</mat-list-item>\n              <mat-list-item>8GB RAM</mat-list-item>\n              <mat-list-item>Unlimited access</mat-list-item>\n              <mat-list-item>Unlimited User</mat-list-item>\n              <mat-list-item>Data analytics</mat-list-item>\n            </mat-list>\n            <button mat-raised-button class=\"mat-accent\">Choose</button>\n          </mat-card-content>\n        </mat-card>\n      </div>\n\n    </div>\n  </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/others/app-users/app-users.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/others/app-users/app-users.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row wrap\">\n  <div\n  *ngFor=\"let user of users\" \n  fxFlex=\"100\"\n  fxFlex.gt-sm=\"33\"\n  fxFlex.sm=\"50\">\n    <mat-card class=\"user-card p-0\">\n      <mat-card-title>\n        <div class=\"card-title-text\">\n          <a href=\"\" class=\"toolbar-avatar md mr-1\"><img [src]=\"user.photo\" alt=\"\"></a>\n          <span>{{user.name}}</span>\n          <span fxFlex></span>\n          <button mat-icon-button [matMenuTriggerFor]=\"userMenu\" class=\"\">\n              <mat-icon class=\"\">more_vert</mat-icon>\n          </button>\n          <mat-menu #userMenu=\"matMenu\">\n              <button mat-menu-item>Follow</button>\n              <button mat-menu-item>Message</button>\n              <button mat-menu-item>Block</button>\n              <button mat-menu-item>Delete</button>\n          </mat-menu>\n        </div>\n        <mat-divider></mat-divider>\n      </mat-card-title>\n      <mat-card-content>\n        <!-- user detail lines-->\n        <div class=\"user-details\">\n          <p><mat-icon class=\"text-muted\">card_membership</mat-icon>{{user.membership}}</p>\n          <p><mat-icon class=\"text-muted\">date_range</mat-icon>Member since {{user.registered | date}}</p>\n          <p><mat-icon class=\"text-muted\">phone</mat-icon>{{user.phone}}</p>\n          <p><mat-icon class=\"text-muted\">location_on</mat-icon>{{user.address}}</p>\n        </div>\n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/others/nested1/nested1.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/others/nested1/nested1.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  nested1 works!\n</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/others/nested2/nested2.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/others/nested2/nested2.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  nested2 works!\n</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/others/nested3/nested3.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/others/nested3/nested3.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p routerLink=\"/others/n1\">\n  nested3 works!\n</p>\n\n<button (click)=\"go()\">go</button>\n"

/***/ }),

/***/ "./src/app/views/others/app-blank/app-blank.component.css":
/*!****************************************************************!*\
  !*** ./src/app/views/others/app-blank/app-blank.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL290aGVycy9hcHAtYmxhbmsvYXBwLWJsYW5rLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/views/others/app-blank/app-blank.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/others/app-blank/app-blank.component.ts ***!
  \***************************************************************/
/*! exports provided: AppBlankComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppBlankComponent", function() { return AppBlankComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let AppBlankComponent = class AppBlankComponent {
    constructor() { }
    ngOnInit() {
    }
};
AppBlankComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-blank',
        template: __webpack_require__(/*! raw-loader!./app-blank.component.html */ "./node_modules/raw-loader/index.js!./src/app/views/others/app-blank/app-blank.component.html"),
        styles: [__webpack_require__(/*! ./app-blank.component.css */ "./src/app/views/others/app-blank/app-blank.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppBlankComponent);



/***/ }),

/***/ "./src/app/views/others/app-gallery/app-gallery.component.css":
/*!********************************************************************!*\
  !*** ./src/app/views/others/app-gallery/app-gallery.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL290aGVycy9hcHAtZ2FsbGVyeS9hcHAtZ2FsbGVyeS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/views/others/app-gallery/app-gallery.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/others/app-gallery/app-gallery.component.ts ***!
  \*******************************************************************/
/*! exports provided: AppGalleryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppGalleryComponent", function() { return AppGalleryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let AppGalleryComponent = class AppGalleryComponent {
    constructor() {
        this.photos = [{
                name: 'Photo 1',
                url: 'assets/images/sq-10.jpg'
            }, {
                name: 'Photo 2',
                url: 'assets/images/sq-16.jpg'
            }, {
                name: 'Photo 3',
                url: 'assets/images/sq-15.jpg'
            }, {
                name: 'Photo 4',
                url: 'assets/images/sq-17.jpg'
            }, {
                name: 'Photo 5',
                url: 'assets/images/sq-13.jpg'
            }, {
                name: 'Photo 6',
                url: 'assets/images/sq-12.jpg'
            }, {
                name: 'Photo 7',
                url: 'assets/images/sq-11.jpg'
            }, {
                name: 'Photo 8',
                url: 'assets/images/sq-10.jpg'
            }];
    }
    ngOnInit() {
    }
};
AppGalleryComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-gallery',
        template: __webpack_require__(/*! raw-loader!./app-gallery.component.html */ "./node_modules/raw-loader/index.js!./src/app/views/others/app-gallery/app-gallery.component.html"),
        styles: [__webpack_require__(/*! ./app-gallery.component.css */ "./src/app/views/others/app-gallery/app-gallery.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppGalleryComponent);



/***/ }),

/***/ "./src/app/views/others/app-pricing/app-pricing.component.css":
/*!********************************************************************!*\
  !*** ./src/app/views/others/app-pricing/app-pricing.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL290aGVycy9hcHAtcHJpY2luZy9hcHAtcHJpY2luZy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/views/others/app-pricing/app-pricing.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/others/app-pricing/app-pricing.component.ts ***!
  \*******************************************************************/
/*! exports provided: AppPricingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppPricingComponent", function() { return AppPricingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let AppPricingComponent = class AppPricingComponent {
    constructor() {
        this.isAnnualSelected = false;
    }
    ngOnInit() {
    }
};
AppPricingComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-pricing',
        template: __webpack_require__(/*! raw-loader!./app-pricing.component.html */ "./node_modules/raw-loader/index.js!./src/app/views/others/app-pricing/app-pricing.component.html"),
        styles: [__webpack_require__(/*! ./app-pricing.component.css */ "./src/app/views/others/app-pricing/app-pricing.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppPricingComponent);



/***/ }),

/***/ "./src/app/views/others/app-users/app-users.component.css":
/*!****************************************************************!*\
  !*** ./src/app/views/others/app-users/app-users.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL290aGVycy9hcHAtdXNlcnMvYXBwLXVzZXJzLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/views/others/app-users/app-users.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/others/app-users/app-users.component.ts ***!
  \***************************************************************/
/*! exports provided: AppUsersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppUsersComponent", function() { return AppUsersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let AppUsersComponent = class AppUsersComponent {
    constructor() {
        this.users = [
            {
                'name': 'Snow Benton',
                'membership': 'Paid Member',
                'phone': '+1 (956) 486-2327',
                'photo': 'assets/images/face-1.jpg',
                'address': '329 Dictum Court, Minnesota',
                'registered': '2016-07-09'
            },
            {
                'name': 'Kay Sellers',
                'membership': 'Paid Member',
                'phone': '+1 (929) 406-3172',
                'photo': 'assets/images/face-2.jpg',
                'address': '893 Garden Place, American Samoa',
                'registered': '2017-02-16'
            },
            {
                'name': 'Robert Middleton',
                'membership': 'Paid Member',
                'phone': '+1 (995) 451-2205',
                'photo': 'assets/images/face-3.jpg',
                'address': '301 Hazel Court, West Virginia',
                'registered': '2017-01-22'
            },
            {
                'name': 'Delaney Randall',
                'membership': 'Paid Member',
                'phone': '+1 (922) 599-2410',
                'photo': 'assets/images/face-4.jpg',
                'address': '128 Kensington Walk, Ohio',
                'registered': '2016-12-08'
            },
            {
                'name': 'Melendez Lawrence',
                'membership': 'Paid Member',
                'phone': '+1 (824) 589-2029',
                'photo': 'assets/images/face-5.jpg',
                'address': '370 Lincoln Avenue, Florida',
                'registered': '2015-03-29'
            },
            {
                'name': 'Galloway Fitzpatrick',
                'membership': 'Paid Member',
                'phone': '+1 (907) 477-2375',
                'photo': 'assets/images/face-6.jpg',
                'address': '296 Stuyvesant Avenue, Iowa',
                'registered': '2015-12-12'
            },
            {
                'name': 'Watson Joyce',
                'membership': 'Paid Member',
                'phone': '+1 (982) 500-3137',
                'photo': 'assets/images/face-7.jpg',
                'address': '224 Visitation Place, Illinois',
                'registered': '2015-08-19'
            },
            {
                'name': 'Ada Kidd',
                'membership': 'Paid Member',
                'phone': '+1 (832) 531-2385',
                'photo': 'assets/images/face-1.jpg',
                'address': '230 Oxford Street, South Dakota',
                'registered': '2016-08-11'
            },
            {
                'name': 'Raquel Mcintyre',
                'membership': 'Paid Member',
                'phone': '+1 (996) 443-2102',
                'photo': 'assets/images/face-2.jpg',
                'address': '393 Sullivan Street, Palau',
                'registered': '2014-09-03'
            },
            {
                'name': 'Juliette Hunter',
                'membership': 'Paid Member',
                'phone': '+1 (876) 568-2964',
                'photo': 'assets/images/face-3.jpg',
                'address': '191 Stryker Court, New Jersey',
                'registered': '2017-01-18'
            },
            {
                'name': 'Workman Floyd',
                'membership': 'Paid Member',
                'phone': '+1 (996) 481-2712',
                'photo': 'assets/images/face-4.jpg',
                'address': '350 Imlay Street, Utah',
                'registered': '2017-05-01'
            },
            {
                'name': 'Amanda Bean',
                'membership': 'Paid Member',
                'phone': '+1 (894) 512-3907',
                'photo': 'assets/images/face-5.jpg',
                'address': '254 Stockton Street, Vermont',
                'registered': '2014-08-30'
            }
        ];
    }
    ngOnInit() {
    }
};
AppUsersComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-users',
        template: __webpack_require__(/*! raw-loader!./app-users.component.html */ "./node_modules/raw-loader/index.js!./src/app/views/others/app-users/app-users.component.html"),
        styles: [__webpack_require__(/*! ./app-users.component.css */ "./src/app/views/others/app-users/app-users.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AppUsersComponent);



/***/ }),

/***/ "./src/app/views/others/nested1/nested1.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/views/others/nested1/nested1.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL290aGVycy9uZXN0ZWQxL25lc3RlZDEuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/views/others/nested1/nested1.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/others/nested1/nested1.component.ts ***!
  \***********************************************************/
/*! exports provided: Nested1Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nested1Component", function() { return Nested1Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let Nested1Component = class Nested1Component {
    constructor() { }
    ngOnInit() {
    }
};
Nested1Component = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-nested1',
        template: __webpack_require__(/*! raw-loader!./nested1.component.html */ "./node_modules/raw-loader/index.js!./src/app/views/others/nested1/nested1.component.html"),
        styles: [__webpack_require__(/*! ./nested1.component.scss */ "./src/app/views/others/nested1/nested1.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], Nested1Component);



/***/ }),

/***/ "./src/app/views/others/nested2/nested2.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/views/others/nested2/nested2.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL290aGVycy9uZXN0ZWQyL25lc3RlZDIuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/views/others/nested2/nested2.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/others/nested2/nested2.component.ts ***!
  \***********************************************************/
/*! exports provided: Nested2Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nested2Component", function() { return Nested2Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let Nested2Component = class Nested2Component {
    constructor() { }
    ngOnInit() {
    }
};
Nested2Component = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-nested2',
        template: __webpack_require__(/*! raw-loader!./nested2.component.html */ "./node_modules/raw-loader/index.js!./src/app/views/others/nested2/nested2.component.html"),
        styles: [__webpack_require__(/*! ./nested2.component.scss */ "./src/app/views/others/nested2/nested2.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], Nested2Component);



/***/ }),

/***/ "./src/app/views/others/nested3/nested3.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/views/others/nested3/nested3.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL290aGVycy9uZXN0ZWQzL25lc3RlZDMuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/views/others/nested3/nested3.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/others/nested3/nested3.component.ts ***!
  \***********************************************************/
/*! exports provided: Nested3Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Nested3Component", function() { return Nested3Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let Nested3Component = class Nested3Component {
    constructor(r) {
        this.r = r;
    }
    ngOnInit() {
    }
    go() {
        this.r.navigate(['/dashboard']);
    }
};
Nested3Component.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
];
Nested3Component = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-nested3',
        template: __webpack_require__(/*! raw-loader!./nested3.component.html */ "./node_modules/raw-loader/index.js!./src/app/views/others/nested3/nested3.component.html"),
        styles: [__webpack_require__(/*! ./nested3.component.scss */ "./src/app/views/others/nested3/nested3.component.scss")]
    }),
    __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
], Nested3Component);



/***/ }),

/***/ "./src/app/views/others/others.module.ts":
/*!***********************************************!*\
  !*** ./src/app/views/others/others.module.ts ***!
  \***********************************************/
/*! exports provided: OthersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OthersModule", function() { return OthersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm2015/flex-layout.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm2015/ng2-charts.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-file-upload/ng2-file-upload */ "./node_modules/ng2-file-upload/ng2-file-upload.js");
/* harmony import */ var ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _app_gallery_app_gallery_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app-gallery/app-gallery.component */ "./src/app/views/others/app-gallery/app-gallery.component.ts");
/* harmony import */ var _app_pricing_app_pricing_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app-pricing/app-pricing.component */ "./src/app/views/others/app-pricing/app-pricing.component.ts");
/* harmony import */ var _app_users_app_users_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app-users/app-users.component */ "./src/app/views/others/app-users/app-users.component.ts");
/* harmony import */ var _app_blank_app_blank_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app-blank/app-blank.component */ "./src/app/views/others/app-blank/app-blank.component.ts");
/* harmony import */ var _others_routing__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./others.routing */ "./src/app/views/others/others.routing.ts");
/* harmony import */ var _nested1_nested1_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./nested1/nested1.component */ "./src/app/views/others/nested1/nested1.component.ts");
/* harmony import */ var _nested2_nested2_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./nested2/nested2.component */ "./src/app/views/others/nested2/nested2.component.ts");
/* harmony import */ var _nested3_nested3_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./nested3/nested3.component */ "./src/app/views/others/nested3/nested3.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















let OthersModule = class OthersModule {
};
OthersModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatListModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatMenuModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSlideToggleModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatGridListModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatChipsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatRadioModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTabsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatProgressBarModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
            _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"],
            ng2_charts__WEBPACK_IMPORTED_MODULE_7__["ChartsModule"],
            ng2_file_upload_ng2_file_upload__WEBPACK_IMPORTED_MODULE_8__["FileUploadModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_others_routing__WEBPACK_IMPORTED_MODULE_14__["OthersRoutes"])
        ],
        declarations: [
            _app_gallery_app_gallery_component__WEBPACK_IMPORTED_MODULE_10__["AppGalleryComponent"],
            _app_pricing_app_pricing_component__WEBPACK_IMPORTED_MODULE_11__["AppPricingComponent"],
            _app_users_app_users_component__WEBPACK_IMPORTED_MODULE_12__["AppUsersComponent"],
            _app_blank_app_blank_component__WEBPACK_IMPORTED_MODULE_13__["AppBlankComponent"], _nested1_nested1_component__WEBPACK_IMPORTED_MODULE_15__["Nested1Component"], _nested2_nested2_component__WEBPACK_IMPORTED_MODULE_16__["Nested2Component"], _nested3_nested3_component__WEBPACK_IMPORTED_MODULE_17__["Nested3Component"]
        ]
    })
], OthersModule);



/***/ }),

/***/ "./src/app/views/others/others.routing.ts":
/*!************************************************!*\
  !*** ./src/app/views/others/others.routing.ts ***!
  \************************************************/
/*! exports provided: OthersRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OthersRoutes", function() { return OthersRoutes; });
/* harmony import */ var _app_gallery_app_gallery_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-gallery/app-gallery.component */ "./src/app/views/others/app-gallery/app-gallery.component.ts");
/* harmony import */ var _app_pricing_app_pricing_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-pricing/app-pricing.component */ "./src/app/views/others/app-pricing/app-pricing.component.ts");
/* harmony import */ var _app_users_app_users_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-users/app-users.component */ "./src/app/views/others/app-users/app-users.component.ts");
/* harmony import */ var _app_blank_app_blank_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-blank/app-blank.component */ "./src/app/views/others/app-blank/app-blank.component.ts");
/* harmony import */ var _nested1_nested1_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nested1/nested1.component */ "./src/app/views/others/nested1/nested1.component.ts");
/* harmony import */ var _nested2_nested2_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nested2/nested2.component */ "./src/app/views/others/nested2/nested2.component.ts");
/* harmony import */ var _nested3_nested3_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nested3/nested3.component */ "./src/app/views/others/nested3/nested3.component.ts");







const OthersRoutes = [
    {
        path: '',
        children: [{
                path: 'gallery',
                component: _app_gallery_app_gallery_component__WEBPACK_IMPORTED_MODULE_0__["AppGalleryComponent"],
                data: { title: 'Gallery', breadcrumb: 'GALLERY' }
            }, {
                path: 'pricing',
                component: _app_pricing_app_pricing_component__WEBPACK_IMPORTED_MODULE_1__["AppPricingComponent"],
                data: { title: 'Pricing', breadcrumb: 'PRICINGS' }
            }, {
                path: 'users',
                component: _app_users_app_users_component__WEBPACK_IMPORTED_MODULE_2__["AppUsersComponent"],
                data: { title: 'Users', breadcrumb: 'USERS' }
            }, {
                path: 'blank',
                component: _app_blank_app_blank_component__WEBPACK_IMPORTED_MODULE_3__["AppBlankComponent"],
                data: { title: 'Blank', breadcrumb: 'BLANK' }
            }, {
                path: 'n1',
                component: _nested1_nested1_component__WEBPACK_IMPORTED_MODULE_4__["Nested1Component"],
                data: { title: '1', breadcrumb: '1' }
            }, {
                path: 'n1/n2',
                component: _nested2_nested2_component__WEBPACK_IMPORTED_MODULE_5__["Nested2Component"],
                data: { title: '2', breadcrumb: '2' }
            }, {
                path: 'n1/n3',
                component: _nested3_nested3_component__WEBPACK_IMPORTED_MODULE_6__["Nested3Component"],
                data: { title: '3', breadcrumb: '3' }
            }]
    }
];


/***/ })

}]);
//# sourceMappingURL=views-others-others-module-es2015.js.map