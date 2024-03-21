var User = /** @class */ (function () {
    function User(name) {
        this.name = null;
        this.name = name;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    return User;
}());
console.log(new User('张三').getName()); // 输出: 张三
