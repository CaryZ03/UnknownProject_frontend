"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editor_1 = require("@textbus/editor");
var collaborate_1 = require("@textbus/collaborate");
var platform_browser_1 = require("@textbus/platform-browser");
var core_1 = require("@textbus/core");
var y_webrtc_1 = require("y-webrtc");
var header = document.getElementById('user-info');
var editor = (0, editor_1.createEditor)({
    theme: 'light',
    placeholder: '请输入内容……',
    imports: [
        collaborate_1.collaborateModule // 添加协作模块
    ],
    providers: [
        {
            provide: platform_browser_1.CollaborateSelectionAwarenessDelegate,
            useClass: editor_1.TableComponentSelectionAwarenessDelegate
        }
    ],
    setup: function (starter) {
        var selection = starter.get(core_1.Selection);
        var collaborate = starter.get(collaborate_1.Collaborate);
        var collaborateCursor = starter.get(platform_browser_1.CollaborateCursor);
        // 开启房间
        var provide = new y_webrtc_1.WebrtcProvider('textbus', collaborate.yDoc);
        // 模拟多用户
        var users = [{
                color: '#f00',
                name: '张三'
            }, {
                color: '#448299',
                name: '李国'
            }, {
                color: '#fe91dd',
                name: '赵功'
            }, {
                color: '#1f2baf',
                name: '载膛'
            }, {
                color: '#2aad30',
                name: '魂牵梦萦'
            }, {
                color: '#c4ee6e',
                name: '杰国'
            }, {
                color: '#00a6ff',
                name: '膛世界杯'
            }];
        // 随机取一个用户
        var user = users[Math.floor(Math.random() * users.length)];
        // 设置当前用户信息
        provide.awareness.setLocalStateField('user', user);
        // 监听本地用户选区变化，并同步
        var subscription = selection.onChange.subscribe(function () {
            var paths = selection.getPaths();
            var localSelection = {
                id: user.name,
                username: user.name,
                color: user.color,
                paths: paths
            };
            provide.awareness.setLocalStateField('selection', localSelection);
        });
        // 监听远端数据变化
        provide.awareness.on('update', function () {
            var users = [];
            var remoteSelections = [];
            provide.awareness.getStates().forEach(function (state) {
                if (state.user) {
                    users.push(state.user);
                }
                if (state.selection) {
                    remoteSelections.push(state.selection);
                }
            });
            // 过滤本地用户信息
            var selections = remoteSelections.filter(function (i) { return i.username !== user.name; });
            // 绘制远端用户选区
            collaborateCursor.draw(selections);
            // 更新用户信息
            header.innerHTML = users.map(function (i) {
                return "<span style=\"color: ".concat(i.color, "\">").concat(i.name, "</span>");
            }).join('');
        });
        return function () {
            // 编辑器销毁时，取消连接
            provide.disconnect();
            subscription.unsubscribe();
        };
    },
});
editor.mount(document.getElementById('editor'));
