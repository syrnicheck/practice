const throttle = function (fn: Function , timeout: number) {
    let timer: any;
    let args;
    let needInvoke;

    return function () {
        args = arguments;
        needInvoke = true;

        if (!timer) {
            (function func() {
                if (needInvoke) {
                    fn.apply( args);
                    needInvoke = false;
                    timer = setTimeout(func, timeout);
                } else {
                    timer = null;
                }
            })();
        }
    };
};

export default throttle;