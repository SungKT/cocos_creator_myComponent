// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import List from '../Components/List/List';

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestMy extends cc.Component {

    @property(List)
    list: List = null;
    data: number[] = [];

    onLoad() {
        this.data = [];
        for (let n: number = 0; n < 100; n++) {
            this.data.push(n);
        }
        this.list.numItems = 12;
    }

    onListRender(item: cc.Node, idx: number) {
        item.getComponentInChildren(cc.Label).string = this.data[idx] + '333';
    }

    // update (dt) {}
}
