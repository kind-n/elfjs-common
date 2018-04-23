/**
 * 
 * https://www.elfjs.org
 * 
 * @copyright 2018 Wu Hu. All Rights Reserved.
 * 
 * @version 2.0.0
 * @license MIT
 * 
 */
"use strict";

! (function (exports) {

    function lower (value) {
        return value.toLowerCase();
    }
    function exists(value, name) {
        return isValid(value) && !isBasic(value) && (name in value);
    }
    function isArray (value) {
        return Array.isArray(value);
    }
    function isBasic (value) {
        return isString(value)
            || isNumber(value)
            || isBoolean(value);
    }
    function isEmpty (value) {
        for (var i in value) {
            return false;
        }
        return true;
    }
    function isValid (value) {
        return value !== null && value !== void 0;
    }
    function isString (value) {
        return typeof value === "string";
    }
    function isNumber (value) {
        return typeof value === "number";
    }
    function isObject (value) {
        return isValid(value)
            && typeof value === "object";
    }
    function isBoolean (value) {
        return typeof value === "boolean";
    }
    function isRegExp (value) {
        return value instanceof RegExp;
    }
    function isFunction (value) {
        return typeof value === "function";
    }
    function isNullOrEmpty (value) {
        return !isString(value) || value === "";
    }
    function parseQueryString (string) {
        if (string.charAt(0) === "?" ||
            string.charAt(0) === "#") {
            string = string.slice(0);
        }
        var data = {};
        var entries = string.split("&");
        for (var i= 0; i < entries.length; i++) {
            var entry = entries[i].split("=");
            var key = decodeURIComponent(entry[0]);
            var value = entry.length === 2 ? decodeURIComponent(entry[1]) : "";
            if (value === "true") {
                value = true;
            } else if (value === "false") {
                value = false;
            }
            if (exists(data, key)) {
                if (isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        return data;
    }
    function buildQueryString (object) {
        var data = [];
        for (var name in object) {
            var key = encodeURIComponent(name);
            if (isArray(object[name])) {
                for (var i = 0; i < object[name].length; i++) {
                    data.push(key + "=" + encodeURIComponent(object[name][i]));
                }
            } else {
                data.push(key + "=" + encodeURIComponent(object[name]));
            }
        }
        return data.join("&");
    }

    function getTag (element) {
        var value = element.tagName;
        return isNullOrEmpty(value) ? null : lower(value);
    }
    function getType (element) {
        var value = element.type;
        return isNullOrEmpty(value) ? null : lower(value);   
    }
    function getName (element) {
        var value = element.name;
        return isNullOrEmpty(value) ? null : value;
    }
    function getOwner (element) {
        return element[exports._GLOBAL_SYMBOL_RENDERER_].element.owner;
    }
    function getValue (name, owner) {
        return name.split(".").reduce(function (init, item) {
            return isValid(init) ? init[item] : void 0;
        }, owner);
    }
    function getFocus (element) {
        var tag = getTag(element);
        if (tag === "select") {
            return false;
        }
        if (tag === "input") {
            var type = getType(tag);
            if (type === "radio" ||
                type === "checkbox") {
                return false;
            }
        }
        return true;
    }
    /*
    function fill (element) {
        var tag = getTag(element);
        if (tag === "form") {
            for (var i = 0, length = element.elements.length; i < length; i++) {
                fill(element.elements.item(i));
            }
        } else if (tag === "input") {
            var type = getType(element);
            if (type === "checkbox") {
                fillCheckbox(element);
            } else if (type === "radio") {
                fillRadio(element);
            } else {
                fillText(element);
            }
        } else if (tag === "select") {
            fillSelect(element);
        } else if (tag === "textarea") {
            fillText(element);
        }
    }
    function fillSelect (element) {
        var name;
        var owner;
        var value;
        if (isValid(name = getName(element)) &&
            isValid(owner = getOwner(element)) &&
            isValid(value = getValue(name, owner))) {
            var options = element.options;
            var multiple = element.multiple;
            var length = options.length;
            if (multiple) {
                if (isArray(value)) {
                    for (var j = 0; j < value.length; j++) {
                        for (var i = 0; i < length; i++) {
                            if (value[j] == options[i].value) {
                                options[i].selected = true;
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i < length; i++) {
                    if (value == options[i].value) {
                        options[i].selected = true;
                        break;
                    }
                }
            }
        }
    }
    function fillCheckbox (element) {
        var name;
        var owner;
        var value;
        if (isValid(name = getName(element)) &&
            isValid(owner = getOwner(element)) &&
            isValid(value = getValue(name, owner))) {
            if (isArray(value)) {
                for (var i = 0, length = value.length; i < length; i++) {
                    if (value[i] == element.value) {
                        element.checked = true;
                        break;
                    }
                }
            } else {
                if (value == element.value) {
                    element.checked = true;
                }
            }
        }
    }
    function fillRadio (element) {
        var name;
        var owner;
        var value;
        if (isValid(name = getName(element)) &&
            isValid(owner = getOwner(element)) &&
            isValid(value = getValue(name, owner))) {
            if (value == element.value) {
                element.checked = true;
            }
        }
    }
    function fillText (element) {
        var name;
        var owner;
        var value;
        if (isValid(name = getName(element)) &&
            isValid(owner = getOwner(element)) &&
            isValid(value = getValue(name, owner))) {
            element.value = value;
        }
    }
    */
    function task (element) {
        var tag = getTag(element);
        if (tag === "input") {
            var type = getType(element);
            if (type === "checkbox") {
                taskCheckbox(element);
            } else if (type === "radio") {
                taskRadio(element);
            } else {
                taskText(element);
            }
        } else if (tag === "select") {
            taskSelect(element);
        } else if (tag === "textarea") {
            taskText(element);
        }
    }
    function taskSelect(element) {
        var name;
        var owner;
        var value;
        if (isValid(name = getName(element)) &&
            isValid(owner = getOwner(element))) {
            var options = element.selectedOptions;
            var multiple = element.multiple;
            var length = options.length;
            if (multiple) {
                value = [];
                for (var i = 0; i < length; i++) {
                    value.push(options[i].value);
                }
            } else {
                if (length > 0) {
                    value = options[0].value;
                } else {
                    value = null;
                }
            }
            setValue(name, owner, value);
        }
    }
    function taskCheckbox(element) {
        var name;
        var owner;
        var value;
        if (isValid(name = getName(element)) &&
            isValid(owner = getOwner(element))) {
            value = element.value;
            if (element.checked) {
                setValue(name, owner, value, true);
            } else {
                delValue(name, owner, value);
            }
        }
    }
    function taskRadio(element) {
        var name;
        var owner;
        var value;
        if (isValid(name = getName(element)) &&
            isValid(owner = getOwner(element))) {
            value = element.value;
            if (element.checked) {
                setValue(name, owner, value);
            }
        }
    }
    function taskText(element) {
        var name;
        var owner;
        var value;
        if (isValid(name = getName(element)) &&
            isValid(owner = getOwner(element))) {
            setValue(name, owner, element.value);
        }
    }
    function delValue(name, owner, value) {
        var parts = name.split(".");
        var key = parts.pop();
        var obj = owner;
        for (var i = 0, length = parts.length; i < length; i++) {
            obj = obj[parts[i]];
            if (!isValid(owner)) {
                break;
            }
        }
        if (isValid(obj)) {
            if (isArray(obj[key])) {
                for (var i = 0, length = obj[key].length; i < length; i++) {
                    if (obj[key][i] == value) {
                        obj[key].splice(i, 1);
                        break;
                    }
                }
            } else if (obj[key] == value) {
                obj[key] = null;
            }
        }
    }
    function setValue(name, owner, value, append) {
        var parts = name.split(".");
        var key = parts.pop();
        var obj = owner;
        for (var i = 0, length = parts.length; i < length; i++) {
            if (!isValid(obj[parts[i]])) {
                obj[parts[i]] = {};
            }
            obj = obj[parts[i]];
            if (isBasic(obj)) {
                throw new Error("Cannot act on basic types: " + name);
            }
        }
        if (append) {
            if (isArray(obj[key])) {
                for (var i = 0, length = obj[key].length; i < length; i++) {
                    if (obj[key][i] == value) {
                        return;
                    }
                }
                obj[key].push(value);
            } else if (isValid(obj[key])) {
                obj[key] = [obj[key], value];
            } else {
                obj[key] = value;
            }
        } else {
            obj[key] = value;
        }
    }

    var BindDirective = exports.Directive("bind", {
        onInitial : function (product) {
            exports.attachEvent(product, "input", this);
            exports.attachEvent(product, "change", this);
            exports.attachEvent(product, "compositionend", this);
            exports.attachEvent(product, "compositionstart", this);
        },
        onDispose : function (product) {
            exports.detachEvent(product, "input", this);
            exports.detachEvent(product, "change", this);
            exports.detachEvent(product, "compositionend", this);
            exports.detachEvent(product, "compositionstart", this);
        },
        handleEvent : function (event) {
            var node = event.target;
            switch (event.type) {
                case "compositionstart":
                    node.composing = true;
                    break;
                case "compositionend":
                    node.composing = false;
                    if (getFocus(node)) {
                        task(node);
                    }
                    break;
                case "input":
                    if (getFocus(node) && !node.composing) {
                        task(node);
                    }
                    break;
                default:
                    task(node);
                    break;
            }
        }
    });

    exports.isArray    = isArray;
    exports.isBasic    = isBasic;
    exports.isEmpty    = isEmpty;
    exports.isString   = isString;
    exports.isNumber   = isNumber;
    exports.isObject   = isObject;
    exports.isRegExp   = isRegExp;
    exports.isBoolean  = isBoolean;
    exports.isFunction = isFunction;
    exports.parseQueryString = parseQueryString;
    exports.buildQueryString = buildQueryString;
    exports.common = { 
        BindDirective: BindDirective
    };

    exports.depend(BindDirective);
} (
    typeof exports !== "undefined" ? module.exports = require("elfjs") : this.Elf
));