const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: '博客标题1',
            content: '内容A',
            createTime: 1607844896841,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '博客标题2',
            content: '内容2',
            createTime: 1607845019206,
            author: 'lisi'
        }
    ]
}
const getDetail = (id) => {
    return {
        id: 1,
        title: '博客标题1',
        content: '内容A',
        createTime: 1607844896841,
        author: 'zhangsan'
    }
}

const newBlog = (blogData = {}) => {
    return {
        id: 3
    }
}
module.exports = {
    getList,
    getDetail,
    newBlog
}