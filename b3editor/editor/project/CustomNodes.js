(function () {
    "use strict";

    b3.RunTreeAction = b3.Class(b3.Action);
    p = b3.RunTreeAction.prototype;
    p.name = 'RunTreeAction';
    p.title = '执行行为树';
    p.description = '参数route 树的路由，为项目和树的title组成，用点分开，如：loginView.showtip';

    b3.OpenViewAction = b3.Class(b3.Action);
    var p = b3.OpenViewAction.prototype;
    p.name = 'OpenViewAction';
    p.title = '打开界面';
    p.description = '打开界面';

    b3.PushParamAction = b3.Class(b3.Action);
    p = b3.PushParamAction.prototype;
    p.name = 'PushParamAction';
    p.title = '压入参数';
    p.description = '把参数压入堆栈的节点';

    b3.RandParamAction = b3.Class(b3.Action);
    p = b3.RandParamAction.prototype;
    p.name = 'RandParamAction';
    p.title = '随机选取参数';
    p.description = '随机选取参数里面的一个参数压入堆栈';

    b3.ShowFloatingBoxAction = b3.Class(b3.Action);
    p = b3.ShowFloatingBoxAction.prototype;
    p.name = 'ShowFloatingBoxAction';
    p.title = '冒泡提示';
    p.description = '参数text 可选，可配置为文本或者str.csv的id';
	
	b3.CreateMapRoleAction = b3.Class(b3.Action);
    p = b3.CreateMapRoleAction.prototype;
    p.name = 'CreateMapRoleAction';
    p.title = '创建地图角色';
    p.description = '配置数组，配置为[索引,npcid(npc.csv里面配置的typeid),坐标,坐标偏移,朝向]';
	
	b3.RoleMoveToAction = b3.Class(b3.Action);
    p = b3.RoleMoveToAction.prototype;
    p.name = 'RoleMoveToAction';
    p.title = '角色移动';
    p.description = '参数：角色id:[目的坐标x,目的坐标y]';
	
	b3.CallControllerAction = b3.Class(b3.Action);
    p = b3.CallControllerAction.prototype;
    p.name = 'CallControllerAction';
    p.title = '调用控制器';
    p.description = '参数：ControllerConst,key,param';

    b3e.project.CustomNodes = [
        b3.RunTreeAction,
        b3.OpenViewAction,
        b3.ShowFloatingBoxAction,
        b3.PushParamAction,
        b3.RandParamAction,
		b3.CreateMapRoleAction,
		b3.RoleMoveToAction,
		b3.CallControllerAction
    ];
})();
