import Tree, { Node, TreeLogger }  from './Tree';

export default class TreeTest {

    run() {
        var t1 = new Tree();

        t1.insert(1);
        t1.insert(2);
        t1.insert(3);
        //t1.print();

        t1.logger.printJob('1')
        t1.logger.printJob('2')
        t1.logger.printJob('3')

    }
}


