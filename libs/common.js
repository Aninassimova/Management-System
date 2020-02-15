const crypto=require('crypto');

module.exports={
    MD5_SUFFIX: 'n/*+4十大5&^&秘书vcbs你看=dchbsa$%^&*ygu98416)(*&(&骂和v玩具规划',
    md5: function (str){
        var obj=crypto.createHash('md5');

        obj.update(str);

        return obj.digest('hex');
    }
};
