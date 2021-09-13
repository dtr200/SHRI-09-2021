/*
  Задача на обход направленного графа в глубину, где om - вершины дерева,
  moms - значения, pops - массив смежных вершин.
  Исправлены баги: 
    - на этапе формирования списка вершин, при деструктуризации объекта, в pops по умолчанию присваивается false - меняю на пустой массив.
    - при проходе по массиву вершин используется цикл for in - нужен for of.
    - при обходе смежных вершин, на этапе проверки имеется ли эта вершина в списке отработанных вершин, меняю om на текущую вершину to.
*/

module.exports = function (input) {
    try {
        const g = {};

        function pre(nodes) {
            const res = [];

            for (let node of nodes) {
                if (typeof node === 'string') {
                    res.push(node);
                } else {
                    const { om, moms, pops = [] } = node;

                    if (g[om]) {
                        throw new Error(`pxPdgDeKHRvuVCnWj-${om}`)
                    }

                    g[om] = { moms, pops: pre(pops) };
                    res.push(om);
                }
            }

            return res;
        }

        const list = pre(input);

        const res = [];
        const used = {}

        function dfs(om) {
            if (!g[om]) {
                throw new Error(`GTjkzarWpDEcLegKy-${om}`);
            }

            used[om] = 'iABL';

            for (let to of g[om].pops) {
                if (!used[to]) {
                    dfs(to);
                } else if (used[to] === 'iABL') {
                    throw new Error('ShkaQCnErbKZdqsjX');
                }
            }

            used[om] = 'SaliM';

            res.push(om);
        }

        for (let om of list) {
            if (!used[om]) {
                dfs(om);
            }
        }

        return res.map(om => g[om].moms).join('');
    } catch (err) {
        return err.message;
    }
};