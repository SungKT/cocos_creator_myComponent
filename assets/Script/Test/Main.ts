/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/6/6
 * @doc Demo入口.
 * @end
 ******************************************/
const { ccclass, property } = cc._decorator;

import List from '../Components/List/List';
import ListItem from '../Components/List/ListItem';

@ccclass
export default class Main extends cc.Component {
    //垂直列表
    @property(List)
    listV: List = null;
    //水平列表
    @property(List)
    listH: List = null;
    //网格列表
    @property(List)
    listG: List = null;
    //网格列表2
    @property(List)
    listG2: List = null;
    //输入框
    @property(cc.EditBox)
    input: cc.EditBox = null;
    //信息Labal
    @property(cc.Label)
    info: cc.Label = null;
    //数据数组（所有List共用）
    data: number[] = [];

    onLoad() {
        this.data = [];
        for (let n: number = 0; n < 999; n++) {
            this.data.push(n);
        }
        this.listV.numItems = this.data.length;
        this.listH.numItems = this.data.length;
        this.listG.numItems = this.data.length;
        this.listG2.numItems = this.data.length;
    }
    //垂直列表渲染器
    onListVRender(item: cc.Node, idx: number) {
        item.getComponent(ListItem).title.getComponent(cc.Label).string = this.data[idx] + '';
        this.info.string = 'ListV当前渲染总数 = ' + this.listV.displayItemNum;
    }
    //水平列表渲染器
    onListHRender(item: cc.Node, idx: number) {
        item.getComponent(ListItem).title.getComponent(cc.Label).string = this.data[idx] + '';
        this.info.string = 'ListH当前渲染总数 = ' + this.listH.displayItemNum;
    }
    //网格列表渲染器
    onListGridRender(item: cc.Node, idx: number) {
        item.getComponent(ListItem).title.getComponent(cc.Label).string = this.data[idx] + '';
        this.info.string = 'ListG当前渲染总数 = ' + this.listG.displayItemNum;
    }
    //网格列表2渲染器
    onListGrid2Render(item: cc.Node, idx: number) {
        item.getComponent(ListItem).title.getComponent(cc.Label).string = this.data[idx] + '';
        this.info.string = 'ListG2当前渲染总数 = ' + this.listG2.displayItemNum;
    }
    //当列表项被选择...
    onListSelected(item: any, selectedId: number, lastSelectedId: number, val: number) {
        if (!item)
            return;
        let list: List = item.getComponent(ListItem).list;
        let str: string = '当前操作List为：' + list.node.name + '，当前选择的是：' + selectedId + '，上一次选择的是：' + lastSelectedId;
        if (list.selectedMode == 2) { //如果是多选模式
            str += '，当前值为：' + val;
        }
        cc.log(str);
    }
    //按钮事件
    btnEvent(ev: cc.Event) {
        let name: string = ev.target.name;
        let t: any = this;
        let callFunc: Function = function (idx) {
            if (idx != null) {
                t.data.splice(idx, 1);
                cc.log('------删除完毕！', idx);
                t.listV.numItems = t.data.length;
                t.listH.numItems = t.data.length;
                t.listG.numItems = t.data.length;
                t.listG2.numItems = t.data.length;
            }
        }
        switch (name) {
            case 'btn1':
                t.listV.aniDelItem(1, callFunc, 3);
                break;
            case 'btn2':
                t.listH.aniDelItem(t.listH.selectedId, callFunc, 0);
                break;
            case 'btn3':
                t.listG.aniDelItem(1, callFunc, null);
                break;
            case 'btn4':
                t.listV.scrollTo(parseInt(t.input.string), .5, null, false);
                t.listH.scrollTo(parseInt(t.input.string), .5, null, false);
                t.listG.scrollTo(parseInt(t.input.string), .5, null, false);
                t.listG2.scrollTo(parseInt(t.input.string), .5, null, false);
                break;
        }
    }

}