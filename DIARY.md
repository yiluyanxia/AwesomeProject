## redux的异步操作
Actions must be plain objects. Use custom middleware for async actions.

## 直接在Text中输入一个对象  加上JSON.stringify
Invariant Violation: Objects are not valid as a React child (found: object with keys {type, status, ok, statusText, headers, url, _bodyInit, _bodyBlob}). If you meant to render a collection of children, use an array instead.
   
## 丧心病狂，写了个死循环的bug 
Invariant Violation: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.

## 单词拼错，丧心病狂
undefined is not a function (evaluating 'onToDoClick(item.id)')



## 新装一个npm包之后,就报这个错误，重新npm install就好了
Requiring unknown module "802".If you are sure the module is there, try restarting Metro Bundler. You may also want to run `yarn`, or `npm install` (depending on your environment).
